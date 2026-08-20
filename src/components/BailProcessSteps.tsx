import { PhoneCall, Search, FileSignature, DoorOpen } from 'lucide-react';

interface BailProcessStepsProps {
  locationName: string;
  jailName?: string;
}

export default function BailProcessSteps({ locationName, jailName }: BailProcessStepsProps) {
  const steps = [
    {
      number: "01",
      icon: PhoneCall,
      title: "Call 24/7 Dispatch",
      detail: `Contact Jody Story Bail Bonds immediately at (573) 854-9264. Have the defendant's name and approximate arrest location in ${locationName}.`
    },
    {
      number: "02",
      icon: Search,
      title: "Bail & Booking Verification",
      detail: `Our licensed agents instantly verify charges, bail figures, and booking status directly with ${jailName || `the local ${locationName} detention center`}.`
    },
    {
      number: "03",
      icon: FileSignature,
      title: "Flexible 10% Financing",
      detail: `We execute the state-compliant 10% premium agreement. We offer low down payments and customizable installment plans tailored to your budget.`
    },
    {
      number: "04",
      icon: DoorOpen,
      title: "Immediate Jail Release",
      detail: `Our agent physically delivers approved surety documents to the jail intake desk. Discharge is typically completed within 1 to 3 hours.`
    }
  ];

  return (
    <div className="space-y-8">
      <div className="border-l-4 border-brand-primary pl-6">
        <p className="text-[10px] text-brand-primary uppercase font-black tracking-[0.3em] leading-none mb-2">Step-by-Step Guide</p>
        <h3 className="text-2xl sm:text-3xl font-serif text-white italic font-black uppercase tracking-tight">
          How to Get Someone Out of Jail in {locationName}
        </h3>
        <p className="text-brand-text-dim text-sm mt-2 font-light max-w-2xl">
          We streamline the bail bonding process from initial booking lookup to final release.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="bg-brand-surface border border-brand-border p-6 rounded-sm relative overflow-hidden group hover:border-brand-primary/60 transition-all flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 p-3 text-2xl font-mono font-black text-brand-border/60 group-hover:text-brand-primary/40 transition-colors">
                {step.number}
              </div>

              <div>
                <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-sm w-fit mb-4 group-hover:bg-brand-primary/20 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-white text-base font-bold mb-2">
                  {step.title}
                </h4>
                <p className="text-xs text-brand-text-dim leading-relaxed font-light">
                  {step.detail}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-brand-border/40 flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-widest text-brand-accent font-bold">Step {step.number}</span>
                <span className="text-[9px] text-brand-text-dim">Fast 24/7 Action</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
