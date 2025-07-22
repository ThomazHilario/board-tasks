import style from './header.module.css'

export const Header = () => {
    return (
        <header className={style.header}>
            <h1 className={style.title}>
            Tarefas
            <span className={style.plus}>+</span>
            </h1>

            <button className={style.buttonEnterInMyAccount} type="button">Minha Conta</button>
        </header>
    )
}