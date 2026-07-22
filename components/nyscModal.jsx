import { useState } from "react";
import ProgressBar from "./progressBar";
const BOOKING_STEPS = ["Your details", "Your operation", "Confirm & pay"];
const GREEN = "#007518";
const GREEN_DARK = "#003d0c";
const GOLD = "#ffba00";
const CREAM = "#fcfbfe";
const INK = "#12200f";
function naira(amount) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export default function NYSCModal({ service, onClose }) {
//   const paystackReady = usePaystackScript();
  
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    contactMethod: "",
    farmSize: "",
    timeline: "",
    location: "",
    source: "",
  });
  const [status, setStatus] = useState("form"); // form | paying | paid
  const [reference, setReference] = useState("");
 
  if (!service) return null;
 
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
 
  const step0Valid = form.name.trim() && /\S+@\S+\.\S+/.test(form.email) && form.phone.trim() && form.contactMethod;
  const step1Valid = form.farmSize && form.timeline && form.location.trim();
  const step2Valid = form.source;
  const stepValid = [step0Valid, step1Valid, step2Valid][step];
 
  const next = () => { if (stepValid) setStep((s) => Math.min(s + 1, BOOKING_STEPS.length - 1)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));
 
  const pay = () => {
    if (!step2Valid || !paystackReady) return;
    setStatus("paying");
    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: form.email,
      amount: service.price * 100, // kobo
      currency: "NGN",
      metadata: {
        custom_fields: [
          { display_name: "Name", variable_name: "name", value: form.name },
          { display_name: "Phone", variable_name: "phone", value: form.phone },
          { display_name: "Service", variable_name: "service", value: service.title },
          { display_name: "Preferred contact method", variable_name: "contact_method", value: form.contactMethod },
          { display_name: "Farm/business size", variable_name: "farm_size", value: form.farmSize },
          { display_name: "Timeline", variable_name: "timeline", value: form.timeline },
          { display_name: "Location", variable_name: "location", value: form.location },
          { display_name: "Heard about us via", variable_name: "source", value: form.source },
        ],
      },
      callback: (response) => {
        setReference(response.reference);
        setStatus("paid");
      },
      onClose: () => {
        setStatus((s) => (s === "paying" ? "form" : s));
      },
    });
    handler.openIframe();
  };
 
  const selectClass = "vd-input w-full px-4 py-2.5 rounded-lg bg-white outline-none text-sm";
  const selectStyle = { border: "1px solid #00751833" };
  const inputClass = "vd-input w-full px-4 py-2.5 rounded-lg bg-white outline-none text-sm";
 
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
              Consultation fee: <span className="font-semibold vd-text-green-dark">{naira(service.price)}</span>
            </p>
 
            <ProgressBar step={step} />
 
            {step === 0 && (
              <div className="space-y-4 vd-fade">
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Name</label>
                  <input value={form.name} onChange={update("name")} placeholder="Your full name" className={inputClass} style={selectStyle} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Email</label>
                  <input value={form.email} onChange={update("email")} placeholder="you@example.com" className={inputClass} style={selectStyle} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Phone</label>
                  <input value={form.phone} onChange={update("phone")} placeholder="080X XXX XXXX" className={inputClass} style={selectStyle} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Preferred contact method</label>
                  <select value={form.contactMethod} onChange={update("contactMethod")} className={selectClass} style={selectStyle}>
                    <option value="">Select an option</option>
                    <option value="Email">Email</option>
                    <option value="Phone call">Phone call</option>
                    <option value="WhatsApp">WhatsApp</option>
                  </select>
                </div>
              </div>
            )}
 
            {step === 1 && (
              <div className="space-y-4 vd-fade">
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Farm / business size</label>
                  <select value={form.farmSize} onChange={update("farmSize")} className={selectClass} style={selectStyle}>
                    <option value="">Select an option</option>
                    <option value="Smallholder (under 5 hectares)">Smallholder (under 5 hectares)</option>
                    <option value="Medium (5–50 hectares)">Medium (5–50 hectares)</option>
                    <option value="Large enterprise (50+ hectares)">Large enterprise (50+ hectares)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Timeline</label>
                  <select value={form.timeline} onChange={update("timeline")} className={selectClass} style={selectStyle}>
                    <option value="">Select an option</option>
                    <option value="This week">This week</option>
                    <option value="This month">This month</option>
                    <option value="Just exploring">Just exploring</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Location (state)</label>
                  <input value={form.location} onChange={update("location")} placeholder="e.g. Oyo State" className={inputClass} style={selectStyle} />
                </div>
              </div>
            )}
 
            {step === 2 && (
              <div className="space-y-4 vd-fade">
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">How did you hear about us?</label>
                  <select value={form.source} onChange={update("source")} className={selectClass} style={selectStyle}>
                    <option value="">Select an option</option>
                    <option value="Referral">Referral</option>
                    <option value="Search">Search</option>
                    <option value="Social media">Social media</option>
                    <option value="Event / conference">Event / conference</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="rounded-lg p-4 text-sm" style={{ backgroundColor: "#eef3e6" }}>
                  <p className="font-semibold vd-text-green-dark mb-1">{service.title}</p>
                  <p className="opacity-70">{form.name} · {form.email}</p>
                  <p className="opacity-70">{form.location} · {form.farmSize}</p>
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
                  onClick={pay}
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
