"use client"

// Next
import { useParams } from "next/navigation"
import { useState } from "react"

// Interface
import { taskProps } from "@/interface/Board/Task/task-interface"


export const TaskComponent = ({tasks}: {tasks: taskProps[]}) => {

    // Get params
    const params = useParams()

    // Task
    const task =  tasks.find(task => task.id === params.id)

    // State 
    const [taskValue, setTaskValue] = useState(task?.value)

    return (
        <>
            <form>
                <textarea 
                    name="task" 
                    id="task" 
                    cols={30} 
                    rows={10}
                    value={taskValue}
                    onChange={(e) => setTaskValue(e.target.value)}
                />

                <button>Edit Task</button>
            </form>

            <section>
                <ul>
                    {task?.comments.length && task.comments.map((comment, index) => (
                        <li key={index}>{comment.comment}</li>
                    ))}
                </ul>
            </section>
        </>
    )
}