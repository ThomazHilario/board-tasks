import style from './tag.module.css'
export const Tag = ({children}:{children: React.ReactNode}) => {
    return (
        <div className={style.tagContainer}>
            <h2>{children}</h2>
        </div>
    )
}