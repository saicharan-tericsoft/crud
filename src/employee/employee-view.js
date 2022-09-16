import React, { useState } from "react";
import { Outlet,Link } from "react-router-dom";
import { Button,Checkbox,FormControlLabel,FormGroup,Radio,RadioGroup,FormLabel,FormControl,TextField, Box,Typography} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from "moment";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const ViewEmployeeDetails=({employee,onEmployeeView})=>{
    const [employeeDetails, setEmployeeDetails] =useState(employee);
    const [employeeDob, setEmployeeDob] = React.useState(employeeDetails.dob);
    const [employeeName, setEmployeeName] = React.useState(employeeDetails.name);
    const [employeeEmail, setEmployeeEmail] = React.useState(employeeDetails.email);
    const [employeePhone,setEmployeePhone]= React.useState(employeeDetails.phone);
    const [employeeGender,setEmployeeGender]= React.useState(employeeDetails.gender);
    const [employeeHobbies,setEmployeeHobbies] = React.useState(employeeDetails.hobbies);
    console.log(employee);
    return(
        <div className="View-employee">   
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:"center"}}>
           View Employee  <Button onClick={()=>onEmployeeView()} style={{marginLeft:"170px",color:"black",backgroundColor:"white"}}><Link to="/">X</Link></Button>
          </Typography>
          <div>
          <p>Name :</p>
          <h3>{employeeName!=""?employeeName:"--"}</h3>
          <p>Email :</p> 
          <h3>{employeeEmail!=""?employeeEmail:"--"}</h3>
          <p>Date of :</p>
          <h3>{employeeDob?moment(employeeDob).format("MM/DD/YYYY"):"--"}</h3>
          <p>Phone :</p>
          <h3>{employeePhone!=""?employeePhone:"--"}</h3>
          <p>Gender :</p>
          <h3>{employeeGender!=""?employeeGender:"--"}</h3>
          <p>Hobbies :</p>
          {
            employeeHobbies?employeeHobbies.map((hobby)=>
                 <h2>{hobby}</h2>
            ):<div>--</div>
          }   
          </div>
          <center><Button variant="contained" onClick={()=>onEmployeeView()} ><Link to="/">Cancel</Link></Button></center>
          </Box>
        </div>
    )
}
export default ViewEmployeeDetails;