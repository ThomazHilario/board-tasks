import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Mock
import mock from '@/mocks/falsedata.json'

// Components
import { TaskComponent } from "@/Components/Board/Task/index";
import { Container } from "@/Components/ui/Container/Container";

// Interface
import { taskProps } from "@/interface/Board/Task/task-interface";
import { UserProps } from "@/interface/Board/board-user-props";

// Supabase
import { supabase } from "@/utils/supabase/server";

export default async function Task() {
    
    // Verify session
    const session = await getServerSession()

    if(!session){
        redirect('/')
    }

    const isUser: UserProps = session.user as UserProps

    // Get tasks using user name
    const tasksUser = await supabase.from('TasksUser').select().eq('author', session?.user?.name)

    return(
        <Container className="bg-white">
            <TaskComponent tasks={tasksUser.data as taskProps[]} user={isUser} />
        </Container>
    )
}