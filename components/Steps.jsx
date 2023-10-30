"use client";
import StepsData from "@/helpers/StepsData";
import React from "react";
import { usePathname } from "next/navigation";
import useWindowSize from "@/hooks/useWindowSize";

const Steps = () => {
	const currentPath = usePathname();
	const stepNumber = Number(currentPath.split("step/")[1]);
	const { subtitle } = StepsData.find((sd) => sd.id === stepNumber);
	const windowSize = useWindowSize()

	return (
		<div className="w-screen bg-indigo-600 flex flex-col justify-center items-center">
			<div className={windowSize <= 1080 ? `flex pt-7 ml-3` : `flex pt-7 w-1/3 pl-4`}>
				{StepsData.map((step) => {
					const { id, title, icon, iconActive } = step;
					return stepNumber === id ? (
						<div key={id} className="flex flex-col items-start">
							<div className="flex gap-4 items-start justify-start text-lg ">
								{/* <span className='text-white'>{icon} </span> */}
								<span className="text-indigo-50  -mt-1">
									{title}
								</span>
							</div>
						</div>
					) : (
						<div key={id} className="flex flex-col items-start">
							<div className="flex gap-4 items-start justify-start text-lg ">
								{/* <span className='text-white'>{stepNumber >= id ? iconActive : icon} </span> */}
							</div>
						</div>
					);
				})}
			</div>
			<span className={windowSize <= 1080 ? `text-sm pb-7 ml-3.5 font-light text-indigo-300` : `text-sm pb-7 w-1/3 font-light text-indigo-300 pl-4`}>
				{subtitle}
			</span>
		</div>
	);
};

export default Steps;
