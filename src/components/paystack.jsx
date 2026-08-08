import  Paystack  from "@paystack/inline-js";
import axios from "axios";
import {  toast } from "react-toastify";

 const paystack = new Paystack();
 export const handleSubmit=async (form)=>{
  try{

const formData = new FormData();
formData.append("fullname", form.fullname);
formData.append("Email_address", form.Email_address);
formData.append("phone_number", form.phone_number);
formData.append("institution", form.institution);
formData.append("study", form.study);
formData.append("destination", form.destination);
formData.append("website", form.website);

if (form.file) {
  formData.append("file", form.file);
}
    console.log("submitted:", formData)
    await axios.post("https://meganet-backend-q2fi.onrender.com/api/personal", formData)
  } catch(err){
    console.log(err)
  }
}
export default function makePayment(data,form) {


  paystack.newTransaction({
    key: "pk_live_cefbe9ab88fb9568291b2bccb8c837d481207a22",
    email: form.Email_address,
    amount: data.price * 100, // Kobo (₦5000)
    currency: "NGN",
    firstname: "John",
    lastname: "Doe",

    onSuccess: (transaction) => {
      console.log(transaction);
      alert("Payment Successful!");
      handleSubmit(form)
    },
    onCancel: () => {
      alert("Payment Cancelled");
    },

    onError: (error) => {
      console.log(error);
    },
  });
}