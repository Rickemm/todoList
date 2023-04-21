import { useState } from 'react'
import { Trash, Check } from 'phosphor-react'

import styles from './ItemTodo.module.css'
import { todoItemType } from '../App'

interface ItemTodoProps{
  content: todoItemType,
  onRemoveItem: (id: string) => void,
  onChangeStatus: (id: string, status: boolean) => void
}

export function ItemTodo({content, onRemoveItem, onChangeStatus}: ItemTodoProps){
  const [ isChecked, setIsChecked ] = useState(false)

  function handleCheckedStatus(){
    onChangeStatus(content.id, !isChecked)
    setIsChecked(!isChecked)
  }
  
  function handleDeleteTodoItem(){
    onRemoveItem(content.id)
  }

  return (
    <div className={styles.item}>
      <input type="checkbox" checked={isChecked} onChange={handleCheckedStatus} />
      <p className={isChecked ? styles.chekedParagraph : styles.normalParagraph}>{content.description}</p>
      <button onClick={handleDeleteTodoItem}>
        <Trash  size={22}/>
      </button>
    </div>
  )
}