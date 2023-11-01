'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useWindowSize from "@/hooks/useWindowSize";
import useDataStore from "@/store/Data";
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NavButtons = () => {
	
    const currentPath = Number(usePathname().split('step/')[1])
    const windowSize = useWindowSize()
    const { resetData, contributors, budgetAmount } = useDataStore()
    const pathNav = {
        1: ['/', '/step/2'],
        2: ['/step/1', '/step/3'],
        3: ['/step/2', '/'],
    }

    return ( <>
		<div 
            className={windowSize <= 1080 ? 
                `flex w-screen justify-between fixed bottom-0 pb-2 border border-b-0 border-t-indigo-50 bg-white` 
            :   `flex w-screen px-80 justify-between fixed bottom-0 pb-2 border border-b-0 border-t-indigo-50 bg-white` 
        }>
			<Link 
                href={pathNav[currentPath][0]} 
                className="px-4 py-3 m-2 text-indigo-600"
                onClick={() => {
                    if (currentPath === 1)
                        resetData()
                }}
            >
				Volver
			</Link>
            <Link
                onClick={(e) => {
                    if (currentPath === 1 && contributors.length <= 0){
                        e.preventDefault()
                        toast.error('No hay aportantes', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    } else if (currentPath === 2 && budgetAmount <= 0) {
                        e.preventDefault()
                        toast.error('No se ha fijado un presupuesto', {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });                    }


                    if (currentPath > 2)
                        resetData()
                }}
                href={pathNav[currentPath][1]}
                className="px-5 py-3 m-2 bg-indigo-700 rounded-lg text-slate-100"
            >
                {currentPath > 2 ? 'Probar nuevamente' : 'Siguiente Paso' }
            </Link>
		</div>
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
    </>
	);
};

export default NavButtons;
