// Components
import { BoardContent } from "@/Components/Board/BoardContent";

// Next auth
import { getServerSession } from "next-auth";

// Next Navigation
import { redirect } from "next/navigation";

// Mock
import mock from '@/mocks/falsedata.json'

// Interface
import { taskProps } from "@/interface/Board/Task/task-interface";
import { Container } from "@/Components/ui/Container/Container";

export default async function Board() {

    // Get session user
    const session = await getServerSession()

    // Simulate request
    const tasksUser = await new Promise<taskProps[]>(resolve => setTimeout(() => resolve(mock), 500));

    // If user is not logged in, redirect to home
    if(!session){

        redirect('/')
    }

    return (
        <Container>
            <BoardContent tasksUser={tasksUser} />
        </Container>
    );
}