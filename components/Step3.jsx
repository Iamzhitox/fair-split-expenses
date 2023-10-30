'use client'
import useDataStore from "@/store/Data";
import React from "react";
import { BsFillPencilFill, BsXLg } from "react-icons/bs";

const Step3 = () => {
    const { contributors, budgetAmount } = useDataStore();
    const totalRevenue = contributors.map( cbt => cbt.salary).reduce((counter, currentValue) => counter + currentValue, 0);

    const colors = {
        pink: "red",
        yellow: "amber",
        green: "emerald",
        blue: "sky",
        orange: "orange"
    }

    return <div className="w-full p-4">
        <h4>Presupuesto Establecido</h4>
        <span className=" text-2xl font-bold">
            {budgetAmount.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
        </span>
        <h4 className="mt-8 -mb-2 ml-1 p-0">Lo que debe aportar cada uno</h4>
        {contributors.map( cbt => {
            return (
                <div className={`flex bg-${colors[cbt.color]}-200 justify-between p-4 rounded-lg  my-4`}>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold">
                            {cbt.fullname}
                        </span>
                        <span className={`text-sm font-light text-${colors[cbt.color]}-400`}>
                            {(budgetAmount * (((cbt.salary * 100) / totalRevenue) / 100)).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                        </span>
                    </div>
                </div>
            )
        })}
    </div>;
};

export default Step3;
