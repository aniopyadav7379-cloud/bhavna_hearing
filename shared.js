/* ================================================================
   BHAVANA HEARING & VERTIGO CLINIC — shared.js
   ⚡ GOOGLE SHEETS CONNECTED VERSION
   ================================================================

   SETUP: Paste your Google Apps Script Web App URL below ↓
================================================================ */

// ── STEP 1: PASTE YOUR WEB APP URL HERE ──────────────────────────
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwZSYLAH8XCGtjbmrEKl-p402uf12XE2WPXrKnch5Vx1OGGLDb9VsEQH08mY9XKF0Ll/exec";
// ─────────────────────────────────────────────────────────────────

/* ── HELPERS ── */
const $ = id => document.getElementById(id);
const $$ = s => document.querySelectorAll(s);
const inr = n => "₹" + Number(n).toLocaleString("en-IN");
const ini = name => {
  const w = name.replace(/^(Dr\.|Shri|Mr\.|Ms\.)\s*/i,"").split(" ").filter(x=>x.length>1);
  return w.slice(0,2).map(x=>x[0].toUpperCase()).join("");
};

/* ================================================================
   GOOGLE SHEETS — SUBMIT FUNCTIONS
   Called by appointment.html and shop.html
================================================================ */

// ── Send appointment form data to Google Sheet ──
async function submitAppointment(formData) {
  const payload = {
    type:      "appointment",
    name:      formData.name      || "",
    phone:     formData.phone     || "",
    email:     formData.email     || "",
    age:       formData.age       || "",
    service:   formData.service   || "",
    branch:    formData.branch    || "",
    date:      formData.date      || "",
    apptType:  formData.apptType  || "Clinic Visit",
    notes:     formData.notes     || ""
  };

  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode:   "no-cors",            // Required for Apps Script
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return true;
  } catch (err) {
    console.warn("Sheet save failed (non-critical):", err);
    return false; // Don't block user — show success anyway
  }
}

// ── Send cart/enquiry data to Google Sheet ──
async function submitEnquiry(cartItems) {
  if (!cartItems || cartItems.length === 0) return false;

  const payload = {
    type:  "enquiry",
    items: cartItems.map(i => ({
      name:  i.name  || "",
      brand: i.brand || "",
      cat:   i.cat   || "",
      p:     i.p     || 0,
      emi:   i.emi   || "",
      qty:   i.qty   || 1
    }))
  };

  try {
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode:   "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return true;
  } catch (err) {
    console.warn("Enquiry save failed (non-critical):", err);
    return false;
  }
}

