import { useContext, useState, useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd'
import { TasksContext } from '../services/TasksContext';
import { Title, DivWrap, Card } from './'
export function Column(props) {
  const { className, options, title } = props;
  const { 
    tasks,
    updateTempTaskId,
    updateTempTaskStatus
  } = useContext(TasksContext);

  const filterTasks = () => {
    return tasks.filter((task) => task.status === options.id)
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

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    console.log(dragIndex, hoverIndex)
    // setColumnTasks((prevCards) =>
    //   // update(prevCards, {
    //   //   $splice: [
    //   //     [dragIndex, 1],
    //   //     [hoverIndex, 0, prevCards[dragIndex]],
    //   //   ],
    //   // }),
    // )
  }, [])

  useEffect(() => {
    const updateTasks = () => {
      setColumnTasks(filterTasks())
    }
    updateTasks()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks])

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
        {columnTasks.map((task, index) => (
          <Card
            key={index}
            className="workflow-card"
            title={task.title}
            updateTempTaskId={
              () => updateTempTaskId(task.id)
            }
            index={index}
            moveCard={moveCard}
          />
        ))}
      </DivWrap>
    </div>
  )
}