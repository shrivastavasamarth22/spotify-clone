import "./globals.css";

import { Figtree } from "next/font/google";
import type { Metadata } from "next";
import ModalProvider from "@/providers/ModalProvider";
import Player from "@/components/Player";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import UserProvider from "@/providers/UserProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Spotify Clone",
    description: "A Spotify clone built with Next.js and Tailwind CSS.",
};

export const revalidate = 0;

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const userSongs = await getSongsByUserId();
    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider />
                        <Sidebar songs={userSongs}>{children}</Sidebar>
                        <Player />
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