/* ================================================================
   CLINIC DATA
================================================================ */
window.BHAVANA = {

team: [
  { id:1, name:"Dr. Amit Maurya", role:"Founder & Chief Audiologist",
    qual:"M.Sc. Audiology & Speech-Language Pathology | 14+ Years Experience",
    branch:"Trimulgherry Main Branch", photo:"assets/team/amit-maurya.png", photoFallback:"AM",
    specialties:["Hearing Aid Fitting & Programming","Cochlear Implant Support","Adult & Paediatric Audiology","Tinnitus Management"],
    bio:"With over 14 years of experience, Dr. Amit Maurya founded Bhavana Hearing & Vertigo Clinic with a mission to bring transparent, world-class hearing healthcare to Hyderabad.",
    quote:"\"I treat every patient the way I would want my own family to be treated — with honesty, care and no hidden costs.\"",
    available:"Mon–Sat: 10am–7pm", lang:["Telugu","Hindi","English"]
  },
  { id:2, name:"Akhila Ma'am", role:"Co-Founder & Senior Audiologist",
    qual:"M.Sc. Audiology & Speech-Language Pathology | 10+ Years Experience",
    branch:"Trimulgherry Main Branch", photo:"assets/team/akhila-co.png", photoFallback:"AK",
    specialties:["Paediatric Audiology","BERA / ABR / ASSR Testing","OAE Newborn Screening","Auditory Verbal Therapy"],
    bio:"Akhila Ma'am co-leads Bhavana Hearing Clinic, specialising in paediatric audiology and newborn hearing screening programmes.",
    quote:"\"Every child deserves to hear clearly. Early detection changes everything.\"",
    available:"Mon–Sat: 10am–6pm", lang:["Telugu","Hindi","English"]
  },
  { id:3, name:"Dr. Venkat Sir", role:"Partner & Vestibular Specialist",
    qual:"M.Sc. Audiology | Vestibular Rehabilitation Certified | 7 Years",
    branch:"Trimulgherry Main Branch", photo:"assets/team/venkat-partner.png", photoFallback:"VS",
    specialties:["VNG Testing","BPPV Diagnosis & Epley Manoeuvre","Vestibular Rehabilitation (VRT)","Ménière's Disease"],
    bio:"Dr. Venkat Sir is Bhavana's partner and leading vestibular specialist, with expertise in diagnosing and treating dizziness, BPPV and balance disorders.",
    quote:"\"Most BPPV patients leave the clinic without dizziness after a single session.\"",
    available:"Tue–Sat: 10am–6pm", lang:["Telugu","Kannada","English"]
  },
  { id:4, name:"Dr. Shivani Arora", role:"Speech-Language Therapist",
    qual:"M.Sc. Speech-Language Pathology | 6 Years",
    branch:"Trimulgherry & RTC X Road", photo:"assets/team/shivani-arora.webp", photoFallback:"SA",
    specialties:["Auditory Verbal Therapy (AVT)","Language Delay & Disorders","Stuttering / Fluency Therapy","Voice Rehabilitation"],
    bio:"Dr. Shivani Arora has helped hundreds of children with hearing loss develop spoken language skills through dedicated speech therapy.",
    quote:"\"With the right therapy at the right time, every child can find their voice.\"",
    available:"Mon–Sat: 10am–6pm", lang:["Telugu","Hindi","English"]
  },
  { id:5, name:"Dr. Raviteja", role:"Audiologist",
    qual:"M.Sc. Audiology | 5 Years",
    branch:"RTC X Road Branch", photo:"assets/team/dr-ravitega.png", photoFallback:"RT",
    specialties:["Hearing Assessment","Hearing Aid Fitting","Tinnitus Assessment","Real-Ear Measurement"],
    bio:"Dr. Raviteja is known for meticulous attention to detail in hearing assessment and hearing aid programming.",
    quote:"\"A well-fitted hearing aid is life-changing. I take every fitting seriously.\"",
    available:"Mon–Sat: 10am–6:30pm", lang:["Telugu","Hindi","English"]
  },
  { id:6, name:"Dr. Ablish", role:"Senior Audiologist",
    qual:"M.Sc. Audiology | 6 Years",
    branch:"Kukatpally / KPHB Branch", photo:"assets/team/dr-ablish.png", photoFallback:"DA",
    specialties:["Hearing Assessment","Paediatric Screening","Hearing Aid Trials","Cochlear Implant Mapping"],
    bio:"Dr. Ablish provides comprehensive hearing care across Bhavana branches, specialising in adult and paediatric hearing assessments.",
    quote:"\"I believe in making hearing care simple, accessible, and affordable for everyone.\"",
    available:"Mon–Sat: 10am–6:30pm", lang:["Telugu","Hindi","English"]
  },
],

branches: {
  "Hyderabad": {
    tagline: "Flagship clinic · Serving Hyderabad & Secunderabad since 2010",
    list: [
      { name:"Trimulgherry (Main Branch)", main:true,
        addr:"Shop No. 3, Shiva Shakti Complex, Trimulgherry X Road, Dinakar Nagar Colony, Secunderabad – 500015",
        phone:"081974 28456", hours:"Mon–Sat: 10:00 AM – 7:00 PM | Sun: By Appointment",
        email:"bhavanahearing@gmail.com",
        map:"https://maps.google.com/?q=Bhavana+Hearing+Vertigo+Clinic+Trimulgherry+Secunderabad",
        wa:"https://wa.me/918197428456", docIds:[1,2,3,4]
      },
      { name:"RTC X Road Branch", main:false,
        addr:"Shop No. 17, Dattasai Commercial Complex, RTC X Road, Hyderabad, Telangana",
        phone:"081974 28456", hours:"Mon–Sat: 10:00 AM – 6:30 PM",
        email:"bhavanahearing@gmail.com",
        map:"https://maps.google.com/?q=Dattasai+Commercial+Complex+RTC+X+Road+Hyderabad",
        wa:"https://wa.me/918197428456", docIds:[4,5]
      }
    ]
  },
  "Kukatpally": {
    tagline: "Serving KPHB, Kukatpally & surrounding areas",
    list: [
      { name:"Kukatpally / KPHB Branch", main:false,
        addr:"KPHB Colony, Phase 1, Kukatpally, Hyderabad, Telangana – 500072",
        phone:"081974 28456", hours:"Mon–Sat: 10:00 AM – 6:30 PM",
        email:"bhavanahearing@gmail.com",
        map:"https://maps.google.com/?q=KPHB+Colony+Kukatpally+Hyderabad",
        wa:"https://wa.me/918197428456", docIds:[6]
      }
    ]
  },
  "Mumbai": {
    tagline: "Now serving patients in Mumbai & Maharashtra",
    list: [
      { name:"Ghatkopar East, Mumbai", main:true,
        addr:"203, Sai Infotech Building, Patel Chowk, Near Station, Ghatkopar East, Mumbai – 400077",
        phone:"081974 28456", hours:"Mon–Sat: 10:00 AM – 6:00 PM",
        email:"bhavanahearing@gmail.com",
        map:"https://maps.google.com/?q=Sai+Infotech+Patel+Chowk+Ghatkopar+East+Mumbai",
        wa:"https://wa.me/918197428456", docIds:[7]
      }
    ]
  }
},

products: [
  {id:1,name:"Phonak Naída Paradise P90",cat:"bte",e:"🔊",brand:"Phonak",p:72000,op:85000,d:"Super-power BTE. IP68 waterproof, rechargeable, Bluetooth. For severe-profound loss.",feat:["Rechargeable Li-ion","Bluetooth Streaming","IP68 Waterproof","AutoSense OS 4.0"],emi:"₹2,400/mo"},
  {id:2,name:"Signia Motion Charge&Go X",cat:"bte",e:"🔊",brand:"Signia",p:48000,op:58000,d:"Rechargeable BTE with Own Voice Processing & direct Bluetooth streaming.",feat:["Own Voice Processing","Direct Streaming","Rechargeable","Tinnitus Therapy"],emi:"₹1,600/mo"},
  {id:3,name:"Unitron Moxi Move R BTE",cat:"bte",e:"🔊",brand:"Unitron",p:35000,op:42000,d:"Rechargeable BTE with SoundNav automatic environment classification.",feat:["Rechargeable","SoundNav Auto","Bluetooth","Moderate Loss"],emi:"₹1,167/mo"},
  {id:4,name:"Phonak Audéo Paradise P90",cat:"ric",e:"👂",brand:"Phonak",p:85000,op:99000,d:"Premium RIC with Speech Enhancer, AutoSense OS 4.0 and Bluetooth.",feat:["Speech Enhancer","AutoSense OS 4.0","Motion Sensor","Bluetooth"],emi:"₹2,833/mo"},
  {id:5,name:"Signia Pure Charge&Go AX",cat:"ric",e:"🦻",brand:"Signia",p:75000,op:89000,d:"Augmented Xperience — split processing separates speech from background.",feat:["Augmented Xperience","Split Processing","Own Voice","Rechargeable"],emi:"₹2,500/mo"},
  {id:6,name:"Oticon More 1 miniRITE",cat:"ric",e:"👂",brand:"Oticon",p:80000,op:92000,d:"Deep Neural Network trained on 12M real-life sounds for natural hearing.",feat:["Deep Neural Network","BrainHearing","360° Sound","Polaris Platform"],emi:"₹2,667/mo"},
  {id:7,name:"Widex MOMENT Sheer sRIC",cat:"ric",e:"🦻",brand:"Widex",p:68000,op:82000,d:"ZeroDelay 0.5ms — most natural, instantly processed sound available.",feat:["ZeroDelay 0.5ms","SoundSense AI","Rechargeable","Wind Protection"],emi:"₹2,267/mo"},
  {id:8,name:"ReSound ONE RIE",cat:"ric",e:"👂",brand:"ReSound",p:58000,op:70000,d:"All-Access Directionality with M&RIE receiver-in-ear microphone.",feat:["M&RIE 3-Mic","All-Access Dir.","Rechargeable","Made for iPhone"],emi:"₹1,933/mo"},
  {id:9,name:"Phonak Virto M90 Titanium",cat:"ite",e:"👂",brand:"Phonak",p:90000,op:108000,d:"Custom titanium CIC — virtually invisible in the ear canal.",feat:["Titanium Shell","Custom CIC","AutoSense OS 3.0","Invisible"],emi:"₹3,000/mo"},
  {id:10,name:"Widex MOMENT CIC Custom",cat:"ite",e:"👂",brand:"Widex",p:65000,op:78000,d:"Custom CIC with ZeroDelay processing for natural, crisp sound.",feat:["Custom CIC","ZeroDelay","Natural Sound","Discreet"],emi:"₹2,167/mo"},
  {id:11,name:"Signia Insio C&G AX ITE",cat:"ite",e:"👂",brand:"Signia",p:70000,op:84000,d:"Rechargeable custom ITE with Augmented Xperience processing.",feat:["Rechargeable","AX Processing","Own Voice","ITE Shell"],emi:"₹2,333/mo"},
  {id:12,name:"Hearing Aid Cleaning Kit",cat:"acc",e:"🧰",brand:"Bhavana Care",p:350,op:null,d:"Professional 6-piece kit: brush, wax loop, vent cleaner, cloth, multi-tool.",feat:[]},
  {id:13,name:"Wax Guard Replacement (10×)",cat:"acc",e:"🛡️",brand:"Bhavana Care",p:180,op:null,d:"Universal guards for most RIC, CIC and ITE hearing aids.",feat:[]},
  {id:14,name:"UV Electric Dehumidifier",cat:"acc",e:"📦",brand:"Dry-Aid",p:650,op:850,d:"UV + heat overnight dryer. Extends hearing aid life, prevents moisture damage.",feat:[]},
  {id:15,name:"Clip-On Bluetooth Remote Mic",cat:"acc",e:"🎙️",brand:"ClearVoice",p:3500,op:4200,d:"Streams speaker's voice directly to hearing aids in any noise.",feat:[]},
  {id:16,name:"Ear Dome Replacement Set",cat:"acc",e:"🎧",brand:"Bhavana Care",p:120,op:null,d:"Soft silicone domes in S/M/L/XL/2XL for RIC and RITE hearing aids.",feat:[]},
  {id:17,name:"Size 312 Batteries (60-pack)",cat:"bat",e:"🔋",brand:"PowerOne",p:280,op:null,d:"German premium zinc-air 60-pack. 10–12 day life. Best for RIC/CIC.",feat:[]},
  {id:18,name:"Size 13 Batteries (60-pack)",cat:"bat",e:"🔋",brand:"Rayovac",p:290,op:null,d:"Long-life size 13 zinc-air 60-pack for high-power BTE aids.",feat:[]},
  {id:19,name:"Universal Charging Case",cat:"bat",e:"⚡",brand:"SmartCharge",p:1200,op:1500,d:"USB-C charging case compatible with Phonak, Signia, Oticon.",feat:[]},
],

testimonials: [
  {name:"Suresh Babu",loc:"Trimulgherry, Hyderabad",s:5,t:"Mr. Venkat was very patient. He explained the current situation and proposed options accordingly. My father is feeling better now with his hearing."},
  {name:"Priya S.",loc:"Secunderabad",s:5,t:"The employees are compassionate and helpful. There are no hidden costs and all transactions are transparent. The home service feature is amazing!"},
  {name:"Ravi Kumar",loc:"LB Nagar, Hyderabad",s:5,t:"From past 10 years, I'm using hearing aids suggested by Shri Venkatram Reddy. His suggestions are very helpful. I can hear properly now."},
  {name:"Lakshmi Devi",loc:"Secunderabad",s:5,t:"I consulted Bhavana for sudden hearing loss in my family. He explained so clearly and gave proper counselling. It is getting better now!"},
  {name:"Anand Rao",loc:"Warangal",s:5,t:"Bhavana Hearing Care gave a very good feeling. Polite, explained very clearly, very reliable and genuine. I wholeheartedly believe in their service."},
  {name:"Meena P.",loc:"Ghatkopar, Mumbai",s:5,t:"The home service is brilliant! They came for testing, trial and delivery at petrol cost only. No other clinic in Mumbai provides this service."},
],

blog: [
  {id:1,title:"Why Hyderabad Residents Are at Higher Risk of Hearing Loss",cat:"Awareness",date:"Mar 10, 2025",e:"🏙️",bg:"#fdebd0",excerpt:"Constant traffic noise and loudspeakers put Hyderabad residents at unique risk. Here's how to protect your hearing.",content:"Hyderabad is one of India's fastest-growing cities. Traffic at peak hours can reach 85–90 decibels in areas like Ameerpet and Kukatpally, exceeding the safe daily exposure limit. Prolonged exposure causes gradual noise-induced hearing loss (NIHL), which is irreversible but completely preventable. Using earplugs at loud events, keeping earphone volumes below 60%, and getting annual hearing checks are the most important protective steps."},
  {id:2,title:"BPPV — The Most Common Cause of Sudden Vertigo",cat:"Vertigo",date:"Feb 22, 2025",e:"🌀",bg:"#ede9fe",excerpt:"Waking up dizzy? Room spinning when you roll over in bed? You likely have BPPV — curable in one clinic visit.",content:"BPPV (Benign Paroxysmal Positional Vertigo) accounts for over 50% of all vertigo cases. Despite being extremely common, it is frequently misdiagnosed as anxiety or blood pressure issues. The cause is displaced calcium crystals in the semicircular canals. The Epley Manoeuvre — four head movements over about 15 minutes — successfully resolves BPPV in 80–90% of patients in one session."},
  {id:3,title:"Speech Delay in Children: When to Worry and What to Do",cat:"Paediatric",date:"Feb 8, 2025",e:"👶",bg:"#fce7f3",excerpt:"Every parent waits for their child's first words. When speech takes longer, here's when to seek expert help.",content:"Most children say their first words between 12–15 months. When milestones are missed, always investigate whether the cause is hearing loss first — it's the most common cause of speech delay. A formal hearing test (OAE or BERA) should be the first step. Early intervention before age 3 dramatically improves outcomes."},
  {id:4,title:"Hearing Aid Myths Busted — What Indian Patients Must Know",cat:"Hearing Aids",date:"Jan 18, 2025",e:"❓",bg:"#e8f8f5",excerpt:"'Hearing aids make you look old.' 'They don't really work.' We bust the top myths stopping people from getting help.",content:"India has one of the largest populations of people with untreated hearing loss. Major reason: myths. Myth 1: Only old people need them. False. Myth 2: Too expensive. False — aids start from ₹15,000 with EMI. Myth 3: They make everything too loud. False — modern digital aids are programmed precisely to your audiogram. Myth 4: My hearing isn't bad enough yet. Waiting makes rehabilitation harder."},
  {id:5,title:"Tinnitus: That Ringing in Your Ears Is Treatable",cat:"Tinnitus",date:"Jan 3, 2025",e:"🔔",bg:"#e8f4ff",excerpt:"Millions of Indians live with constant ringing in their ears. Here's what works — and what doesn't — for relief.",content:"Tinnitus affects an estimated 1 in 10 adults in India. Tinnitus Retraining Therapy (TRT) combines sound therapy and counselling to retrain the brain's response, achieving significant relief in 70–80% of patients. Hearing aids with built-in maskers and Cognitive Behavioural Therapy are other evidence-based approaches available at Bhavana."},
  {id:6,title:"VRT Exercises That Help Cure Vertigo at Home",cat:"Vertigo",date:"Dec 20, 2024",e:"🧘",bg:"#f0fdf4",excerpt:"Vestibular Rehabilitation Therapy is the safest, most effective long-term treatment for vestibular conditions.",content:"VRT is a specialised exercise programme designed to retrain the brain after inner ear dysfunction. Unlike medications (which only suppress symptoms), VRT promotes real neurological recovery. Key exercises: (1) Gaze stabilisation — focus on a target while moving your head. (2) Habituation — deliberately trigger mild dizziness to desensitise the brain. Most patients notice significant improvement within 4–8 weeks."},
],

};

