import React, { useState,useEffect } from "react";

const Home = () => {
    const [createTask, setTask] = useState('');
    const [listTask, setPendingTask] = useState([]);
    
  const loadTasks = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/todo/users/El-Pepe');
      if (!response.ok) throw new Error("Error al cargar las tareas");
      const data = await response.json();
      setPendingTask(data.todos); 
    } catch (err) {
      console.log(err)
    } 
  };

  const addTask = async (text) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/El-Pepe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: text, is_done: false }), 
      });
      if (!response.ok) throw new Error("Error al agregar la tarea");
      const newTask = await response.json();
      setPendingTask([...listTask, newTask]); 
    } catch (err) {
      console.log(err)
    }
  };


  const deleteTask = async (id) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar la tarea");
      setPendingTask(listTask.filter((task) => task.id !== id));
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = () => {
    if (createTask.trim()) {
      addTask(createTask.trim());
      setTask("");
    }
  };

 

  return (
    <div className="text-center my-3">
      <h1>To Do List</h1>
  {/* Input para agregar tareas */}
      <div className="">
        <div className="d-flex justify-content-center">
          <input
            className="form-control"
            type="text"
            placeholder="Add a task"
            value={createTask}
            onChange={(event) => setTask(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleAddTask();
            }}
            style={{
              margin: "",
              padding: "8px",
              width: "24rem",
            }}
          />
        </div>

        {/* Mapeamos las tareas */}
        {listTask.map((task) => (
          <div
            key={task.id} // Usamos el ID único de la API
            className="d-flex justify-content-between align-items-center border justify-content-center form-control"
            style={{
              margin: "auto",
              padding: "8px",
              width: "24rem",
            }}
          >
            <span>{task.label}</span> {/* Accedemos al texto del label */}
            <button
              className="btn"
              onClick={() => deleteTask(task.id)} // Pasamos el ID para eliminar
            >
              x
            </button>
          </div>
        ))}

        {/* Contador de tareas */}
        <div
          className="d-flex justify-content-between align-items-center border justify-content-center form-control"
          style={{
            margin: "auto",
            padding: "8px",
            width: "24rem",
            color: "lightgray",
            fontSize: 12,
          }}
        >
          {listTask.length} item left
        </div>
      </div>
    </div>
  );
};

export default Home;