import Link from "next/link";
import React from "react";

const Page = () => {
	return (
		<div className="flex items-center justify-center w-full min-h-screen">
			<Link className="bg-indigo-700 text-indigo-100 px-6 py-3 rounded" href="/step/1">
				Dividir Gastos
			</Link>
		</div>
	);
};

export default Page;
