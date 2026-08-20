import { lazy, Suspense, useState } from 'react';
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
  Home,
  Map
} from 'lucide-react';
import { cities } from './cities';
import { countyDetailsMap } from './countyDetails';
import { cityContentMap } from './cityContent';
import Logo from '../components/Logo';
import LazyRender from '../components/LazyRender';
import { getCityUrl } from '../utils/urls';
import { getSeoForCity } from '../utils/seoData';
import NotFoundPage from './NotFoundPage';
import LocalBailCalculator from '../components/LocalBailCalculator';
import BailProcessSteps from '../components/BailProcessSteps';
import BailBondTypes from '../components/BailBondTypes';
import FloatingCallBar from '../components/FloatingCallBar';

const Contact = lazy(() => import('../components/Contact'));

export default function CityPage({ forceCityId }: { forceCityId?: string }) {
  const { cityId: urlCityId } = useParams<{ cityId: string }>();
  const cityId = forceCityId || urlCityId;
  const city = cities.find(c => c.id === cityId);
  const countyDetails = city ? countyDetailsMap[city.countyId] : null;
  const cityExtended = city ? cityContentMap[city.id] : null;

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!city) {
    return <NotFoundPage />;
  }

  // SEO metadata from centralized generator
  const seo = getSeoForCity(city.id);
  const richFaqItems = seo?.faqs || [];

  // Sibling cities within the same county
  const siblingCities = cities.filter(c => c.countyId === city.countyId && c.id !== city.id);
  // Other major service cities
  const otherCities = cities.filter(c => c.countyId !== city.countyId).slice(0, 8);

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
      
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 galaxy-bg overflow-hidden border-b border-brand-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Visual Semantic Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-bold text-brand-text-dim uppercase tracking-wider mb-8 flex-wrap">
            <Link to="/" className="hover:text-brand-primary flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-brand-border">&gt;</span>
            <Link to="/#service-areas" className="hover:text-brand-primary transition-colors">
              Missouri Service Areas
            </Link>
            <span className="text-brand-border">&gt;</span>
            <Link to={`/service-area/${city.countyId}`} className="hover:text-brand-primary transition-colors">
              {city.countyName}
            </Link>
            <span className="text-brand-border">&gt;</span>
            <span className="text-brand-accent font-black">{city.name}</span>
          </nav>

          <Link to={`/service-area/${city.countyId}`} className="inline-flex items-center gap-2 text-brand-primary uppercase tracking-widest text-xs font-black mb-8 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to {city.countyName} Division
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Logo className="w-16 h-16" size={64} priority={true} />
                <span className="text-[10px] text-brand-primary uppercase tracking-[0.5em] font-black block">
                  Serving {city.name}, MO &middot; {city.countyName}
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white leading-tight mb-6 italic font-black">
                {city.name} <br/>
                <span className="text-gradient-gold logo-shadow">Bail Bonds</span>
              </h1>
              <p className="text-brand-text-dim text-base sm:text-lg mb-8 max-w-xl leading-relaxed font-light">
                {city.description} We offer fast, confidential 24-hour bail bond services to bring your loved ones home immediately in {city.name}, Missouri.
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
                {city.circuit} Certified Bondsman
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-sm shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-1 text-sm">24/7 Fast Jail Release</h3>
                    <p className="text-xs text-brand-text-dim leading-relaxed">On-call dispatchers and mobile bondsmen stationed near {city.name} ready for immediate response.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-sm shrink-0">
                    <Scale className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-1 text-sm">{city.countyName} Judicial Experts</h3>
                    <p className="text-xs text-brand-text-dim leading-relaxed">Deep knowledge of local {city.name} municipal court procedures and county detention protocol.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-sm shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold uppercase tracking-widest mb-1 text-sm">100% Discreet & Confidential</h3>
                    <p className="text-xs text-brand-text-dim leading-relaxed">Your family's privacy and dignity are strictly protected throughout the entire release process in {city.name}.</p>
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
              {city.name} Law Enforcement & Jail Information
            </h2>
            <p className="text-brand-text-dim text-sm max-w-xl mx-auto mt-2 font-light">
              Official detention facility, judicial circuit, and local transit access for {city.name}, Missouri.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-brand-surface border border-brand-border p-6 rounded-sm hover:border-brand-primary/40 transition-colors">
              <Landmark className="w-7 h-7 text-brand-accent mb-4" />
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Municipal Jurisdiction</h3>
              <p className="text-[11px] text-[#00D2FF] font-black uppercase tracking-wider mb-2">{city.name} & {city.countyName}</p>
              <p className="text-xs text-brand-text-dim leading-relaxed font-light">
                Municipal citations and county charges are adjudicated through {city.circuit} courts.
              </p>
            </div>

            <div className="bg-brand-surface border border-brand-border p-6 rounded-sm hover:border-brand-primary/40 transition-colors">
              <Building2 className="w-7 h-7 text-brand-accent mb-4" />
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Detention Center</h3>
              <p className="text-[11px] text-[#00D2FF] font-black uppercase tracking-wider mb-1">{countyDetails?.jailName || `${city.countyName} Jail`}</p>
              <p className="text-xs text-brand-text-dim leading-relaxed font-light mb-3">
                {countyDetails?.jailAddress || `${city.name} area, MO`}
              </p>
              <span className="text-[9px] font-black uppercase tracking-widest bg-brand-accent/10 border border-brand-accent/25 px-2 py-1 text-brand-accent rounded-sm">
                24/7 Agent Availability
              </span>
            </div>

            <div className="bg-brand-surface border border-brand-border p-6 rounded-sm hover:border-brand-primary/40 transition-colors">
              <Compass className="w-7 h-7 text-brand-accent mb-4" />
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">Highways & Routes</h3>
              <p className="text-[11px] text-[#00D2FF] font-black uppercase tracking-wider mb-1">Transit Access</p>
              <p className="text-xs text-brand-text-dim leading-relaxed font-light">
                Direct mobile agent routing via <span className="text-white font-medium">{countyDetails?.highways || 'local major highways'}</span>.
              </p>
            </div>

            <div className="bg-brand-surface border border-brand-border p-6 rounded-sm hover:border-brand-primary/40 transition-colors">
              <Map className="w-7 h-7 text-brand-accent mb-4" />
              <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-2">County Division</h3>
              <p className="text-[11px] text-[#00D2FF] font-black uppercase tracking-wider mb-2">
                <Link to={`/service-area/${city.countyId}`} className="hover:text-brand-primary underline">
                  {city.countyName}
                </Link>
              </p>
              <p className="text-xs text-brand-text-dim leading-relaxed font-light">
                Full coverage across all neighboring municipalities in {city.countyName}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-brand-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-16">
              
              {/* Interactive Local Bail Calculator */}
              <div>
                <LocalBailCalculator locationName={city.name} />
              </div>

              {/* 4-Step Release Guide */}
              <div>
                <BailProcessSteps locationName={city.name} jailName={countyDetails?.jailName} />
              </div>

              {/* Types of Bail Bonds Accepted */}
              <div>
                <BailBondTypes locationName={city.name} />
              </div>

              {/* In-Depth City Legal Narrative */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif text-white italic font-black mb-6 border-l-4 border-brand-accent pl-6 uppercase tracking-tight">
                  Fast Jail Release & Court Procedures in {city.name}
                </h2>
                
                <div className="prose prose-invert prose-brand max-w-none space-y-6 text-brand-text-dim leading-relaxed font-light">
                  {cityExtended ? (
                    <>
                      <div className="space-y-4 whitespace-pre-wrap">
                        {cityExtended.overview}
                      </div>

                      <h3 className="text-xl font-serif text-white font-bold mt-10 mb-4 border-b border-brand-border/40 pb-2 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-brand-accent" />
                        Local Police Department & Detention Details
                      </h3>
                      <div className="space-y-4 whitespace-pre-wrap">
                        {cityExtended.policeInfo}
                      </div>

                      <h3 className="text-xl font-serif text-white font-bold mt-10 mb-4 border-b border-brand-border/40 pb-2 flex items-center gap-2">
                        <Landmark className="w-5 h-5 text-brand-accent" />
                        Municipal & Circuit Court Information
                      </h3>
                      <div className="space-y-4 whitespace-pre-wrap">
                        {cityExtended.courtInfo}
                      </div>

                      <h3 className="text-xl font-serif text-white font-bold mt-10 mb-4 border-b border-brand-border/40 pb-2 flex items-center gap-2">
                        <Compass className="w-5 h-5 text-brand-accent" />
                        Local Bail Release Process in {city.name}
                      </h3>
                      <div className="space-y-4 whitespace-pre-wrap">
                        {cityExtended.localBondProcess}
                      </div>
                    </>
                  ) : countyDetails?.extendedContent ? (
                    <>
                      <div className="space-y-4 whitespace-pre-wrap">
                        {countyDetails.extendedContent.overview}
                      </div>

                      <h3 className="text-xl font-serif text-white font-bold mt-10 mb-4 border-b border-brand-border/40 pb-2 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-brand-accent" />
                        Detention Facility Information
                      </h3>
                      <div className="space-y-4 whitespace-pre-wrap">
                        {countyDetails.extendedContent.jailInfo}
                      </div>

                      <h3 className="text-xl font-serif text-white font-bold mt-10 mb-4 border-b border-brand-border/40 pb-2 flex items-center gap-2">
                        <Scale className="w-5 h-5 text-brand-accent" />
                        Court Compliance & Calendars
                      </h3>
                      <div className="space-y-4 whitespace-pre-wrap">
                        {countyDetails.extendedContent.courtInfo}
                      </div>

                      <h3 className="text-xl font-serif text-white font-bold mt-10 mb-4 border-b border-brand-border/40 pb-2 flex items-center gap-2">
                        <Compass className="w-5 h-5 text-brand-accent" />
                        The Local Bail Bond Process
                      </h3>
                      <div className="space-y-4 whitespace-pre-wrap">
                        {countyDetails.extendedContent.localBondProcess}
                      </div>
                    </>
                  ) : (
                    <>
                      <p>
                        Arrests in {city.name} require quick, knowledgeable action. Jody Story Bail Bonds provides 
                        reliable assistance to navigate the {city.countyName} jail system. We facilitate
                        fast releases for both municipal citations and felony warrants.
                      </p>
                      <p>
                        Our experienced agents understand the specific bail schedules and release procedures in {city.name}. 
                        We work closely with local law enforcement to ensure your loved one is processed and released 
                        without unnecessary delays. You can look up active court calendars and case records directly via the official <a href="https://www.courts.mo.gov/" target="_blank" rel="noopener noreferrer" className="text-brand-accent underline hover:text-white transition-colors">Missouri Courts Portal</a>.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Active Courts card */}
              <div className="bg-brand-surface border border-brand-border p-6 sm:p-8 rounded-sm space-y-6">
                <h3 className="text-white font-bold uppercase tracking-widest text-xs border-b border-brand-border/80 pb-3 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-brand-accent" />
                  Active Judicial Courts Serving {city.name}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {countyDetails ? (
                    countyDetails.localCourts.map((courtName, idx) => (
                      <div key={idx} className="flex gap-3">
                        <CheckCircle className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-brand-text-dim text-wrap leading-relaxed">{courtName}</span>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex gap-3">
                        <CheckCircle className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-brand-text-dim">{city.circuit} Court</span>
                      </div>
                      <div className="flex gap-3">
                        <CheckCircle className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                        <span className="text-xs text-brand-text-dim">{city.name} Municipal Division</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Local FAQ Accordion */}
              <div className="space-y-6">
                <div className="border-l-4 border-brand-primary pl-6">
                  <p className="text-[10px] text-brand-primary uppercase font-black tracking-[0.3em] leading-none mb-2">Instant Answers</p>
                  <h3 className="text-2xl font-serif text-white italic font-black uppercase tracking-tight">
                    Frequently Asked Questions ({city.name})
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
                <h3 className="text-xl font-serif font-black italic mb-2 text-gradient-gold">Call {city.name} Bondsman</h3>
                <p className="text-xs uppercase tracking-widest font-black text-[#00D2FF] mb-4">24/7 Rapid Release Line</p>
                <p className="text-xs text-brand-text-dim font-light leading-relaxed mb-6">
                  One call away from setting your loved one free in {city.name} or anywhere in {city.countyName}.
                </p>
                <a href="tel:5738549264" className="flex items-center gap-3 text-2xl font-serif font-black italic text-gradient-gold hover:scale-105 transition-transform logo-shadow">
                  <Phone className="w-6 h-6 text-brand-primary shrink-0" />
                  (573) 854-9264
                </a>
              </div>
              
              {/* Parent County Link */}
              <div className="p-6 bg-brand-surface border border-brand-border rounded-sm">
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-accent mb-2">County Division</h4>
                <p className="text-xs text-brand-text-dim mb-4 font-light">
                  {city.name} is part of our {city.countyName} service area.
                </p>
                <Link
                  to={`/service-area/${city.countyId}`}
                  className="block w-full py-2.5 px-4 bg-brand-primary/10 border border-brand-primary/40 hover:bg-brand-primary hover:text-white text-brand-primary text-xs font-bold text-center uppercase tracking-wider rounded-sm transition-all"
                >
                  View {city.countyName} Full Coverage &rarr;
                </Link>
              </div>

              {/* Sibling Cities */}
              {siblingCities.length > 0 && (
                <div className="p-6 bg-brand-surface border border-brand-border rounded-sm">
                  <h4 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-4">
                    Other Cities in {city.countyName}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {siblingCities.map(c => (
                      <Link 
                        key={c.id} 
                        to={getCityUrl(c.id)} 
                        className="px-2.5 py-1 bg-brand-bg/60 border border-brand-border text-[10px] font-bold text-brand-text-dim hover:text-brand-primary hover:border-brand-primary transition-all rounded-sm"
                      >
                        {c.name}, MO
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Other Major Service Cities */}
              <div className="p-6 border-2 border-brand-primary rounded-sm">
                <h4 className="text-xs font-black uppercase tracking-widest text-brand-primary mb-4">Nearby Missouri Cities</h4>
                <div className="flex flex-wrap gap-2">
                  {otherCities.map(c => (
                    <Link 
                      key={c.id} 
                      to={getCityUrl(c.id)} 
                      className="px-2.5 py-1 bg-brand-surface border border-brand-border text-[9px] uppercase font-bold text-brand-text-dim hover:text-brand-primary hover:border-brand-primary transition-all rounded-sm"
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
      <FloatingCallBar locationName={city.name} />
    </div>
  );
}
