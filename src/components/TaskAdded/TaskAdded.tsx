import { FC } from "react";
import { Task } from "../../types";
import styles from "./TaskAdded.module.css";
import clsx from "clsx";
import { CheckBox } from "../CheckBox/CheckBox";
import { translit } from "../../utils";

export type TaskAddedProps = {
  task: Task;
  handleCheck: (id: string) => void;
};

export const TaskAdded: FC<TaskAddedProps> = (props) => {
  return (
    <li key={props.task.id} className={styles.item}>
      <CheckBox
        dataTestid={`check_${translit(props.task.name)}`}
        value={props.task.completed}
        tooggle={() => props.handleCheck(props.task.id)}
      />
      <p
        data-testid={`text_${translit(props.task.name)}`}
        className={clsx({ [styles.completed]: props.task.completed })}
      >
        {props.task.name}
      </p>
    </li>
  );
};
