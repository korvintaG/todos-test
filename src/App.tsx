import { useState } from "react";
import "./App.css";
import { TaskAdded } from "./components/TaskAdded/TaskAdded";
import { faker } from "@faker-js/faker";
import { TaskCreator } from "./components/TaskCreator/TaskCreator";
import { PageStatus, Task } from "./types";
import { Footer } from "./components/Footer/Footer";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState<PageStatus>(PageStatus.all);

  const addTask = (name: string) => {
    if (name && name.length > 0) {
      const newTasks = Object.assign([], tasks);
      newTasks.push({
        id: faker.string.uuid(),
        name: name,
        completed: false,
      });
      setTasks(newTasks);
      setStatus(PageStatus.all); // чтоб пользователи не терялись куда пропадают добавленные записи
    }
  };

  const clearCompleted = () => {
    const newTasks = tasks.filter((el) => !el.completed);
    setTasks(newTasks);
    setStatus(PageStatus.all); // чтоб пользователи не терялись куда пропадают добавленные записи
  };

  function calcItemsLeft() {
    return tasks.reduce((sum, el) => (el.completed ? sum : sum + 1), 0);
  }

  const taskToggle = (id: string) => {
    const newTasks = tasks.map((el) =>
      el.id === id ? { ...el, completed: !el.completed } : el
    );
    setTasks(newTasks);
  };

  const tasksByStatus = tasks.filter((el) => {
    switch (status) {
      case PageStatus.all:
        return true;
      case PageStatus.active:
        return !el.completed;
      case PageStatus.completed:
        return el.completed;
    }
  });

  return (
    <div className="App">
      <header>
        <h1 className="main-title">todos</h1>
      </header>
      <main className="main">
        <TaskCreator addTask={addTask} />
        <ul>
          {tasksByStatus.map((el, cnt) => (
            <TaskAdded task={el} key={cnt} handleCheck={taskToggle} />
          ))}
        </ul>
      </main>
      <Footer
        cntItemsLeft={calcItemsLeft()}
        status={status}
        setStatus={setStatus}
        clearCompleted={clearCompleted}
      />
    </div>
  );
}

export default App;
