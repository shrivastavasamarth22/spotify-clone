"use client"

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"

import { Auth } from "@supabase/auth-ui-react"
import Modal from "./Modal"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import useAuthModal from "@/hooks/useAuthModal"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router =  useRouter();
    const { session } = useSessionContext();
    const {onClose, isOpen} = useAuthModal();

    useEffect(() => {
        if (session) {
            router.refresh();
            onClose();
        }
    }, [session, router, onClose])

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    
    return (
        <Modal
            title="Welcome back"
            description="Login to your account"
            isOpen={isOpen}
            onChange={onChange}
        >
            <Auth
                theme="dark"
                magicLink
                providers={["github"]}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: "#404040",
                                brandAccent: "#22C55E"
                            }
                        }
                    }
                }}
            />
        </Modal>
    )
}

export default AuthModal