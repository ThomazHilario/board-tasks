"use client"

// Next
import { useParams } from "next/navigation"
import { useState } from "react"

// Interface
import { taskProps } from "@/interface/Board/Task/task-interface"
import { UserProps } from "@/interface/Board/board-user-props"

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
        <>
            {task?.isPublic ? (
                <section className="w-full h-full flex items-center flex-col gap-5">
                    <article className={style.formEditContainer}>
                        <form>
                            <textarea 
                                disabled={!thisTaskIsLoggedUser}
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

                    <section className={style.formAddCommentContainer}>
                        {!thisTaskIsLoggedUser && (
                            <form>
                                <textarea 
                                    rows={5}
                                />

                                <button>Comentar</button>
                            </form>
                        )}
                        <ul className={style.commentsContainer}>
                            {task?.comments.length && task.comments.map((comment, index) => (
                                <li key={index}>{comment.comment}</li>
                            ))}
                        </ul>
                    </section>
                </section>
            ) : (
                <section>
                    do you not have access!
                </section>
            )}
        </>
    )
}