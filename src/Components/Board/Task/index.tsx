"use client"

// Next
import { useParams } from "next/navigation"
import { useState } from "react"

// Interface
import { taskProps } from "@/interface/Board/Task/task-interface"

// Style
import style from '../board-content.module.css'


export const TaskComponent = ({tasks}: {tasks: taskProps[]}) => {

    // Get params
    const params = useParams()

    // Task
    const task =  tasks.find(task => task.id === params.id)

    // State 
    const [taskValue, setTaskValue] = useState(task?.value)

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

                    <button>Edit Task</button>
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