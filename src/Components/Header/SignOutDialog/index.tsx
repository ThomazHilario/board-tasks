// Dialog
import { DialogHeader } from "@/Components/ui/dialog"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"

// Components
import { Button } from "../Button"
import Link from "next/link"

// Css style
import style from '../header.module.css'

export const SignOutDialog = ({ data }: any) => {
    return (
        <DialogHeader className={style.dialogHeaderProfile}>
            <DialogTitle className={style.dialogTitleProfile}>
                <img 
                    className={style.imageProfile}
                    src={data?.user?.image} 
                    alt="Imagem de perfil" 
                    width={50} 
                    height={50}
                />
                {data?.user?.name}
            </DialogTitle>

            <DialogDescription className={style.dialogLinksProfileContainer}>
                <Link 
                    href='board' 
                    className={style.linkProfile}
                >
                    Minhas Tarefas
                </Link>

                <Button 
                    className={style.buttonSignOut}
                    isLogged={true}
                    value={'Sair'}
                />
            </DialogDescription>
        </DialogHeader>
    )
}