import { PlusCircle } from 'phosphor-react'

import styles from './Header.module.css'
import LogoToDo from '../assets/logo.svg'
import { ChangeEvent, FormEvent, useState } from 'react'

interface HeaderProps {
  onAddTodo: (message: string) => void
}

export function Header({ onAddTodo }: HeaderProps) {
  const [todoInputData, setTodoInputData] = useState('')

  function handleTodoInputValue(event: ChangeEvent<HTMLInputElement>){
    setTodoInputData(event.target.value)
  }

  function handleCreateNewTodo(event: FormEvent){
    event.preventDefault()
    onAddTodo(todoInputData)
    setTodoInputData('')
  }

  return (
    <header className={styles.header}>
      <img src={LogoToDo} alt='Logo app ToDo' />

      <form onSubmit={handleCreateNewTodo} className={styles.form}>
        <input
          type="text"
          placeholder='Adicione uma nova tarefa'
          value={todoInputData}
          onChange={handleTodoInputValue}
        />
        <button type='submit'>
          Criar
          <PlusCircle size={22} />
        </button>
      </form>

    </header>
  )
}