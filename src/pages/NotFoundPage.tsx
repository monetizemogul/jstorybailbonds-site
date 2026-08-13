import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldAlert, Phone, ArrowLeft, Home, MapPin, Compass } from 'lucide-react';
import { counties } from './counties';
import { cities } from './cities';
import { getCityUrl } from '../utils/urls';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>404 - Page Not Found | Jody Story Bail Bonds</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="description" content="The page you requested cannot be found. Jody Story Bail Bonds is available 24/7 for fast Missouri jail release. Call (573) 854-9264." />
      </Helmet>

      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-accent mb-8 animate-pulse">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <h1 className="text-5xl sm:text-7xl font-serif font-black tracking-tight text-white mb-4">
          404 <span className="text-brand-accent text-3xl sm:text-5xl block sm:inline font-sans font-bold">| Page Not Found</span>
        </h1>

        <p className="text-lg sm:text-xl text-brand-text-dim max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          The page or document you are looking for does not exist or has been moved. If you or a loved one needs immediate bail assistance, our licensed Missouri bondsmen are on call 24 hours a day.
        </p>

        {/* Immediate 24/7 Call to Action */}
        <div className="bg-brand-surface border border-brand-border/60 rounded-xl p-6 sm:p-8 mb-12 max-w-2xl mx-auto shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="text-brand-primary text-xs font-mono font-bold uppercase tracking-widest block mb-1">
                Emergency 24/7 Dispatch
              </span>
              <p className="text-white font-serif font-bold text-lg">
                Need immediate jail release in Missouri?
              </p>
            </div>
            <a
              id="not-found-emergency-call"
              href="tel:5738549264"
              className="inline-flex items-center justify-center gap-3 bg-brand-accent hover:bg-brand-accent-light text-brand-bg font-black px-6 py-4 rounded-lg uppercase tracking-wider transition-all transform hover:scale-[1.02] shadow-lg text-base w-full sm:w-auto"
            >
              <Phone className="w-5 h-5 fill-current" />
              (573) 854-9264
            </a>
          </div>
        </div>

        {/* Quick Navigation Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-brand-surface hover:bg-brand-surface/80 border border-brand-border/80 text-white font-bold px-6 py-3 rounded-lg transition-all"
          >
            <Home className="w-4 h-4 text-brand-primary" />
            Return to Homepage
          </Link>
          <a
            href="/#calculator"
            className="inline-flex items-center gap-2 bg-brand-surface hover:bg-brand-surface/80 border border-brand-border/80 text-white font-bold px-6 py-3 rounded-lg transition-all"
          >
            <Compass className="w-4 h-4 text-brand-accent" />
            Bail Fee Calculator
          </a>
        </div>

        {/* Primary Service Areas Grid */}
        <div className="text-left bg-brand-surface/50 border border-brand-border/40 rounded-2xl p-6 sm:p-10">
          <h2 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-2 border-b border-brand-border/40 pb-3">
            <MapPin className="w-5 h-5 text-brand-accent" />
            Explore Active Missouri Service Counties & Cities
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm mb-8">
            {counties.slice(0, 11).map((county) => (
              <Link
                key={county.id}
                to={`/service-area/${county.id}`}
                className="text-brand-text-dim hover:text-brand-primary transition-colors py-1 truncate flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 inline-block"></span>
                {county.name}
              </Link>
            ))}
          </div>

          <h3 className="text-sm font-bold text-brand-accent uppercase tracking-wider mb-4">
            Popular Municipalities Served:
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {cities.map((city) => (
              <Link
                key={city.id}
                to={getCityUrl(city.id)}
                className="bg-brand-bg hover:bg-brand-surface border border-brand-border/60 hover:border-brand-primary/60 text-brand-text-dim hover:text-white px-3 py-1.5 rounded-md transition-all"
              >
                {city.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
