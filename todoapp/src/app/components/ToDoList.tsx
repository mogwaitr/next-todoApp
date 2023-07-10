import { ITask } from "../../../types/tasks"
import Task from "./Task"


interface TodoListProps {
  tasks : ITask[]
}

const ToDoList: React.FC<TodoListProps> = ({tasks}) => {
  return (
    <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Tasks</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {tasks.map((task) => (
        <Task task ={task}/>
      ))}
      
      
      
    </tbody>
  </table>
</div>
  )
}

export default ToDoList