/* ================================================================
   NAV, FOOTER & CART HTML
================================================================ */
const LOGO_SVG = `<svg viewBox="0 0 44 44" fill="none"><circle cx="22" cy="22" r="20" fill="#e8622a"/><path d="M22 10c-6.63 0-12 5.37-12 12 0 3.31 1.34 6.31 3.52 8.48l2.83-2.83A7.96 7.96 0 0114 22c0-4.42 3.58-8 8-8s8 3.58 8 8a7.96 7.96 0 01-2.35 5.65l2.83 2.83C32.66 28.31 34 25.31 34 22c0-6.63-5.37-12-12-12z" fill="white"/><circle cx="22" cy="22" r="3.5" fill="white"/></svg>`;
const WA_SVG  = `<svg viewBox="0 0 24 24" fill="white" width="28" height="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.122 1.528 5.855L0 24l6.335-1.502A11.957 11.957 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.944 0-3.761-.524-5.322-1.437l-.381-.226-3.961.938.999-3.849-.249-.396A9.806 9.806 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z"/></svg>`;

window.navHTML = `
<nav id="navbar">
  <div class="ntop"><div class="ntop-inner">
    <span>📍 Trimulgherry, Secunderabad · Hyderabad</span>
    <div><a href="tel:08197428456">📞 081974 28456</a><a href="https://wa.me/918197428456" class="wa-lnk">💬 WhatsApp</a></div>
  </div></div>
  <div class="nmain"><div class="nmain-inner">
    <a href="index.html" class="logo">${LOGO_SVG}<div class="logo-txt"><strong>Bhavana</strong><span>Hearing &amp; Vertigo Clinic</span></div></a>
    <button class="hbg" id="hbg" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>
    <ul class="nav-links" id="navLinks">
      <li><a href="index.html">Home</a></li>
      <li><a href="services.html">Services</a></li>
      <li><a href="shop.html">Hearing Aids</a></li>
      <li><a href="branches.html">Branches</a></li>
      <li><a href="about.html">About Us</a></li>
      <li><a href="blog.html">Blog</a></li>
      <li><a href="appointment.html" class="nav-cta">📅 Book Appointment</a></li>
    </ul>
  </div></div>
</nav>`;

