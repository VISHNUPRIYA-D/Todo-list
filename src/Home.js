import React, { useEffect, useState } from "react";
import Newtodo from "./Newtodo";
import axios from "axios";
import { BsCircleFill, BsFillCheckCircleFill, BsTrash } from "react-icons/bs";

const Home = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3100/get")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);
  const handleEdit = (id) => {
    axios
      .put("http://localhost:3100/update/" + id)
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  };
  const handleDelete = (id)=>{
    axios
      .delete("http://localhost:3100/delete/" + id)
      .then(() => window.location.reload())
      .catch((err) => console.log(err));
  }
  return (
    <div>
      <h1>Todo list</h1>
      <Newtodo />
      {todos.length === 0 ? 
        <div>
          <p>No todo lists</p>
        </div>
       : (
        todos.map((todo) => (
          <div className="todos" key={todo._id}>
            {todo.done ? (
              <BsFillCheckCircleFill />
            ) : (
              <BsCircleFill className="icon" />
            )}
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              <p className={`{content ${todo.done ? "crashline" : ""}`}>
                {todo.task}
              </p>
            </div>
            <div onClick={() => handleDelete(todo._id)}>
              <BsTrash className="icon" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;