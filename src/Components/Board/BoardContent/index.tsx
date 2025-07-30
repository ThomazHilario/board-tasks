"use client";

// React
import { FormEvent, useState } from "react"

// Components
import { TasksSection } from "../tasksSection"

// Css style
import style from '../board-content.module.css'
import { comment } from "postcss";

export const BoardContent = () => {

    const [tasks, setTasks] = useState([{
        id: '1',
        value: 'Task 1',
        isPublic: true,
        comments: []
    }])

    // input value
    const [inputValue, setInputValue] = useState('')

    // task is public
    const [taskIsPublic, setTaskIsPublic] = useState(false)

    const handleAddTask = (e: FormEvent) => {
        e.preventDefault()
    
        setTasks([
            {
                id: crypto.randomUUID() as string,
                value: inputValue,
                isPublic: taskIsPublic,
                comments: []
            },
            ...tasks
        ])
    }

    return(
        <>
            <article className={style.createTaskContainer}>
                <h2>Qual a sua tarefa ?</h2>
                <form className={style.formAddTask} onSubmit={(e) => handleAddTask(e)}>
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

            <TasksSection tasks={tasks}/>
        </>
    )
}