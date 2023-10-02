"use client"

import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import { FaUserAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import useAuthModal from "@/hooks/useAuthModal";
import { useRouter } from "next/navigation";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}


const Header: React.FC<HeaderProps> = ({ 
    children,
    className 
}) => {
    const authModal = useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const { user } = useUser();
    

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        // TODO: Reset any playing songs in the future
        router.refresh();

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Successfully logged out.");
        }
    }

    return (
        <div className={twMerge(`
            h-fit
            bg-gradient-to-b
            from-emerald-800
            p-6
        `, className)}>

            <div className="
                w-full
                mb-4
                flex
                items-center
                justify-between
            ">
                <div className="
                    hidden
                    md:flex
                    gap-x-2
                    items-center
                ">
                    <button 
                    onClick={() => router.back()}
                    className="
                        rounded-full
                        bg-black
                        flex
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                    ">
                        <RxCaretLeft size={35} className="text-white"/>
                    </button>
                    <button 
                    onClick={() => router.forward()}
                    className="
                        rounded-full
                        bg-black
                        flex
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                    ">
                        <RxCaretRight size={35} className="text-white"/>
                    </button>
                </div>
                <div className="
                    flex
                    md:hidden
                    gap-x-2
                    items-center
                ">
                    <button
                    onClick={() => router.push('/')}
                    className="
                        rounded-full
                        bg-white
                        p-2
                        flex
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                    ">
                        <HiHome size={20} className="text-black"/>
                    </button>
                    <button
                        onClick={() => router.push('/search')}
                    className="
                        rounded-full
                        bg-white
                        p-2
                        flex
                        items-center
                        justify-center
                        hover:opacity-75
                        transition
                    ">
                        <BiSearch size={20} className="text-black"/>
                    </button>
                </div>
                <div
                    className="
                        flex
                        justify-between
                        items-center
                        gap-x-4
                    "
                > 
                    { user ? 
                    (
                        <div className="flex gap-x-4 items-center">
                            <Button
                                onClick={handleLogout}
                                className="bg-white px-6 py-2"
                            >
                                Logout
                            </Button>
                            <Button
                                onClick={() => router.push('/account')}
                                className="bg-white"
                            >
                                <FaUserAlt />
                            </Button>
                        </div>
                    )   : (
                        <>
                        <div>
                            <Button
                                onClick={authModal.onOpen}
                                className="
                                    bg-transparent
                                    text-neutral-300
                                    font-medium
                                "
                            >
                                Sign up
                            </Button>
                        </div>
                        <div>
                            <Button
                                onClick={authModal.onOpen}
                                className="
                                    bg-white
                                    px-6
                                    py-2
                                "
                            >
                                Log in
                            </Button>
                        </div>
                    </>
                    ) 
                }
                </div>
            </div>
            {children}
        </div>
    );
};

export default Header;
