import { useContext, useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd'
import update from 'immutability-helper'
import { TasksContext } from '../services/TasksContext';
import { Title, DivWrap, Card } from './'
export function Column(props) {
  const { className, options, title } = props;
  const { 
    tasks,
    updateTempTaskId,
    updateTempTaskStatus,
    updateTempTaskSort,
    updateTempTaskDrop
  } = useContext(TasksContext);

  const filterTasks = () => {
    let newTasks = tasks.filter((task) => task.status === options.id);
    return newTasks.sort((a, b) => {
      return a.sort > b.sort ? 1 : -1
    })
  }
  const [columnTasks, setColumnTasks] = useState(filterTasks())

  const [{}, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => ( 
      updateTempTaskStatus(options.id)
    ),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  const moveCard = useCallback((taskId, hoverIndex) => {
    updateTempTaskSort(taskId)
    setColumnTasks((prevCards) => 
      update(prevCards, {
        $splice: [
          [taskId, 1],
          [hoverIndex, 0, prevCards[taskId]],
        ],
      }),
    )
  }, [])

  useEffect(() => {
    const updateTasks = () => {
      setColumnTasks(filterTasks())
    }
    updateTasks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks])

  const renderCard = useCallback((task, index) => {
    return (
      <Card
        key={task.id}
        className="workflow-card"
        taskId={task?.id}
        title={task?.title}
        updateTempTaskId={
          () => updateTempTaskId(task?.id)
        }
        updateTempTaskDrop={
          () => updateTempTaskDrop(task?.id)
        }
        index={index}
        moveCard={moveCard}
      />
    );
  }, []);

  return (
    <div className={className} ref={drop} data-testid="dustbin">
      <Title
        className="workflow-column-header"
        title={options.title}
        type={3}
      />
      <DivWrap
        className="workflow-column-body"
      >
        {columnTasks.map((task, index) => renderCard(task, index))}
      </DivWrap>
    </div>
  )
}