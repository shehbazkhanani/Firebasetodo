import { Button, Card, FormControl, Grid, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import LoginIcon from '@mui/icons-material/Login';
import * as React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import todoImg from '../images/todo.jpg'
import { Link, useNavigate } from "react-router-dom";
import { logInUser } from "../config/Firebasemethod";

function Login() {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
   const navigate = useNavigate()
    
   const logIn = () => {
        logInUser({email, password}).then((success)=> {
         if(success){
          navigate('./Todo', {
            state : {success}
          })
         }
        }).catch((err)=> {
         console.log(err);
        })
   }
      
    return (
        <>
        
            <Grid container>
                <Grid item md={8}  sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, display: "flex", justifyContent: "center", backgroundColor : "black"}}>
              <Box sx={{ display: { xs: 'none', sm : 'none', md : 'flex' }, width : "100%", height : "100%" }}> 
              <Box sx={{width : "100%", display : "flex", justifyContent : "center"}} >
              <img src={todoImg} width="50%" height="50%" />
              </Box>
              </Box>
                </Grid>
                
                <Grid item md={4} sm={12} xs={12} sx={{ width: "30%" }}>
                    <Card sx={{ alignItem: "center" }}>
                        <Box sx={{ textAlign: "center", marginTop: 5 }}> <LoginIcon />  </Box>
                       
                        <Box sx={{ textAlign: "center", marginTop: 2 }}> 
                        
                        <Typography variant="p" sx={{fontFamily : 'roboto', fontWeight : "bold", fontSize : "1.6rem"}} > LOGIN ACCOUNT </Typography>
                         </Box>
                       
                       
                      

                        <Box sx={{
                            marginTop: 10, textAlign: "center",
                        }}
                        >
                            <TextField onChange={(e)=>setEmail(e.target.value)} sx={{ m: 1, width: "90%" }} type="email" label="Email*" variant="standard" id="fullWidth" />
                        </Box>



                        <Box sx={{
                            marginTop: 1, textAlign: "center",
                        }}
                        >
                            <TextField onChange={(e)=>setPassword(e.target.value)} sx={{ m: 1, width: "90%" }} type="password" label="Password*" variant="standard" id="fullWidth" />

</Box>
                        
<Box sx={{ marginTop: 15.5, textAlign: "center" }}>
                            <Link> <Typography sx={{m : 1, width: "90%" }}> Forget Your Password? </Typography> </Link>
                        </Box>

                        <Box sx={{ marginTop: 5, textAlign: "center" }}>
                            <Button onClick={logIn} sx={{m : 1, width: "90%" }} variant="contained" color="success"> Login </Button>
                        </Box>

                        <Box sx={{ marginTop: 1, textAlign: "center" }}>
                           <Link style={{textDecoration : 'none'}} to="Sigin"> <Button sx={{m : 1, width: "90%" }} variant="contained" color="warning"> SignUp </Button> </Link>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
export default Login