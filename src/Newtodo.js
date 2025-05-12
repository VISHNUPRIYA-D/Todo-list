import React, { useState } from "react";
import axios from "axios";

const Newtodo = () => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    axios
      .post(`${process.env.REACT_APP_API_URL}/add`, { task })
      .then(() => {
        setTask("");
        window.location.reload(); // or trigger a re-fetch if using state management
      })
      .catch((err) => console.error(err));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add your task"
        className="typebox"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit" className="sub-btn">
        Add
      </button>
    </form>
  );
};

export default Newtodo;
