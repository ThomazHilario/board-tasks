import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Mock
import mock from '@/mocks/falsedata.json'

// Components
import { TaskComponent } from "@/Components/Board/Task/index";

// Interface
import { taskProps } from "@/interface/Board/Task/task-interface";

// Css style
import style from './task.module.css'

export default async function Task() {
    
    // Verify session
    const session = await getServerSession()

    if(!session){
        redirect('/')
    }

    // Simulate request
    const tasksUser = await new Promise<taskProps[]>(resolve => setTimeout(() => resolve(mock), 500));

    return(
        <section className={style.taskContainer}>
            <TaskComponent tasks={tasksUser} />
        </section>
    )
}