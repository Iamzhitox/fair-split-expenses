"use client";
import StepsData from "@/helpers/StepsData";
import React from "react";
import { usePathname } from "next/navigation";
import useWindowSize from "@/hooks/useWindowSize";
import { BsCheckLg } from "react-icons/bs";

const Steps = () => {
	const currentPath = usePathname();
	const stepNumber = Number(currentPath.split("step/")[1]);
	const { subtitle } = StepsData.find((sd) => sd.id === stepNumber);
	const windowSize = useWindowSize()

	return (
		<div className={windowSize <= 1080 ? "w-screen bg-indigo-600 flex flex-col justify-center items-start" : "w-screen bg-indigo-600 flex flex-col justify-center items-center"}>
			<div className={windowSize <= 1080 ? `flex py-7 pl-4` : `flex py-7 w-1/2 pl-4`}>
				{StepsData.map((step) => {
					const { id, title, icon, iconActive } = step;
					return stepNumber === id ? (
						<div key={id} className="flex">
							<div className="flex gap-4 items-center justify-start text-lg ">
                                <div className={`w-12 h-12 rounded-full  flex justify-center items-center ${id === 3 ? 'bg-green-500' : id === 2 ? 'bg-gradient-to-r from-green-500 to-indigo-300' : 'bg-indigo-300'}`}>
                                    <div className="w-11 h-11 rounded-full flex justify-center items-center border-[3px] border-indigo-600 bg-indigo-900 ">
                                        <span className="text-sm text-indigo-100">
                                            {id < 3 ? `${id}/2` : <BsCheckLg className="text-green-500 text-2xl"/>}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-indigo-50 text-lg -mt-1">
                                        {title}
                                    </span>
                                    <span className="text-xs font-light text-indigo-300">
                                        {subtitle}
                                    </span>
                                </div>
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
		</div>
	);
};

export default Steps;
