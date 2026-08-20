import { Phone, ShieldCheck, Zap } from 'lucide-react';

interface FloatingCallBarProps {
  locationName: string;
}

export default function FloatingCallBar({ locationName }: FloatingCallBarProps) {
  return (
    <aside aria-label="Emergency contact" className="fixed bottom-0 left-0 right-0 z-40 bg-brand-surface/95 backdrop-blur-md border-t border-brand-primary/40 px-4 py-3 sm:hidden shadow-[0_-10px_25px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <div className="truncate">
            <p className="text-[10px] text-brand-primary font-black uppercase tracking-wider truncate">
              {locationName} 24/7 Agent
            </p>
            <p className="text-[11px] text-white font-mono font-bold">
              (573) 854-9264
            </p>
          </div>
        </div>

        <a
          href="tel:5738549264"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brand-accent text-black font-black uppercase tracking-wider text-[11px] rounded-sm shadow-[0_0_15px_rgba(255,184,0,0.4)] hover:bg-white transition-all shrink-0 active:scale-95"
        >
          <Phone className="w-3.5 h-3.5 fill-current" />
          <span>Call Now</span>
        </a>
      </div>
    </aside>
  );
}
