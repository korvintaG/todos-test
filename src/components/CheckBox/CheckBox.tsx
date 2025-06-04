import { FC } from "react";
import styles from "./CheckBox.module.css";
import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export type CheckBoxProps = {
  value: boolean;
  tooggle: () => void;
  dataTestid?: string;
};

export const CheckBox: FC<CheckBoxProps> = (props) => {
  return (
    <div
      data-testid={props.dataTestid}
      className={clsx(
        styles.container,
        { [styles.checked]: props.value },
        { [styles.unchecked]: !props.value }
      )}
      onClick={() => props.tooggle()}
    >
      {props.value ? <CheckIcon className={styles.icon} /> : null}
    </div>
  );
};
