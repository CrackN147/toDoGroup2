export function DivWrap(props) {
  const { className, children } = props;
  return (
    <div className={className}>
      {children}
    </div>
  )
}