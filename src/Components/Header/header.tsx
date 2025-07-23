"use client"

// Components
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

// Dialog Components
import { 
    Dialog, 
    DialogTrigger, 
    DialogContent, 
    DialogTitle, 
    DialogPortal, 
    DialogDescription 
} from '@radix-ui/react-dialog'
import { DialogHeader } from '../ui/dialog'

// Icon
import { IoLogoDiscord } from "react-icons/io5";

// Css style
import style from './header.module.css'

export const Header = () => {
    const { data } = useSession()

    return (
        <header className={style.header}>

            <Link href='/' className={style.logo}>
                <h1 className={style.title}>
                    Tarefas
                </h1>
                <span className={style.plus}>+</span>
            </Link>
            

            <Dialog>
                <DialogTrigger className={style.buttonEnterInMyAccount} type="button">Minha Conta</DialogTrigger>
                
                <DialogPortal>
                    <DialogContent className={style.dialogContent} aria-describedby='testes'>
                        {data?.user ? (
                            <DialogHeader className={style.dialogHeaderProfile}>
                                <DialogTitle className={style.dialogTitleProfile}>
                                    <img 
                                        className={style.imageProfile}
                                        src={data.user.image!} 
                                        alt="Imagem de perfil" 
                                        width={50} 
                                        height={50}
                                    />
                                    {data.user.name}
                                </DialogTitle>

                                <DialogDescription className={style.dialogLinksProfileContainer}>
                                    <Link 
                                        href='board' 
                                        className={style.linkProfile}
                                    >
                                        Minhas Tarefas
                                    </Link>
                                    <button className={style.buttonSignOut} onClick={() => signOut()}>
                                        Sair
                                    </button>
                                </DialogDescription>
                            </DialogHeader>
                        ): (
                            <DialogHeader className={style.dialogHeader}>
                                <DialogTitle className={style.dialogTitle}>Registrar-se</DialogTitle>
                                <DialogDescription hidden>Dialog de login ou registro do usuário</DialogDescription>
                                
                                {/* Account login */}                               
                                    <button 
                                        className={style.buttonEnterInMyAccount}
                                        onClick={() => signIn('discord')}
                                    >
                                        <IoLogoDiscord size={25} color='#7289da'/>
                                        Entrar com Discord
                                    </button>
                            </DialogHeader>
                        )}
                    </DialogContent>
                </DialogPortal>
            </Dialog>
            
        </header>
    )
}