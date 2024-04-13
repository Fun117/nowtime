
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: `Page not found`
}

export default function Home() {

    redirect(`/`)

	return (
		<>
		</>
	);
}