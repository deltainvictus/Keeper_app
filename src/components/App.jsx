import React, { useState, useEffect } from "react";
import Header from "./Header";
import CreateArea from "./CreateArea";
import Footer from "./Footer";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(task) {
    setTasks((prevTasks) => [...prevTasks, task]);
  }

  function moveToDoing(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: "doing" } : task
      )
    );
  }

  function moveToDone(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: "done" } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function editTask(id, newTitle, newContent) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle, content: newContent }
          : task
      )
    );
  }

  return (
    <div>
      <Header />
      <div className="board">
        <div className="column">
          <h2>To Do</h2>

          <CreateArea onAdd={addTask} />

          {tasks
            .filter((task) => task.status === "todo")
            .map((task) => (
              <div
                className="task"
                key={task.id}
                onClick={() => moveToDoing(task.id)}
              >
                <h3>{task.title}</h3>
                <p>{task.content}</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                >
                  ❌
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    const newTitle = prompt("Edit title:", task.title);
                    const newContent = prompt("Edit content:", task.content);

                    if (newTitle !== null && newContent !== null) {
                      editTask(task.id, newTitle, newContent);
                    }
                  }}
                >
                  ✏️
                </button>
              </div>
            ))}
        </div>

        <div className="column">
          <h2>Doing</h2>

          {tasks
            .filter((task) => task.status === "doing")
            .map((task) => (
              <div
                className="task"
                key={task.id}
                onClick={() => moveToDone(task.id)}
              >
                <h3>{task.title}</h3>
                <p>{task.content}</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                >
                  ❌
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    const newTitle = prompt("Edit title:", task.title);
                    const newContent = prompt("Edit content:", task.content);

                    if (newTitle !== null && newContent !== null) {
                      editTask(task.id, newTitle, newContent);
                    }
                  }}
                >
                  ✏️
                </button>
              </div>
            ))}
        </div>

        <div className="column">
          <h2>Done</h2>

          {tasks
            .filter((task) => task.status === "done")
            .map((task) => (
              <div className="task" key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.content}</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                >
                  ❌
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();

                    const newTitle = prompt("Edit title:", task.title);
                    const newContent = prompt("Edit content:", task.content);

                    if (newTitle !== null && newContent !== null) {
                      editTask(task.id, newTitle, newContent);
                    }
                  }}
                >
                  ✏️
                </button>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
