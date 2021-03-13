import { Modal, List, ListItem, ListItemText, Button } from '@material-ui/core'
import React, { useState } from 'react';
import './Todo.css';
import {db} from '../firebase';
import {AiFillDelete,AiOutlineEdit} from 'react-icons/ai';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>{
    return ({
        paper:{
            width:400,
            backgroundColor: theme.palette.background.paper,
            border:'2px solid #000',
            boxShadow:theme.shadows[0],
            padding:theme.spacing(2,4,3)
        },
        modal:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center'
        },
        aiOutlineEdit:{
            fontSize:32,
            marginRight:10,
            cursor:'pointer'
        },
        updateInput:{
            height:28,
            marginRight:5
        }
    })
});


const styles = {
    aiFillDeleteStyle:{
        fontSize:32,
        cursor :'pointer',
    }
}

const Todo = ({item}) => {
    //console.log({item})

    const [open,setOpen] = useState(false);

    const [input,setInput] = useState('');

//    const handleOpen = () =>{
//        setOpen(true)
//    }
   const handleClose = () => {
       setOpen(false);
   }
   const classes = useStyles();

   const updateTodo = () =>{

    db.collection('todos').doc(item.id).set({
        todo:input
    },{merge:true})
    setOpen(false);
   }
    return (
        <>
            <Modal className={classes.modal}
                open={open}
                onClose={handleClose}
            >
                <div className={classes.paper}>
                <h1>Update your Todo</h1>
                <input className={classes.updateInput}  placeholder={item.todo} type="text" value={input} onChange={ e => setInput(e.target.value)}/>
                <Button variant="contained" color='secondary'   onClick={ updateTodo}>Update Todo</Button>
                </div>

            </Modal>
            <List className="todo-list">
                <ListItem>
                 <ListItemText  primary={item.todo} secondary="Dummy deadline!"/>
                </ListItem>
                <AiOutlineEdit className={classes.aiOutlineEdit} onClick={ e => setOpen(true)}></AiOutlineEdit>
                <AiFillDelete style={{...styles.aiFillDeleteStyle}} onClick = {(e) => {
                db.collection('todos').doc(item.id).delete();
            }}
                />
            </List>

        </>
    )
}

export default Todo
