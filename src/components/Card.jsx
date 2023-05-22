import { useDrag } from 'react-dnd'
export function Card(props) {
  const { className, title } = props;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: title,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }))
  return (
    <div ref={drag} data-testid={`box`} className={className}>
      {title}
    </div>
  )
}