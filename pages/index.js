import { useState, useEffect, useCallback } from "react";

// Server-side rendering to load initial tasks
export async function getServerSideProps() {
  const initialTasks = [
    {
      id: 1,
      title: "Task 1",
      description: "Description 1",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Task 2",
      description: "Description 2",
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Task 3",
      description: "Description 3",
      priority: "low",
      completed: false,
    },
  ];
  return { props: { initialTasks } };
}

const Home = ({ initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [searchTerm, setSearchTerm] = useState("");

  // Helper to sort tasks by priority (high > medium > low)
  const sortTasksByPriority = (tasksToSort) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return [...tasksToSort].sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  };

  // Load tasks from localStorage or initialize with initial tasks
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    const loadedTasks = savedTasks || initialTasks;
    setTasks(sortTasksByPriority(loadedTasks));
  }, [initialTasks]);

  // Save tasks to localStorage whenever the task list changes (debounced)
  const saveTasksToLocalStorage = useCallback(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const timer = setTimeout(saveTasksToLocalStorage, 300);
    return () => clearTimeout(timer); // Cleanup the timer
  }, [tasks, saveTasksToLocalStorage]);

  // Generate a unique ID for new tasks
  const generateNewId = () =>
    tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

  const addTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: generateNewId(),
      title,
      description,
      priority,
      completed: false,
    };
    setTasks((prev) => sortTasksByPriority([...prev, newTask]));
    setTitle("");
    setDescription("");
    setPriority("low");
  };

  const editTask = (id) => {
    const task = tasks?.find((task) => task.id === id);
    if (!task) return;

    const newTitle = prompt("New Title:", task.title) || task.title;
    const newDescription =
      prompt("New Description:", task.description) || task.description;
    const newPriority = prompt("New Priority:", task.priority) || task.priority;

    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title: newTitle,
            description: newDescription,
            priority: newPriority,
          }
        : task
    );
    setTasks(sortTasksByPriority(updatedTasks));
  };

  const deleteTask = (id) => {
    setTasks((prev) =>
      sortTasksByPriority(prev?.filter((task) => task.id !== id))
    );
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(sortTasksByPriority(updatedTasks));
  };

  const filteredTasks = tasks?.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const incompleteTasks = filteredTasks?.filter((task) => !task.completed);
  const completedTasks = filteredTasks?.filter((task) => task.completed);

  return (
    <div className="app-container">
      <h1>Task Management App</h1>

      <input
        type="text"
        className="search-bar"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button className="btn-add" type="submit">
          Add Task
        </button>
      </form>

      <h2>Incomplete Tasks</h2>
      <ul className="task-list">
        {incompleteTasks.map((task) => (
          <li key={task.id} className={`task-card ${task.priority}`}>
            <div
              className={`status ${
                task.completed ? "completed-status" : "pending-status"
              }`}
            >
              {task.completed ? "Completed" : "Pending"}
            </div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>

            <button
              className="btn-toggle"
              onClick={() => toggleComplete(task.id)}
            >
              {task.completed ? "Mark as Pending" : "Mark as Completed"}
            </button>
            <button className="btn-edit" onClick={() => editTask(task.id)}>
              Edit Task
            </button>
            <button className="btn-delete" onClick={() => deleteTask(task.id)}>
              Delete Task
            </button>
          </li>
        ))}
      </ul>

      <h2>Completed Tasks</h2>
      <ul className="task-list">
        {completedTasks.length === 0 ? (
          <li className="no-tasks">Currently no tasks are completed.</li>
        ) : (
          completedTasks.map((task) => (
            <li key={task.id} className={`task-card completed-task`}>
              <div
                className={`status ${
                  task.completed ? "completed-status" : "pending-status"
                }`}
              >
                {task.completed ? "Completed" : "Pending"}
              </div>
              <h2>{task.title}</h2>
              <p>{task.description}</p>

              <button
                className="btn-toggle"
                onClick={() => toggleComplete(task.id)}
              >
                Mark as Pending
              </button>
              <button
                className="btn-delete"
                onClick={() => deleteTask(task.id)}
              >
                Delete Task
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Home;
