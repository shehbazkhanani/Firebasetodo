import { AppBar, Box} from "@mui/material";
import todoImg from '../images/todo.jpg'
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";

function Header (){
   
   return (
   <>
   <AppBar sx={{textAlign: "center", backgroundColor : "black"}}>
<Box sx={{display : "flex", justifyContent : "space-between"}}> 

<img src={todoImg} width="120wh" height="80vh" />

<Link to="/" style={{color : "white", textDecoration : "none"}}> <LogoutIcon sx={{fontSize : "2.5rem", marginTop : 2}}/> </Link>

</Box>
   </AppBar>
    
    </>
    )
}

export default Header;