import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ClipboardText } from 'phosphor-react'

import { Header } from "./components/Header";
import { ItemTodo } from "./components/ItemTodo";

import './global.css'
import styles from './App.module.css'

export interface todoItemType {
  id: string,
  description: string,
  isComplited: boolean
}

export function App() {
  const [todoItemList, setTodoItemList] = useState<todoItemType[]>([])

  function handleAddTodo(message: string) {
    setTodoItemList([...todoItemList, {
      id: uuidv4(),
      description: message,
      isComplited: false
    }])
  }

  function handleRemoveTodo(id: string) {
    const todoListWithoutOneItem = todoItemList.filter(todo => {
      return todo.id !== id
    })

    setTodoItemList(todoListWithoutOneItem)
  }

  function handleStatusTodo(id: string, status: boolean) {
    const newListTodo = todoItemList.map(todo => {
      if (todo.id === id) {
        todo.isComplited = status
      }
      return todo
    })
    setTodoItemList(newListTodo)
  }

  return (
    <div className={styles.main}>
      <Header onAddTodo={handleAddTodo} />

      <div className={styles.mainTodoList}>
        <div className={styles.todoInfo}>
          <div className={styles.todoCount}>
            <p>
              Tarefas criadas
              <span>{todoItemList.length}</span>
            </p>
          </div>
          <div className={styles.todoCompleted}>
            <p>
              Concluídas
              <span>
                {todoItemList.filter(todo => todo.isComplited === true).length} de {todoItemList.length}
              </span>
            </p>
          </div>
        </div>
        <div className={styles.todoList}>
          {todoItemList.length !== 0 ? todoItemList.map(todo => {
            return (
              <ItemTodo key={todo.id} content={todo} onRemoveItem={handleRemoveTodo} onChangeStatus={handleStatusTodo} />
            )
          })
          :
          <div className={styles.messageInitial}>
            <ClipboardText size={56}/>
            <h4>Você ainda não tem tarefas cadastradas</h4>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
          }
        </div>
      </div>
    </div>
  )
}
