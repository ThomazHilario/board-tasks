// Interface
import { taskProps } from '@/interface/Board/Task/task-interface'
import { redirect } from 'next/navigation'

// Icons
import { Share, Trash2 } from 'lucide-react'

// Css style
import style from '../board-content.module.css'

export const TasksSection = ({tasks, handleRemoveTask}: {tasks: taskProps[], handleRemoveTask:(id:string) => void}) => {

    const handleRedirectTask = (id:string) => {
        redirect(`/board/task/${id}`)
    }

    return(
        <section className={style.tasksSectionContainer}>
            <h2>My Tasks</h2>

            <ul>
                {tasks.map(task => (
                    <li className='flex justify-between' key={task.id}>
                        <div className='flex gap-2 flex-1'>
                            <Share/>
                            <span className='w-full line-clamp-1' onClick={() => handleRedirectTask(task.id)}>{task.value}</span>
                        </div>
                        
                        <button 
                        className='cursor-pointer' 
                        onClick={() => handleRemoveTask(task.id)}>
                            <Trash2 />
                        </button>
                    </li>
                ))}
            </ul>
        </section>
    )
}