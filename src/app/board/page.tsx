"use server"

// NextAuth
import { getServerSession } from "next-auth";

// Supabase
import { supabase } from "@/utils/supabase/server";

// Components
import { BoardContent } from "@/Components/Board/BoardContent";

// Interface
import { Container } from "@/Components/ui/Container/Container";
import { taskProps } from "@/interface/Board/Task/task-interface";
import { UserProps } from "@/interface/Board/board-user-props";

export default async function Board() {

    // Session user
    const session = await getServerSession()

    // Get tasks using user name
    const tasksUser = await supabase.from('TasksUser').select().eq('author', session?.user?.name)

    return (
        <Container>
            <BoardContent tasksUser={tasksUser.data as taskProps[]} user={session?.user as UserProps} />
        </Container>
    );
}