import { isValidDateValue } from '@testing-library/user-event/dist/utils';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Box, TextField, Button } from '@mui/material';
import { getDatabase, onValue, push, ref, update,} from "firebase/database";
import app from '../config/Firebaseconfig';
import { useLocation } from 'react-router-dom';



function todu() {
    let [txt, setTxt] = useState("")
    let [list, setList] = useState([]);
    
    const todoData = (key, value) => {
    const editRef = ref(database, `todos/${user.uid}/${key}`)  
    update(editRef, { value } ).then((succ) => {
  console.log(succ);
    }).catch((err)=> {
        console.log(err);
    })
}

    const location = useLocation();
    console.log("LOCATION", location)
    const user = location.state.success;
    const editButton = (index) => {
        setList(list.map((values, i) => {
            console.log(values, "updatedValue");
            if (index === i) {
               if (values.edit) {
                todoData(values.id, values.value) 
               }
                return {
                    ...values,
                    edit: values.edit ? false : true,
                }

            }

            else {
                return {
                    ...values,
                    edit: false,
                }
            }
        }))
    }

    const database = getDatabase(app);

    const add = () => {
        // setList([...list, { value: txt }])
        setTxt("");
        const todoRef = ref(database, `todos/${user.uid}`);
        const todo = {
            value: txt,
            // uid: user.uid
        }
        push(todoRef, todo)
    }

    useEffect(()=>{
        const reference = ref(database, `todos/${user.uid}`);
        onValue(reference, (event) => {
          const todos = event.val();
          if (todos) {
            let editValue = Object.entries(todos).map(([key, value])=> {
           return {...value, id : key}
            })
            setList(editValue)
          
        }})
    },[])


    let deleteValue;
    const deleteButton = (index) => {
        const deletelist = [...list]
        deleteValue = deletelist.filter((todoValue, indexValue) => {
            if (index !== indexValue) {
                return todoValue;
            }
        })
        setList(deleteValue)
    }

    const todolist = list.map((todo, index) => {
        return (
            <Box key={index} sx={{ textAlign: "center" }}>
                <Box>

                    <li className='list2 fs-2 d-flex' key={index}> {todo.edit ? <TextField type="text" value={todo.val}
                        onChange={(inpVal) => {
                            setList(list.map((e, i) => {
                                if (index == i) {
                                    return {
                                        ...e,
                                        value : inpVal.target.value,
                                    }
                                }
                                else {
                                    return e;
                                }
                            }))
                        }} /> : todo.value
                    }
                        <Box sx={{ textAlign: "center" }}>
                            <Button onClick={() => editButton(index)} > {todo.edit ? <SaveAltIcon /> : <EditIcon />}   </Button>
                            {!todo.edit && <Button onClick={() => deleteButton(index)}> <DeleteIcon /> </Button>}
                        </Box>


                    </li>
                </Box>
            </Box>
        )
    })

    return (
        <>
            <Header />
            <Box sx={{ marginTop: 10, textAlign: "center" }}>
                <TextField value={txt} onChange={(e) => {
                    setTxt(e.target.value)
                }} sx={{ width: "70%" }} />

                <Button onClick={add}>  <AddCircleOutlineIcon />  </Button>
            </Box>
            {todolist}
        </>
    );
}

export default todu;