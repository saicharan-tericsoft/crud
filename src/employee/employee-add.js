import React from "react";
import moment from 'moment';
import { Outlet,Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import employes from '../database.json';
import { Button,Checkbox,FormControlLabel,FormGroup,Radio,RadioGroup,FormLabel,FormControl,TextField, Box,Typography} from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
const AddEmployee=({onEmployeeAdd})=>{
    const [value, setValue] = React.useState(null);
    const [employeeData,SetEmployeeData] =useState(null);
    const update=()=>{
            const obj={};
            obj.id=employes.employees[employes.employees.length-1].id+1;
            obj.name=document.getElementById('name').value;
            obj.email=document.getElementById('email').value;
            obj.phone=document.getElementById('phone').value;
            obj.dob=value;
            var ele = document.getElementsByName('gender');
            for(let i = 0; i < ele.length; i++) {
                    if(ele[i].checked)
                    obj.gender=ele[i].value;
            }
            var ch=document.getElementsByName('checkBox');
            var arr= new Array();
            for(let i = 0; i < ch.length; i++){
              if(ch[i].checked)
              arr.push(ch[i].value);
            }  
            obj.hobbies=arr;
            if(obj.name!=""){
              SetEmployeeData(obj);
              axios.post('http://localhost:8000/employees', obj);
            }
            else{
              alert("please fill any one deatail");
            }
            
            onEmployeeAdd();
      }
    return(
        <div className="employee-add">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" className="add-title" style={{marginLeft:"20px"}}>
            Add Employee   <Button onClick={()=>onEmployeeAdd()} style={{marginLeft:"170px",color:"black",backgroundColor:"white"}}><Link to="/" style={{color:"black",textDecoration:"none"}}>X</Link></Button>
          </Typography>
          
          <TextField id="name" label="Name" variant="outlined" className="add-name" style={{marginTop:"10px"}} fullWidth/><br></br>
          
          <TextField id="email" label="Email" variant="outlined" className="add-email" style={{marginTop:"10px"}} fullWidth/><br></br>
          
          <TextField id="phone" label="Phone" variant="outlined" className="add-phone" style={{marginTop:"10px",marginBottom:"10px"}} fullWidth/><br></br>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DatePicker
            
            label="Date Of Birth"
            name="DatePicker"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider><br></br>
            <FormControl>
          <FormLabel id="gender">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            style={{display:"inline"}}
          >
            <FormControlLabel value="female" name="gender" control={<Radio />} label="Female" />
            <FormControlLabel value="male" name="gender" control={<Radio />} label="Male" />
            <FormControlLabel value="other" name="gender" control={<Radio />} label="Other" />
          </RadioGroup>
          
        </FormControl>
        <FormGroup>
        <label>Hobbies</label>
      <FormControlLabel name='checkBox' value="reading" control={<Checkbox />} label="reading" />
      <FormControlLabel name='checkBox' value="sleeping" control={<Checkbox />} label="sleeping" />
      <FormControlLabel name='checkBox' value="badminton" control={<Checkbox />} label="badminton" />
    </FormGroup>
    <center><Button variant="contained" onClick={update}><Link to="/" style={{color:"black",textDecoration:"none"}}>Save</Link></Button></center>
        </Box>
    </div>
    )
}
export default AddEmployee;