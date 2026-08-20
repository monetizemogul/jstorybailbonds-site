/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import StickyCallBanner from './components/StickyCallBanner';

const HomePage = lazy(() => import('./pages/HomePage'));
const CountyPage = lazy(() => import('./pages/CountyPage'));
const CityPage = lazy(() => import('./pages/CityPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const BailDispatcher = lazy(() => import('./components/BailDispatcher'));
const LegalModals = lazy(() => import('./components/LegalModals'));
const AIChat = lazy(() => import('./components/AIChat'));

export default function App() {
  const [shouldRenderDeferred, setShouldRenderDeferred] = useState(false);
  const [hasLegalHash, setHasLegalHash] = useState(false);

  useEffect(() => {
    // Defers the overlays to boost initial FCP/LCP and lower main-thread pressure
    const timer = setTimeout(() => {
      setShouldRenderDeferred(true);
    }, 1500);

    // Only load LegalModals on-demand when one of the matching legal hashes exists
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      const isLegalHash = ['#privacy', '#terms', '#licensing', '#resources', '#disclaimer'].includes(hash);
      if (isLegalHash) {
        setHasLegalHash(true);
      }
    };
    
    checkHash();
    window.addEventListener('hashchange', checkHash);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="relative font-sans text-brand-navy bg-brand-paper">
          <Navbar />
          <Suspense fallback={
            <div className="min-h-screen bg-brand-bg flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              {/* Canonical SEO Landing Pages */}
              <Route path="/bonne-terre-mo-bail-bonds--24/7-jail-release-services" element={<CityPage forceCityId="bonne-terre" />} />
              <Route path="/ironton-bail-bonds-247-jail-release" element={<CityPage forceCityId="ironton" />} />
              
              {/* Dynamic Service Areas */}
              <Route path="/service-area/:countyId" element={<CountyPage />} />
              <Route path="/service-area/city/:cityId" element={<CityPage />} />

              {/* Standard Site Sections / Landing Routes */}
              <Route path="/services" element={<HomePage />} />
              <Route path="/contact" element={<HomePage />} />
              <Route path="/calculator" element={<HomePage />} />
              <Route path="/bail-calculator" element={<HomePage />} />
              <Route path="/faq" element={<HomePage />} />
              <Route path="/how-it-works" element={<HomePage />} />
              <Route path="/process" element={<HomePage />} />
              <Route path="/service-areas" element={<HomePage />} />
              <Route path="/locations" element={<HomePage />} />
              <Route path="/about" element={<HomePage />} />
              <Route path="/reviews" element={<HomePage />} />
              <Route path="/warrants" element={<HomePage />} />
              <Route path="/jail-release" element={<HomePage />} />
              <Route path="/privacy" element={<HomePage />} />
              <Route path="/terms" element={<HomePage />} />
              <Route path="/licensing" element={<HomePage />} />
              <Route path="/resources" element={<HomePage />} />
              <Route path="/disclaimer" element={<HomePage />} />

              {/* Legacy & Shortcut Redirects */}
              <Route path="/felony-bail-bonds" element={<Navigate to="/" replace />} />
              <Route path="/misdemeanor-bail-bonds" element={<Navigate to="/" replace />} />
              <Route path="/dui-bail-bonds" element={<Navigate to="/" replace />} />
              <Route path="/24-hour-bail-bonds" element={<Navigate to="/" replace />} />
              <Route path="/bail-bonds" element={<Navigate to="/" replace />} />
              <Route path="/bondsman" element={<Navigate to="/" replace />} />
              
              <Route path="/service-area/city/bonne-terre" element={<Navigate to="/bonne-terre-mo-bail-bonds--24/7-jail-release-services" replace />} />
              <Route path="/bonne-terre" element={<Navigate to="/bonne-terre-mo-bail-bonds--24/7-jail-release-services" replace />} />
              
              <Route path="/service-area/city/ironton" element={<Navigate to="/ironton-bail-bonds-247-jail-release" replace />} />
              <Route path="/ironton" element={<Navigate to="/ironton-bail-bonds-247-jail-release" replace />} />
              
              <Route path="/potosi" element={<Navigate to="/service-area/city/potosi" replace />} />
              <Route path="/farmington" element={<Navigate to="/service-area/city/farmington" replace />} />
              <Route path="/park-hills" element={<Navigate to="/service-area/city/park-hills" replace />} />
              <Route path="/union" element={<Navigate to="/service-area/city/union" replace />} />
              <Route path="/salem" element={<Navigate to="/service-area/city/salem" replace />} />
              <Route path="/fredericktown" element={<Navigate to="/service-area/city/fredericktown" replace />} />
              <Route path="/greenville" element={<Navigate to="/service-area/city/greenville" replace />} />
              <Route path="/ellington" element={<Navigate to="/service-area/city/ellington" replace />} />
              <Route path="/bloomfield" element={<Navigate to="/service-area/city/bloomfield" replace />} />
              <Route path="/dexter" element={<Navigate to="/service-area/city/dexter" replace />} />
              <Route path="/kennett" element={<Navigate to="/service-area/city/kennett" replace />} />
              <Route path="/malden" element={<Navigate to="/service-area/city/malden" replace />} />
              <Route path="/ste-genevieve" element={<Navigate to="/service-area/ste-genevieve" replace />} />
              <Route path="/washington" element={<Navigate to="/service-area/washington" replace />} />
              
              <Route path="/franklin" element={<Navigate to="/service-area/franklin" replace />} />
              <Route path="/iron" element={<Navigate to="/service-area/iron" replace />} />
              <Route path="/dent" element={<Navigate to="/service-area/dent" replace />} />
              <Route path="/wayne" element={<Navigate to="/service-area/wayne" replace />} />
              <Route path="/reynolds" element={<Navigate to="/service-area/reynolds" replace />} />
              <Route path="/stoddard" element={<Navigate to="/service-area/stoddard" replace />} />
              <Route path="/dunklin" element={<Navigate to="/service-area/dunklin" replace />} />
              <Route path="/madison" element={<Navigate to="/service-area/madison" replace />} />

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
          <Footer />
          <StickyCallBanner />
          
          {shouldRenderDeferred && (
            <>
              {hasLegalHash && (
                <Suspense fallback={null}>
                  <LegalModals />
                </Suspense>
              )}
              <Suspense fallback={null}>
                <AIChat />
              </Suspense>
              <Suspense fallback={null}>
                <BailDispatcher />
              </Suspense>
            </>
          )}
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

