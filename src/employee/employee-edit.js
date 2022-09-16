import React, { useState } from "react";
import { Button,Checkbox,FormControlLabel,FormGroup,Radio,RadioGroup,FormLabel,FormControl,TextField, Box,Typography} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import moment from "moment";
import { Outlet,Link } from "react-router-dom";
import axios from "axios";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import employes from "../database.json";
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
const EditEmployee=({employee,onEmployeeEdit})=>{
    const [employeeDetails, setEmployeeDetails] =useState(employee);
    const [employeeDob, setEmployeeDob] = React.useState(employeeDetails.dob);
    const [employeeName, setEmployeeName] = React.useState(employeeDetails.name);
    const [employeeEmail, setEmployeeEmail] = React.useState(employeeDetails.email);
    const [employeePhone,setEmployeePhone]= React.useState(employeeDetails.phone);
    const [employeeGender,setEmployeeGender]= React.useState(employeeDetails.gender);
    const [employeeHobbies,setEmployeeHobbies] = React.useState(employeeDetails.hobbies);
    const [checkbox,setCheckbox]=React.useState(false);
    const handleGenderChange=(event)=>{
      setEmployeeGender(event.target.value);
    }
    const handleHobbyChange=(event)=>{
      setCheckbox(!checkbox);
      if(employeeHobbies?.includes(event.target.value)){
        employeeHobbies?.splice(employeeHobbies.indexOf(event.target.value),employeeHobbies.indexOf(event.target.value)+1);
      }
      else{
        employeeHobbies.push(event.target.value);
      }
      setEmployeeHobbies(employeeHobbies);
    }
    const handleEmployeeName=(event)=>{
      setEmployeeName(event.target.value);
    }
    const handleEmployeeEmail=(event)=>{
      setEmployeeEmail(event.target.value);
    }
    const handleEmployeePhone=(event)=>{
      setEmployeePhone(event.target.value);
    }
    const edit=()=>{
          const obj={};
          obj.id=employeeDetails.id;
          obj.name=employeeName;
          obj.email= employeeEmail;
          obj.phone=employeePhone;
          obj.dob=employeeDob;
          obj.gender = employeeGender;
          var ch=document.getElementsByName('hobby');
          var arr= new Array();
          for(let i = 0; i < ch.length; i++){
            if(ch[i].checked)
            arr.push(ch[i].value);
          }  
          obj.hobbies=arr;
          setEmployeeDetails(obj);
          axios.put(`http://localhost:8000/employees/${employeeDetails.id}`,obj);
          onEmployeeEdit();
    }
    return(
        <div className="edit-employee">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" style={{textAlign:"center"}}>
           Edit Employee   <Button onClick={()=>onEmployeeEdit()} style={{marginLeft:"170px",color:"black",backgroundColor:"white"}}><Link to="/" style={{color:"black",textDecoration:"none"}}>X</Link></Button>
          </Typography>
          <TextField id="name" label="Name" variant="outlined" value={employeeName} onChange={handleEmployeeName} fullWidth style={{marginTop:"10px"}}/><br></br>
          
          <TextField id="email" label="Email" variant="outlined"  value={employeeEmail} onChange={handleEmployeeEmail} fullWidth style={{marginTop:"10px"}}/><br></br>
          
          <TextField id="phone" label="Phone" variant="outlined" value={employeePhone} onChange={handleEmployeePhone} fullWidth style={{marginTop:"10px",marginBottom:"10px"}}/><br></br>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date Of Birth"
            name="DatePicker"
            value={employeeDob}
            onChange={(newValue) => {
              setEmployeeDob(newValue);
            }}
            renderInput={(params) => <TextField {...params} fullWidth/>}
          />
        </LocalizationProvider><br></br>
            <FormControl>
          <FormLabel id="gender">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={employeeGender}
            onChange={handleGenderChange}
            name="radio-buttons-group"
            style={{display:"inline"}}
          >
            
            <FormControlLabel value="female" name="gender" control={<Radio />} label="Female" />
            <FormControlLabel value="male" name="gender" control={<Radio />} label="Male" />
            <FormControlLabel value="other" name="gender" control={<Radio />} label="Other" />
          </RadioGroup>
          
        </FormControl>
        <div className='hobbies'><span>Hobbies</span>
                <FormGroup>
                    <FormControlLabel control={<Checkbox/>} name="hobby" value="reading" label="reading" 
                      checked={employeeHobbies?.includes("reading")} 
                      onChange={handleHobbyChange}
                    />
                    <FormControlLabel control={<Checkbox/>} name="hobby" value="sleeping" label="sleeping"  
                      checked={employeeHobbies?.includes("sleeping")}
                      onChange={handleHobbyChange}
                    />
                    <FormControlLabel control={<Checkbox/>} name="hobby" value="badminton" label="badminton" 
                      checked={employeeHobbies?.includes("badminton")}
                      onChange={handleHobbyChange}
                    />
                </FormGroup>
        </div>
        <center><Button variant="contained" onClick={()=>edit()} ><Link to="/" style={{color:"black",textDecoration:"none"}}>Save</Link></Button></center>
        </Box>
        <Outlet></Outlet>
      </div>
    )
}
export default EditEmployee;