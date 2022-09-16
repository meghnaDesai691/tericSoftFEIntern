import './App.css';
import emp from './database.json';
import * as React from 'react';
import EmployeeList from "./emp-crud/emp-list";
import AddEmployee from "./emp-crud/emp-add";
import EditEmployee from "./emp-crud/emp-edit";
import ViewEmployee from "./emp-crud/emp-view";
import DeleteEmployee from "./emp-crud/emp-delete";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";


const App = () => {
    return (
        <div className="app">

                <Routes>
                    <Route path="/"   element={<EmployeeList/>}>
                        <Route path= "/addEmployee" element={<AddEmployee/>}></Route>
                        <Route path= "/editEmployee" element={<EditEmployee/>}></Route>
                        <Route path= "/deleteEmployee" element={<DeleteEmployee/>}></Route>
                        <Route path="/viewEmployee" element={<ViewEmployee/>}></Route>
                    </Route>
                </Routes>


        </div>
    )
}

export default App;
