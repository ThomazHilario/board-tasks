"use client"

// Next
import { useParams } from "next/navigation"
import { useState } from "react"

// Interface
import { taskProps } from "@/interface/Board/Task/task-interface"
interface UserProps {
    name?: string,
    email?: string,
    image?: string
}

// Style
import style from '../board-content.module.css'


export const TaskComponent = ({tasks, user}: {tasks: taskProps[], user: UserProps}) => {

    // Get params
    const params = useParams()

    // Task
    const task =  tasks.find(task => task.id === params.id)

    // State 
    const [taskValue, setTaskValue] = useState(task?.value)

    const thisTaskIsLoggedUser = user.name === task?.author

    return (
        <section className="w-full h-full flex items-center flex-col gap-5">
            <article className={style.formEditContainer}>
                <form>
                    <textarea 
                        name="task" 
                        id="task" 
                        cols={10} 
                        rows={5}
                        value={taskValue}
                        onChange={(e) => setTaskValue(e.target.value)}
                    />

                    {thisTaskIsLoggedUser && <button>Edit Task</button>}
                </form>
            </article>

            <section>
                <ul>
                    {task?.comments.length && task.comments.map((comment, index) => (
                        <li key={index}>{comment.comment}</li>
                    ))}
                </ul>
            </section>
        </section>
    )
}