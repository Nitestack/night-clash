import { forwardRef } from "react";

type ProgressProps = { 
    percentage: number; 
};

const Progress = forwardRef<HTMLDivElement, ProgressProps>(({ percentage, children }, ref) => (
    <div ref={ref} className="w-[11.5rem] bg-[linear-gradient(to_bottom,#8Ad93A_0%,#90D737_49%#42AA04_50%#38A901_50%,#38A901_100%)] rounded-md relative h-7 border-2 border-solid border-[#3C3F50]">
        <div className="max-w-[11.25rem] h-6 bg-cocgreenbackground text-black font-coc-description text-center p-0.5 leading-none rounded-sm" style={{ width: `${percentage}%` }}>{children}</div>
    </div>
));

export default Progress;