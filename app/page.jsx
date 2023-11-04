'use client'
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ferex from "@/img/ferex.ico"
import Image from "next/image";
import useDataStore from "@/store/Data";

const Page = () => {
    const { setId, setBudgetAmount, setContributors } = useDataStore();
    const [oldData, setOldData] = useState(null)

    useEffect(() => {
        const splitsCollection = localStorage.getItem('splitsCollection') ? localStorage.getItem('splitsCollection') : null
        setOldData(splitsCollection ? JSON.parse(splitsCollection) : null)
    }, [])
    

	return (
		<div className="flex flex-col items-center w-full gap-16 min-h-screen">
            <Image 
                src={ferex} 
                className="w-20 h-20 border-none shadow-lg rounded-2xl mt-32"
                loading="lazy"
                alt="icon ferex"
            />
			<Link className="bg-indigo-700 text-indigo-100 px-6 py-3 rounded-md " href="/step/1">
				Dividir Gastos
			</Link>
            <div className="p-4 w-full md:w-1/3">
                {oldData && <h3 className="pl-1 mb-2 text-lg">Última Partición</h3>}
                <div className="flex flex-col gap-4">
                    {
                        oldData?.map( spl => {
                            const {budgetAmount, id, contributors} = spl
                            return (
                                <div className="flex flex-col rounded-xl overflow-hidden" key={id}>
                                    {contributors.map( cbt => {
                                        const {color, fullname, id: cbtid} = cbt
                                        return (
                                            <div className={`bg-${color}-200 px-4 py-2`} key={cbtid}>
                                                {`${fullname.charAt(0).toUpperCase()}${fullname.slice(1)}`}
                                            </div>
                                        )
                                    })}
                                    <Link 
                                        href='/step/1'
                                        className=" font-bold text-center py-3 text-indigo-50 bg-indigo-600"
                                        onClick={() => {
                                            setId(id)
                                            setContributors(contributors)
                                            setBudgetAmount(budgetAmount)
                                        }}
                                    >
                                        RETOMAR
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {/* retomar button */}
		</div>
	);
};

export default Page;
