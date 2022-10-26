import { useEffect, useState } from 'react';
import Header from '../components/Header';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { Box, TextField, Button } from '@mui/material';
import { getDatabase, onValue, push, ref, remove, update, } from "firebase/database";
import app from '../config/Firebaseconfig';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getAuth, onAuthStateChanged } from 'firebase/auth';



function todu() {
    const Auth = getAuth(app);
    let [txt, setTxt] = useState("")
    let [list, setList] = useState([]);
    const location = useLocation();
    // console.log("LOCATION", location)
    const user = location?.state?.success;
    const navigate = useNavigate()
    const date = new Date();
    const hour = date.getHours();
    const second = date.getSeconds();
    const minutes = date.getMinutes();

    const time = `${hour} : ${minutes} : ${second}`;

    const todoData = (key, value) => {
        const editRef = ref(database, `todos/${user.uid}/${key}`)
        update(editRef, { value, time }).then((succ) => {
            console.log(succ);
        }).catch((err) => {
            console.log(err);
        })
    }

    const editButton = (index) => {
        setList(list.map((values, i) => {
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
        setTxt("");
        const todoRef = ref(database, `todos/${user.uid}`);
        const todo = {
            value: txt,
            time: time
        }
        push(todoRef, todo)
    }

    useEffect(() => {
        onAuthStateChanged(Auth, (user) => {
        if(user) {
         const reference = ref(database, `todos/${user.uid}`);
        onValue(reference, (event) => {
            const todos = event.val();
            const status = event.exists();
            if (status) {
                let editValue = Object.entries(todos).map(([key, value]) => {
                    return { ...value, id: key }
                })
                setList(editValue)
            }
        }) 
        }else {
                navigate('/')
            }
       
    })
    }, [])

    const deleteall = () => {
        const reference = ref(database, `todos/${user.uid}`);
        remove(reference).then((succ) => {
            let allDeleteValue = list.filter((todoValue,) => {
                if (!todoValue.id) {
                    return { ...todoValue };
                }
            })
            setList(allDeleteValue)
        }).catch((err) => {
            console.log(err, "masla he");
        })

    }

    const deleteButton = (event) => {
        //    console.log(event, index, "event");
        const reference = ref(database, `todos/${user.uid}/${event.id}`);
        remove(reference).then((succ) => {
            let deleteValue = list.filter((todoValue,) => {
                if (event.id !== todoValue.id) {
                    return { ...todoValue };
                }
            })
            setList(deleteValue)
        }).catch((err) => {
            console.log(err, "masla he");
        })

    }

  const EditValue = (e) => {
    if(e.key == 'Enter') {
        editButton(e.target.value)
    }
  }

   const EnterValue = (e) => {
    if(e.key == 'Enter') {
        add()
    }
   }

    const todolist = list.map((todo, index) => {
        return (
            <Box key={index} sx={{ textAlign: "center" }}>
                <Box className='d-flex justify-content-center my-5'>

                    <li className='list2 fs-2 d-flex border' style={{ width: "75%", justifyContent: "space-between" }} key={index}> {todo.edit ? <TextField width="100%" type="text" value={todo.value}
                        onKeyDown={EditValue}
                        onChange={(inpVal) => {
                            setList(list.map((e, i) => {
                                if (index == i) {
                                    return {
                                        ...e,
                                        value: inpVal.target.value,
                                    }
                                }
                                else {
                                    return e;
                                }
                            }))
                        }} /> : todo.value
                    }
                    {todo.time}
                        <Box sx={{ textAlign: "center" }}>
                            <Button onClick={() => editButton(index)} > {todo.edit ? <SaveAltIcon style={{ fontSize: "2rem", color: "black" }} /> : <EditIcon style={{ fontSize: "2rem", color: "black" }} />}   </Button>
                            {!todo.edit && <Button onClick={() => deleteButton(todo, index)}> <DeleteIcon style={{ fontSize: "2rem", color: "black" }} /> </Button>}
                        </Box>


                    </li>
                </Box>
            </Box>
        )
    })

    return (
        <>
            <Header />
            <Box sx={{ marginTop: 15, textAlign: "center" }}>
                <TextField value={txt} onChange={(e) => {
                    setTxt(e.target.value)
                }} sx={{ width: "70%" }} onKeyDown={EnterValue} />

                <Button onClick={add}>  <AddCircleOutlineIcon style={{ fontSize: "3rem", color: "black" }} />  </Button>
                <Button sx={{display : {xs : 'none', md : 'inline-block'}}} onClick={deleteall}>  <DeleteForeverIcon style={{ fontSize: "3rem", color: "black" }} /> </Button>
            </Box>
            {todolist}
        </>
    );
}

export default todu;