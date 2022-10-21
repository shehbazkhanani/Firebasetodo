import { Button, Card, Grid, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import LockIcon from '@mui/icons-material/Lock';
import * as React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import todoImg from '../images/todo.jpg'
import { Link } from "react-router-dom";
import { signUpUser } from "../config/Firebasemethod";

function SignIn() {

      const [userName, setUsername] = React.useState("")
      const [lastname, setLastname] = React.useState("")
      const [email, setEmail] = React.useState("")
      const [password, setPassword] = React.useState("")

      const signIn = () => {
        signUpUser({userName, lastname, email, password}).then((success)=> {
          const user = success
          console.log(user);
        }).catch((err)=>{
         const errorMessage = err.message;
         console.log(errorMessage);
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
                        <Box sx={{ textAlign: "center", marginTop: 5 }}> <LockIcon />  </Box>
                       
                        <Box sx={{ textAlign: "center", marginTop: 2 }}> 
                        
                        <Typography variant="p" sx={{fontFamily : 'roboto', fontWeight : "bold", fontSize : "1.6rem"}} > REGISTER ACCOUNT </Typography>
                         </Box>
                       
                       
                        <Box sx={{ textAlign: "center" }}>
                            <Box
                                sx={{

                                    marginTop: 4, textAlign: "center"
                                }}
                            >
                                <TextField onChange={(e)=>setUsername(e.target.value)} sx={{ m: 1, width: "90%" }} type="text" label="First Name*" variant="standard" id="fullWidth" />
                            </Box>
                        </Box>
                        <Box sx={{
                            marginTop: 1, textAlign: "center",
                        }}
                        >
                            <TextField onChange={(e)=>setLastname(e.target.value)} sx={{m : 1, width: "90%" }} type="text" label="Last Name*" variant="standard" id="fullWidth" />
                        </Box>

                        <Box sx={{
                            marginTop: 1, textAlign: "center",
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
                        <Box sx={{ marginTop: 11.5, textAlign: "center" }}>
                            <Button onClick={signIn} sx={{m : 1, width: "90%" }} variant="contained" color="success"> Sign up </Button>
                        </Box>

                        <Box sx={{ marginTop: 1, textAlign: "center" }}>
                         <Link to="/" style={{textDecoration : 'none'}}>   <Button sx={{m : 1, width: "90%" }} variant="contained" color="warning"> Back To Login </Button> </Link>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}
export default SignIn