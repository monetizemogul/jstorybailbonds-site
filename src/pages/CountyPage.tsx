import { lazy, Suspense, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { 
  MapPin, 
  ShieldCheck, 
  Scale, 
  Clock, 
  Phone, 
  ArrowLeft, 
  Building2, 
  Landmark, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle,
  Map,
  Home,
  CheckCircle2
} from 'lucide-react';
import { counties } from './counties';
import { countyDetailsMap } from './countyDetails';
import { cities } from './cities';
import Logo from '../components/Logo';
import LazyRender from '../components/LazyRender';
import { getCityUrl } from '../utils/urls';
import { getSeoForCounty } from '../utils/seoData';
import NotFoundPage from './NotFoundPage';
import LocalBailCalculator from '../components/LocalBailCalculator';
import BailProcessSteps from '../components/BailProcessSteps';
import BailBondTypes from '../components/BailBondTypes';
import FloatingCallBar from '../components/FloatingCallBar';

const Contact = lazy(() => import('../components/Contact'));

export default function CountyPage() {
  const { countyId: rawCountyId } = useParams<{ countyId: string }>();
  const normalizedCountyId = (rawCountyId || '').toLowerCase().replace(/-county$/, '');
  const county = counties.find(c => c.id === normalizedCountyId || c.id === rawCountyId);
  const details = county ? (countyDetailsMap[county.id] || {
    id: county.id,
    name: county.name,
    countySeat: county.name.replace(' County', ''),
    jailName: `${county.name} Detention Center`,
    jailAddress: `${county.name}, Missouri`,
    sheriffOffice: `${county.name} Sheriff's Department`,
    highways: 'Major Missouri State & County Routes',
    nearbyStreets: 'County Courthouse & Judicial Square',
    localCourts: [`${county.circuit} Court - ${county.name}`],
    majorCities: [county.name.replace(' County', '')],
    customIntro: `Jody Story Bail Bonds proudly provides fast, professional 24/7 bail bonds throughout ${county.name}, Missouri. We serve all municipalities and surrounding areas across ${county.circuit} with immediate dispatch and flexible financing.`,
    localProcedures: `Bail bonds are processed 24/7 in ${county.name}. Once a bail amount or surety condition is confirmed, Jody Story coordinates directly with the local detention center and court clerks to process paperwork and secure rapid release.`
  }) : undefined;

  const [geoStatus, setGeoStatus] = useState<'idle' | 'checking' | 'granted' | 'denied' | 'outside'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleVerifyLoc = () => {
    if (!county) return;
    if (!("geolocation" in navigator)) {
      setGeoStatus('denied');
      return;
    }

    setGeoStatus('checking');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const distance = calculateDistance(latitude, longitude, county.lat, county.lng);
        if (distance < 40) {
          setGeoStatus('granted');
        } else {
          setGeoStatus('outside');
        }
      },
      (error) => {
        console.warn("Geolocation access denied or error:", error);
        setGeoStatus('denied');
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 3958.8; // Radius of Earth in miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  if (!county || !details) {
    return <NotFoundPage />;
  }

  // SEO metadata from centralized generator
  const seo = getSeoForCounty(county.id);
  const localAppCities = cities.filter(c => c.countyId === county.id);
  const richFaqItems = seo?.faqs || [];

  return (
    <div className="min-h-screen pb-16 sm:pb-0">
      {seo && (
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="keywords" content={seo.keywords} />
          <link rel="canonical" href={seo.canonicalUrl} />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={seo.ogUrl} />
          <meta property="og:title" content={seo.ogTitle} />
          <meta property="og:description" content={seo.ogDescription} />
          <meta property="og:image" content={seo.ogImage} />
          <meta property="og:site_name" content="Jody Story Bail Bonds" />

          {/* Twitter (X) */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content={seo.ogUrl} />
          <meta name="twitter:title" content={seo.twitterTitle} />
          <meta name="twitter:description" content={seo.twitterDescription} />
          <meta name="twitter:image" content={seo.twitterImage} />

          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@graph": seo.schemaGraph
            })}
          </script>
        </Helmet>
      )}
      
      {/* Dynamic Responsive Hero Section */}
      <section className="relative pt-36 pb-20 galaxy-bg overflow-hidden border-b border-brand-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Visual Semantic Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-brand-text-dim uppercase tracking-wider mb-8">
            <Link to="/" className="hover:text-brand-primary flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-brand-border">&gt;</span>
            <Link to="/#service-areas" className="hover:text-brand-primary transition-colors">
              Missouri Service Areas
            </Link>
            <span className="text-brand-border">&gt;</span>
            <span className="text-brand-accent font-black">{county.name}</span>
          </nav>

          <Link to="/" className="inline-flex items-center gap-2 text-brand-primary uppercase tracking-widest text-xs font-black mb-8 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to All Service Areas
          </Link>
          
          <div className="mb-8 max-w-xl">
            <AnimatePresence mode="wait">
              {geoStatus === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="border border-brand-border/40 bg-brand-surface/30 backdrop-blur-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-sm"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-brand-primary" />
                    <div>
                      <p className="text-[9px] text-[#00D2FF] font-black uppercase tracking-widest leading-none">Immediate Response Zone</p>
                      <p className="text-xs text-brand-text-dim mt-1 font-light">Check if an active agent is dispatching in {county.name}.</p>
                    </div>
                  </div>
                  <button
                    onClick={handleVerifyLoc}
                    className="self-start sm:self-auto text-[9px] font-black uppercase tracking-widest text-[#00D2FF] border border-[#00D2FF]/40 px-3 py-1.5 hover:bg-[#00D2FF]/10 hover:border-[#00D2FF] transition-all cursor-pointer rounded-sm"
                  >
                    Verify Area
                  </button>
                </motion.div>
              )}

              {geoStatus === 'checking' && (
                <motion.div
                  key="checking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border border-brand-primary/30 bg-brand-primary/5 p-4 flex items-center gap-3 rounded-sm"
                >
                  <div className="w-4 h-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-brand-text-dim uppercase tracking-widest font-bold">Verifying physical location coordinates...</p>
                </motion.div>
              )}

              {geoStatus === 'granted' && (
                <motion.div
                  key="granted"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="border border-brand-accent/35 bg-brand-accent/5 p-4 flex items-center gap-4 rounded-sm"
                >
                  <div className="p-2 bg-brand-accent/20 rounded-full animate-pulse">
                    <MapPin className="w-5 h-5 text-brand-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-accent font-black uppercase tracking-[0.3em] leading-none">Location Confirmed</p>
                    <p className="text-white text-xs font-light mt-1">Success! You are within our immediate {county.name} dispatch circle. Call now to guarantee fast agent arrival!</p>
                  </div>
                </motion.div>
              )}

              {geoStatus === 'outside' && (
                <motion.div
                  key="outside"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="border border-brand-primary/35 bg-brand-surface/30 p-4 flex items-center gap-4 rounded-sm"
                >
                  <div className="p-2 bg-brand-primary/20 rounded-full">
                    <MapPin className="w-5 h-5 text-[#00D2FF]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#00D2FF] font-black uppercase tracking-[0.3em] leading-none">Border Area Active</p>
                    <p className="text-white text-xs font-light mt-1">We service {county.name} and the entire {county.circuit}. Call for immediate dispatch!</p>
                  </div>
                </motion.div>
              )}

              {geoStatus === 'denied' && (
                <motion.div
                  key="denied"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border border-red-500/30 bg-red-500/5 p-4 flex items-center gap-3 rounded-sm"
                >
                  <p className="text-xs text-red-400 uppercase tracking-widest font-bold">We serve {county.name} 24/7! Contact us directly for dispatch.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Logo className="w-16 h-16" size={64} priority={true} />
                <span className="text-[10px] text-brand-primary uppercase tracking-[0.4em] font-black block">Certified Missouri {county.circuit}</span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white leading-tight mb-6 italic font-black">
                {county.name} <br/>
                <span className="text-gradient-gold logo-shadow">Bail Bonds</span>
              </h1>
              
              <p className="text-brand-text-dim text-base sm:text-lg mb-8 max-w-xl leading-relaxed font-light">
                {details?.customIntro || `${county.description} We offer fast, confidential 24-hour bail bond services to bring your loved ones home immediately in ${county.name}.`}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:5738549264" className="px-8 py-4 bg-brand-accent text-black font-black uppercase tracking-widest text-xs hover:bg-white transition-all shadow-[0_0_40px_rgba(255,184,0,0.4)] text-center rounded-sm flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 fill-current" />
                  Call 24/7: (573) 854-9264
                </a>
                <a href="#contact" className="px-8 py-4 border-2 border-brand-primary text-brand-primary font-black uppercase tracking-widest text-xs hover:bg-brand-primary hover:text-white transition-all text-center rounded-sm">
                  Flexible Payment Plans
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-brand-surface border border-brand-border p-8 sm:p-10 backdrop-blur-md relative rounded-sm shadow-xl"
            >
              <div className="absolute top-0 right-0 p-3 bg-gradient-purple text-white text-[8px] font-black tracking-widest uppercase">
                {county.circuit} Certified Bondsman
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-sm shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-1 text-sm">24/7 Fast Jail Release</h3>
                    <p className="text-xs text-brand-text-dim leading-relaxed">Always-available mobile bondsmen dispatched across {county.name} for swift detention clearance.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-sm shrink-0">
                    <Scale className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-1 text-sm">{county.circuit} Judicial Knowledge</h3>
                    <p className="text-xs text-brand-text-dim leading-relaxed">Familiarity with judges, clerks, and local bail conditions inside the {county.name} judicial offices.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-sm shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-1 text-sm">100% Confidential & Respectful</h3>
                    <p className="text-xs text-brand-text-dim leading-relaxed">Strict client privacy and absolute discretion are guaranteed throughout your entire release process.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Geospatial and Authority Fact-Sheet Grid (Local Grounding) */}
      <section className="py-16 bg-brand-surface/20 border-b border-brand-border/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-primary text-[10px] uppercase font-black tracking-[0.4em] block mb-2">Local Jurisdictional Facts</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white italic font-black">
              {county.name} Law Enforcement & Facility Info
            </h2>
            <p className="text-brand-text-dim text-sm max-w-xl mx-auto mt-2 font-light">
              Official detention facility, judicial seat, and municipal transit access points for {county.name}, Missouri.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-brand-surface border border-brand-border p-6 rounded-sm hover:border-brand-primary/40 transition-colors">
              <Landmark className="w-7 h-7 text-brand-accent mb-4" />
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Seat of Jurisdiction</h3>
              <p className="text-[11px] text-[#00D2FF] font-black uppercase tracking-wider mb-2">{details.countySeat}, MO</p>
              <p className="text-xs text-brand-text-dim leading-relaxed font-light">
                Court docket calls, initial hearings, and circuit arraignments for {county.name} are centered in {details.countySeat}.
              </p>
            </div>

            <div className="bg-brand-surface border border-brand-border p-6 rounded-sm hover:border-brand-primary/40 transition-colors">
              <Building2 className="w-7 h-7 text-brand-accent mb-4" />
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Primary Detention Center</h3>
              <p className="text-[11px] text-[#00D2FF] font-black uppercase tracking-wider mb-1">{details.jailName}</p>
              <p className="text-xs text-brand-text-dim leading-relaxed font-light mb-3">
                {details.jailAddress}
              </p>
              <span className="text-[9px] font-black uppercase tracking-widest bg-brand-accent/10 border border-brand-accent/25 px-2 py-1 text-brand-accent rounded-sm">
                24/7 Bond Postings
              </span>
            </div>

            <div className="bg-brand-surface border border-brand-border p-6 rounded-sm hover:border-brand-primary/40 transition-colors">
              <Compass className="w-7 h-7 text-brand-accent mb-4" />
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Highways & Corridors</h3>
              <p className="text-[11px] text-[#00D2FF] font-black uppercase tracking-wider mb-1">Transit Access</p>
              <p className="text-xs text-brand-text-dim leading-relaxed font-light">
                Rapid agent response along <span className="text-white font-medium">{details.highways}</span>.
              </p>
            </div>

            <div className="bg-brand-surface border border-brand-border p-6 rounded-sm hover:border-brand-primary/40 transition-colors">
              <Map className="w-7 h-7 text-brand-accent mb-4" />
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Municipal Coverage</h3>
              <p className="text-[11px] text-[#00D2FF] font-black uppercase tracking-wider mb-2">All Cities & Towns</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {localAppCities.length > 0 ? (
                  localAppCities.map(c => (
                    <Link 
                      key={c.id} 
                      to={getCityUrl(c.id)} 
                      className="text-[10px] bg-brand-border/40 hover:bg-brand-primary-dim/20 px-2 py-0.5 rounded-sm border border-brand-border/50 text-brand-text-dim hover:text-brand-primary hover:border-brand-primary transition-all font-bold"
                    >
                      {c.name}
                    </Link>
                  ))
                ) : (
                  details.majorCities.map((cityName, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] bg-brand-border/40 px-2 py-0.5 rounded-sm border border-brand-border/50 text-brand-text-dim font-bold"
                    >
                      {cityName}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content & Interactive Modules */}
      <section className="py-20 bg-brand-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-16">
              
              {/* Local Bail Calculator Widget */}
              <div>
                <LocalBailCalculator locationName={county.name} isCounty={true} />
              </div>

              {/* Step by Step Bail Process */}
              <div>
                <BailProcessSteps locationName={county.name} jailName={details.jailName} />
              </div>

              {/* Comprehensive Types of Bail Bonds */}
              <div>
                <BailBondTypes locationName={county.name} />
              </div>

              {/* Rich In-Depth County Legal Narrative */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif text-white italic font-black mb-6 border-l-4 border-brand-accent pl-6 uppercase tracking-tight">
                  Fast Jail Release & Court Procedures in {county.name}
                </h2>
                
                <div className="prose prose-invert prose-brand max-w-none text-brand-text-dim space-y-6 leading-relaxed font-light">
                  {details.extendedContent ? (
                    <>
                      <div className="space-y-4 whitespace-pre-wrap">
                        {details.extendedContent.overview}
                      </div>

                      <h3 className="text-xl font-serif text-white font-bold mt-10 mb-4 border-b border-brand-border/40 pb-2 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-brand-accent" />
                        {county.name} Detention Center & Intake
                      </h3>
                      <div className="space-y-4 whitespace-pre-wrap">
                        {details.extendedContent.jailInfo}
                      </div>

                      <h3 className="text-xl font-serif text-white font-bold mt-10 mb-4 border-b border-brand-border/40 pb-2 flex items-center gap-2">
                        <Scale className="w-5 h-5 text-brand-accent" />
                        Courts & Regulatory Compliance
                      </h3>
                      <div className="space-y-4 whitespace-pre-wrap">
                        {details.extendedContent.courtInfo}
                      </div>

                      <h3 className="text-xl font-serif text-white font-bold mt-10 mb-4 border-b border-brand-border/40 pb-2 flex items-center gap-2">
                        <Compass className="w-5 h-5 text-brand-accent" />
                        The Local Bail Bond Process
                      </h3>
                      <div className="space-y-4 whitespace-pre-wrap">
                        {details.extendedContent.localBondProcess}
                      </div>
                    </>
                  ) : (
                    <>
                      <p>
                        When an arrest occurs in {county.name}, acting without delay is vitally important. 
                        Jody Story Bail Bonds provides immediate, certified support for all individuals facing hearings in the {county.circuit}. 
                        We guide you clearly through every document, payment option, and discharge condition.
                      </p>
                      
                      <p>
                        Our professional on-ground agents work directly around the clock with the clerks at the <strong>{details.countySeat} courthouse</strong> and the <strong>{details.jailName}</strong>. 
                        Whether it's a misdemeanor citation, traffic offense, or complex felony warrant, we submit certified bonds efficiently to initiate physical release.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Local court operations card */}
              <div className="bg-brand-surface border border-brand-border p-6 sm:p-8 rounded-sm space-y-6">
                <h3 className="text-white font-bold uppercase tracking-widest text-xs border-b border-brand-border/80 pb-3 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-brand-accent" />
                  Active Judicial Courts We Serve in {county.name}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {details.localCourts.map((courtName, idx) => (
                    <div key={idx} className="flex gap-3">
                      <CheckCircle className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                      <span className="text-xs text-brand-text-dim text-wrap leading-relaxed">{courtName}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-brand-text-dim italic leading-relaxed font-light border-t border-brand-border/40 pt-4">
                  *Our agents coordinate hearings and schedules with local court clerks immediately. You can verify active dockets online on the official <a href="https://www.courts.mo.gov/" target="_blank" rel="noopener noreferrer" className="text-brand-accent underline hover:text-white transition-colors">Missouri Case.net Portal</a>.
                </p>
              </div>

              {/* Interactive Accordion for AEO and Local Voice Grounding */}
              <div className="space-y-6">
                <div className="border-l-4 border-brand-primary pl-6">
                  <p className="text-[10px] text-brand-primary uppercase font-black tracking-[0.3em] leading-none mb-2">Instant Answers</p>
                  <h3 className="text-2xl font-serif text-white italic font-black uppercase tracking-tight">
                    Frequently Asked Questions ({county.name})
                  </h3>
                </div>

                <div className="space-y-3">
                  {richFaqItems.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div 
                        key={index} 
                        className="border border-brand-border bg-brand-surface/20 hover:bg-brand-surface/40 transition-colors rounded-sm"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : index)}
                          className="w-full text-left p-5 flex justify-between items-center gap-4 focus:outline-none"
                        >
                          <span className="text-white font-medium text-sm leading-snug">{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-brand-primary shrink-0" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-brand-text-dim shrink-0" />
                          )}
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 pt-0 border-t border-brand-border/10 text-xs text-brand-text-dim leading-relaxed font-light space-y-2">
                                <p>{faq.answer}</p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8 lg:sticky lg:top-32 h-fit">
              <div className="p-6 sm:p-8 bg-brand-surface border border-brand-primary/30 relative overflow-hidden rounded-sm shadow-lg group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-purple rotate-45 translate-x-12 -translate-y-12 opacity-50" />
                <h3 className="text-xl font-serif font-black italic mb-2 text-gradient-gold">Immediate Dispatch</h3>
                <p className="text-xs uppercase tracking-widest font-black text-[#00D2FF] mb-4">24/7 Mobile Service Line</p>
                <p className="text-xs text-brand-text-dim font-light leading-relaxed mb-6">
                  Licensed bail bondsmen are ready on-call to represent defendants at {details.jailName} and courts across {county.name}.
                </p>
                
                <a 
                  href="tel:5738549264" 
                  className="flex items-center gap-3 text-2xl font-serif font-black italic text-gradient-gold hover:scale-105 transition-transform logo-shadow"
                >
                  <Phone className="w-6 h-6 text-brand-primary shrink-0" />
                  (573) 854-9264
                </a>
              </div>

              {/* Member Cities Box */}
              {localAppCities.length > 0 && (
                <div className="p-6 bg-brand-surface border border-brand-border rounded-sm">
                  <h4 className="text-xs font-black uppercase tracking-widest text-brand-accent mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Cities in {county.name}
                  </h4>
                  <div className="space-y-2">
                    {localAppCities.map(c => (
                      <Link
                        key={c.id}
                        to={getCityUrl(c.id)}
                        className="block p-2.5 bg-brand-bg/60 border border-brand-border hover:border-brand-primary text-xs font-bold text-white hover:text-brand-primary transition-all rounded-sm flex items-center justify-between"
                      >
                        <span>{c.name}, MO</span>
                        <span className="text-[10px] text-brand-text-dim uppercase font-mono">24/7 Bail</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Neighboring Counties for SEO Crawl Pathways */}
              <div className="p-6 border-2 border-brand-primary hover:border-brand-primary-dim transition-colors rounded-sm">
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-4">Nearby Missouri Counties</h4>
                <div className="flex flex-wrap gap-2">
                  {counties
                    .filter(c => c.id !== county.id)
                    .map(c => (
                      <Link 
                        key={c.id} 
                        to={`/service-area/${c.id}`} 
                        className="px-2.5 py-1 bg-brand-surface border border-brand-border text-[9px] uppercase font-bold text-brand-text-dim hover:text-brand-primary hover:border-brand-primary transition-all rounded-sm hover:-translate-y-0.5 inline-block"
                      >
                        {c.name}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lazy contact component */}
      <LazyRender>
        <Suspense fallback={<div className="h-40 bg-brand-bg animate-pulse" />}>
          <Contact />
        </Suspense>
      </LazyRender>

      {/* Mobile Sticky Action Bar */}
      <FloatingCallBar locationName={county.name} />
    </div>
  );
}
