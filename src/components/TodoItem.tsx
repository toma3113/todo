import type { Todo } from '../types'
import styles from './TodoItem.module.css'

type Props = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <li className={`${styles.item} ${todo.done ? styles.done : ''}`}>
      <button
        className={styles.checkbox}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.done ? '未完了に戻す' : '完了にする'}
        aria-pressed={todo.done}
      >
        {todo.done && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <span className={styles.text}>{todo.text}</span>

      <button
        className={styles.delete}
        onClick={() => onDelete(todo.id)}
        aria-label="削除"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 2l10 10M12 2L2 12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </li>
  )
}
