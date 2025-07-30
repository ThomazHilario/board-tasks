import style from '../board-content.module.css'

export const TasksSection = ({tasks}: any) => {
    return(
        <section className={style.tasksSectionContainer}>
            <h2>My Tasks</h2>

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.value}
                    </li>
                ))}
            </ul>
        </section>
    )
}