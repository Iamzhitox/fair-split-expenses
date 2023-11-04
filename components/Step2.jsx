"use client";
import React, { useState, useEffect, useRef } from "react";
import NavButtons from "./NavButtons";
import useDataStore from "@/store/Data";

const Step2 = () => {
	const { budgetAmount, setBudgetAmount } = useDataStore();

	const inpBudget = useRef(null);
	useEffect(() => {
		inpBudget.current.focus();
	}, []);

	return (
		<>
			<div className="w-full p-4 flex justify-center">
				<form
					onSubmit={(e) => e.preventDefault()}
					className="flex flex-col gap-6 w-full"
				>
					<div className="flex flex-col">
						<label htmlFor="" className="text-sm font-bold ">
							Presupuesto / Gastos del mes
						</label>
						<div className="rounded-md border-solid border border-slate-300 ">
							<span className="ml-1 pl-2 pr-1 text-slate-400">
								$
							</span>
							<input
								ref={inpBudget}
								type="number"
								className={`focus:outline-none pl-0 pr-4 py-2 bg-transparent`}
								placeholder="100.000,00"
								name="budget"
								onChange={(e) =>
									setBudgetAmount(Number(e.target.value))
								}
								value={budgetAmount > 0 ? budgetAmount : ""}
							/>
						</div>
					</div>
				</form>
			</div>
			<NavButtons />
		</>
	);
};

export default Step2;
