import './App.css';
import React,{useEffect, useReducer, useState} from 'react';
import {Button,FormControl,Input,InputLabel} from '@material-ui/core';
import Todo from './components/Todo';
import {db} from './firebase';
import firebase from 'firebase'

const todosState = [];

const reducer = (todosState,action) =>{
  switch (action.type) {
    case 'ADD_TODO':
     
      return [...todosState,action.todoText]
      
      case 'SET_TODOS': 
          todosState = action.todos2;
          //console.log({todosState})
        return todosState;

    default:
      return todosState;
  }
}

function App() {

  const [todos,dispatch] = useReducer(reducer,todosState);

  const [todos2,setTodos2] = useState([]);
  const [input,setInput] = useState('');

  const deneme = async () =>{
     await db.collection('todos').orderBy('timestamp','desc').onSnapshot( (snapshot) => {
      //console.log(snapshot.docs.map( (doc) => doc.data() ))
      setTodos2(snapshot.docs.map(doc => ({id:doc.id,todo:doc.data().todo})) )
    } );
  }
  useEffect(  ()=>{
    // dispatch({type:'SET_TODOS',db:db.collection('todos')})
   
deneme();
   dispatch({type:'SET_TODOS',todos2:todos2})
     
  } );
 //console.log({todos2});
  const  addTodo = async () =>{
   
    dispatch({type:'ADD_TODO',todoText:input,input:input});
    await db.collection('todos').add({
      todo:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput((prev) => prev='');
  }

  const handleChange = (e)=>{
    setInput( (prev) => prev= e.target.value );
    
  }
  const handleOnSubmit = (e) => {
    e.preventDefault();
  }

  //console.log({todos});
  return (
    <div className="App">
      <h1>TodoList App</h1>
      <form onSubmit={(e) => handleOnSubmit(e)} >
      <FormControl >
        <InputLabel >Write a Todo</InputLabel>
        <Input value={input}
          onChange={ (e) => handleChange(e)}/>
          <Button type="submit" disabled={!input} onClick={ addTodo } variant="contained" color="secondary">
          Add Todo
          </Button>
      </FormControl>
    
      <ul>
        {
          todos.map( (todo,index) =>{
            return (
              <Todo  item = {todo} key={index}/>
            )
          } )
        }
        </ul>
      </form>

      
    </div>
  );
}

export default App;

