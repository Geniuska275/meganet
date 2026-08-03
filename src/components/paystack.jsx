import  Paystack  from "@paystack/inline-js";

const paystack = new Paystack();

export default function makePayment(amount) {
  paystack.newTransaction({
    key: "pk_live_cefbe9ab88fb9568291b2bccb8c837d481207a22",
    email: "jefosa2015@gmail.com",
    amount: amount * 100, // Kobo (₦5000)
    currency: "NGN",
    firstname: "John",
    lastname: "Doe",

    onSuccess: (transaction) => {
      console.log(transaction);
      alert("Payment Successful!");
    },
    onCancel: () => {
      alert("Payment Cancelled");
    },

    onError: (error) => {
      console.log(error);
    },
  });
}