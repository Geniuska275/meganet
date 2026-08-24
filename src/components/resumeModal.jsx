import { useState } from "react";
import  Paystack  from "@paystack/inline-js";
import axios from "axios";
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
 


 export default function ResumeModal({ service, onClose }) {
//   const paystackReady = usePaystackScript();

const paystack = new Paystack();
const handleSubmit=async (data,form)=>{
  try{
const formData = new FormData();
formData.append("pto", form.pto);
formData.append("post", form.post);
formData.append("hobby", form.hobby);
formData.append("te", form.te);
formData.append("to", form.to);
formData.append("l_origin", form.l_origin);
formData.append("dob", form.dob);
formData.append("gender", form.gender);
formData.append("fullname", form.fullname);
formData.append("company", form.company);
formData.append("tqualification", form.tqualification);
formData.append("qualification", form.qualification);
formData.append("pfrom", form.pfrom);
formData.append("sfrom", form.sfrom);
formData.append("sto", form.sto);
formData.append("tfrom", form.tfrom);
formData.append("tto", form.tto);
formData.append("phone_number", form.phone_number);
formData.append("origin", form.origin);
formData.append("card_number", form.card_number);
formData.append("home_address", form.home_address);
formData.append("email_address", form.email_address);
formData.append("spoken", form.spoken);

if (form.file) {
  formData.append("file", form.file);
}
if (form.file2) {
  formData.append("file2", form.file2);
}
if (form.file3) {
  formData.append("file3", form.file3);
}

   console.log(formData)
     await axios.post("https://meganet-backend-q2fi.onrender.com/api/resume", formData).then(()=>{
     onClose()
     toast.success("Form successfully submitted!");
     makePayment(data,form)
    })
  } catch(err){
    console.log(err)
     toast.error("CHECK YOUR INPUTS AND TRY AGAIN!");

  }
}

 function makePayment(data,form) {
   paystack.newTransaction({
     key: "pk_live_cefbe9ab88fb9568291b2bccb8c837d481207a22",
     email: form.Email_address,
     amount: 100 * 100, // Kobo (₦5000)
     currency: "NGN",
     
 
     onSuccess: (transaction) => {
       console.log(transaction);
       toast.success("payment made successfully");  
      
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
    pto:"",
    pfrom:"",
    sfrom:"",
    sto:"",
    tfrom:"",
    tto:"",
    qualification:"",
    tqualification:"",
    company: "",
    fullname:"",
    gender:"",
    l_origin:"",
    dob:"",
    to: "",
    te: "",
    hobby: "",
    post: "",
    phone_number: "",
    origin: "",
    card_number: "",
    home_address: "",
    phone_number: "",
    email_address: "",
    spoken: "",
  });

  const [status, setStatus] = useState("form"); // form | paying | paid
  const [reference, setReference] = useState("");
 
  if (!service) return null;
 
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
 
  const step0Valid =form.fullname && form.home_address && form.dob  && form.origin && form.spoken && form.l_origin && form.email_address
  
  const step1Valid = form.pto && form.pfrom && form.tto && form.tfrom && form.sfrom && form.sto && form.tqualification
  
  const step2Valid = form.company && form.post && form.cert && form.hobby  && form.responsibility && form.to && form.te
  const stepValid = [step0Valid, step1Valid, step2Valid][step];

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
      o1nClick={onClose}
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
              

                <h1>CV/RESUME</h1>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Full Name</label>
                  <input value={form.fullname} onChange={update("fullname")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Gender</label>
                  <input value={form.gender} onChange={update("gender")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Date of Birth</label>
                  <input type="date" value={form.dob} onChange={update("dob")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">State of Origin</label>
                  <input value={form.origin} onChange={update("origin")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Local Govt of Origin</label>
                  <input value={form.l_origin} onChange={update("l_origin")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Phone Number</label>
                  <input value={form.phone_number} onChange={update("phone_number")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                  <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Email Address</label>
                  <input value={form.email_address} onChange={update("email_address")} placeholder="" className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Spoken Language</label>
                  <input value={form.spoken} onChange={update("spoken")} placeholder="" className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Home Address</label>
                  <input value={form.home_address} onChange={update("home_address")} placeholder="" className={inputClass} style={selectStyle} />
                </div>
                
              </div>
            )}
 
            {step === 1 && (
              <div className="space-y-4 vd-fade">        
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Primary School Attended:</label>
                  <div className="mb-2">
                  <input value={form.pfrom} onChange={update("pfrom")} placeholder="From (MONTH/YEAR) " className={inputClass} style={selectStyle} />
                  </div>
                  <input value={form.pto} onChange={update("pto")} placeholder=" To (MONTH/YEAR)" className={inputClass} style={selectStyle} />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Secondary School Attended:</label>
                  <div className="mb-2">
                  <input value={form.sfrom} onChange={update("sfrom")} placeholder="From (MONTH/YEAR) " className={inputClass} style={selectStyle} />
                  </div>
                  <input value={form.sto} onChange={update("sto")} placeholder=" To (MONTH/YEAR)" className={inputClass} style={selectStyle} />
                  <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Qualification ( E.g WAEC , NECO)</label>
                  <input value={form.qualification} onChange={update("qualification")} placeholder=" To (MONTH/YEAR)" className={inputClass} style={selectStyle} />
                  </div>
                </div>

                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Tertiary Institution Attended:</label>
                  <div className="mb-2">
                  <input value={form.tfrom} onChange={update("tfrom")} placeholder="From (MONTH/YEAR) " className={inputClass} style={selectStyle} />
                  </div>
                  <input value={form.tto} onChange={update("tto")} placeholder=" To (MONTH/YEAR)" className={inputClass} style={selectStyle} />
                  <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Qualification / Course of Study </label>
                  <input value={form.tqualification} onChange={update("tqualification")} placeholder="" className={inputClass} style={selectStyle} />
                  </div>
                </div>
              </div>
            )}
 
            {step === 2 && (
              <div className="space-y-4 vd-fade">

                  <div className="space-y-4 vd-fade">
                <h2>Employment Records/Work Experience </h2>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Name of Company</label>
                  <input value={form.company} onChange={update("company")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Post Held</label>
                  <input value={form.post} onChange={update("post")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div className="mb-2">
                  <input type="month" value={form.te} onChange={update("te")} placeholder="From (MONTH/YEAR) " className={inputClass} style={selectStyle} />
                  </div>
                  <input type="month" value={form.to} onChange={update("to")} placeholder=" To (MONTH/YEAR)" className={inputClass} style={selectStyle} />
                  <div></div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Responsibilities</label>
                  <input value={form.responsibility} onChange={update("responsibility")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Professional Certificates (if any)</label>
                  <input value={form.cert} onChange={update("cert")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Hobbies</label>
                  <input value={form.hobby} onChange={update("hobby")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>        
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

