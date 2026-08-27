import { useState } from "react";
import ProgressBar from "./progressBar";
import axios from "axios";
import  Paystack  from "@paystack/inline-js";
import { toast } from "react-toastify";
import naira from "./naira";
const GREEN = "#007518";
const GREEN_DARK = "#003d0c";
const GOLD = "#ffba00";
const CREAM = "#fcfbfe";
const INK = "#12200f";
const BOOKING_STEPS = ["Your details", "Your operation", "Confirm & pay"];

 export default function NYSCModal({ service, onClose }) {
//   const paystackReady = usePaystackScript();
 const paystack = new Paystack();
 const handleSubmit=async (data,form)=>{
  try{

const formData = new FormData();
formData.append("name", form.name);
formData.append("Email_address", form.Email_address);
formData.append("bloodgroup", form.bloodgroup);
formData.append("address", form.address);
formData.append("dob", form.dob);
formData.append("lgo", form.lgo);
formData.append("state", form.state);
formData.append("nin", form.nin);
formData.append("genotype", form.genotype);
formData.append("registration", form.registration);
formData.append("matric", form.matric);
formData.append("place", form.place);
formData.append("language", form.language);
formData.append("kinRelationship", form.kinRelationship);
formData.append("kinName", form.kinName);
formData.append("kinEmail", form.kinEmail);
formData.append("kinPhone", form.kinPhone);
formData.append("shirt", form.shirt);
formData.append("trouser", form.trouser);
formData.append("shoe", form.shoe);
formData.append("stateBefore", form.stateBefore);
formData.append("prifrom", form.prifrom);
formData.append("pschname", form.pschname);
formData.append("sschname", form.sschname);
formData.append("tschname", form.tschname);
formData.append("prito", form.prito);
formData.append("sectfrom", form.secfrom);
formData.append("secto", form.secto);
formData.append("tetfrom", form.tetfrom);
formData.append("tetto", form.tetto);
formData.append("level", form.level);
formData.append("cost", form.cost);

if (form.file) {
  formData.append("file", form.file);
}
if (form.file2) {
  formData.append("file2", form.file2);
}
 
   console.log(formData)
    await axios.post("https://meganet-backend-q2fi.onrender.com/api/nysc", formData).then(()=>{
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
    amount: 100 * data.price, 
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
    name: "",
    Email_address: "",
    phone: "",
    nin: "",
    state: "",
    lgo: "",
    dob: "",
    address: "",
    bloodgroup: "",
    genotype: "",
    registration: "",
    matric: "",
    place: "",
    language: "",
    kinRelationship:"",
    kinName:"",
    kinEmail:"",
    kinPhone:"",
    shirt:"",
    trouser:"",
    shoe:"",
    stateBefore:"",
    prifrom:"",
    prito:"",
    secfrom:"",
    secto:"",
    tetfrom:"",
    tetto:"",
    pschname:"",
    sschname:"",
    tschname:"",
    cost:10000,
    level:"",
    file:null,
    file2:null

  });

  const [status, setStatus] = useState("form"); // form | paying | paid
  const [reference, setReference] = useState("");
 
  if (!service) return null;
 
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
 
  const step0Valid = form.name.trim() 
   && /\S+@\S+\.\S+/.test(form.Email_address) 
   && form.phone.trim()
   && form.address && form.lgo && form.nin
   && form.matric && form.genotype && form.language 
   && form.bloodgroup && form.dob &&  form.place &&  form.state ;
   const step1Valid = form.kinEmail && form.kinName
   && form.kinRelationship && form.kinPhone  && form.level && form.prifrom  && form.sschname && form.pschname && form.tschname

   && form.prito && form.secfrom && form.secto && form.tetfrom && form.tetto ;
  const step2Valid = form.file && form.file2;
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
                <h1>Personal Data</h1>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Name</label>
                  <input value={form.name} onChange={update("name")} placeholder="Your full name" className={inputClass} style={selectStyle} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Email</label>
                  <input value={form.Email_address} onChange={update("Email_address")} placeholder="you@example.com" className={inputClass} style={selectStyle} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">JAMB Registration Number</label>
                  <input value={form.registration} onChange={update("registration")} placeholder="" className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Matriculation Number</label>
                  <input value={form.matric} onChange={update("matric")} placeholder="" className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">NIN</label>
                  <input value={form.nin} onChange={update("nin")} placeholder="" className={inputClass} style={selectStyle} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">State of Origin</label>
                  <input value={form.state} onChange={update("state")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">L.G.O</label>
                  <input value={form.lgo} onChange={update("lgo")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Place of Birth</label>
                  <input value={form.place} onChange={update("place")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Home Address</label>
                  <input value={form.address} onChange={update("address")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Date of Birth</label>
                  <input type="date" value={form.dob} onChange={update("dob")} placeholder="DD/MM/YYYY" className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Nigeria Language</label>
                  <input value={form.language} onChange={update("language")} placeholder=" " className={inputClass} style={selectStyle} />
                </div>
                  <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Phone Number</label>
                  <input value={form.phone} onChange={update("phone")} placeholder="" className={inputClass} style={selectStyle} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5"> Genotype</label>
                  <select value={form.genotype} onChange={update("genotype")} className={selectClass} style={selectStyle}>
                    <option value="">Select an option</option>
                    <option value="AA">AA</option>
                    <option value="AS">AS</option>
                    <option value="AC">AC</option>
                    <option value="SS">SS</option>
                    <option value="SC">SC</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5"> Blood Group</label>
                  <select value={form.bloodgroup} onChange={update("bloodgroup")} className={selectClass} style={selectStyle}>
                    <option value="">Select an option</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
            )}
 
            {step === 1 && (
              <div className="space-y-4 vd-fade">
                <h1>Education Background</h1>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Primary School Attended</label>
                  <div style={{
                    marginBottom:"10px"
                  }}>
                  <div style={{
                    marginBottom:"10px"
                  }}>
                    <input className="mb-1.5"
                 value={form.pschname} onChange={update("pschname")} placeholder="School Name" className={inputClass} style={selectStyle} />
                 </div>
                 
                  <input className="mb-1.5"
                 value={form.prifrom} onChange={update("prifrom")} placeholder="From:" className={inputClass} style={selectStyle} />
                 </div>
                  <input value={form.prito} onChange={update("prito")} placeholder="To:" className={inputClass} style={selectStyle} />

                </div>

                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Secondary School Attended</label>
                  
                  <div style={{
                    marginBottom:"10px"
                  }}>
                    <div style={{
                    marginBottom:"10px"
                  }}>
                    <input className="mb-1.5"
                 value={form.sschname} onChange={update("sschname")} placeholder="School Name" className={inputClass} style={selectStyle} />
                 </div>
                  <input className="mb-1.5"
                 value={form.secfrom} onChange={update("secfrom")} placeholder="From:" className={inputClass} style={selectStyle} />
                 </div>
                  <input value={form.secto} onChange={update("secto")} placeholder="To:" className={inputClass} style={selectStyle} />

                </div>


                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Tertiary School Attended</label>
                  <div style={{
                    marginBottom:"10px"
                  }}>
                    <div style={{
                    marginBottom:"10px"
                  }}>
                  <input className="mb-1.5"
                 value={form.tschname} onChange={update("tschname")} placeholder="School Name" className={inputClass} style={selectStyle} />
                 </div>

                  <input className="mb-1.5"
                 value={form.tetfrom} onChange={update("tetfrom")} placeholder="From:" className={inputClass} style={selectStyle} />
                 </div>
                  <input value={form.tetto} onChange={update("tetto")} placeholder="To:" className={inputClass} style={selectStyle} />

                </div>
                  <input value={form.level} onChange={update("level")} placeholder="O level Result (WAEC OR NECO)" className={inputClass} style={selectStyle} />
                <h1>Next of kin</h1>
                  <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Name</label>
                  <input value={form.kinName} onChange={update("kinName")} placeholder="Your full name" className={inputClass} style={selectStyle} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Email</label>
                  <input value={form.kinEmail} onChange={update("kinEmail")} placeholder="you@example.com" className={inputClass} style={selectStyle} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Phone Number</label>
                  <input value={form.kinPhone} onChange={update("kinPhone")} placeholder="" className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Relationship</label>
                  <input value={form.kinRelationship} onChange={update("kinRelationship")} placeholder="" className={inputClass} style={selectStyle} />
                </div>
                <h1>NYSC Kits</h1>
                  <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Size of Shirt</label>
                  <input value={form.shirt} onChange={update("shirt")} placeholder="" className={inputClass} style={selectStyle} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Size of Trouser</label>
                  <input value={form.trouser} onChange={update("trouser")} placeholder="" className={inputClass} style={selectStyle} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Size of Shoe</label>
                  <input value={form.shoe} onChange={update("shoe")} placeholder="" className={inputClass} style={selectStyle} />
                </div>
                 <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">State visited before</label>
                  <input value={form.stateBefore} onChange={update("stateBefore")} placeholder="" className={inputClass} style={selectStyle} />
                </div>
                
              </div>
            )}
 
            {step === 2 && (
              <div className="space-y-4 vd-fade">
                <h1>Documents Upload</h1>
                <div>
  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">
    Statement of Result 
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
               <div>
  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">
    Signature
  </label>
  {form.file2 ? (
    <div className="flex items-center justify-between gap-3 rounded-lg px-4 py-3" style={{ border: "1px solid #00751833", backgroundColor: "#eef3e6" }}>
      <div className="min-w-0">
        <p className="text-sm font-medium truncate">{form.file2.name}</p>
        <p className="text-xs opacity-60">{formatBytes(form.file2.size)}</p>
      </div>
      <button type="button" onClick={removeFile} className="text-xs font-semibold vd-text-green shrink-0">
        Remove
      </button>
    </div>

    
  ) : (
    <label className="vd-upload block">
      <input type="file" accept={ALLOWED_FILE_TYPES.join(",")} onChange={onFileChange2} className="hidden" />
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

