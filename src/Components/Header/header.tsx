// Components
import Link from 'next/link'
import { SignInDialog } from './SignInDialog'
import { SignOutDialog } from './SignOutDialog'

// Next Auth
import { getServerSession } from 'next-auth'

// Dialog Components
import { 
    Dialog, 
    DialogTrigger, 
    DialogContent, 
    DialogPortal, 
} from '@radix-ui/react-dialog'

// Css style
import style from './header.module.css'

export const Header = async () => {
    const data = await getServerSession()

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
                        {data?.user ? 
                        <SignOutDialog data={data}/> 
                        : <SignInDialog/>}
                    </DialogContent>
                </DialogPortal>
            </Dialog>
        </header>
    )
}