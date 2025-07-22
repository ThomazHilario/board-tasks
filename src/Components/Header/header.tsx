"use client"
// Components
import Link from 'next/link'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogPortal, DialogDescription } from '@radix-ui/react-dialog'
import { signIn } from 'next-auth/react'

// Css style
import style from './header.module.css'
import { DialogHeader } from '../ui/dialog'

export const Header = () => {

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
                        <DialogHeader>
                            <DialogTitle>Registrar-se</DialogTitle>
                            <DialogDescription hidden>Dialog de login ou registro do usuário</DialogDescription>
                        </DialogHeader>

                        <button onClick={() => signIn('discord')}>Entrar com Discord</button>
                    </DialogContent>
                </DialogPortal>
            </Dialog>
            
        </header>
    )
}