window.footerHTML = `
<footer class="footer"><div class="wrap">
  <div class="fgrid">
    <div class="fbrand">
      <a href="index.html" class="logo" style="margin-bottom:.9rem;display:inline-flex">${LOGO_SVG}<div class="logo-txt"><strong>Bhavana</strong><span>Hearing &amp; Vertigo</span></div></a>
      <p>Hyderabad's trusted hearing &amp; vertigo clinic. Compassionate, transparent care since 2010.</p>
      <div class="fcon">
        <p>📞 <a href="tel:08197428456">081974 28456</a></p>
        <p>📍 Trimulgherry, Secunderabad, Hyderabad</p>
        <p>✉️ <a href="mailto:bhavanahearing@gmail.com">bhavanahearing@gmail.com</a></p>
      </div>
    </div>
    <div class="fcol"><h4>Hearing Services</h4><ul>
      <li><a href="services.html#hearing">Hearing Assessment</a></li>
      <li><a href="services.html#hearing">Hearing Aid Fitting</a></li>
      <li><a href="services.html#hearing">Paediatric Audiology</a></li>
      <li><a href="services.html#hearing">Tinnitus Management</a></li>
      <li><a href="services.html#hearing">Cochlear Implant</a></li>
    </ul></div>
    <div class="fcol"><h4>Vertigo Services</h4><ul>
      <li><a href="services.html#vertigo">BPPV Treatment</a></li>
      <li><a href="services.html#vertigo">Ménière's Disease</a></li>
      <li><a href="services.html#tests">VNG Testing</a></li>
      <li><a href="services.html#vertigo">VRT Therapy</a></li>
      <li><a href="services.html#tests">Diagnostic Tests</a></li>
      <li><a href="services.html#speech">Speech Therapy</a></li>
    </ul></div>
    <div class="fcol"><h4>Quick Links</h4><ul>
      <li><a href="about.html">About Bhavana</a></li>
      <li><a href="about.html#team">Meet Our Team</a></li>
      <li><a href="shop.html">Hearing Aids</a></li>
      <li><a href="branches.html">Branches</a></li>
      <li><a href="blog.html">Health Blog</a></li>
      <li><a href="appointment.html">Book Appointment</a></li>
    </ul></div>
  </div>
  <div class="fbot">
    <p>© 2025 Bhavana Hearing &amp; Vertigo Clinic, Hyderabad. All rights reserved.</p>
    <div class="flinks"><a href="#">Privacy Policy</a><a href="#">Terms</a></div>
  </div>
</div></footer>
<button id="btt" title="Back to top">↑</button>
<a href="https://wa.me/918197428456" class="waflt" aria-label="WhatsApp">${WA_SVG}</a>
<div class="toast-msg" id="toast"></div>`;

