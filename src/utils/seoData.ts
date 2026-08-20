import { counties } from '../pages/counties';
import { cities } from '../pages/cities';
import { countyDetailsMap, DetailedCountyInfo } from '../pages/countyDetails';
import { cityContentMap, CityExtendedContent } from '../pages/cityContent';
import { getCityUrl } from './urls';

export interface SeoMetadata {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  breadcrumbs: { name: string; url: string }[];
  faqs: { question: string; answer: string }[];
  schemaGraph: any[];
  htmlFallback: string;
}

const DEFAULT_IMAGE = "https://jstorybailbonds.com/jody_story_bailbonds.jpg";
const LOGO_IMAGE = "https://jstorybailbonds.com/Jody_Story_Bailbonds_Logo.jpg";
const PHONE_NUMBER = "(573) 854-9264";
const PHONE_INTL = "+1-573-854-9264";

export function getSeoForCounty(countyId: string): SeoMetadata | null {
  const normalizedId = (countyId || '').toLowerCase().replace(/-county$/, '');
  const county = counties.find(c => c.id === normalizedId);
  if (!county) return null;

  const details = countyDetailsMap[county.id] || {
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
  };

  const localCities = cities.filter(c => c.countyId === county.id);
  const canonicalUrl = `https://jstorybailbonds.com/service-area/${county.id}`;
  const title = `${county.name} Bail Bonds | 24/7 Fast Jail Release | Jody Story`;
  
  let description = `Fast 24/7 bail bonds in ${county.name}, MO. We offer reliable jail release at ${details.jailName} in ${details.countySeat}. Call Jody Story at (573) 854-9264.`;
  if (description.length > 160) {
    description = `24/7 bail bonds in ${county.name}. Fast release at ${details.jailName}. Call Jody Story at (573) 854-9264.`;
  }

  const keywords = `${county.name} Bail Bonds, ${details.countySeat} MO Bondsman, ${details.jailName}, ${county.circuit} Bail Service, ${county.name} Sheriff, Bail Bonds near ${county.name} Missouri, Jody Story Bail Bonds, 24/7 Jail Release ${county.name}`;

  const faqs = details.extendedContent?.faqs || [
    {
      question: `How do I secure a bail bond in ${county.name}, MO?`,
      answer: `To secure an immediate bail bond, contact Jody Story Bail Bonds 24/7 at ${PHONE_NUMBER}. Our experienced bondsmen coordinate directly with the court clerk and duty deputies. You will typically need to pay a standard 10% premium or establish certified collateral to initiate the release procedure. We deal with everything immediately so you can focus on your family.`
    },
    {
      question: `Where is the main detention center of ${county.name} located?`,
      answer: `Individuals arrested in ${county.name} are held at the ${details.jailName}, located at ${details.jailAddress}. Jody Story coordinates directly with the ${details.sheriffOffice} to process paperwork and secure release promptly.`
    },
    {
      question: `How long does the bail release process take at ${details.jailName}?`,
      answer: `Release schedules at the ${details.jailName} in ${details.countySeat} generally take between 1 to 3 hours once our certified agent delivers the approved surety or cash filing. Actual transit times depend on active duty intake volumes and court schedules.`
    },
    {
      question: `Does Jody Story accept flexible payment plans in ${county.name}?`,
      answer: `Yes, we understand that sudden legal problems are stressful and expensive. We offer customizable financing plans with low down payments and installment configurations suited to your home budget. We service all of ${county.name} with honest, completely transparent, non-interest terms for qualifying clients.`
    },
    {
      question: `What types of bail bonds does Jody Story handle in ${county.name}?`,
      answer: `We handle all types of bonds across ${county.name} and ${county.circuit}, including Felony charges, Misdemeanors, DWI / DUI, Traffic Warrants, Failure to Appear (FTA), Domestic incidents, and Drug charges.`
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://jstorybailbonds.com/" },
    { name: "Service Areas", url: "https://jstorybailbonds.com/#service-areas" },
    { name: `${county.name} Bail Bonds`, url: canonicalUrl }
  ];

  const schemaGraph = [
    {
      "@type": "Organization",
      "@id": "https://jstorybailbonds.com/#organization",
      "name": "Jody Story Bail Bonds LLC",
      "url": "https://jstorybailbonds.com/",
      "logo": {
        "@type": "ImageObject",
        "url": LOGO_IMAGE
      }
    },
    {
      "@type": "LegalService",
      "@id": `${canonicalUrl}/#bailservice`,
      "name": `Jody Story Bail Bonds - ${county.name} Division`,
      "description": `Professional 24-hour bail bond services specializing in ${county.name} and ${county.circuit}.`,
      "url": canonicalUrl,
      "telephone": PHONE_INTL,
      "priceRange": "$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      ],
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": county.name,
        "containsPlace": localCities.map(c => ({
          "@type": "City",
          "name": c.name,
          "url": `https://jstorybailbonds.com${getCityUrl(c.id)}`
        }))
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": details.countySeat,
        "addressRegion": "MO",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": county.lat,
        "longitude": county.lng
      },
      "parentOrganization": {
        "@id": "https://jstorybailbonds.com/#organization"
      }
    },
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl}/#faq`,
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}/#breadcrumb`,
      "itemListElement": breadcrumbs.map((b, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@id": b.url,
          "name": b.name
        }
      }))
    }
  ];

  const htmlFallback = `
    <header style="padding: 2rem 1rem; max-width: 1200px; margin: 0 auto;">
      <nav aria-label="Breadcrumbs">
        <a href="/">Home</a> &gt; <a href="/#service-areas">Service Areas</a> &gt; <span>${county.name}</span>
      </nav>
      <h1>${county.name} Bail Bonds - 24/7 Fast Jail Release</h1>
      <p><strong>Immediate Dispatch Hotline:</strong> <a href="tel:5738549264">${PHONE_NUMBER}</a></p>
      <p>${details.customIntro}</p>
    </header>
    <main style="padding: 1rem; max-width: 1200px; margin: 0 auto;">
      <section>
        <h2>${county.name} Detention Center & Jail Information</h2>
        <p><strong>Jail Name:</strong> ${details.jailName}</p>
        <p><strong>Address:</strong> ${details.jailAddress}</p>
        <p><strong>Supervising Agency:</strong> ${details.sheriffOffice}</p>
        <p><strong>Courts Served:</strong> ${details.localCourts.join(', ')}</p>
        <p>${details.localProcedures}</p>
      </section>
      <section>
        <h2>How to Post Bail in ${county.name}, MO</h2>
        <ol>
          <li>Call Jody Story Bail Bonds 24/7 at <a href="tel:5738549264">${PHONE_NUMBER}</a>.</li>
          <li>We confirm inmate booking details, charges, and bail amount with ${details.jailName}.</li>
          <li>We arrange a flexible 10% premium payment plan tailored to your budget.</li>
          <li>Our licensed bondsman delivers official surety documents to the jail for fast release.</li>
        </ol>
      </section>
      <section>
        <h2>Frequently Asked Questions (${county.name})</h2>
        ${faqs.map(f => `<article><h3>${f.question}</h3><p>${f.answer}</p></article>`).join('\n')}
      </section>
      <section>
        <h2>Municipalities & Cities Served in ${county.name}</h2>
        <ul>
          ${(details.majorCities || []).map(city => `<li>${city}, Missouri</li>`).join('\n')}
        </ul>
      </section>
    </main>
  `;

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage: DEFAULT_IMAGE,
    ogUrl: canonicalUrl,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: DEFAULT_IMAGE,
    breadcrumbs,
    faqs,
    schemaGraph,
    htmlFallback
  };
}

