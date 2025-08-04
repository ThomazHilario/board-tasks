// Interface
import { taskProps } from '@/interface/Board/Task/task-interface'
import { redirect } from 'next/navigation'

// Css style
import style from '../board-content.module.css'

export const TasksSection = ({tasks}: {tasks: taskProps[]}) => {

    const handleRedirectTask = (id:string) => {
        redirect(`/board/task/${id}`)
    }

    return(
        <section className={style.tasksSectionContainer}>
            <h2>My Tasks</h2>

            <ul>
                {tasks.map(task => (
                    <li key={task.id} onClick={() => handleRedirectTask(task.id)}>
                        {task.value}
                    </li>
                ))}
            </ul>
        </section>
    )
}