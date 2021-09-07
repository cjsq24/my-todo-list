import { Table, Button, Col, Row, ButtonGroup } from 'reactstrap';
import { FaEdit, FaRegTimesCircle, FaCheck } from 'react-icons/fa';

export default function TodoList(props) {
   const { todoList, goUpdateTodo, deleteTodo } = props

   return (
      <Row>
         <Col>
            {(todoList && todoList?.length > 0) ? (
                  <Table striped hover responsive className='mt-4'>
                     <tbody>
                        {todoList.map((todo, index) => (
                           <tr key={index} className={(todo.completed ? 'completed' : '')}>
                              <td>{index + 1}</td>
                              <td>{todo.title}</td>
                              <td>
                                 <div className='d-flex justify-content-end align'>
                                    <ButtonGroup>
                                       <Button 
                                          size='md' 
                                          color={todo.completed ? 'success' : 'secondary'} 
                                          onClick={() => props.checkUncheckTodo(todo.id)} 
                                          className='d-flex align-items-center'
                                       >
                                          <FaCheck className='icon' />
                                       </Button>
                                       <Button 
                                          size='md' 
                                          color='info' 
                                          onClick={() => goUpdateTodo(todo)}
                                          className='d-flex align-items-center'
                                       >
                                          <FaEdit className='icon' />
                                       </Button>
                                       <Button 
                                          size='md' 
                                          color='danger' 
                                          onClick={() => deleteTodo(todo.id)}
                                          className='d-flex align-items-center'
                                       >
                                          <FaRegTimesCircle className='icon' />
                                       </Button>
                                    </ButtonGroup>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
               ) : (
                  <div className='mt-4'>
                     <h5 className='text-center'>No has agregado elementos a la lista todavía</h5>
                  </div>
               )
            }
         </Col>
      </Row>
   );
}