window.cartHTML = `
<button class="cartfab" id="cartFab">🛒 Enquiry <span class="c-badge" id="cBadge">0</span></button>
<div class="cmodal" id="cModal" hidden>
  <div class="cov" id="cOv"></div>
  <div class="cpanel">
    <div class="chdr"><h3>Enquiry List (<span id="cCount">0</span>)</h3><button class="cclose" id="cClose">✕</button></div>
    <div class="citems" id="cItems"></div>
    <div class="cftr">
      <div class="ctrow"><span>Estimated Total:</span><strong id="cTotal">₹0</strong></div>
      <button class="btn btn-or btn-full" id="cCheckout">Next: Fill Your Details →</button>
      <button class="btn btn-outline btn-full" id="cCont" style="margin-top:.5rem">Continue Browsing</button>
    </div>
  </div>
</div>
<div class="eqmodal" id="eqModal" hidden>
  <div class="eqov" id="eqOv"></div>
  <div class="eqpanel">
    <div class="eqhdr">
      <div><h3 style="font-family:var(--fh);font-size:1.22rem;margin:0">📋 Hearing Aid Enquiry</h3><p style="font-size:.76rem;color:var(--text-lt);margin:.18rem 0 0">We will call you back within 2 hours</p></div>
      <button class="eqclose" id="eqClose">✕</button>
    </div>
    <div id="eqSelSummary" style="background:var(--bg-alt);border-radius:8px;padding:.75rem 1rem;margin:.5rem 1.5rem;font-size:.79rem;color:var(--text-lt)"></div>
    <div id="eqFormWrap" style="padding:0 1.5rem 1.5rem">
      <div class="eq-fg"><label>Your Name <span style="color:var(--or)">*</span></label><input type="text" id="eq_name" placeholder="Full name"/><span class="eq-err" id="eq_name_e"></span></div>
      <div class="eq-fg"><label>Phone Number <span style="color:var(--or)">*</span></label><input type="tel" id="eq_phone" placeholder="+91 XXXXX XXXXX"/><span class="eq-err" id="eq_phone_e"></span></div>
      <div class="eq-fg"><label>Email (Optional)</label><input type="email" id="eq_email" placeholder="email@example.com"/></div>
      <div class="eq-fg"><label>Nearest Branch</label>
        <select id="eq_branch"><option value="">Select branch...</option>
          <option>Trimulgherry, Secunderabad (Main)</option><option>RTC X Road, Hyderabad</option>
          <option>Kukatpally / KPHB, Hyderabad</option><option>Ghatkopar East, Mumbai</option><option>Home Visit Request</option>
        </select></div>
      <div class="eq-fg"><label>Message (Optional)</label><textarea id="eq_notes" rows="2" placeholder="Any question about the product or your hearing..."></textarea></div>
      <button class="btn btn-or btn-full" id="eqSubmit">✅ Submit Enquiry — We'll Call You!</button>
    </div>
    <div id="eqSuccess" style="display:none;text-align:center;padding:2.5rem 1.5rem">
      <div style="font-size:3rem">🎉</div>
      <h4 style="font-family:var(--fh);font-size:1.4rem;margin:.5rem 0">Enquiry Received!</h4>
      <p style="font-size:.85rem;color:var(--text-lt)">Our audiologist will call you within 2 hours.<br><strong style="color:var(--text)">📞 081974 28456</strong></p>
    </div>
  </div>
</div>
<div class="eqmodal" id="quickModal" hidden>
  <div class="eqov" id="qOv"></div>
  <div class="eqpanel">
    <div class="eqhdr">
      <div><h3 id="qTitle" style="font-family:var(--fh);font-size:1.12rem;margin:0">📋 Product Enquiry</h3><p style="font-size:.76rem;color:var(--text-lt);margin:.18rem 0 0">We'll call you back within 2 hours</p></div>
      <button class="eqclose" id="qClose">✕</button>
    </div>
    <div id="qProdInfo" style="background:var(--bg-alt);border-radius:8px;padding:.75rem 1rem;margin:.5rem 1.5rem;font-size:.82rem;color:var(--text-lt)"></div>
    <div id="qFormWrap" style="padding:0 1.5rem 1.5rem">
      <div class="eq-fg"><label>Your Name <span style="color:var(--or)">*</span></label><input type="text" id="qq_name" placeholder="Full name"/></div>
      <div class="eq-fg"><label>Phone <span style="color:var(--or)">*</span></label><input type="tel" id="qq_phone" placeholder="+91 XXXXX XXXXX"/></div>
      <div class="eq-fg"><label>Nearest Branch</label>
        <select id="qq_branch"><option value="">Select branch...</option>
          <option>Trimulgherry, Secunderabad (Main)</option><option>RTC X Road, Hyderabad</option>
          <option>Kukatpally / KPHB, Hyderabad</option><option>Ghatkopar East, Mumbai</option><option>Home Visit Request</option>
        </select></div>
      <div class="eq-fg"><label>Message (Optional)</label><textarea id="qq_notes" rows="2" placeholder="Any question..."></textarea></div>
      <button class="btn btn-or btn-full" id="qSubmit">✅ Submit Enquiry</button>
    </div>
    <div id="qSuccess" style="display:none;text-align:center;padding:2.5rem 1.5rem">
      <div style="font-size:3rem">✅</div>
      <h4 style="font-family:var(--fh);font-size:1.3rem;margin:.5rem 0">Submitted!</h4>
      <p style="font-size:.85rem;color:var(--text-lt)">We'll call you within 2 hours.<br><strong style="color:var(--text)">📞 081974 28456</strong></p>
    </div>
  </div>
</div>`;

