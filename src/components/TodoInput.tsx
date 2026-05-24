import { useState, type FormEvent, type KeyboardEvent } from 'react'
import styles from './TodoInput.module.css'

type Props = {
  onAdd: (text: string) => void
}

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const trimmed = text.trim()
      if (!trimmed) return
      onAdd(trimmed)
      setText('')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="新しいタスクを入力..."
        rows={1}
      />
      <button
        className={styles.button}
        type="submit"
        disabled={!text.trim()}
        aria-label="タスクを追加"
      >
        追加
      </button>
    </form>
  )
}
