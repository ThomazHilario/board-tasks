// Dialog Components
import { 
    DialogTitle, 
    DialogDescription 
} from '@radix-ui/react-dialog'
import { DialogHeader } from '../../ui/dialog'

// icons
import { IoLogoDiscord } from 'react-icons/io5'

// Components
import { Button } from '../Button'

// Css style
import style from '../header.module.css'

export const SignInDialog = () => {
    return (
        <DialogHeader className={style.dialogHeader}>
            <DialogTitle className={style.dialogTitle}>Registrar-se</DialogTitle>
            <DialogDescription hidden>Dialog de login ou registro do usuário</DialogDescription>
            
            {/* Account login */}                               
                <Button 
                    className={style.buttonEnterInMyAccount}
                    isLogged={false}
                    icon={<IoLogoDiscord size={25} color='#7289da'/>}
                    value={`Entrar com Discord`}
                />
        </DialogHeader>
    )
}