export function getSeoForCity(cityId: string): SeoMetadata | null {
  const city = cities.find(c => c.id === cityId);
  if (!city) return null;

  const countyDetails = countyDetailsMap[city.countyId];
  const cityExtended = cityContentMap[city.id];
  const canonicalUrl = `https://jstorybailbonds.com${getCityUrl(city.id)}`;
  const title = `${city.name} MO Bail Bonds | 24/7 Fast Jail Release | Jody Story`;
  
  let description = `Fast 24/7 bail bonds in ${city.name}, MO. Jody Story offers reliable jail release across ${city.countyName}. Call (573) 854-9264 for immediate assistance.`;
  if (description.length > 160) {
    description = `24/7 bail bonds in ${city.name}, MO. Reliable jail release across ${city.countyName}. Call (573) 854-9264 for immediate assistance.`;
  }

  const keywords = `${city.name} Bail Bonds, ${city.name} MO Bondsman, ${city.circuit} Bail Service, Bail Bonds near ${city.name} Missouri, 24 Hour Jail Release ${city.name}, ${city.countyName} Bail Bonds`;

  const faqs = cityExtended?.faqs || countyDetails?.extendedContent?.faqs || [
    {
      question: `How do I secure a bail bond in ${city.name}, MO?`,
      answer: `To secure an immediate bail bond, contact Jody Story Bail Bonds 24/7 at ${PHONE_NUMBER}. Our experienced bondsmen coordinate directly with the court clerk and duty deputies. You will typically need to pay a standard 10% premium or establish certified collateral to initiate the release procedure.`
    },
    {
      question: `Where will someone arrested in ${city.name} be taken?`,
      answer: countyDetails 
        ? `Individuals arrested in ${city.name} are processed and held at the ${countyDetails.jailName}, located at ${countyDetails.jailAddress}.`
        : `Most individuals arrested within ${city.name} are processed and held at the county detention center near the local courthouse.`
    },
    {
      question: `How long does the bail release process take in ${city.name}?`,
      answer: countyDetails
        ? `Release schedules at the ${countyDetails.jailName} in ${countyDetails.countySeat} generally take between 1 to 3 hours once our certified agent delivers the approved surety or cash filing.`
        : "Standard releases typically range between 1 and 3 hours from the moment our agent registers the authorized bond paperwork with the correctional officers on duty."
    },
    {
      question: `Does Jody Story offer payment plans in ${city.name}?`,
      answer: `Yes, we understand that sudden legal problems are stressful and expensive. We offer customizable financing plans with low down payments and installment configurations suited to your home budget.`
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://jstorybailbonds.com/" },
    { name: city.countyName, url: `https://jstorybailbonds.com/service-area/${city.countyId}` },
    { name: `${city.name} Bail Bonds`, url: canonicalUrl }
  ];

  const schemaGraph = [
    {
      "@type": "Organization",
      "@id": "https://jstorybailbonds.com/#organization",
      "name": "Jody Story Bail Bonds LLC",
      "url": "https://jstorybailbonds.com/",
      "logo": {
        "@type": "ImageObject",
        "url": LOGO_IMAGE
      }
    },
    {
      "@type": "LegalService",
      "@id": `${canonicalUrl}/#localbusiness`,
      "name": `Jody Story Bail Bonds - ${city.name} Office`,
      "description": `Professional 24-hour bail bond services specializing in ${city.name} and ${city.countyName}.`,
      "url": canonicalUrl,
      "telephone": PHONE_INTL,
      "priceRange": "$$",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": city.name,
        "addressRegion": "MO",
        "addressCountry": "US"
      },
      "areaServed": {
        "@type": "City",
        "name": city.name
      },
      "parentOrganization": {
        "@id": "https://jstorybailbonds.com/#organization"
      }
    },
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl}/#faq`,
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}/#breadcrumb`,
      "itemListElement": breadcrumbs.map((b, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@id": b.url,
          "name": b.name
        }
      }))
    }
  ];

  const htmlFallback = `
    <header style="padding: 2rem 1rem; max-width: 1200px; margin: 0 auto;">
      <nav aria-label="Breadcrumbs">
        <a href="/">Home</a> &gt; <a href="/service-area/${city.countyId}">${city.countyName}</a> &gt; <span>${city.name}</span>
      </nav>
      <h1>${city.name} MO Bail Bonds - 24/7 Fast Jail Release</h1>
      <p><strong>24/7 Dispatch Phone:</strong> <a href="tel:5738549264">${PHONE_NUMBER}</a></p>
      <p>${city.description}</p>
    </header>
    <main style="padding: 1rem; max-width: 1200px; margin: 0 auto;">
      <section>
        <h2>Fast Jail Release & Legal Overview for ${city.name}</h2>
        <p>${cityExtended?.overview || `Arrests in ${city.name} require immediate, professional bail bond intervention. Jody Story Bail Bonds provides 24/7 coverage across ${city.countyName}.`}</p>
      </section>
      ${cityExtended?.policeInfo ? `
      <section>
        <h2>Police Department & Detention Center for ${city.name}</h2>
        <p>${cityExtended.policeInfo}</p>
      </section>
      ` : ''}
      ${cityExtended?.courtInfo ? `
      <section>
        <h2>Court & Judicial Circuit Information</h2>
        <p>${cityExtended.courtInfo}</p>
      </section>
      ` : ''}
      <section>
        <h2>Bail Process in ${city.name}, Missouri</h2>
        <p>${cityExtended?.localBondProcess || `Contact Jody Story Bail Bonds at (573) 854-9264. We verify the bond schedule, structure affordable payments, and post surety directly at the detention center for immediate release.`}</p>
      </section>
      <section>
        <h2>Frequently Asked Questions (${city.name})</h2>
        ${faqs.map(f => `<article><h3>${f.question}</h3><p>${f.answer}</p></article>`).join('\n')}
      </section>
    </main>
  `;

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage: DEFAULT_IMAGE,
    ogUrl: canonicalUrl,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: DEFAULT_IMAGE,
    breadcrumbs,
    faqs,
    schemaGraph,
    htmlFallback
  };
}

