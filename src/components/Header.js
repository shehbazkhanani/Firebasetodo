import { AppBar, Typography } from "@mui/material";

function Header (){
   
   return (
   <>
   <AppBar sx={{textAlign: "center", backgroundColor : "black"}}>

<Typography variant="h4"> Todo </Typography>

   </AppBar>
    
    </>
    )
}

export default Header;