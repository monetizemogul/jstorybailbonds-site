import { useState, useMemo } from 'react';
import { Calculator as CalcIcon, Phone, CheckCircle2, ArrowRight } from 'lucide-react';

interface LocalBailCalculatorProps {
  locationName: string;
  isCounty?: boolean;
}

export default function LocalBailCalculator({ locationName }: LocalBailCalculatorProps) {
  const [bailAmount, setBailAmount] = useState<number>(5000);

  const presetAmounts = [1000, 2500, 5000, 10000, 25000, 50000];

  const calculation = useMemo(() => {
    const totalBail = Math.max(0, bailAmount || 0);
    const standardPremium = totalBail * 0.10; // 10% Missouri standard
    const minDownPayment = Math.max(100, Math.round(standardPremium * 0.40)); // 40% of premium down
    const remainingBalance = standardPremium - minDownPayment;
    const estimatedMonthly = remainingBalance > 0 ? Math.round(remainingBalance / 3) : 0; // 3-month plan estimate

    return {
      totalBail,
      standardPremium,
      minDownPayment,
      remainingBalance,
      estimatedMonthly
    };
  }, [bailAmount]);

  return (
    <div className="bg-brand-surface border border-brand-primary/30 p-6 sm:p-8 rounded-sm shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between border-b border-brand-border/60 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-primary/20 text-brand-primary rounded-sm">
            <CalcIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-white font-serif text-lg font-bold italic">
              {locationName} Bail Cost Calculator
            </h3>
            <p className="text-[10px] text-brand-accent uppercase tracking-widest font-black">
              Official Missouri 10% Statutory Rate
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block text-[9px] bg-brand-accent/10 border border-brand-accent/30 text-brand-accent px-2.5 py-1 font-black uppercase tracking-wider rounded-sm">
          0% Interest Terms
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <label htmlFor="local-bail-input" className="block text-xs uppercase tracking-widest text-brand-text-dim font-bold mb-2">
            Enter Set Bail Amount ($):
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-serif text-brand-accent/80 italic font-bold">
              $
            </span>
            <input
              id="local-bail-input"
              type="number"
              min="0"
              max="1000000"
              step="500"
              value={bailAmount || ''}
              onChange={(e) => setBailAmount(Number(e.target.value))}
              placeholder="e.g. 5000"
              className="w-full bg-brand-bg/80 border border-brand-border/80 focus:border-brand-accent text-white pl-10 pr-4 py-3 text-xl font-mono rounded-sm outline-none transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-[10px] text-brand-text-dim uppercase tracking-wider self-center mr-1">Quick Select:</span>
            {presetAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setBailAmount(amt)}
                className={`text-[10px] font-mono px-2.5 py-1 rounded-sm border transition-all ${
                  bailAmount === amt
                    ? 'bg-brand-accent text-black border-brand-accent font-bold shadow-sm'
                    : 'bg-brand-surface/60 border-brand-border text-brand-text-dim hover:text-white hover:border-brand-primary/50'
                }`}
              >
                ${amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-brand-bg/60 border border-brand-border/60 rounded-sm">
            <p className="text-[10px] text-brand-text-dim uppercase tracking-wider font-bold">Total Bond Amount</p>
            <p className="text-xl font-mono text-white font-bold mt-1">
              ${calculation.totalBail.toLocaleString()}
            </p>
            <p className="text-[9px] text-brand-text-dim mt-1">Set by Court / Schedule</p>
          </div>

          <div className="p-4 bg-brand-primary/10 border border-brand-primary/30 rounded-sm">
            <p className="text-[10px] text-brand-primary uppercase tracking-wider font-bold">10% Standard Premium</p>
            <p className="text-2xl font-mono text-brand-accent font-black mt-1">
              ${calculation.standardPremium.toLocaleString()}
            </p>
            <p className="text-[9px] text-brand-text-dim mt-1">Missouri Legal Maximum</p>
          </div>

          <div className="p-4 bg-brand-bg/60 border border-brand-border/60 rounded-sm">
            <p className="text-[10px] text-brand-text-dim uppercase tracking-wider font-bold">Estimated Down Payment</p>
            <p className="text-xl font-mono text-[#00D2FF] font-bold mt-1">
              From ${calculation.minDownPayment.toLocaleString()}
            </p>
            <p className="text-[9px] text-brand-text-dim mt-1">Flexible Payment Plans</p>
          </div>
        </div>

        <div className="p-4 bg-brand-surface/40 border border-brand-border/40 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-white text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-brand-accent" />
              <span>Need help with bail for someone in {locationName}?</span>
            </div>
            <p className="text-[11px] text-brand-text-dim font-light">
              We work with cosigners on down payments, collateral, and payment installments.
            </p>
          </div>

          <a
            href="tel:5738549264"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-accent text-black font-black uppercase tracking-widest text-[11px] hover:bg-white transition-all shadow-[0_0_20px_rgba(255,184,0,0.3)] rounded-sm shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            Lock In Rate: (573) 854-9264
          </a>
        </div>
      </div>
    </div>
  );
}