/* ================================================================
   PRELOADER
================================================================ */
window.PRELOADER = `<div id="preloader"><svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" stroke="#e8622a" stroke-width="2" class="pl-ring"/><path d="M32 12C20.95 12 12 20.95 12 32c0 6.04 2.7 11.46 6.97 15.17l3.1-3.52A10.98 10.98 0 0118 32c0-7.73 6.27-14 14-14s14 6.27 14 14c0 4.32-1.96 8.17-5.05 10.75l3.1 3.52C48.3 43.46 51 38.04 51 32c0-11.05-8.95-20-19-20z" fill="#e8622a"/><circle cx="32" cy="32" r="4.5" fill="#e8622a"/></svg><strong>Bhavana</strong><span>Hearing &amp; Vertigo Clinic</span></div>`;

/* ================================================================
   CORE FUNCTIONS
================================================================ */
window.addEventListener("load",()=>{ setTimeout(()=>{ const p=$("preloader"); if(p) p.classList.add("hide"); }, 1400); });

function initNav(activePage){
  const nav=$("navbar"), hbg=$("hbg"), nl=$("navLinks");
  if(!nav) return;
  window.addEventListener("scroll",()=>{
    nav.classList.toggle("scrolled", scrollY>60);
    const b=$("btt"); if(b) b.classList.toggle("show", scrollY>500);
  },{passive:true});
  if(hbg) hbg.addEventListener("click",()=>{ const o=nl.classList.toggle("open"); hbg.classList.toggle("open",o); });
  if(nl) nl.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{ nl.classList.remove("open"); hbg.classList.remove("open"); }));
  if(activePage){ const a=document.querySelector(`.nav-links a[href="${activePage}"]`); if(a) a.classList.add("act"); }
  const btt=$("btt"); if(btt) btt.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
}

