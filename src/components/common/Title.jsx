export function Title(props) {
  const { title, className, type } = props;
  return (
    <div className={className}>
      {type === 1 ?
        <h1>{title}</h1>
        : null
      }
      {type === 2 ?
        <h2>{title}</h2>
        : null
      }
      {type === 3 ?
        <h3>{title}</h3>
        : null
      }
    </div>
  );
}