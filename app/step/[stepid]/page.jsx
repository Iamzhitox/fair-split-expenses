'use client'
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";
import useWindowSize from "@/hooks/useWindowSize";

const StepNumber = ({ params }) => {
    const windowSize = useWindowSize()

	const steps = {
		1: <Step1 />,
		2: <Step2 />,
		3: <Step3 />,
	};
    return windowSize > 1080 ? 
        <div className="flex justify-center">
            <div className="flex w-1/3 justify-center">{steps[params.stepid]}</div>
        </div>
    : 
        steps[params.stepid]
};

export default StepNumber;
