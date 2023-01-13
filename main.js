let paymentSessionId = "session_n73o6eMRMqKH6BgXRzAwYheKyfkwHmJjs6_eGWUIEvqsnM3ND_OuXW5afbfOfllGLW444EO2suoPJH487vuEMf5ykgEEblPN8q9dMNCd0RqD";
const paymentDom = document.getElementById("payment-form");
const success = function(data) {
    if (data.order && data.order.status == "PAID") {
        $.ajax({
            url: "checkstatus.php?order_id=" + data.order.orderId,
            success: function(result) {
                if (result.order_status == "PAID") {
                    alert("Order PAID");
                }
            },
        });
    } else {
        //order is still active
        alert("Order is ACTIVE")
    }
}
let failure = function(data) {
    alert(data.order.errorText)
}
document.getElementById("pay-btn").addEventListener("click", () => {
    const dropConfig = {
        "components": [
            "order-details",
            "card",
            "netbanking",
            "app",
            "upi"
        ],
        "onSuccess": success,
        "onFailure": failure,
        "style": {
            "backgroundColor": "#ffffff",
            "color": "#11385b",
            "fontFamily": "Lato",
            "fontSize": "14px",
            "errorColor": "#ff0000",
            "theme": "light", //(or dark)
        }
    }
    if (paymentSessionId == "") {
       alert(sdf);
        $.ajax({
            
            url: "fetchtoken.php",
            success: function(result) {
                paymentSessionId = result["session_wKz16NXCEKPzX8wXsKrksession_n73o6eMRMqKH6BgXRzAwYheKyfkwHmJjs6_eGWUIEvqsnM3ND_OuXW5afbfOfllGLW444EO2suoPJH487vuEMf5ykgEEblPN8q9dsession_n73o6eMRMqKH6BgXRzAwYheKyfkwHmJjs6_eGWUIEvqsnM3ND_OuXW5afbfOfllGLW444EO2suoPJH487vuEMf5ykgEEblPN8q9dMNCd0RqDMNCd0RqD9AAvHycDf9tYpYM-nIYhQSiQqtcQ_Y7hM0t_5aCfQHq1hNagMSlHRd7oqE2_xh1oJ77MGUjwnyDK4ld1_nx_L9G-"];
                const cashfree = new Cashfree(paymentSessionId);
                cashfree.drop(paymentDom, dropConfig);
            },
        });
    } else {
        const cashfree = new Cashfree(paymentSessionId);
        cashfree.drop(paymentDom, dropConfig);
    }

})