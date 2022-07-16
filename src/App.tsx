import { FormEvent, useState } from 'react';
import styles from './App.module.css';
import { Clipboard, PlusCircle } from 'phosphor-react';
import { v4 as uuid } from 'uuid';

import logo from './assets/img/logo.svg';
import { Todo } from './components/Todo';

type Todo = {
  id: string;
  isCompleted: boolean;
  description: string;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const todosStorage = localStorage.getItem('todos');

    if (todosStorage) {
      return JSON.parse(todosStorage);
    }

    return [];
  });
  const [todo, setTodo] = useState('');

  const todosDone = todos.filter((todo) => todo.isCompleted).length;

  function handleCreateTodo(event: FormEvent) {
    event.preventDefault();

    if (todo === '') {
      return alert('Não é possível criar task vazia.');
    }

    const id = uuid();

    todos.push({ id: id, isCompleted: false, description: todo });

    setTodos([...todos]);

    localStorage.setItem('todos', JSON.stringify(todos));

    setTodo('');
  }

  function handleDoneTask(id: string) {
    const todoExists = todos.find((todo) => todo.id === id);

    if (todoExists) {
      todoExists.isCompleted = todoExists.isCompleted ? false : true;
    }

    setTodos([...todos]);

    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function handleDeleteTask(id: string) {
    const todosFiltered = todos.filter((todo) => todo.id !== id);

    setTodos(todosFiltered);

    localStorage.setItem('todos', JSON.stringify(todosFiltered));
  }

  return (
    <section className={styles.container}>
      <header>
        <img src={logo} alt="Logo ignite" />
      </header>

      <form onSubmit={handleCreateTodo}>
        <input
          type="text"
          value={todo}
          onChange={(event) => setTodo(event.target.value)}
          placeholder="Adicione uma nova tarefa"
        />
        <button type="submit">
          Criar <PlusCircle size={16} />
        </button>
      </form>

      <div className={styles.todoList}>
        <header>
          <strong>
            Tarefas criadas <span>{todos.length}</span>
          </strong>
          <strong>
            Concluídas{' '}
            {!todos.length ? (
              <span>0</span>
            ) : (
              <span>
                {todosDone} de {todos.length}
              </span>
            )}
          </strong>
        </header>

        {todos.length > 0 ? (
          <div className={styles.listTodos}>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                description={todo.description}
                id={todo.id}
                isCompleted={todo.isCompleted}
                onDoneTask={handleDoneTask}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </div>
        ) : (
          <div className={styles.listBox}>
            <Clipboard size={56} color="#808080" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <span>Crie tarefas e organize seus itens a fazer</span>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
