"use client";

// React
import { FormEvent, useState } from "react"

// Components
import { TasksSection } from "../tasksSection"

// Interface
import { taskProps } from "@/interface/Board/Task/task-interface"
import { UserProps } from "@/interface/Board/board-user-props";

// Css style
import style from '../board-content.module.css'

// Supabase
import { supabase } from "@/utils/supabase/server";

export const BoardContent = ({ tasksUser, user }: {tasksUser: taskProps[], user:UserProps}) => {

    const [tasks, setTasks] = useState(tasksUser)

    // input value
    const [inputValue, setInputValue] = useState('')

    // task is public
    const [taskIsPublic, setTaskIsPublic] = useState(false)

    const handleAddTask = async (e: FormEvent) => {
        try{
            e.preventDefault()
            if(inputValue !== ''){
                const taskBody = {
                    id: crypto.randomUUID() as string,
                    value: inputValue,
                    isPublic: taskIsPublic,
                    comments: [],
                    author: user.name!
                }
                setTasks([
                    taskBody,
                    ...tasks
                ])
                await supabase.from('TasksUser').insert(taskBody)
                setInputValue('')
            }   
        }catch(e){
            console.log(e)
        }
    }

    const handleRemoveTask = async (id:string) => {
        try{
            // Search task for delete
            const deleteThisTask = tasks.find(task => task.id === id)

            // Remove this task in state tasks
            setTasks(tasks.filter(task => task.id !== deleteThisTask?.id))

            // Remove from database
            await supabase.from('TasksUser').delete().eq('id', deleteThisTask?.id)
        }catch(e){
            console.log(e)
        }
    }

    return(
        <>
            <article className={style.createTaskContainer}>
                <h2>Qual a sua tarefa ?</h2>

                <form className={style.formAddTask} onSubmit={handleAddTask}>
                    <textarea 
                        rows={5}
                        cols={10}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <div>
                        <input 
                        type="checkbox" 
                        checked={taskIsPublic}
                        onChange={(e) => setTaskIsPublic(e.target.checked)}/>
                        <label>Deixar tarefa pública</label>
                    </div>
                    
                    <button>Registrar</button>
                </form>
            </article>

            <TasksSection 
                tasks={tasks}
                handleRemoveTask={handleRemoveTask}
            />
        </>
    )
}