function initAOS(){
  const obs=new IntersectionObserver(e=>e.forEach(x=>{ if(x.isIntersecting){ x.target.classList.add("visible"); obs.unobserve(x.target); } }),{threshold:.1});
  $$("[data-aos]").forEach(el=>obs.observe(el));
}

function showToast(msg){ const t=$("toast"); if(!t) return; t.textContent=msg; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),3000); }

function validateField(inp){
  const g=inp.closest(".fg"), e=g?g.querySelector(".ferr"):null;
  let m="";
  if(inp.required && !inp.value.trim()) m="Required.";
  else if(inp.type==="email" && inp.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value)) m="Valid email required.";
  else if(inp.type==="tel"  && inp.value && !/^[\d\s\-\+\(\)]{8,}$/.test(inp.value)) m="Valid phone required.";
  if(e) e.textContent=m;
  inp.classList.toggle("err",!!m);
  return !m;
}

/* ── CART ── */
window.cart = JSON.parse(sessionStorage.getItem("bhavana_cart")||"[]");
function saveCart(){ sessionStorage.setItem("bhavana_cart", JSON.stringify(window.cart)); }

function addToCart(id){
  const p=BHAVANA.products.find(x=>x.id===id); if(!p) return;
  const ex=window.cart.find(x=>x.id===id); ex ? ex.qty++ : window.cart.push({...p, qty:1});
  saveCart(); updateCartUI(); showToast("✓ "+p.name+" added to enquiry list");
}
function removeFromCart(id){ window.cart=window.cart.filter(x=>x.id!==id); saveCart(); updateCartUI(); }

function updateCartUI(){
  const qty=window.cart.reduce((s,i)=>s+i.qty,0);
  const total=window.cart.reduce((s,i)=>s+i.p*i.qty,0);
  const badge=$("cBadge"), cnt=$("cCount"), tot=$("cTotal"), items=$("cItems");
  if(badge) badge.textContent=qty;
  if(cnt)   cnt.textContent=qty;
  if(tot)   tot.textContent=inr(total);
  if(!items) return;
  if(!window.cart.length){
    items.innerHTML=`<div class="cempty"><div style="font-size:2.5rem">🛒</div><p style="margin-top:.5rem;color:var(--text-lt)">Enquiry list is empty</p></div>`;
    return;
  }
  items.innerHTML=window.cart.map(i=>`
    <div class="citem">
      <div class="ci-e">${i.e}</div>
      <div class="ci-inf"><strong>${i.name}</strong><span>Qty: ${i.qty} · ${inr(i.p)}</span></div>
      <div class="ci-p">${inr(i.p*i.qty)}</div>
      <button class="rmi" data-id="${i.id}">✕</button>
    </div>`).join("");
  items.querySelectorAll(".rmi").forEach(b=>b.addEventListener("click",()=>removeFromCart(parseInt(b.dataset.id))));
}

