import React, { useState } from "react";

function CreateArea(props) {
  const [taskText, setTaskText] = useState({
    title: "",
    content: "",
  });

  function addTask(event) {
    event.preventDefault();

    const newTask = {
      id: Date.now(),
      title: taskText.title,
      content: taskText.content,
      status: "todo",
    };

    props.onAdd(newTask);

    setTaskText({
      title: "",
      content: "",
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setTaskText((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  return (
    <div className="task">
      <form>
        <input
          name="title"
          onChange={handleChange}
          type="text"
          value={taskText.title}
          placeholder="Title"
        />

        <textarea
          name="content"
          onChange={handleChange}
          value={taskText.content}
          placeholder="Take a note..."
        />

        <button onClick={addTask}>
          <span>Add</span>
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
