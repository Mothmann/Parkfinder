    const paypal = require('paypal-rest-sdk');
    
    function pay (req, res){
        const price = req.params.price;
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/pay/success/:price",
                "cancel_url": "http://localhost:3000/pay/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Recharge",
                        "sku": "001",
                        "price": price,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": price
                },
                "description": "recharge parkfinder"
            }]
        };
        
        paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for(let i = 0;i < payment.links.length;i++){
                if(payment.links[i].rel === 'approval_url'){
                res.redirect(payment.links[i].href);
                }
            }
        }
        });
    };
    function success (req,res){
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const price = req.params.price;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": price
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.send('Success');
        }
    });
    };
    function cancel (req,res){
        res.send('Cancelled');
    };

    module.exports = {
        pay : pay,
        success: success,
        cancel: cancel
    }