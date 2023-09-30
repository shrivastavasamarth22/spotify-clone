import "./globals.css";

import { Figtree } from "next/font/google";
import type { Metadata } from "next";
import ModalProvider from "@/providers/ModalProvider";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import UserProvider from "@/providers/UserProvider";

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
                <ToasterProvider />
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider />
                        <Sidebar>{children}</Sidebar>
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
