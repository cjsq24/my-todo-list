import { Card, CardHeader, CardBody, Col, Row } from 'reactstrap'
import TodoForm from './TodoForm'
import TodoList from './TodoList';
import useLocalStorage from '../../helpers/useLocalStorage'
import { useState } from 'react';

export default function Todo() {
   const [action, setAction] = useState('add')
   const [todoList, setTodoList] = useLocalStorage('cs_todo_list')
   const [todoUpdate, setTodoUpdate] = useState({})

   const addTodoToList = (todo) => {
      const prevTodoList = (todoList && todoList?.length > 0) ? todoList : []
      setTodoList([
         {
            id: Math.floor(Math.random() * 1000),
            title: todo,
            completed: false
         },
         ...prevTodoList
      ])
   }

   const goUpdateTodo = (todo) => {
      setTodoUpdate(todo)
      setAction('edit')
   }

   const cancelUpdate = () => {
      setTodoUpdate({})
      setAction('add')
   }

   const updateTodo = (title) => {
      const updatedTodo = todoList.map((todo => {
         if (todo.id === todoUpdate.id) {
            todo.title = title
            setTodoUpdate({})
         }
         return todo
      }))
      setAction('add')
      setTodoList(updatedTodo)
   }

   const deleteTodo = (id) => {
      const newList = todoList.filter(todo => todo.id !== id)
      setAction('add')
      setTodoUpdate({})
      setTodoList(newList)
   }

   const checkUncheckTodo = (id) => {
      const newTodoList = todoList.map(todo => {
         if (todo.id === id) {
            todo.completed = !todo.completed
         }
         return todo
      })
      setTodoList(newTodoList)
   }

   return (
      <Row className='mt-4'>
         <Col md={{size:6, offset:3}} sm={{size:10, offset:1}}>
            <Card style={{minHeight:400}}>
               <CardHeader>To-do List</CardHeader>
               <CardBody>
                  <TodoForm 
                     addTodoToList={addTodoToList} 
                     action={action} 
                     todoUpdate={todoUpdate} 
                     updateTodo={updateTodo} 
                     todo={todoUpdate.title} 
                     cancelUpdate={cancelUpdate} 
                  />
                  <TodoList 
                     todoList={todoList} 
                     goUpdateTodo={goUpdateTodo} 
                     deleteTodo={deleteTodo}
                     checkUncheckTodo={checkUncheckTodo}
                  />
               </CardBody>
            </Card>
         </Col>
      </Row>
   );
}