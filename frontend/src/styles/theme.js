import { createTheme } from "@material-ui/core"; 
import { red, green, orange} from "@material-ui/core/colors"; 
export const theme = createTheme({  
    palette: {    
        primary: {      
            main: red[500],      
            light: red[300],       
        },    
        secondary: {      
            main: orange[700],      
            light: orange[500],    
        },
        success: {      
            main: green[700],      
            light: green[500],    
        },
    }
})