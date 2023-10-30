import useDataStore from "@/store/Data";
import React from "react";
import { BsFillPencilFill, BsXLg } from "react-icons/bs";

const Contributors = ({setFormData, setEditing}) => {
    const { contributors, deleteContributor } = useDataStore();
    
    const colors = {
        pink: "red",
        yellow: "amber",
        green: "emerald",
        blue: "sky",
        orange: "orange"
    }

    return <div className="w-full">
        <h4 className="mt-8 -mb-2 ml-1 p-0">Aportantes</h4>
        {contributors.map( cbt => {
            return (
                <div className={`flex bg-${colors[cbt.color]}-200 justify-between p-4 rounded-lg  my-4`}>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-bold">
                            {cbt.fullname}
                        </span>
                        <span className="text-sm font-light ">
                            {cbt.salary.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) }
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <span 
                            className={`cursor-pointer text-sm font-light w-6 flex items-center justify-center rounded-lg h-6 bg-green-300 shadow-inner shadow-green-400 text-green-900`}
                            onClick={() => {
                                setEditing(true)
                                setFormData(cbt)
                            }}
                        >
                            <BsFillPencilFill />
                        </span>
                        <span 
                            className="cursor-pointer text-sm font-bold w-6 flex items-center justify-center rounded-lg h-6 bg-red-300 shadow-inner shadow-red-400 text-red-900 "
                            onClick={() => deleteContributor(cbt.id)}
                        >
                            <BsXLg />
                        </span>
                    </div>
                </div>
            )
        })}
    </div>;
};

export default Contributors;
