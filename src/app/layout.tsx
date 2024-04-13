import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getURL } from "@/utils/main";

const inter = Inter({ subsets: ["latin"] });

const meta = {
	title: 'Now Time',
	description: "This is a web application built using React and Next.js. The app displays a customizable clock and allows users to upload and set background images. It also features network status monitoring and error handling for offline scenarios.",
	authors: {
		name: 'Fun117',
		url: 'https://github.com/Fun117'
	},
	Image: '/favicon.ico',
	cardImage: '/brand/nowtime/icon-512.png',
	robots: 'follow, index',	
	url: getURL()
};

export const metadata: Metadata = {
	title: {
		template: `%s | ${meta.title}`,
		default: meta.title,
	},
	description: meta.description,
	referrer: 'origin-when-cross-origin',
	keywords: ['Vercel', 'Next.js',],
	authors: [{ name: meta.authors.name, url: meta.authors.url }],
	creator: meta.authors.name,
	icons: meta.Image,
	generator: "Next.js",
	publisher: 'Vercel',
	robots: meta.robots,
	metadataBase: new URL(meta.url),
	openGraph: {
		url: meta.url,
		title: meta.title,
		description: meta.description,
		images: [meta.cardImage],
		type: 'website',
		siteName: meta.title
	},
	twitter: {
		card: 'summary_large_image',
		site: `@${meta.authors.name}`,
		creator: `@${meta.authors.name}`,
		title: meta.title,
		description: meta.description,
		images: [meta.cardImage]
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
