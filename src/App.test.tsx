import React from "react";
import { fireEvent, getByTestId, render, screen } from "@testing-library/react";
import App from "./App";
import { translit } from "./utils";
import { PageStatus } from "./types";

const taskNameValues = [
  "Какая то очень важная задача",
  "Вторая, тоже очень-очень важная задача",
  "Задача №3",
  "Задача №4",
  "Задача №5",
];

function prepareScreen() {
  const { container } = render(<App />);
  const taskCreator = getByTestId(container, "TaskCreator");
  const newTaskName = getByTestId(container, "NewTaskName");
  const counter = getByTestId(container, "ActiveTasksCount");
  for (let i = 0; i < taskNameValues.length; i++) {
    fireEvent.change(newTaskName, { target: { value: taskNameValues[i] } });
    fireEvent.click(taskCreator);
  }
  const btnAll = getByTestId(container, PageStatus.all);
  const btnActive = getByTestId(container, PageStatus.active);
  const btnCompleted = getByTestId(container, PageStatus.completed);
  const btnClearCompleted = getByTestId(container, "ClearCompleted");
  const checkArray: HTMLElement[] = [];
  const nameArray: HTMLElement[] = [];
  for (let i = 0; i < taskNameValues.length; i++) {
    checkArray.push(
      getByTestId(container, `check_${translit(taskNameValues[i])}`)
    );
    nameArray.push(
      getByTestId(container, `text_${translit(taskNameValues[i])}`)
    );
  }
  return {
    container,
    counter,
    items: { checkArray, nameArray },
    btnFilters: { btnAll, btnActive, btnCompleted },
    btnClearCompleted,
  };
}

test("Creating new task", () => {
  const elements = prepareScreen();
  expect(elements.counter.textContent).toEqual("5 items left");
  for (let i = 0; i < taskNameValues.length; i++) {
    const foundNew = screen.getByText(taskNameValues[i]);
    expect(foundNew).toBeInTheDocument();
  }
});

test("Complit 1 task", () => {
  const elements = prepareScreen();
  expect(
    Array.from(elements.items.nameArray[0].classList).some((className) =>
      className.includes("completed")
    )
  ).not.toBe(true);
  fireEvent.click(elements.items.checkArray[0]);
  expect(
    Array.from(elements.items.nameArray[0].classList).some((className) =>
      className.includes("completed")
    )
  ).toBe(true);
  expect(
    Array.from(elements.items.nameArray[2].classList).some((className) =>
      className.includes("completed")
    )
  ).not.toBe(true);
});

test("Filter", () => {
  const elements = prepareScreen();
  fireEvent.click(elements.items.checkArray[0]);
  expect(screen.queryByText(taskNameValues[0])).toBeInTheDocument();
  fireEvent.click(elements.btnFilters.btnActive);
  expect(screen.queryByText(taskNameValues[0])).not.toBeInTheDocument();
  fireEvent.click(elements.btnFilters.btnCompleted);
  expect(screen.queryByText(taskNameValues[0])).toBeInTheDocument();
  expect(screen.queryByText(taskNameValues[1])).not.toBeInTheDocument();
  fireEvent.click(elements.btnFilters.btnAll);
  expect(screen.queryByText(taskNameValues[0])).toBeInTheDocument();
  expect(screen.queryByText(taskNameValues[1])).toBeInTheDocument();
});


test("Clear completed", () => {
  const elements = prepareScreen();
  fireEvent.click(elements.items.checkArray[0]);
  expect(screen.queryByText(taskNameValues[0])).toBeInTheDocument();
  fireEvent.click(elements.btnClearCompleted);
  expect(screen.queryByText(taskNameValues[0])).not.toBeInTheDocument();
  expect(screen.queryByText(taskNameValues[1])).toBeInTheDocument();
});
