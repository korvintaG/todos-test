import { ChangeEvent, FC, KeyboardEventHandler, useState } from "react";
import styles from "./TaskCreator.module.css";
import ArrowIcon from "../ArrowIcon/ArrowIcon";

export type TaskCreatorProps = {
  addTask: (name: string) => void;
};

export const TaskCreator: FC<TaskCreatorProps> = (props) => {
  const [newTaskName, setNewTaskName] = useState("");

  const addTaskHandle = () => {
    props.addTask(newTaskName);
    setNewTaskName("");
  };

  const handleNewTaskNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewTaskName(value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      props.addTask(newTaskName);
      setNewTaskName("");
    }
  };

  return (
    <div className={styles.input_block}>
      <button
        data-testid="TaskCreator"
        onClick={() => addTaskHandle()}
        className={styles.add_task}
      >
        <ArrowIcon />
      </button>
      <input
        data-testid="NewTaskName"
        className={styles.input}
        type="text"
        placeholder="Whats needs to be done?"
        onChange={handleNewTaskNameChange}
        onKeyDown={handleKeyDown}
        value={newTaskName}
      />
    </div>
  );
};
