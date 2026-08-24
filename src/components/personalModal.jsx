import { useState } from "react";
import axios from "axios";
import  Paystack  from "@paystack/inline-js";
import { toast } from "react-toastify";






const GREEN = "#007518";
const GREEN_DARK = "#003d0c";
const GOLD = "#ffba00";
const CREAM = "#fcfbfe";
const INK = "#12200f";

function naira(amount) {
  return `₦${amount?.toLocaleString("en-NG")}`;
}
const BOOKING_STEPS = ["Your details", "Your operation", "Confirm & pay"];



function ProgressBar({ step }) {
  const pct = (step / (BOOKING_STEPS.length - 1)) * 100;
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        {BOOKING_STEPS.map((label, i) => (
          <span
            key={label}
            className="text-[11px] font-semibold uppercase tracking-wide"
            style={{ color: i <= step ? GREEN_DARK : "#9ca89a", transition: "color .3s ease" }}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="h-1.5 rounded-full w-full overflow-hidden" style={{ backgroundColor: "#00751822" }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: GOLD, transition: "width .35s ease" }}
        />
      </div>
    </div>
  );
}
 
 


 export default function PersonalModal({ service, onClose }) {

 const paystack = new Paystack();
 const handleSubmit=async (data,form)=>{
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
   
    await axios.post("https://meganet-backend-q2fi.onrender.com/api/personal", formData).then(()=>{
      onClose()
     toast.success("Form successfully submitted!");
     makePayment(data,form)
    })
  } catch(err){
    console.log(err)
  }
}
 function makePayment(data,form) {
  paystack.newTransaction({
    key: "pk_live_cefbe9ab88fb9568291b2bccb8c837d481207a22",
    email: form.Email_address,
    amount: 100 * 100, // Kobo (₦5000)
    currency: "NGN",
    firstname: "John",
    lastname: "Doe",

    onSuccess: (transaction) => {
      console.log(transaction);
      toast.success("payment made successfully");  
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
  
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    fullname:"",
    Email_address:"",
    phone_number:"",
    institution:"", 
    study:"",
    destination:"", 
    website:"", 
    file:null,
  });

  const [status, setStatus] = useState("form"); // form | paying | paid
  const [reference, setReference] = useState("");
 
  if (!service) return null;
 
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
 
  const step0Valid = form.fullname && form.phone_number && form.study && form.destination
   && form.website && form.institution && form.Email_address
  

  const step2Valid = form.file 
  const stepValid = [step0Valid, step2Valid][step];

  const next = () => { if (stepValid) setStep((s) => Math.min(s + 1, BOOKING_STEPS.length - 1)); };
  const back = () => setStep((s) => Math.max(s - 1, 0)); 
  const selectClass = "vd-input w-full px-4 py-2.5 rounded-lg bg-white outline-none text-sm";
  const selectStyle = { border: "1px solid #00751833" };
  const inputClass = "vd-input w-full px-4 py-2.5 rounded-lg bg-white outline-none text-sm";
 const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

  const [fileError, setFileError] = useState("");

  const onFileChange2 = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!ALLOWED_FILE_TYPES.includes(f.type)) {
      setFileError("Please upload a JPEG, PNG, WEBP image or a PDF.");
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setFileError("File must be 5MB or smaller.");
      return;
    }
    setFileError("");
    setForm({ ...form, file2: f });
  };

    const onFileChange3 = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!ALLOWED_FILE_TYPES.includes(f.type)) {
      setFileError("Please upload a JPEG, PNG, WEBP image or a PDF.");
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setFileError("File must be 5MB or smaller.");
      return;
    }
    setFileError("");
    setForm({ ...form, file3: f });
  };
  const onFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (!ALLOWED_FILE_TYPES.includes(f.type)) {
      setFileError("Please upload a JPEG, PNG, WEBP image or a PDF.");
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setFileError("File must be 5MB or smaller.");
      return;
    }
    setFileError("");
    setForm({ ...form, file: f });
  };

  const removeFile = () => {
    setForm({ ...form, file: null });
    setFileError("");
  };

  return (
    <div
      className="vd-overlay fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,20,5,0.55)" }}
      onClick={onClose}
    >
   
      <div
        className="vd-modal w-full max-w-md rounded-2xl bg-white p-7 relative"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 opacity-50 hover:opacity-100 transition-opacity"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
 
        {status === "paid" ? (
          <div className="text-center py-6 vd-fade">
            <div className="w-12 h-12 rounded-full vd-bg-gold mx-auto mb-4 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN_DARK} strokeWidth="2.5">
                <polyline className="vd-check" points="20 6 9 17 4 12" />
              </svg>
            </div>
            <p className="vd-display text-xl font-semibold vd-text-green-dark mb-2">Booking confirmed</p>
            <p className="opacity-75 text-sm mb-1">
              {service.title} for {form.name.split(" ")[0]} — payment received.
            </p>
            <p className="opacity-50 text-xs mb-6">Reference: {reference}</p>
            <button onClick={onClose} className="vd-btn-primary px-6 py-2.5 rounded-full text-sm font-semibold">
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="w-full h-24 rounded-xl overflow-hidden mb-4">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs uppercase tracking-widest vd-text-gold font-semibold mb-1">{service.eyebrow}</p>
            <p className="vd-display text-xl font-semibold vd-text-green-dark mb-1">{service.title}</p>
            <p className="text-sm opacity-70 mb-5">
              Fee: <span className="font-semibold vd-text-green-dark">{naira(service.price)}</span>
            </p>
 
            <ProgressBar step={step} />
 
            {step === 0 && (
              <div className="space-y-4 vd-fade">
                <h1>Personal Statement / Statement of Purpose (SOP)</h1>
            
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Full Name</label>
                  <input value={form.fullname} onChange={update("fullname")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Email Address</label>
                  <input value={form.Email_address} onChange={update("Email_address")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Phone Number</label>
                  <input value={form.phone_number} onChange={update("phone_number")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Name of Institution</label>
                  <input value={form.institution} onChange={update("institution")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Institution Website</label>
                  <input value={form.website} onChange={update("website")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Intended Course of Study</label>
                  <input value={form.study} onChange={update("study")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                  <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Intended Country of Destination</label>
                  <input value={form.destination} onChange={update("destination")} placeholder="" className={inputClass} style={selectStyle} />
                </div>
                
              </div>
            )}
 
           
 
            {step === 1 && (
              <div className="space-y-4 vd-fade">
                <h1>Documents Upload</h1>
                <div>
  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">
    CV/Resume
  </label>
  {form.file ? (
    <div className="flex items-center justify-between gap-3 rounded-lg px-4 py-3" style={{ border: "1px solid #00751833", backgroundColor: "#eef3e6" }}>
      <div className="min-w-0">
        <p className="text-sm font-medium truncate">{form.file.name}</p>
        <p className="text-xs opacity-60">{formatBytes(form.file.size)}</p>
      </div>
      <button type="button" onClick={removeFile} className="text-xs font-semibold vd-text-green shrink-0">
        Remove
      </button>
    </div>

    
  ) : (
    <label className="vd-upload block">
      <input type="file" accept={ALLOWED_FILE_TYPES.join(",")} onChange={onFileChange} className="hidden" />
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" className="mx-auto mb-1.5">
        <path d="M12 3v12" />
        <path d="M7 8l5-5 5 5" />
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      </svg>
      <p className="text-xs font-semibold vd-text-green">Click to upload</p>
      <p className="text-xs opacity-50 mt-0.5">JPEG, PNG, WEBP or PDF · up to 5MB</p>
    </label>
  )}
  {fileError && <p className="text-xs text-red-600 mt-1.5">{fileError}</p>}
</div>
  
     </div>
            )}
 
            <div className="flex gap-3 mt-6">
              {step > 0 && (
                <button onClick={back} className="vd-btn-outline flex-1 px-6 py-3 rounded-full text-sm font-semibold">
                  Back
                </button>
              )}
              {step < BOOKING_STEPS.length - 1 ? (
                <button
                  onClick={next}
                  disabled={!stepValid}
                  className="vd-btn-primary flex-1 px-6 py-3 rounded-full text-sm font-semibold"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={()=>handleSubmit(service,form)}
                  disabled={!step2Valid || status === "paying"}
                  className="vd-btn-primary flex-1 px-6 py-3 rounded-full text-sm font-semibold flex items-center justify-center gap-2"
                >
                  {status === "paying" && (
                    <svg className="vd-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GREEN_DARK} strokeWidth="3">
                      <circle cx="12" cy="12" r="9" opacity="0.25" />
                      <path d="M21 12a9 9 0 0 0-9-9" />
                    </svg>
                  )}
                  Pay {naira(service.price)}
                </button>
              )}
            </div>
            <p className="text-center text-xs opacity-45 mt-3">Secured by Paystack. Test key in use.</p>
          </>
        )}
      </div>
    </div>
  );
}

