import { useReducer } from 'react'
import type { Todo } from './types'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'
import styles from './App.module.css'

type Action =
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE'; id: string }
  | { type: 'DELETE'; id: string }

function reducer(todos: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD':
      return [
        { id: crypto.randomUUID(), text: action.text, done: false, createdAt: Date.now() },
        ...todos,
      ]
    case 'TOGGLE':
      return todos.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t))
    case 'DELETE':
      return todos.filter((t) => t.id !== action.id)
  }
}

export default function App() {
  const [todos, dispatch] = useReducer(reducer, [])

  const remaining = todos.filter((t) => !t.done).length

  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>TODO</h1>
          {todos.length > 0 && (
            <span className={styles.badge}>
              {remaining} / {todos.length}
            </span>
          )}
        </header>

        <TodoInput onAdd={(text) => dispatch({ type: 'ADD', text })} />

        {todos.length === 0 ? (
          <p className={styles.empty}>タスクはありません</p>
        ) : (
          <ul className={styles.list}>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={(id) => dispatch({ type: 'TOGGLE', id })}
                onDelete={(id) => dispatch({ type: 'DELETE', id })}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
