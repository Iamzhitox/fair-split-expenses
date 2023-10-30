import NavButtons from "@/components/NavButtons";
import Steps from "@/components/Steps";
// import "./globals.css";
import { Montserrat } from "next/font/google";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = {
	title: "Division Justa de Gastos",
	description: "NO ES 50/50. APRENDÉ COMO DIVIDIR JUSTAMENTE LOS GASTOS DE LA PAREJA",
};

export default function RootLayout({ children }) {

	return (
		<html lang="en">
			<body className={inter.className}>
				<Steps />
				{children}
                <NavButtons />
			</body>
		</html>
	);
}
