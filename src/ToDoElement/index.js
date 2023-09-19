import { Button, Card } from "antd";
import React from "react";


const ToDoElement = (props) => {
  const { name, description, status, index, changeStatus, deleteTodo } = props;
  
  // now, it will recalculate condition only if status has changed
  const condition = React.useMemo(() => {
    return status ? 'green' : 'red';
  }, [status]); // (function, array)


  // ternary operator -> if else one-line representation
  // if (a > 5) console.log(true); else console.log(false) => a > 5 ? console.log(true) : console.log(false);
  const title = <p style={{ color: condition }}>{name}</p>;

  return (
    <Card
      title={title}
      extra={[
        <Button onClick={() => changeStatus(index)}>
          {/* move it to useMemo yourselves 😎 */}
          {status ? "Open" : "Close"} 
        </Button>,
        <Button danger onClick={() => deleteTodo(index)}>
          Delete
        </Button>,
      ]}
    >
      <p>{description}</p>
    </Card>
  );
};

export default ToDoElement; // pozhe
