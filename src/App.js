import React, { useState } from "react";
import { Button, Input, Space } from "antd";
import ToDoElement from "./ToDoElement";

import "./App.css";

// a bit early for you, but:
// useMemo, useCallback -> (callback, dependencyArray)

function App() {
  //useState is async code
  const [todos, setTodos] = React.useState([]);
  const [newTodoName, setNewTodoName] = React.useState();
  const [newTodoDescription, setNewTodoDescription] = React.useState();

  const handleAddNewTodo = () => {
    //all setStates are grouped together by React
    setTodos((previous) => {
      return [
        ...previous,
        {
          name: newTodoName,
          description: newTodoDescription,
          status: false,
          key: newTodoName,
        },
      ];
    });
    setNewTodoName("");
    setNewTodoDescription("");
  };

  const handleOnChange = (event) => {
    //event is event, target is HTML element, value is an attribute of <input>
    setNewTodoName(event.target.value);
  };

  const changeStatus = (key) => {
    // changing status of particular item
    setTodos((previous) => {
      return previous.map((element) => {
        if (element.key === key) {
          return {
            ...element,
            status: !element.status,
          };
        }
        return element;
      });
    });
  };

  const handleDeletion = (key) => {
    setTodos((prev) => {
      const tempPrev = prev;
      const keyTemp = tempPrev.findIndex((element) => element.key === key);
      tempPrev.splice(keyTemp, 1); // [1, 2, 3].splice(0, 1); => [2, 3]
      return [...tempPrev];
    });
  };

  return (
    <div>
      <Space direction="vertical">
        <Input
          onChange={handleOnChange}
          value={newTodoName}
          placeholder="Добавить новый ToDo task"
        />
        <Input
          onChange={(e) => setNewTodoDescription(e.target.value)}
          value={newTodoDescription}
          placeholder="Добавить описание к ToDo task"
        />
        <Button
          onClick={handleAddNewTodo}
          type="primary"
          shape="default"
          size="large"
        >
          Добавить ToDo
        </Button>
        {todos.map((element) => ( // map((element, i))
          <ToDoElement
            {...element}
            changeStatus={changeStatus}
            deleteTodo={handleDeletion}
            index={element.key}
            key={element.key} // key={i}
          />
        ))}
      </Space>
    </div>
  );
}

export default App;
