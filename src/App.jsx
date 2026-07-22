import React, { useState, useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
// import { Button } from "./ui/button";
import logo from "./megalogo.png"
import MapComponent from "../components/map";


const GREEN = "#007518";
const GREEN_DARK = "#003d0c";
const GOLD = "#ffba00";
const CREAM = "#fcfbfe";
const INK = "#12200f";

// Replace with your real Paystack public key (starts with pk_test_ or pk_live_).
// Never put a secret key (sk_...) in frontend code.
const PAYSTACK_PUBLIC_KEY = "pk_test_00000000000000000000000000000000000";

const tokens = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Karla:wght@400;500;600;700&display=swap');

  .vd-root { background: ${CREAM}; color: ${INK}; font-family: 'Karla', ui-sans-serif, system-ui, sans-serif; }
  .vd-display { font-family: 'Fraunces', ui-serif, Georgia, serif; }
  .vd-bg-green { background-color: ${GREEN}; }
  .vd-bg-green-dark { background-color: ${GREEN_DARK}; }
  .vd-bg-gold { background-color: ${GOLD}; }
  .vd-bg-cream { background-color: ${CREAM}; }
  .vd-text-green { color: ${GREEN}; }
  .vd-text-green-dark { color: ${GREEN_DARK}; }
  .vd-text-gold { color: ${GOLD}; }
  .vd-text-cream { color: ${CREAM}; }
  .vd-text-ink { color: ${INK}; }
  .vd-border-green { border-color: ${GREEN}; }
  .vd-border-gold { border-color: ${GOLD}; }
  .vd-border-cream { border-color: ${CREAM}; }

  .vd-btn-primary { background-color: ${GOLD}; color: ${GREEN_DARK}; transition: background-color .25s ease, transform .2s ease, box-shadow .25s ease; }
  .vd-btn-primary:hover { background-color: #e6a800; transform: translateY(-2px); box-shadow: 0 8px 20px -8px #ffba0090; }
  .vd-btn-primary:active { transform: translateY(0) scale(0.97); }
  .vd-btn-primary:disabled { opacity: .5; cursor: not-allowed; transform: none; box-shadow: none; }

  .vd-btn-outline { border: 1.5px solid ${GREEN}; color: ${GREEN}; transition: background-color .25s ease, color .25s ease, transform .2s ease; }
  .vd-btn-outline:hover { background-color: ${GREEN}; color: ${CREAM}; transform: translateY(-2px); }
  .vd-btn-outline:active { transform: translateY(0) scale(0.97); }

  .vd-btn-outline-cream { border: 1.5px solid ${CREAM}; color: ${CREAM}; transition: background-color .25s ease, color .25s ease, transform .2s ease; }
  .vd-btn-outline-cream:hover { background-color: ${CREAM}; color: ${GREEN_DARK}; transform: translateY(-2px); }

  .vd-fade { animation: vdFadeIn 0.5s ease both; }
  @keyframes vdFadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  .vd-reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
  .vd-reveal.vd-in { opacity: 1; transform: translateY(0); }

  .vd-menu-open { animation: vdMenuOpen .3s ease both; transform-origin: top; }
  @keyframes vdMenuOpen { from { opacity: 0; transform: scaleY(0.85) translateY(-6px); } to { opacity: 1; transform: scaleY(1) translateY(0); } }

  .vd-vine path { stroke-dasharray: 900; stroke-dashoffset: 900; animation: vdDraw 2.4s ease forwards 0.3s; }
  @keyframes vdDraw { to { stroke-dashoffset: 0; } }
  .vd-leaf { animation: vdSway 3.5s ease-in-out infinite; transform-origin: center; }
  .vd-leaf:nth-child(2) { animation-delay: .3s; }
  .vd-leaf:nth-child(3) { animation-delay: .6s; }
  @keyframes vdSway { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-4px) rotate(4deg); } }

  .vd-card { transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease; cursor: pointer; }
  .vd-card:hover { transform: translateY(-6px); box-shadow: 0 16px 30px -18px #00751840; border-color: #00751855; }

  .vd-dot { transition: transform .3s ease; }
  .vd-card:hover .vd-dot { transform: scale(1.25); }

  .vd-link-underline { position: relative; }
  .vd-link-underline::after {
    content: ""; position: absolute; left: 0; right: 0; bottom: -4px; height: 2px;
    background: ${GOLD}; transform: scaleX(0); transform-origin: left; transition: transform .3s ease;
  }
  .vd-link-underline:hover::after { transform: scaleX(1); }

  .vd-navlink { transition: color .25s ease, border-color .25s ease; }

  .vd-input { transition: border-color .2s ease, box-shadow .2s ease; }
  .vd-input:focus { border-color: ${GREEN} !important; box-shadow: 0 0 0 3px #00751822; }

  .vd-check { stroke-dasharray: 24; stroke-dashoffset: 24; animation: vdCheck .5s ease forwards .1s; }
  @keyframes vdCheck { to { stroke-dashoffset: 0; } }

  .vd-hero-eyebrow { animation: vdSlideIn .6s ease both; }
  .vd-hero-title { animation: vdSlideIn .6s ease both .1s; }
  .vd-hero-body { animation: vdSlideIn .6s ease both .2s; }
  .vd-hero-cta { animation: vdSlideIn .6s ease both .3s; }
  @keyframes vdSlideIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

  .vd-texture {
    background-image: radial-gradient(${GREEN}14 1px, transparent 1px);
    background-size: 18px 18px;
  }

  .vd-overlay { animation: vdOverlayIn .25s ease both; }
  @keyframes vdOverlayIn { from { opacity: 0; } to { opacity: 1; } }
  .vd-modal { animation: vdModalIn .3s ease both; }
  @keyframes vdModalIn { from { opacity: 0; transform: translateY(16px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

  .vd-spin { animation: vdSpin .8s linear infinite; }
  @keyframes vdSpin { to { transform: rotate(360deg); } }

  @media (prefers-reduced-motion: reduce) {
    .vd-fade, .vd-vine path, .vd-leaf, .vd-reveal, .vd-menu-open, .vd-card, .vd-dot,
    .vd-hero-eyebrow, .vd-hero-title, .vd-hero-body, .vd-hero-cta, .vd-check,
    .vd-btn-primary, .vd-btn-outline, .vd-btn-outline-cream, .vd-overlay, .vd-modal, .vd-spin {
      animation: none !important; transition: none !important; transform: none !important; opacity: 1 !important;
    }
  }
`;

function useReveal() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useReveal();
  return (
    <div
      ref={ref}
      className={`vd-reveal ${inView ? "vd-in" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}




const BOOKING_STEPS = ["STEP ONE", "STEP TWO", "Confirm & pay"];
 
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
 
 


function CountUp({ to, suffix = "", prefix = "" }) {
  const [ref, inView] = useReveal();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// Loads the Paystack inline checkout script once and reports readiness.
function usePaystackScript() {
  const [ready, setReady] = useState(!!(typeof window !== "undefined" && window.PaystackPop));
  useEffect(() => {
    if (ready) return;
    const existing = document.querySelector('script[data-paystack="true"]');
    if (existing) {
      existing.addEventListener("load", () => setReady(true));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.dataset.paystack = "true";
    script.onload = () => setReady(true);
    document.body.appendChild(script);
  }, [ready]);
  return ready;
}



const SERVICES = [
  {
    id: "NERD Registration",
    image: "https://www.nairaland.com/attachments/8298792_img20181130wa0024_jpegfcb0806aefb31292076f356d42f7f61a",
    eyebrow: "MEGANET",
    title: "NERD Registration",
    desc: "Seamless uploading of academic research projects on the NERD platform as a mandatory requirement for successful NYSC registration.",
    items: [],
    price: 13000,
  },
  {
    id: "Nysc",
    image: "https://picsum.photos/seed/verdant-compliance/800/600",
    eyebrow: "MEGANET",
    
    title: "NYSC Registration",
    desc: "Hassle-free NYSC registration with accurate biometric capturing for a smooth and successful process.",
    items: [],
    price: 10000,
  },
  {
    id: "CAC Registration",
    image: "https://picsum.photos/seed/verdant-reporting/800/600",
    eyebrow: "MEGANET",
   
    title: "CAC Registration",
    desc: "Professional CAC registration services for businesses, companies, and organizations with full compliance. End-to-end business and company registration services to help you start and grow legally.",
    items: ["Business Name: N45,000",
      "Company Registration: N65,000",
       "NGO/Association/Club/Church Registration: N130,000"],
    price:"",
  },
  {
    id: "Processing of Visa Documents",
    image: "https://picsum.photos/seed/verdant-partnerships/800/600",
    eyebrow: "MEGANET",
    
    title:"Processing of Visa Documents",
    desc: "Professional assistance in preparing and processing visa documents for a smooth application experience.",
    items: ["CV/Resume: N5,000",
       "Personal Statement/Statement of Purpose: N20,000",
      "Work Reference/Recommendation Letter: N5,000"],
    price: "",
  },
  
];
 


const SERVICE = [
  {
    id: "School Fees Payment and Related Services",
    image: "https://www.nairaland.com/attachments/8298792_img20181130wa0024_jpegfcb0806aefb31292076f356d42f7f61a",
    eyebrow: "MEGANET",
    title: "School Fees Payment and Related Services:",
    desc: "Convenient and secure school fees payment assistance and other academic-related services",
    items: [],
    price: "",
  },
  {
    id: "JAMB Processing Services",
    image: "https://picsum.photos/seed/verdant-compliance/800/600",
    eyebrow: "MEGANET",
    
    title: "JAMB Processing Services",
    desc: "Reliable JAMB processing services including admission status checking, printing of admission letters and original results, available for both candidates with and without email addresses.",
    items: [],
    price: "",
  },
  {
    id: "NIN Services",
    image: "https://picsum.photos/seed/verdant-reporting/800/600",
    eyebrow: "MEGANET",
   
    title: "NIN Services",
    desc: "Fast and reliable NIN reprinting services, offering both plastic card and normal slip options for quick and hassle-free delivery.",
    items: [],
    price:"",
  },
  {
    id: "Research Project/Seminar Writing:",
    image: "https://picsum.photos/seed/verdant-partnerships/800/600",
    eyebrow: "MEGANET",
    
    title:"Research Project/Seminar Writing:",
    desc: "Expert research project and seminar writing services tailored to meet academic standards.",
    items: [],
    price: "",
  },

    {
    id: "Computer Works",
    image: "https://picsum.photos/seed/verdant-partnerships/800/600",
    eyebrow: "MEGANET",
    
    title:"Computer Works",
    desc: "General computer services including typing, printing, scanning, and online registrations done efficiently and accurately.",
    items: [],
    price: "",
  },
  
  
];
 

function naira(amount) {
  return `₦${amount.toLocaleString("en-NG")}`;
}



// Full-width hero image with a dark green gradient overlay so text stays readable.
// Swap the `src` values below for your own brand photography when ready.
function PageHero({ src, alt, height = "42vh", minHeight = 260 }) {
  return (
    <div
      className="vd-fade relative w-full overflow-hidden"
      style={{ height, minHeight }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="eager"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${GREEN_DARK}99 0%, ${GREEN_DARK}55 45%, ${CREAM} 100%)`,
        }}
      />
    </div>
  );
}

function VineGraphic() {
  return (
    <svg
      viewBox="0 0 320 420"
      className="vd-vine w-full h-auto"
      role="img"
      aria-label="Illustration of a growing vine"
    >
      <path
        d="M40 400 C 40 320, 120 320, 110 260 C 100 200, 20 200, 30 140 C 40 80, 140 90, 150 30"
        fill="none"
        stroke={GREEN}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M110 260 C 150 250, 180 230, 170 200"
        fill="none"
        stroke={GOLD}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M30 140 C -10 130, -20 100, 10 80"
        fill="none"
        stroke={GOLD}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle className="vd-leaf" cx="150" cy="30" r="7" fill={GOLD} />
      <circle className="vd-leaf" cx="170" cy="200" r="5" fill={GOLD} />
      <circle className="vd-leaf" cx="10" cy="80" r="5" fill={GOLD} />
      <circle cx="40" cy="400" r="6" fill={GREEN} />
    </svg>
  );
}

function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const links = ["Home", "Services", "About", "Contact"];
  return (
    <header className="vd-bg-cream sticky top-0 z-20 border-b vd-border-green/10" style={{ borderBottomWidth: 1, borderBottomColor: "#00751822" }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => { setPage("Home"); setOpen(false); }}
          className="vd-display vd-text-green-dark text-xl font-semibold tracking-tight"
        >
         Meganet
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => setPage(l)}
              className="vd-navlink text-sm font-medium tracking-wide uppercase pb-1 border-b-2"
              style={{
                color: page === l ? GREEN_DARK : "#4b5c47",
                borderColor: page === l ? GOLD : "transparent",
              }}
            >
              {l}
            </button>
          ))}
        </nav>

        <button
          onClick={() => setPage("Contact")}
          className="hidden md:inline-block vd-btn-primary text-sm font-semibold px-5 py-2 rounded-full"
        >
          send a mail
        </button>

        <button
          className="md:hidden vd-text-green-dark"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transition: "transform .3s ease", transform: open ? "rotate(90deg)" : "rotate(0deg)" }}>
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 vd-menu-open">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => { setPage(l); setOpen(false); }}
              className="text-left text-sm font-semibold uppercase tracking-wide py-1"
              style={{ color: page === l ? GREEN_DARK : "#4b5c47" }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}


 function NYSCModal({ service, onClose }) {
//   const paystackReady = usePaystackScript();
  
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "kk",
    email: "k@gmail.com",
    phone: "8",
    nin: "9",
    state: "g",
    lgo: "h",
    dob: "u",
    address: "d",
    bloodgroup: "t",
    genotype: "i",
    registration: "g",
    matric: "0",
    place: "t",
    language: "y",
    kinRelationship:"9",
    kinName:"h",
    kinEmail:"6",
    kinPhone:"i",
    shirt:"9",
    trouser:"8",
    shoe:"0",
    stateBefore:"edo",
    prifrom:"8",
    prito:"9",
    secfrom:"q",
    secto:"2",
    tetfrom:"7",
    tetto:"9",
    level:"6",
    file:"",
    file2:""

  });

  const [status, setStatus] = useState("form"); // form | paying | paid
  const [reference, setReference] = useState("");
 
  if (!service) return null;
 
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });
 
  const step0Valid = form.name.trim() 
   && /\S+@\S+\.\S+/.test(form.email) 
   && form.phone.trim()
   && form.address && form.lgo && form.nin
   && form.matric && form.genotype && form.language 
   && form.bloodgroup && form.dob &&  form.place &&  form.state ;
  const step1Valid = form.kinEmail && form.kinName
   && form.kinRelationship && form.kinPhone  && form.level && form.prifrom 
   && form.prito && form.secfrom && form.secto && form.tetfrom && form.tetto ;
  const step2Valid = form.file && form.file2;
  const stepValid = [step0Valid, step1Valid, step2Valid][step];
  console.log("stepValid:",step1Valid)
 
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
              Consultation fee: <span className="font-semibold vd-text-green-dark">{naira(service.price)}</span>
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
                  <input value={form.email} onChange={update("email")} placeholder="you@example.com" className={inputClass} style={selectStyle} />
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
                  <input value={form.dob} onChange={update("dob")} placeholder=" " className={inputClass} style={selectStyle} />
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
                  <input value={form.shirt} onChange={update("shirt")} placeholder="Your full name" className={inputClass} style={selectStyle} />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-1.5">Size of Trouser</label>
                  <input value={form.trouser} onChange={update("trouser")} placeholder="you@example.com" className={inputClass} style={selectStyle} />
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


function Footer({ setPage }) {
  return (
    <footer className="vd-bg-green-dark vd-text-cream">
      <div className="max-w-6xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <p className="vd-display text-xl font-semibold mb-3">
            Meganet Integrated Works <span className="vd-text-gold">&</span> Services.
          </p>
          <p className="text-sm opacity-80 leading-relaxed max-w-xs">
           Delivering premium online services with speed, accuracy, and reliability you can trust.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest vd-text-gold mb-3">Explore</p>
          <ul className="space-y-2 text-sm opacity-90">
            {["Home", "Services", "About", "Contact"].map((l) => (
              <li key={l}>
                <button onClick={() => setPage(l)} className="vd-link-underline hover:vd-text-gold hover:opacity-100 opacity-90">
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest vd-text-gold mb-3">Reach us</p>
          <ul className="space-y-2 text-sm opacity-90">
            <li> Mega-Net Computers,</li>
            <li>Along Poultry Road,</li>
            <li>Adjacent to Nicson,</li>
            <li>Ujemen,AAU,Ekpoma</li>
            <li>Edo State,Nigeria</li>




          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="max-w-6xl mx-auto px-6 py-5 text-xs opacity-60">
          © 2026. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Stat({ number, label, suffix = "", prefix = "" }) {
  return (
    <div className="text-center md:text-left">
      <p className="vd-display text-4xl font-semibold vd-text-white">
        <CountUp to={number} suffix={suffix} prefix={prefix} />
      </p>
      <p className="text-xs uppercase tracking-widest mt-1 opacity-70">{label}</p>
    </div>
  );
}

function HomePage({ setPage, openBooking }) {
  return (
    <div className="vd-fade">
      <PageHero src="https://www.nairaland.com/attachments/8298792_img20181130wa0024_jpegfcb0806aefb31292076f356d42f7f61a" alt="Green farmland under an open sky" height="52vh" minHeight={320} />
      <section className="vd-texture" style={{ marginTop: "-3rem" }}>
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="vd-hero-eyebrow text-xs uppercase tracking-[0.2em] vd-text-green font-semibold mb-4">
              Mega Services
            </p>
            <h1 className="vd-hero-title vd-display text-4xl md:text-5xl font-semibold leading-tight vd-text-green-dark">
              Welcome to Mega Integrated Works and Services
            </h1>
            <p className="vd-hero-body mt-6 text-base leading-relaxed max-w-md opacity-80">
             MEGA INTEGRATED WORKS AND SERVICES is a one-stop digital and administrative solutions hub, delivering fast, reliable, and professional support in NIN services, JAMB processing, NYSC Registration, NERD Enrolment, CAC Business and Company registration, Academic Project and Seminar writing, Processing of Visa Documents, online registration services, school payment services, and general computer services.
            </p>
            <div className="vd-hero-cta mt-8 flex flex-wrap gap-4">
              <button onClick={() => setPage("Services")} className="vd-btn-primary px-6 py-3 rounded-full text-sm font-semibold">
                See our services
              </button>
              <button onClick={() => setPage("Contact")} className="vd-btn-outline px-6 py-3 rounded-full text-sm font-semibold">
                Talk to us
              </button>
            </div>
          </div>
          <div className="max-w-xs mx-auto">
            <img src={logo} style={{
              borderRadius:"30px",
              boxShadow:"2px 4px rgba(0,0,0,0,3)"
            }}/>
          </div>
        </div>
      </section>

      <section className="vd-bg-green-dark">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 vd-text-cream">
          <Stat number={120} label="Registrations" suffix="+" />
          <Stat number={36} label="States covered including FCT across 7 countries." />
          <Stat number={9} label="Years in service" suffix="+" />
          <Stat number={40} label="CAC Registrations" suffix="+" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <Reveal>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest vd-text-gold font-semibold mb-2">What we do</p>
              <h2 className="vd-display text-3xl font-semibold vd-text-green-dark">Services</h2>
            </div>
            <button onClick={() => setPage("Services")} className="vd-link-underline text-sm font-semibold vd-text-green">
              View all services
            </button>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.slice(0, 4).map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <div
                onClick={() => openBooking(s)}
                className="vd-card p-6 rounded-2xl bg-white/60 border vd-border-green/10 h-full"
                style={{ borderWidth: 1, borderColor: "#00751822" }}
              >
                <div className="vd-dot w-10 h-10 rounded-full vd-bg-gold mb-4" />
                <p className="font-semibold vd-text-green-dark mb-2">{s.title}</p>
                <p className="text-sm opacity-75 leading-relaxed mb-3">{s.desc}</p>
                <p className="text-xs font-semibold vd-text-green">Book — {naira(s.price)} →</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="vd-bg-green vd-text-cream">
        <Reveal>
          <div className="max-w-4xl mx-auto px-6 py-20 text-center">
            <p className="vd-display text-2xl md:text-3xl leading-relaxed">
              "Delivering premium online services with speed, accuracy, and reliability you can trust."
            </p>
            <p className="mt-6 text-sm uppercase tracking-widest vd-text-gold">Meganet Integrated Works &amp; Services.</p>
          </div>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <Reveal>
          <h2 className="vd-display text-3xl font-semibold vd-text-green-dark mb-4">
            Want to register or Process Something ?
          </h2>
          <p className="opacity-75 max-w-lg mx-auto mb-8">
            Reach out to us now, we are your surest plug.
          </p>
          <button onClick={() => setPage("Contact")} className="vd-btn-primary px-8 py-3 rounded-full text-sm font-semibold">
            Start a conversation
          </button>
        </Reveal>
      </section>
    </div>
  );
}

function ServicesPage({ openBooking }) {
  return (
    <div className="vd-fade">
      <PageHero src="https://images.unsplash.com/photo-1675434303097-210c75b61d3f?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b2ZmaWNlJTIwd2l0aCUyMHBlb3BsZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D" alt="Rows of crops on a working farm" height="34vh" minHeight={220} />
      <section className="vd-texture" style={{ marginTop: "-3rem" }}>
        <div className="max-w-4xl mx-auto px-6 pt-10 pb-14 text-center">
          <p className="vd-hero-eyebrow text-xs uppercase tracking-[0.2em] vd-text-green font-semibold mb-4">Our services</p>
          <h1 className="vd-hero-title vd-display text-4xl font-semibold vd-text-green-dark leading-tight">          
                MEGA INTEGRATED WORKS AND SERVICES
          </h1>
          <p className="vd-hero-body mt-5 opacity-75 max-w-xl mx-auto">
           Delivering premium online services with speed, accuracy, and reliability you can trust.
          </p>
        </div>
      </section>

            <section className="max-w-5xl mx-auto px-6 pb-20 space-y-6">
        {SERVICES.map((s, i) => (
          <Reveal key={s.id} delay={i * 70}>
            <div
              onClick={() => openBooking(s)}
              className="vd-card rounded-2xl bg-white/60 overflow-hidden"
              style={{ border: "1px solid #00751822" }}
            >
              <div className="vd-card-img h-40 sm:h-48">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="grid md:grid-cols-[160px_1fr] gap-6 p-8">
                <div>
                  <p className="text-xs uppercase tracking-widest vd-text-gold font-semibold">{s.eyebrow}</p>
                  <p className="vd-display text-xl font-semibold vd-text-green-dark mt-2">{s.title}</p>
                  <p className="text-sm font-semibold vd-text-green mt-3">{naira(s.price)}</p>
                </div>
                <div>
                  <p className="opacity-80 leading-relaxed mb-4">{s.desc}</p>
                  <ul className="grid sm:grid-cols-3 gap-3 mb-4">
                    {s.items.map((it) => (
                      <li key={it} className="text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full vd-bg-green mt-1.5 shrink-0" />
                        <span className="opacity-80">{it}</span>
                      </li>
                    ))}
                  </ul>
                  <span
                    onClick={(e) => { e.stopPropagation(); openBooking(s); }}
                    className="vd-link-underline text-sm font-semibold vd-text-green inline-block"
                  >
                    Book this service →
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>



      <section className="max-w-5xl mx-auto px-6 pb-20 space-y-6">
        {SERVICE.map((s, i) => (
          <Reveal key={s.id} delay={i * 70}>
            <div
           
              className="vd-card rounded-2xl bg-white/60 overflow-hidden"
              style={{ border: "1px solid #00751822" }}
            >
              <div className="vd-card-img h-40 sm:h-48">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="grid md:grid-cols-[160px_1fr] gap-6 p-8">
                <div>
                  <p className="text-xs uppercase tracking-widest vd-text-gold font-semibold">{s.eyebrow}</p>
                  <p className="vd-display text-xl font-semibold vd-text-green-dark mt-2">{s.title}</p>
                  <p className="text-sm font-semibold vd-text-green mt-3">{naira(s.price)}</p>
                </div>
                <div>
                  <p className="opacity-80 leading-relaxed mb-4">{s.desc}</p>
                  <ul className="grid sm:grid-cols-3 gap-3 mb-4">
                    {s.items.map((it) => (
                      <li key={it} className="text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full vd-bg-green mt-1.5 shrink-0" />
                        <span className="opacity-80">{it}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="https://wa.me/+2348077810089">     
                  <span
                    
                    className="vd-link-underline text-sm font-semibold vd-text-green inline-block"
                  >
                    Contact Us →
                  </span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>


    </div>
  );
}

function AboutPage() {
  const values = [
    { t: "Ground truth first", d: "We visit before we advise. Spreadsheets don't replace soil under your boots." },
    { t: "Plain language", d: "Contracts, reports and plans you can explain to your own team without a translator." },
    { t: "Built to last", d: "We measure success in seasons survived, not slides presented." },
  ];

  const team = [
    { initials: "AO", name: "Amara Okafor", role: "Founder & Lead Strategist" },
    { initials: "TB", name: "Tunde Balogun", role: "Head of Environmental Compliance" },
    { initials: "FI", name: "Funke Ibrahim", role: "Community Partnerships Lead" },
  ];

  return (
    <div className="vd-fade">
      <PageHero src="https://picsum.photos/seed/verdant-about/1600/900" alt="Farmers walking through a field" height="34vh" minHeight={220} />
      <section className="vd-texture" style={{ marginTop: "-3rem" }}>
        <div className="max-w-4xl mx-auto px-6 pt-10 pb-14 text-center">
          <p className="vd-hero-eyebrow text-xs uppercase tracking-[0.2em] vd-text-green font-semibold mb-4"> Mission</p>
          <h1 className="vd-hero-title vd-display text-4xl font-semibold vd-text-green-dark leading-tight">
            Our Mission Statement
          </h1>
          <p className="vd-hero-body mt-5 opacity-75 max-w-2xl mx-auto leading-relaxed">
To provide unmatched support in digital and administrative services while ensuring client satisfaction across multiple sectors.
          </p>
        </div>
      </section>

            <section className="vd-texture" style={{ marginTop: "-3rem" }}>
        <div className="max-w-4xl mx-auto px-6 pt-10 pb-14 text-center">
          <p className="vd-hero-eyebrow text-xs uppercase tracking-[0.2em] vd-text-green font-semibold mb-4"> Vision</p>
          <h1 className="vd-hero-title vd-display text-4xl font-semibold vd-text-green-dark leading-tight">
            Our Vision Statement
          </h1>
          <p className="vd-hero-body mt-5 opacity-75 max-w-2xl mx-auto leading-relaxed">
            To become the leading provider of integrated online services in the regions known for our innovation and reliability.
           </p> 
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        {values.map((v, i) => (
          <Reveal key={v.t} delay={i * 90}>
            <div className="vd-card p-6 rounded-2xl bg-white/60 h-full" style={{ border: "1px solid #00751822", cursor: "default" }}>
              <div className="w-8 h-1.5 rounded-full vd-bg-gold mb-4" />
              <p className="font-semibold vd-text-green-dark mb-2">{v.t}</p>
              <p className="text-sm opacity-75 leading-relaxed">{v.d}</p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="vd-bg-green-dark vd-text-cream">
      
      </section>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <div className="vd-fade">
      <PageHero src="https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwbGFwdG9wfGVufDB8fDB8fHww" alt="Lagos skyline at golden hour" height="34vh" minHeight={220} />
      <section className="vd-texture" style={{ marginTop: "-3rem" }}>
        <div className="max-w-4xl mx-auto px-6 pt-10 pb-10 text-center">
          <p className="vd-hero-eyebrow text-xs uppercase tracking-[0.2em] vd-text-green font-semibold mb-4">Contact</p>
        
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20 grid md:grid-cols-5 gap-10">
        <Reveal className="md:col-span-3">
          <div className="p-8 rounded-2xl bg-white/60" style={{ border: "1px solid #00751822" }}>
            {sent ? (
              <div className="py-10 text-center vd-fade">
                <div className="w-12 h-12 rounded-full vd-bg-gold mx-auto mb-4 flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN_DARK} strokeWidth="2.5">
                    <polyline className="vd-check" points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="vd-display text-xl font-semibold vd-text-green-dark mb-2">Message sent</p>
                <p className="opacity-75 text-sm">Thanks, {form.name.split(" ")[0]}. We'll be in touch soon.</p>
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-2">Name</label>
                  <input
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your full name"
                    className="vd-input w-full px-4 py-3 rounded-lg bg-white outline-none text-sm"
                    style={{ border: "1px solid #00751833" }}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-2">Email</label>
                  <input
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    className="vd-input w-full px-4 py-3 rounded-lg bg-white outline-none text-sm"
                    style={{ border: "1px solid #00751833" }}
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest opacity-60 block mb-2">Message</label>
                  <textarea
                    value={form.message}
                    onChange={update("message")}
                    placeholder="What are you working on?"
                    rows={5}
                    className="vd-input w-full px-4 py-3 rounded-lg bg-white outline-none text-sm resize-none"
                    style={{ border: "1px solid #00751833" }}
                  />
                </div>
                <button onClick={submit} className="vd-btn-primary px-6 py-3 rounded-full text-sm font-semibold">
                  Send message
                </button>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal className="md:col-span-2" delay={120}>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl vd-bg-green-dark vd-text-cream">
              <p className="text-xs uppercase tracking-widest vd-text-gold mb-4">Reach us directly</p>
              <p className="text-sm mb-2">Mega-Net Computers, Along Poultry Road, Adjacent to Nicson, Ujemen,AAU,Ekpoma,Edo State.</p>
              <p className="text-sm mb-2">contact@meganet.com.ng</p>
              <p className="text-sm">+2348077810089</p>
            </div>
            <div className="rounded-2xl overflow-hidden h-44 flex items-center justify-center" style={{ border: "1px solid #00751822", backgroundColor: "#eef3e6" }}>       
              <MapComponent/>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("Home");
  const [bookingService, setBookingService] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress =
        (window.scrollY / totalHeight) * 100;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className="vd-root min-h-screen">
      <style>{tokens}</style>
            <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%`, }}
      />

      <Nav page={page} setPage={setPage} />
      {page === "Home" && <HomePage setPage={setPage} openBooking={setBookingService} />}
      {page === "Services" && <ServicesPage openBooking={setBookingService} />}
      {page === "About" && <AboutPage />}
      {page === "Contact" && <ContactPage />}
      <Footer setPage={setPage} />
      {bookingService && (
        <NYSCModal service={bookingService} onClose={() => setBookingService(null)} />
      )}

       <div style={{
        position:"fixed",
        bottom:"70px",
        background:" #37CA2A",
        width:"55px",
        height:"55px",
        borderRadius:"50%",
        right:"20px",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        zIndex:1000
       

      }}>

         <div
        style={{
          width:"45px",
        height:"45px",
        borderRadius:"50%",
        borderWidth:"2px",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
        }}
        >
        <a href="https://wa.me/+2348077810089">     
        <FaWhatsapp color='white' size={25} />
      </a>
        </div>
      </div>



    </div>
  );
}
