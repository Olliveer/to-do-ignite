import { Trash } from 'phosphor-react';
import { useState } from 'react';
import styles from './Todo.module.css';

type TodoProps = {
  id: string;
  isCompleted: boolean;
  description: string;
  onDoneTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
};

export function Todo({
  description,
  id,
  isCompleted,
  onDoneTask,
  onDeleteTask,
}: TodoProps) {
  function handleDoneTask() {
    onDoneTask(id);
  }

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  return (
    <div className={styles.container}>
      <input type="checkbox" checked={isCompleted} onChange={handleDoneTask} />
      <div
        className={
          isCompleted ? styles.todoDescriptionDone : styles.todoDescription
        }
      >
        <p>{description}</p>
      </div>
      <button type="button" onClick={handleDeleteTask}>
        <Trash size={24} />
      </button>
    </div>
  );
}
