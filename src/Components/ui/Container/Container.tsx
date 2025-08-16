export const Container = ({ children, className }:{ children: React.ReactNode, className?:string }) => {
    return (
        <section className={`w-full h-full flex flex-col gap-[1rem] ${className}`} >
            {children}
        </section>
    )
}