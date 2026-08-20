import { ShieldAlert, Car, Scale, FileWarning, Home, HeartHandshake, AlertTriangle, Key } from 'lucide-react';

interface BailBondTypesProps {
  locationName: string;
}

export default function BailBondTypes({ locationName }: BailBondTypesProps) {
  const bondTypes = [
    {
      title: "Felony Bail Bonds",
      icon: ShieldAlert,
      description: `Immediate surety filing for Class A, B, C, D, and E felonies in ${locationName}. We navigate grand jury indictments and felony warrant holds with complete confidentiality.`
    },
    {
      title: "Misdemeanor Bail Bonds",
      icon: Scale,
      description: `Fast release for Class A, B, and C misdemeanors across ${locationName}. Rapid dispatch directly to local detention centers so you or your family member can return home.`
    },
    {
      title: "DWI & DUI Arrests",
      icon: Car,
      description: `24/7 bail support for first-time or repeat driving while intoxicated offenses, breathalyzer refusal holds, and municipal traffic violations in ${locationName}.`
    },
    {
      title: "Warrant & FTA Clearances",
      icon: FileWarning,
      description: `Assistance with Failure to Appear (FTA) bench warrants, probation violations, and missed court appearances before the local Circuit and Municipal court judges.`
    },
    {
      title: "Domestic Incident Bonds",
      icon: Home,
      description: `Discreet, compassionate handling of domestic disturbance arrests, protective order violations, and emergency hearings in ${locationName}.`
    },
    {
      title: "Drug & Controlled Substances",
      icon: AlertTriangle,
      description: `Expert assistance for possession, distribution, and paraphernalia charges across local law enforcement jurisdictions in ${locationName}.`
    },
    {
      title: "Cash & Surety Combinations",
      icon: Key,
      description: `Flexible 10% premium surety bonds, split cash bonds, and property collateral options customized to your family's financial situation.`
    },
    {
      title: "24/7 Emergency Jail Release",
      icon: HeartHandshake,
      description: `Round-the-clock live dispatch. We coordinate directly with local sheriff deputies, court clerks, and jail intake staff at any hour of the day or night.`
    }
  ];

  return (
    <div className="space-y-8">
      <div className="border-l-4 border-brand-accent pl-6">
        <p className="text-[10px] text-brand-primary uppercase font-black tracking-[0.3em] leading-none mb-2">Comprehensive Coverage</p>
        <h3 className="text-2xl sm:text-3xl font-serif text-white italic font-black uppercase tracking-tight">
          Types of Bail Bonds Handled in {locationName}
        </h3>
        <p className="text-brand-text-dim text-sm mt-2 font-light max-w-2xl">
          Jody Story Bail Bonds provides fast, professional release services for all state, county, and municipal charges across the region.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {bondTypes.map((type, idx) => {
          const Icon = type.icon;
          return (
            <div
              key={idx}
              className="bg-brand-surface/60 border border-brand-border/80 p-5 rounded-sm hover:border-brand-primary/60 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="p-2.5 bg-brand-primary/10 border border-brand-primary/20 text-brand-accent rounded-sm w-fit mb-3 group-hover:bg-brand-primary/20 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-white text-sm font-bold tracking-wide mb-2 group-hover:text-brand-accent transition-colors">
                  {type.title}
                </h4>
                <p className="text-xs text-brand-text-dim leading-relaxed font-light">
                  {type.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-border/40 flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-widest text-brand-primary font-black">24/7 Available</span>
                <span className="text-[9px] text-brand-text-dim font-mono">10% Statutory Rate</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
