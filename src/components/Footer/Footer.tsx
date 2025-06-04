import { FC } from "react";
import { PageStatus } from "../../types";
import styles from "./Footer.module.css";
import clsx from "clsx";

export type FooterProps = {
  cntItemsLeft: number;
  status: PageStatus;
  setStatus: (newStatus: PageStatus) => void;
  clearCompleted: () => void;
};

export const Footer: FC<FooterProps> = (props) => {
  return (
    <footer className={styles.footer}>
      <p data-testid="ActiveTasksCount">{props.cntItemsLeft} items left</p>
      <section className={styles.state_control}>
        {Object.entries(PageStatus).map((el, cnt) => {
          const [key, value] = el;
          return (
            <button
              key={cnt}
              onClick={() =>
                props.setStatus(PageStatus[key as keyof typeof PageStatus])
              }
              data-testid={value}
              className={clsx(
                {
                  [styles.active]:
                    props.status === PageStatus[key as keyof typeof PageStatus],
                },
                {
                  [styles.not_active]:
                    props.status !== PageStatus[key as keyof typeof PageStatus],
                }
              )}
            >
              {value as string}
            </button>
          );
        })}
      </section>
      <button
        data-testid='ClearCompleted'
        className={styles.clear_button}
        onClick={() => props.clearCompleted()}
      >
        Clear completed
      </button>
    </footer>
  );
};