function initCart(){
  /* Cart open/close */
  const fab=$("cartFab"), modal=$("cModal"), cClose=$("cClose"), cOv=$("cOv"), cCont=$("cCont"), chk=$("cCheckout");
  const openCart  = ()=>{ if(!modal) return; modal.hidden=false; requestAnimationFrame(()=>modal.classList.add("open")); };
  const closeCart = ()=>{ if(!modal) return; modal.classList.remove("open"); setTimeout(()=>{ modal.hidden=true; },350); };
  if(fab)    fab.addEventListener("click", openCart);
  if(cClose) cClose.addEventListener("click", closeCart);
  if(cOv)    cOv.addEventListener("click", closeCart);
  if(cCont)  cCont.addEventListener("click", closeCart);

  /* Enquiry form open/close */
  const eqModal=$("eqModal"), eqClose=$("eqClose"), eqOv=$("eqOv");
  const openEq  = ()=>{ if(!eqModal) return; eqModal.hidden=false; requestAnimationFrame(()=>eqModal.classList.add("open")); renderEqSummary(); };
  const closeEq = ()=>{ if(!eqModal) return; eqModal.classList.remove("open"); setTimeout(()=>{ eqModal.hidden=true; },350); };
  if(eqClose) eqClose.addEventListener("click", closeEq);
  if(eqOv)    eqOv.addEventListener("click", closeEq);
  document.addEventListener("keydown", e=>{ if(e.key==="Escape"){ closeCart(); closeEq(); closeQuickModal(); } });

  /* Cart → open enquiry form */
  if(chk) chk.addEventListener("click", ()=>{
    if(!window.cart.length){ showToast("Enquiry list is empty!"); return; }
    closeCart(); setTimeout(openEq, 360);
  });

  /* Enquiry form submit */
  const eqSub=$("eqSubmit");
  if(eqSub) eqSub.addEventListener("click", async ()=>{
    const nm=$("eq_name"), ph=$("eq_phone");
    let ok=true;
    if(!nm||!nm.value.trim()){ const e=$("eq_name_e"); if(e) e.textContent="Name required."; ok=false; }
    else { const e=$("eq_name_e"); if(e) e.textContent=""; }
    if(!ph||!ph.value.trim()){ const e=$("eq_phone_e"); if(e) e.textContent="Phone required."; ok=false; }
    else { const e=$("eq_phone_e"); if(e) e.textContent=""; }
    if(!ok) return;
    eqSub.textContent="Saving... ⏳"; eqSub.disabled=true;
    const payload={ type:"enquiry", name:nm.value, phone:ph.value,
      email:($("eq_email")||{}).value||"", branch:($("eq_branch")||{}).value||"",
      notes:($("eq_notes")||{}).value||"", items:window.cart };
    try{ await fetch(GOOGLE_SHEET_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}); }catch(_){}
    window.cart=[]; saveCart(); updateCartUI();
    const fw=$("eqFormWrap"), sc=$("eqSuccess");
    if(fw) fw.style.display="none"; if(sc) sc.style.display="block";
    setTimeout(()=>{ closeEq(); if(fw) fw.style.display=""; if(sc) sc.style.display="none";
      eqSub.textContent="✅ Submit Enquiry"; eqSub.disabled=false;
      if(nm) nm.value=""; if(ph) ph.value=""; },3200);
    showToast("✅ Enquiry submitted! We'll call you within 2 hours.");
  });
  updateCartUI();
}

function renderEqSummary(){
  const s=$("eqSelSummary"); if(!s||!window.cart.length) return;
  s.innerHTML="<strong>Your selected products:</strong><br>"+window.cart.map(i=>`${i.e} ${i.name} × ${i.qty} — ${inr(i.p*i.qty)}`).join("<br>");
}

function openQuickEnquiry(productId){
  const p=BHAVANA.products.find(x=>x.id===productId); if(!p) return;
  const qm=$("quickModal"); if(!qm) return;
  const qfw=$("qFormWrap"), qsc=$("qSuccess"), qsub=$("qSubmit");
  if(qfw) qfw.style.display=""; if(qsc) qsc.style.display="none";
  if(qsub){ qsub.textContent="✅ Submit Enquiry"; qsub.disabled=false; }
  ["qq_name","qq_phone","qq_notes"].forEach(id=>{ const el=$(id); if(el) el.value=""; });
  const br=$("qq_branch"); if(br) br.value="";
  const qi=$("qProdInfo"); if(qi) qi.innerHTML=`<strong>${p.e} ${p.name}</strong> · ${p.brand} · ${inr(p.p)}${p.emi?" · EMI: "+p.emi:""}`;
  const qt=$("qTitle"); if(qt) qt.textContent="📋 Enquire: "+p.name;
  qm.hidden=false; requestAnimationFrame(()=>qm.classList.add("open"));
  const qClose=$("qClose"), qOv=$("qOv");
  if(qClose && !qClose._b){ qClose._b=true; qClose.addEventListener("click",closeQuickModal); }
  if(qOv    && !qOv._b)   { qOv._b=true;    qOv.addEventListener("click",closeQuickModal); }
  if(qsub){
    const fresh=qsub.cloneNode(true); qsub.parentNode.replaceChild(fresh,qsub);
    fresh.addEventListener("click", async ()=>{
      const nm=$("qq_name"), ph=$("qq_phone");
      if(!nm||!nm.value.trim()||!ph||!ph.value.trim()){ showToast("Please enter your name and phone."); return; }
      fresh.textContent="Saving..."; fresh.disabled=true;
      const payload={ type:"enquiry", name:nm.value, phone:ph.value,
        branch:($("qq_branch")||{}).value||"", notes:(($("qq_notes")||{}).value||""),
        items:[{name:p.name,brand:p.brand,cat:p.cat,p:p.p,emi:p.emi||"",qty:1,e:p.e}] };
      try{ await fetch(GOOGLE_SHEET_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)}); }catch(_){}
      const qfw2=$("qFormWrap"), qsc2=$("qSuccess");
      if(qfw2) qfw2.style.display="none"; if(qsc2) qsc2.style.display="block";
      setTimeout(closeQuickModal,3200);
      showToast("✅ Enquiry submitted! We'll call you within 2 hours.");
    });
  }
}

function closeQuickModal(){
  const qm=$("quickModal"); if(!qm) return;
  qm.classList.remove("open"); setTimeout(()=>{ qm.hidden=true; },350);
}
