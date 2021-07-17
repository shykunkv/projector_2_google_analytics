package ua.shykun.springpayment;

import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.net.URI;
import java.util.Random;
import java.util.UUID;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api")
public class RestController {

    private final String GA_TRACKING_ID = "UA-202461931-1";

    @GetMapping(path = "/payment")
    public ResponseEntity payment() throws Exception {
        collectGaPaymentEvent(tryPay());
        return ResponseEntity.ok().build();
    }

    private boolean tryPay() {
        // imitating call to payment provider with 50% chance to fail
        return new Random().nextInt(100) + 1 <= 50;
    }

    public void collectGaPaymentEvent(boolean success) throws Exception {
        try (CloseableHttpClient client = HttpClientBuilder.create().build()) {
            final URIBuilder builder = new URIBuilder();
            builder
                    .setScheme("https")
                    .setHost("www.google-analytics.com")
                    .setPath("/collect")
                    .addParameter("v", "1")
                    .addParameter("t", "event")
                    .addParameter("tid", GA_TRACKING_ID)
                    .addParameter("cid", UUID.randomUUID().toString())
                    .addParameter("ec", "User")
                    .addParameter("ea", success ? "payment-success" : "payment-failed")
                    .addParameter("ua", "Chrome");
            final URI uri = builder.build();
            final HttpPost request = new HttpPost(uri);
            client.execute(request);
        }
    }
}


