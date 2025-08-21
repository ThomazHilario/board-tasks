'use client'

// react and next
import { createContext, useEffect, useState } from "react"
import { redirect, usePathname } from "next/navigation";

// Next-Auth
import { getSession } from "next-auth/react";

const Context = createContext({});
export default function Auth ({children}: {children: React.ReactNode}) {

    const pathname = usePathname()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function findSessionUser(){
            const session = await getSession()

            if(!session?.user){
                redirect('/')
            }

            if(session?.user && pathname === '/'){
                redirect('/board')
            }       
        }

        findSessionUser()
        setLoading(false)
    }, [pathname])

    if(!loading){
        return children
    }

}