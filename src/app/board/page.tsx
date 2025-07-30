import { BoardContent } from "@/Components/Board/BoardContent";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Css style
import style from './board.module.css'

export default async function Board() {

    // Get session user
    const session = await getServerSession()

    // If user is not logged in, redirect to home
    if(!session){

        redirect('/')
    }

    return (
        <section className={style.boardContainer}>
            <BoardContent/>
        </section>
    );
}