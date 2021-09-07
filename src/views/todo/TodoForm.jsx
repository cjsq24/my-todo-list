import { useState, useEffect } from 'react';
import { Form, Input, Button, InputGroupAddon, InputGroup, ButtonGroup } from 'reactstrap';
import { FaPlus, FaChevronLeft, FaEdit } from 'react-icons/fa';

export default function TodoForm(props) {
   const [todo, setTodo] = useState('')

   useEffect(() => {
      if (props.action === 'edit' && props.todo) {
         setTodo(props.todo)
      } else if (props.action === 'add') {
         setTodo('')
      }
   }, [props.todo, props.action])

   const onSubmit = (e) => {
      e.preventDefault()
      if (!validEmptyInput(todo)) {
         if (props.action === 'add') {
            props.addTodoToList(todo)
         } else {
            props.updateTodo(todo)
         }
         setTodo('')
      }
   }

   const validEmptyInput = (value) => {
      value = value.replace("&nbsp;", "");
      value = value === undefined ? "" : value;
      if (!value || 0 === value.trim().length) {
         return true;
      } else {
         return false;
      }
   }

   const cancelUpdate = () => {
      props.cancelUpdate()
      setTodo('')
   }

   return (
      <Form onSubmit={onSubmit}>
         <InputGroup>
            <Input bsSize='sm' value={todo} onChange={(e) => setTodo(e.target.value)} />
            <InputGroupAddon addonType="append">
               <ButtonGroup>
                  <Button color={props.action === 'add' ? 'success' : 'primary'} size='md' className='d-flex align-items-center'>
                     {props.action === 'add' ? (
                        <>
                           <FaPlus />
                           <span className='d-none d-sm-block' style={{marginLeft:5}}>Agregar</span>
                           <span className='d-block d-sm-none' style={{height:21}}></span>
                        </>
                     ) : (
                        <>
                           <FaEdit />
                           <span className='d-none d-sm-block' style={{marginLeft:5}}>Editar</span>
                           <span className='d-block d-sm-none' style={{height:21}}></span>
                        </>
                     )}
                  </Button>
                  {props.action === 'edit' &&
                     <Button color="danger" size='md' onClick={cancelUpdate} className='d-flex align-items-center'>
                        <FaChevronLeft />
                        <span className='d-none d-sm-block' style={{marginLeft:5}}>Cancelar</span>
                        <span className='d-block d-sm-none' style={{height:21}}></span>
                     </Button>
                  }
               </ButtonGroup>
            </InputGroupAddon>
         </InputGroup>
      </Form>
   );
}