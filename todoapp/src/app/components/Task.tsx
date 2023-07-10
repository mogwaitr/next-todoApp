"use client";

import {FormEventHandler, useState } from "react";
import { ITask } from "../../../types/tasks"
import {FiEdit, FiTrash2} from 'react-icons/fi';
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { editTodo, deleteTodo } from '../../../api';

interface TaskProps {
     task : ITask
}

const Task: React.FC<TaskProps> = ({task}) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDel, setOpenModalDel] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(task.text)

  const handleSubmitEdittodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit
    })
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeletetodo = async (id:string) => {
    await deleteTodo(id);
    setOpenModalDel(false);
    router.refresh();
  };

  return (
    <tr key={task.id} className="hover">
        <td className="w-full">{task.text}</td>
        <td className="flex gap-5">
          <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={25}/>

          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>  
          
            <form onSubmit={handleSubmitEdittodo}>
              <h3 className='font-bold text-lg'>Edit task</h3>
              <div className='modal-action'>
                <input 
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                  type="text" 
                  placeholder="Type here" 
                  className="input input-bordered w-full" 
                />
                <button type='submit' className='btn'>
                  submit
                </button>
              </div>
            </form>
          </Modal>

          <FiTrash2 cursor="pointer" onClick={() => setOpenModalDel(true)} className="text-red-500" size={25}/>

          <Modal modalOpen={openModalDel} setModalOpen={setOpenModalDel}>  
            <h3 className='font-bold text-lg'>Delete task</h3>
            <div className='modal-action'>
              <button onClick={() => handleDeletetodo(task.id)} className="btn">
                Yes
              </button>
            </div>
          </Modal>
        </td>
    </tr>
  )
}

export default Task