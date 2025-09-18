"use client"

// Next
import { useParams } from "next/navigation"
import { FormEvent, useCallback, useState } from "react"

// Interface
import { taskProps } from "@/interface/Board/Task/task-interface"
import { UserProps } from "@/interface/Board/board-user-props"

// Style
import style from '../board-content.module.css'


export const TaskComponent = ({tasks, user}: {tasks: taskProps[], user: UserProps}) => {

    // Get params
    const params = useParams()

    // State 
    const [task, setTask] = useState<taskProps>(tasks.find(task => task.id === params.id) as taskProps)

    // State - inputFormEdit
    const [inputFormEdit, setInputFormEdit] = useState<string>(task?.value as string)

    // HandleEditTask
    const handleEditTask = useCallback((e: FormEvent) => {
        e.preventDefault();

        if (inputFormEdit !== "") {
            if (task?.value !== inputFormEdit) {
            setTask(prev => ({
                ...prev,
                value: inputFormEdit
            }));
            }
        }
    }, [inputFormEdit, task, setTask]);

    const thisTaskIsLoggedUser = user.name === task?.author

    return (
        <>
            {task?.isPublic || thisTaskIsLoggedUser ?  (
                <section className="w-full h-full flex items-center flex-col gap-5">
                    <article className={style.formEditContainer}>
                        <form>
                            <textarea 
                                disabled={!thisTaskIsLoggedUser}
                                name="task" 
                                id="task" 
                                cols={10} 
                                rows={5}
                                value={inputFormEdit}
                                onChange={(e) => setInputFormEdit(e.target.value)}
                            />

                            {thisTaskIsLoggedUser && <button onClick={handleEditTask}>Edit Task</button>}
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