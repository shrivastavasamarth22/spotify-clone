import "./globals.css";

import { Figtree } from "next/font/google";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Spotify Clone",
    description: "A Spotify clone built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={font.className}>
                <SupabaseProvider>
                    <Sidebar>{children}</Sidebar>
                </SupabaseProvider>
            </body>
        </html>
    );
}
