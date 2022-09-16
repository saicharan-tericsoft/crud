import * as React from 'react';
import moment from 'moment';
import ViewEmployeeDetails from './employee-view';
import {Chip} from '@mui/material';
import { Outlet ,Link} from 'react-router-dom';
import employees from "../database.json";
import AddEmployee from './employee-add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { Button,Modal} from "@mui/material";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditEmployee from './employee-edit';
import { useState } from 'react';
import axios from 'axios';
import {Typography,Box} from '@mui/material';
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
const EmployeeList=()=> {
  const [isEmployeeAddModalOpened, setIsEmployeeAddModalOpened] = useState(false);
  const [isEmployeeEditModalOpened, setIsEmployeeEditModalOpened] = useState(false);
  const [isEmployeeViewModalOpened, setIsEmployeeViewModalOpened] = useState(false);
  const [employeeToBeDeleted,setEmployeeToBeDeleted] = useState(false);
  const [employeeToBeViewed,setEmployeeToBeViewed] = useState(false);
  const [ selectedEmployee, setSelectedEmployee ] = useState([]);
  const [isEmployeeDeleteModalOpened, setIsEMployeeDeleteModelOpened] = React.useState(false);
  // const getList=()=>{
  //     const data=a;
  //     setEmployeeList(data);  
  // }
  // useEffect(() => {
  //   getList();
  //   console.log(employeeList);
  // }, []);
  const openAddEmployeeModal=()=>{
      setIsEmployeeAddModalOpened(true);
  }
  const closeAddEmployeeModal=()=>{
      setIsEmployeeAddModalOpened(false);
  }
  const openViewEmployeeModal=(row)=>{
    setEmployeeToBeViewed(row)
    setIsEmployeeViewModalOpened(true);
}
const closeViewEmployeeModal=()=>{

    setIsEmployeeViewModalOpened(false);
}
  const openEditEmployeeModal=(row)=>{
    setSelectedEmployee(row);
      setIsEmployeeEditModalOpened(true);
  }
  const closeEditEmployeeModal=()=>{
      setIsEmployeeEditModalOpened(false);
  }
  const openDeleteEmployeeModel=(row)=>{
    setEmployeeToBeDeleted(row)
    setIsEMployeeDeleteModelOpened(true);
  }

  const closeDeleteEmployeeModel=()=>{
    setIsEMployeeDeleteModelOpened(false);
  }
  const handleEmployeeAdd=()=>{
  closeAddEmployeeModal();
  }
  const handleEmployeeEdit=()=>{
      closeEditEmployeeModal();
  }
  const handleEmployeeDelete=()=>{
    closeDeleteEmployeeModel();
  }
  const handleEmployeeView=()=>{
    closeViewEmployeeModal();
  }
  const deleteEmployee=(row)=>{
    axios.delete(`http://localhost:8000/employees/${row.id}`).then(() => console.log('Delete successful'));
    handleEmployeeDelete();
  }
  return (
    <div className='employee-home'>
    <div className='navbar'>
      <span className='table-title' style={{fontSize:"40px"}}>Employees</span>
      <Button onClick={openAddEmployeeModal}  variant="contained" disableElevation className='add-button'style={{marginLeft:"1160px"}}  ><Link to="/add"  style={{color:"black",textDecoration:"none"}}>Add</Link></Button>
    </div>
    <TableContainer component={Paper} style={{marginTop:"10px"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell >Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell >Phone</TableCell>
            <TableCell >Date</TableCell>
            <TableCell >Gender</TableCell>
            <TableCell >Hobbies</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.employees.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name!=""?row.name:"--"}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.email!=""?row.email:"--"}
              </TableCell>
              <TableCell >{row.phone!=""?row.phone:"--"}</TableCell>
              <TableCell >{row.dob?moment(row.dob).format("MM/DD/YYYY"):"--"}</TableCell>
              <TableCell >{row.gender!=""?row.gender:"--"}</TableCell>
              
              <TableCell >{
                row?.hobbies!=""?row.hobbies.map((i)=>
                <Chip key={i} label={i} variant="outlined" />
             ):"--"
              }</TableCell>
              <TableCell><Button className='edit-button'  style={{backgroundColor:"yellow", color:"black",marginRight:"10px"}}
              onClick = {()=>openEditEmployeeModal(row)} to="/edit"><Link to="/edit" style={{color:"black",textDecoration:"none"}}>Edit</Link></Button>
              <Button className='view-button'  style={{backgroundColor:"green", color:"black",marginRight:"10px"}}
              onClick = {()=>openViewEmployeeModal(row)} to="/view"><Link to="/view" style={{color:"black",textDecoration:"none"}}>View</Link></Button>
              <Button style={{backgroundColor:"red", color:"black"}}
              onClick = {()=>{openDeleteEmployeeModel(row)}}><Link to="/delete" style={{color:"black",textDecoration:"none"}}>Delete</Link></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Modal
        open={isEmployeeEditModalOpened}
        onClose={handleEmployeeEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
          <EditEmployee employee={selectedEmployee} onEmployeeEdit={handleEmployeeEdit} ></EditEmployee>
    </Modal>
    <Modal
        open={isEmployeeDeleteModalOpened}
        onClose={handleEmployeeDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Are You Sure ?<Button onClick={handleEmployeeDelete} style={{marginLeft:"180px",color:"black",backgroundColor:"white"}}><Link to="/" style={{color:"black",textDecoration:"none"}}>X</Link></Button>
                </Typography>
                <Typography id="spring-modal-description" sx={{ mt: 2 }} >
                    Do you Really want to delete
                  </Typography>
                <Button onClick={handleEmployeeDelete} style={{backgroundColor:"yellow",color:"black",marginRight:"30px",marginTop:"30px"}}><Link to="/" style={{color:"black",textDecoration:"none"}}>No, Cancel</Link></Button>
                <Button onClick={()=>deleteEmployee(employeeToBeDeleted)} style={{backgroundColor:"red",color:"black",marginTop:"30px"}}><Link to="/" style={{color:"black",textDecoration:"none"}}>Yes, Delete</Link></Button>
              </Box>
    </Modal>
    <Modal
            open={isEmployeeAddModalOpened}
            onClose={handleEmployeeAdd}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <AddEmployee onEmployeeAdd={handleEmployeeAdd}></AddEmployee>
    </Modal>
    <Modal
          open={isEmployeeViewModalOpened}
          onClose={handleEmployeeView}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
        <ViewEmployeeDetails employee={employeeToBeViewed} onEmployeeView={handleEmployeeView}></ViewEmployeeDetails>
    </Modal>
    <Outlet/>
    </div>
  );
}
export default EmployeeList;