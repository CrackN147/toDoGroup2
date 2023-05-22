import { createContext, useState, useEffect } from "react";
import { browserStorage } from "./browserStorage";
export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState(
    browserStorage.__exists('tasks') ? 
    browserStorage.__get('tasks') :
    []
  )

  const [tempTaskId, setTempTaskId] = useState(null)
  const [tempTaskStatus, setTempTaskStatus] = useState(null)

  const updateTempTaskId = (id) => {console.log(id)
    setTempTaskId(id)
  }

  const updateTempTaskStatus = (status) => {console.log(status)
    setTempTaskStatus(status)
  }

  const setVars = (data) => {
    setTasks(data)
    browserStorage.__set('tasks', JSON.stringify(data))
  }
  
  const createTask = (title) => {
    let newTasks = [...tasks]
    let lastTask = newTasks.slice(-1);
    let tasksByStatus = newTasks.filter((task) => task.status === 1)
    let tasksByStatusLast = tasksByStatus ? tasksByStatus.slice(-1) : []
    newTasks.push({
      id: lastTask.length ? lastTask[0].id + 1 : 1,
      title: title,
      status: 1,
      sort: tasksByStatusLast.length ? tasksByStatusLast[0].sort + 1 : 1
    })
    setVars(newTasks)
  }

  useEffect(() => {
    if (tempTaskId !== null && tempTaskStatus !== null) {
      const changeStatus = (id, newStatus) => {
        let newTasks = [...tasks]
        let task = newTasks.find((task) => task.id === id);
        task.sort = newTasks.filter((task) => task.status === newStatus).length + 1
        task.status = newStatus;
        // newTasks = newTasks.map((task) => {
        //   if (task.id !== id) {

        //   }
        setVars(newTasks)
      }
      changeStatus(tempTaskId, tempTaskStatus)
      setTempTaskId(null)
      setTempTaskStatus(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempTaskId, tempTaskStatus])

  return (
    <TasksContext.Provider value={{ 
      tasks,
      createTask,
      updateTempTaskId,
      updateTempTaskStatus
     }}>
      {children}
    </TasksContext.Provider>
  );
}