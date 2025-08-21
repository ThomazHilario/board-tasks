import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Mock
import mock from '@/mocks/falsedata.json'

// Components
import { TaskComponent } from "@/Components/Board/Task/index";
import { Container } from "@/Components/ui/Container/Container";

// Interface
import { taskProps } from "@/interface/Board/Task/task-interface";

export default async function Task() {
    
    // Verify session
    const session = await getServerSession()

    if(!session){
        redirect('/')
    }

    // Simulate request
    const tasksUser = await new Promise<taskProps[]>(resolve => setTimeout(() => resolve(mock), 500));

    return(
        <Container className="bg-white">
            <TaskComponent tasks={tasksUser} />
        </Container>
    )
}