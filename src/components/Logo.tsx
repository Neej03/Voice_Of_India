import { motion } from 'motion/react';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
        {/* Outer orbit */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-2 border-primary/30 border-t-primary border-r-transparent"
        />
        {/* Inner orbit */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[3px] rounded-full border-2 border-secondary/30 border-b-secondary border-l-transparent"
        />
        {/* Core */}
        <div className="absolute inset-[8px] rounded-full bg-gradient-to-tr from-primary to-secondary shadow-[0_0_15px_rgba(139,92,246,0.8)] flex items-center justify-center overflow-hidden">
          {/* Indian map to represent Indian languages */}
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current" aria-hidden="true">
            <path d="M7.933,0.697L8.816,1.659L8.733,2.329L9.06,2.75L9.033,3.169L8.443,3.059L8.674,3.964L9.48,4.484L10.622,5.058L10.101,5.43L9.782,6.199L10.577,6.509L11.352,6.912L12.423,7.373L13.548,7.479L14.022,7.897L14.656,7.975L15.644,8.167L16.328,8.153L16.422,7.828L16.314,7.306L16.378,6.952L16.878,6.78L16.947,7.426L16.965,7.591L17.711,7.903L18.228,7.774L18.921,7.829L19.591,7.805L19.649,7.3L19.314,7.038L19.977,6.936L20.724,6.325L21.671,5.802L22.359,6.004L22.945,5.658L23.33,6.169L23.053,6.513L23.938,6.636L24,6.947L23.712,7.098L23.779,7.603L23.193,7.455L22.13,8.022L22.154,8.492L21.701,9.181L21.66,9.581L21.294,10.258L20.652,10.071L20.62,10.921L20.434,11.201L20.521,11.549L20.116,11.744L19.683,10.442L19.457,10.444L19.322,10.969L18.873,10.543L19.126,10.076L19.494,10.029L19.872,9.334L19.399,9.193L18.637,9.206L17.856,9.093L17.784,8.522L17.392,8.482L16.741,8.127L16.45,8.684L17.044,9.119L16.53,9.424L16.348,9.724L16.854,9.944L16.714,10.439L16.998,11.056L17.126,11.732L17.009,12.032L16.45,12.022L15.438,12.192L15.485,12.81L15.046,13.296L13.865,13.849L12.946,14.815L12.328,15.333L11.51,15.87L11.509,16.248L11.099,16.45L10.36,16.745L9.976,16.788L9.73,17.414L9.901,18.482L9.944,19.164L9.596,19.944L9.593,21.339L9.168,21.379L8.794,22.005L9.044,22.276L8.295,22.509L8.019,23.067L7.689,23.303L6.911,22.536L6.531,21.386L6.216,20.558L5.929,20.17L5.492,19.381L5.289,18.354L5.147,17.841L4.4,16.713L4.059,15.122L3.814,14.071L3.817,13.076L3.657,12.307L2.462,12.798L1.884,12.7L0.811,11.705L1.206,11.408L0.963,11.086L0,10.389L0.547,9.841L2.354,9.843L2.191,9.138L1.73,8.721L1.636,8.089L1.099,7.721L2.004,6.86L2.957,6.922L3.816,6.061L4.331,5.228L5.128,4.404L5.115,3.819L5.816,3.344L5.153,2.938L4.868,2.382L4.577,1.663L4.979,1.309L6.225,1.509L7.14,1.387Z" />
          </svg>
        </div>
      </div>
      <span className="text-2xl font-display font-bold tracking-wide gradient-text">
        Voice Of India
      </span>
    </div>
  );
}
