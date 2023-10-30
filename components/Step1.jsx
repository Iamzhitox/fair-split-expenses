"use client";

import { useState } from "react";
import { BsFillXCircleFill } from "react-icons/bs";
import useDataStore from "@/store/Data";
import Contributors from "./Contributors";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Step1 = () => {
	const { contributors, addContributor, editContributor } = useDataStore();
	const colors = [
		{
			name: "pink",
			code: "bg-red-200",
			actived:
				"bg-red-300 shadow-lg shadow-red-500 border border-red-400 -translate-y-2 transition duration-200",
		},
		{
			name: "yellow",
			code: "bg-amber-200",
			actived:
				"bg-amber-300 shadow-lg shadow-amber-500 border border-amber-400 -translate-y-2 transition duration-200",
		},
		{
			name: "green",
			code: "bg-emerald-200",
			actived:
				"bg-emerald-300 shadow-lg shadow-emerald-500 border border-emerald-400 -translate-y-2 transition duration-200",
		},
		{
			name: "blue",
			code: "bg-sky-200",
			actived:
				"bg-sky-300 shadow-lg shadow-sky-500 border border-sky-400 -translate-y-2 transition duration-200",
		},
		{
			name: "orange",
			code: "bg-orange-200",
			actived:
				"bg-orange-300 shadow-lg shadow-orange-500 border border-orange-400 -translate-y-2 transition duration-200",
		},
	];

	const [tax, setTax] = useState({
		percent: 0,
		name: "",
		id: 0,
	});

	const [formData, setFormData] = useState({
		fullname: "",
		salaryType: "neto",
		salary: 0,
		taxes: [],
		color: "pink",
        id: null
	});

    const [editing, setEditing] = useState(false)
    const [errors, setErrors] = useState({fullname: false, salary: false})
    
	const handleSubmit = (e) => {
		e.preventDefault();
        if (formData.fullname === "") {
            toast.error('Añada un nombre', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setErrors( prev => ({prev, fullname: true}))
            return
        } else if (formData.salary <= 0) {
            toast.error('Sueldo no válido', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setErrors( prev => ({prev, salary: true}))
            return
        }
        setErrors({fullname: false, salary: false})

        setTax({
            percent: 0,
			name: "",
			id: 0,
		});
        
        if (editing) {
            editContributor(formData)
            setEditing(false)
        }
        else 
            addContributor(formData)

        setFormData({
            fullname: "",
            salaryType: "neto",
            salary: 0,
            taxes: [],
            color: "pink",
            id: Date.now()
        });
	};

    const inpError = "rounded-md border-solid border border-red-300" 
    const inpNoError = "rounded-md border-solid border border-slate-300"

	return (
		<div className="w-full p-4 flex flex-col justify-center mb-20">
			<form
				onSubmit={(e) => handleSubmit(e)}
				className="flex flex-col gap-6 w-full"
			>
				<div className="flex flex-col">
					<label htmlFor="" className="text-sm font-bold ">
						Nombre Completo
					</label>
					<div className={errors.fullname ? inpError : inpNoError}>
						<input
							type="text"
							className={`focus:outline-none w-full px-3 py-1 bg-transparent `}
							placeholder="Fulano De Tal"
							name="fullname"
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									[e.target.name]: e.target.value,
								}))
							}
							value={formData.fullname}
						/>
					</div>
				</div>
				<div className="flex flex-col">
					<div className="flex items-center gap-2">
						<select
							name="salaryType"
							id=""
							className="text-sm font-bold bg-transparent"
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									[e.target.name]: e.target.value,
								}))
							}
						>
							<option value="neto">Sueldo Neto</option>
							<option value="bruto">Sueldo Bruto</option>
						</select>
					</div>
					<div className={errors.salary ? inpError : inpNoError}>
						<span className="ml-1 pl-2 pr-1 text-slate-400">$</span>
						<input
							type="number"
							className="focus:outline-none pl-0 pr-4 py-1 bg-transparent"
							placeholder="100.000,00"
							name="salary"
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									[e.target.name]: Number(e.target.value),
								}))
							}
							value={formData.salary > 0 ? formData.salary : ""}
						/>
					</div>
				</div>
				{formData.salaryType === "bruto" && (
					<div className="flex flex-col">
						<div className="grid grid-cols-6 max-w-screen">
							<div className="col-span-2">
								<label
									htmlFor=""
									className="text-sm font-bold "
								>
									Porcentaje
								</label>
								<div className="grid grid-cols-4 rounded-l-lg border-solid border border-slate-300 ">
									<input
										type="number"
										className="focus:outline-none pr-0 text-end col-span-3 px-0 py-1 bg-transparent"
										placeholder="21"
										value={
											tax.percent <= 0 ? "" : tax.percent
										}
										name="percent"
										onChange={(e) =>
											setTax((prev) => ({
												...prev,
												[e.target.name]: Number(
													e.target.value
												),
											}))
										}
									/>
									<span className="px-1 text-slate-400 flex items-center pl-0">
										%
									</span>
								</div>
							</div>
							<div className="col-span-4">
								<label
									htmlFor=""
									className="text-sm font-bold "
								>
									Tipo Impuesto (opcional)
								</label>
								<div className="px-3 rounded-r-lg  border-solid border border-slate-300 ">
									<input
										type="text"
										className="focus:outline-none px-0 max-w-full py-1 bg-transparent"
										placeholder="IVA"
										name="name"
										value={tax.name}
										onChange={(e) =>
											setTax((prev) => ({
												...prev,
												[e.target.name]: e.target.value,
											}))
										}
									/>
								</div>
							</div>
							<div className="col-span-6 flex items-center">
								<span className="border w-full mt-2 "></span>
								<button
									className="w-96 py-1 text-indigo-500 ml-2 mt-2 rounded-lg text-sm"
									onClick={(e) => {
										e.preventDefault();
										if (Number(tax.percent) !== 0) {
											setFormData((prev) => ({
												...prev,
												taxes: [
													...prev.taxes,
													{ ...tax, id: Date.now() },
												],
											}));
											setTax({ percent: 0, name: "" });
										}
									}}
								>
									Agregar Impuesto
								</button>
							</div>
							<div className="col-span-6">
								<ul className="flex gap-2 flex-wrap">
									{formData.taxes.map((tx) => (
										<li className="flex gap-3 mb-1 mt-3 bg-indigo-100 px-3 py-2 items-center rounded-2xl">
											<span className="text-xs ">
												{tx.name}
											</span>
											<span className="text-xs ">
												{tx.percent}%
											</span>
											{/* <span>{tx.id}%</span> */}
											<div
												className=""
												onClick={() =>
													setFormData((prev) => ({
														...prev,
														taxes: prev.taxes.filter(
															(t) =>
																t.id !== tx.id
														),
													}))
												}
											>
												<BsFillXCircleFill />
											</div>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				)}
				<div className="flex flex-col">
					<label htmlFor="" className="text-sm font-bold ">
						Color
					</label>
					<div className="flex justify-between pt-2">
						{colors.map((clr) => {
							return (
								<div
                                    key={clr.name}
									className={`w-10 h-10 rounded-full cursor-pointer
                                        ${
											clr.name === formData.color
												? clr.actived
												: clr.code
										}`}
									onClick={() =>
										setFormData((prev) => ({
											...prev,
											color: clr.name,
										}))
									}
								></div>
							);
						})}
					</div>
				</div>
				<button
					type="submit"
					className="py-3 text-indigo-900 text-xg px-4 bg-indigo-200 rounded-md"
				>
					{ editing ? 'Guardar Cambios' : 'Agregar Sueldo'}
				</button>
			</form>
            { contributors.length > 0 && <Contributors setFormData={setFormData} setEditing={setEditing}/>}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide}
            />
		</div>
	);
};

export default Step1;
