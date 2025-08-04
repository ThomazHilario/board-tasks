"use client";
import { signIn, signOut, useSession } from 'next-auth/react'
import { IoLogoDiscord } from 'react-icons/io5';

// Interface
import { ButtonHeaderProps } from '@/interface/Header/button-interface';

export const Button = ({ className, isLogged, icon, value }: ButtonHeaderProps) => {
        const handleSignIn = () => {
        signIn('discord', { callbackUrl: '/board', redirect: true})
    }

    const handleSignOut = () => {
        signOut({ callbackUrl: '/', redirect: true})
    }

    return (
        <button className={className} onClick={isLogged ? handleSignOut : handleSignIn}>
            {icon}
            {value}
    </button>
    )
}