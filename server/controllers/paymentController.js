const CryptoJS = require('crypto-js');

class PaymentController {
    static async makePayment(req, res, next) {
        try {
            // adjust with your iPaymu api key & va 
            const apikey = "SANDBOX952E0321-0A01-4F86-93C9-1BE729F9DDC6";
            const va = "0000002258387876";
            const url = 'https://sandbox.ipaymu.com/api/v2/payment'; // development mode
            // const url = 'https://my.ipaymu.com/api/v2/payment/direct'; // for production mode

            const { name, phone, amount, email, comments } = req.body

            const body = {
                buyerName: name,
                buyerPhone: phone,
                buyerEmail: email,
                product: [comments],
                qty: ["1"],
                price: [amount],
                description: [comments],
                returnUrl: "https://gowny-003.web.app/thank-you-page",
                notifyUrl: "https://webhook.site/703eb3d8-e974-45e0-b1c8-e2de6e6f2018", // your callback url
                cancelUrl: "https://gowny-003.web.app/failed-page",
                "referenceId": "5678", // your reference id or transaction id
                "paymentMethod": "qris",
                "paymentChannel": "qris",
                pickupArea: null,
                pickupAddress: null
            };

            // Generate signature
            const bodyEncrypt = CryptoJS.SHA256(JSON.stringify(body));
            const stringtosign = "POST:" + va + ":" + bodyEncrypt + ":" + apikey;

            // Load 'node-fetch' dynamically using import()
            import('node-fetch').then((module) => {
                const fetch = module.default;

                // Request
                fetch(url, {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        va: va,
                        signature: CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA256(stringtosign, apikey)),
                        timestamp: '20150201121045'
                    },
                    body: JSON.stringify(body)
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        res.status(200).json(responseJson)
                    })
                    .catch((error) => {
                        // console.error('Error making payment:', error);
                        res.status(500).json({ error: 'An error occurred while making the payment' });
                    });
            });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while making the payment' });
        }
    }
}

module.exports = PaymentController;