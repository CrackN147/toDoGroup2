import { useDrop } from 'react-dnd'
export function Column(props) {
  const { className, children } = props;
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))
  const isActive = canDrop && isOver
  return (
    <div className={className} ref={drop} data-testid="dustbin">
      {children}
    </div>
  )
}