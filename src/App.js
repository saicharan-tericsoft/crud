import './App.css';
import React from 'react';
import EmployeeList from './employee/employee-list';
import { Route,Routes,BrowserRouter as Router } from 'react-router-dom';
import AddEmployee from './employee/employee-add';
import EditEmployee from './employee/employee-edit';
import ViewEmployeeDetails from './employee/employee-view';
function App() {
  return (
    <div className='app'>
        <Routes>
          <Route path="/" element= {<EmployeeList />}>
              <Route  path="add" element={<AddEmployee/>}></Route>
              <Route  path="edit" element={<EditEmployee/>}></Route>
              <Route  path="view" element={<AddEmployee/>}></Route>
              <Route  path="delete" element={<></>}></Route>
          </Route>
        </Routes>
    </div>
  );
}
export default App;