export function getSeoForHome(): SeoMetadata {
  const canonicalUrl = "https://jstorybailbonds.com/";
  const title = "Missouri Bail Bonds | 24/7 Jody Story Service | Fast Jail Release";
  const description = "Missouri bail bonds available 24/7. Jody Story Bail Bonds offers fast, professional jail release across 11+ Missouri counties. Call (573) 854-9264.";
  const keywords = "Missouri Bail Bonds, 24/7 Bail Bondsman MO, Bail bonds near me, Washington County Bail Bonds, St. Francois Bail Bonds MO, Farmington MO Bail Bonds, Potosi Bail Bondsman, Ste Genevieve Bail Bonds, Iron County Bail Bonds, Franklin County Bail Bonds, 24 Hour Jail Release";

  const faqs = [
    {
      question: "How does the bail bond process work in Missouri?",
      answer: "When someone is arrested in Missouri, a judge or bail schedule sets a bond amount. Instead of paying 100% of the cash bond to the court, you pay a licensed bail bondsman a standard non-refundable 10% premium. Jody Story Bail Bonds posts the full surety guarantee at the detention center, allowing immediate release from jail."
    },
    {
      question: "How much does a bail bond cost in Missouri?",
      answer: "In Missouri, bail bond fees are set at a standard 10% statutory rate of the total bail amount (for example, a $5,000 bond requires a $500 premium). Jody Story Bail Bonds offers flexible payment plans, low down payments, and 0% interest financing for qualifying families."
    },
    {
      question: "What counties does Jody Story Bail Bonds cover?",
      answer: "We provide 24/7 bail bonds across 11 primary Missouri counties: Washington County (Potosi), St. Francois County (Farmington, Park Hills, Bonne Terre), Ste. Genevieve County, Madison County (Fredericktown), Franklin County (Union, Washington), Iron County (Ironton), Dent County (Salem), Wayne County (Greenville), Reynolds County (Ellington), Stoddard County (Bloomfield, Dexter), and Dunklin County (Kennett, Malden), plus statewide jail coverage on demand."
    },
    {
      question: "How fast can an inmate be released after posting bail?",
      answer: "Most Missouri county detention centers process and discharge inmates within 1 to 3 hours after our licensed agent submits the official surety documents. Release time varies depending on jail intake volume and shift changes."
    },
    {
      question: "Does Jody Story offer payment plans or financing?",
      answer: "Yes. We offer customized payment plans with flexible installment schedules tailored to your financial circumstances, with 0% interest for qualifying co-signers and low down payments."
    },
    {
      question: "What types of bail bonds do you write?",
      answer: "We handle all types of state and municipal bonds including Felony charges, Misdemeanors, DWI / DUI, Traffic Warrants, Failure to Appear (FTA), Domestic incidents, Probation Violations, and Drug offenses."
    },
    {
      question: "How do I contact Jody Story Bail Bonds for 24/7 emergency dispatch?",
      answer: "Call our direct emergency dispatch line at (573) 854-9264 anytime day or night, 365 days a year. A licensed Missouri bail agent will answer immediately."
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://jstorybailbonds.com/" }
  ];

  const schemaGraph = [
    {
      "@type": "Organization",
      "@id": "https://jstorybailbonds.com/#organization",
      "name": "Jody Story Bail Bonds LLC",
      "url": "https://jstorybailbonds.com/",
      "logo": {
        "@type": "ImageObject",
        "url": LOGO_IMAGE,
        "width": 600,
        "height": 600
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": PHONE_INTL,
        "contactType": "customer service",
        "areaServed": "US-MO",
        "availableLanguage": "en"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://jstorybailbonds.com/#website",
      "url": "https://jstorybailbonds.com/",
      "name": "Jody Story Bail Bonds",
      "description": "Fast 24/7 Missouri Bail Bond Services across 11+ counties.",
      "publisher": {
        "@id": "https://jstorybailbonds.com/#organization"
      }
    },
    {
      "@type": "LegalService",
      "@id": "https://jstorybailbonds.com/#bailservice",
      "name": "Jody Story Bail Bonds LLC",
      "description": "Professional 24-hour licensed Missouri bail bond company providing rapid jail release across 11+ counties including Washington, St. Francois, Ste. Genevieve, Franklin, and surrounding areas.",
      "url": "https://jstorybailbonds.com/",
      "telephone": PHONE_INTL,
      "priceRange": "$$",
      "currenciesAccepted": "USD",
      "paymentAccepted": "Cash, Credit Card, Debit Card, Wire Transfer, Payment Plans",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "100 N Breton St",
        "addressLocality": "Potosi",
        "addressRegion": "MO",
        "postalCode": "63664",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.9364,
        "longitude": -90.7740
      },
      "areaServed": [
        ...counties.map(c => ({
          "@type": "AdministrativeArea",
          "name": c.name,
          "url": `https://jstorybailbonds.com/service-area/${c.id}`
        })),
        ...cities.map(ct => ({
          "@type": "City",
          "name": ct.name,
          "url": `https://jstorybailbonds.com${getCityUrl(ct.id)}`
        }))
      ],
      "knowsAbout": [
        "Bail Bonds",
        "Missouri Criminal Law",
        "Surety Bonds",
        "Jail Release",
        "Warrant Checks",
        "Payment Plans for Bail"
      ],
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["h1", "h2", ".speakable", "article"]
      },
      "parentOrganization": {
        "@id": "https://jstorybailbonds.com/#organization"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://jstorybailbonds.com/#faq",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://jstorybailbonds.com/#breadcrumb",
      "itemListElement": breadcrumbs.map((b, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@id": b.url,
          "name": b.name
        }
      }))
    }
  ];

  const htmlFallback = `
    <header style="padding: 2rem 1rem; max-width: 1200px; margin: 0 auto;">
      <h1>Missouri Bail Bonds - 24/7 Fast Jail Release | Jody Story Bail Bonds</h1>
      <p><strong>24/7 Emergency Dispatch Line:</strong> <a href="tel:5738549264">${PHONE_NUMBER}</a></p>
      <p>Immediate 24-hour bail bonds across 11+ Missouri counties. 10% statutory rate, flexible financing, 0% interest payment plans, and compassionate local support.</p>
    </header>
    <main style="padding: 1rem; max-width: 1200px; margin: 0 auto;">
      <section>
        <h2>How to Get Released from Jail Fast in Missouri (4-Step Process)</h2>
        <ol>
          <li><strong>Call 24/7 Dispatch:</strong> Contact Jody Story at <a href="tel:5738549264">${PHONE_NUMBER}</a>.</li>
          <li><strong>Inmate Verification:</strong> We immediately locate the inmate, verify charges, and confirm the set bail amount with the detention center.</li>
          <li><strong>Affordable Payment Arrangement:</strong> Pay the standard 10% fee or set up an easy installment payment plan with low down payment.</li>
          <li><strong>Immediate Jail Release:</strong> Our licensed bondsman posts the surety bond at the detention facility for prompt release (typically 1–3 hours).</li>
        </ol>
      </section>
      <section>
        <h2>Missouri Counties Served (24/7 Coverage)</h2>
        <ul>
          ${counties.map(c => `<li><a href="/service-area/${c.id}">${c.name} Bail Bonds</a> (${c.circuit}) - 24/7 Service</li>`).join('\n          ')}
        </ul>
      </section>
      <section>
        <h2>Featured Cities & Municipalities</h2>
        <ul>
          <li><a href="/bonne-terre-mo-bail-bonds--24/7-jail-release-services">Bonne Terre MO Bail Bonds</a></li>
          <li><a href="/ironton-bail-bonds-247-jail-release">Ironton MO Bail Bonds</a></li>
          ${cities.filter(ct => ct.id !== 'bonne-terre' && ct.id !== 'ironton').map(ct => `<li><a href="/service-area/city/${ct.id}">${ct.name} MO Bail Bonds</a> (${ct.countyName})</li>`).join('\n          ')}
        </ul>
      </section>
      <section>
        <h2>Types of Bail Bonds We Handle</h2>
        <ul>
          <li>Felony Bail Bonds</li>
          <li>Misdemeanor Bail Bonds</li>
          <li>DWI & DUI Arrests</li>
          <li>Failure to Appear (FTA) & Bench Warrants</li>
          <li>Traffic & Municipal Violations</li>
          <li>Domestic & Probation Violations</li>
        </ul>
      </section>
      <section>
        <h2>Frequently Asked Questions</h2>
        ${faqs.map(f => `<article><h3>${f.question}</h3><p>${f.answer}</p></article>`).join('\n        ')}
      </section>
    </main>
  `;

  return {
    title,
    description,
    keywords,
    canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage: DEFAULT_IMAGE,
    ogUrl: canonicalUrl,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: DEFAULT_IMAGE,
    breadcrumbs,
    faqs,
    schemaGraph,
    htmlFallback
  };
}

export function getSeoForPath(rawPath: string): SeoMetadata | null {
  const cleanPath = (rawPath || '').toLowerCase().replace(/\/+$/, "") || "/";

  if (cleanPath === "/" || cleanPath === "/index.html") {
    return getSeoForHome();
  }
  if (cleanPath === "/bonne-terre-mo-bail-bonds--24/7-jail-release-services") {
    return getSeoForCity("bonne-terre");
  }
  if (cleanPath === "/ironton-bail-bonds-247-jail-release") {
    return getSeoForCity("ironton");
  }
  if (cleanPath.startsWith("/service-area/city/")) {
    const cityId = cleanPath.substring("/service-area/city/".length);
    return getSeoForCity(cityId);
  }
  if (cleanPath.startsWith("/service-area/")) {
    const countyId = cleanPath.substring("/service-area/".length);
    return getSeoForCounty(countyId);
  }

  return null;
}
