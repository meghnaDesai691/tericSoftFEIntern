import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import {Button, IconButton, TextField} from "@mui/material";
import moment from "moment/moment";
import * as React from "react";


const ViewEmployee = (props) => {
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
    const {EmployeeToBeViewed , onEmployeeView}  = props;
    return(
        <div className='app' style={{height: 750, width: '100%',overflow:"scroll"}}>
            <div className='add-edit-employee' style={{float: "right"}}>
                <Box sx={style}>
                    <h2>View Employee
                        <IconButton style={{float:"right"}} onClick={onEmployeeView}>
                            <CancelIcon/>
                        </IconButton>
                    </h2>
                    <div className='View'>
                        <p>Name</p>
                        <div className="name-display" >
                           <h2> {EmployeeToBeViewed.name?EmployeeToBeViewed.name : "-"} </h2>
                        </div>
                        <p>Email</p>
                        <div className="email-display" >
                            <h2> {EmployeeToBeViewed.email?EmployeeToBeViewed.email : "-"} </h2>
                        </div>
                        <p>Phone</p>
                        <div className="phone-display" >
                            <h2> {EmployeeToBeViewed.phone?EmployeeToBeViewed.phone : "-"} </h2>
                        </div>
                        <p>Date Of Birthday</p>
                        <div className="dob-display">
                            <h2> {EmployeeToBeViewed.dob? moment(EmployeeToBeViewed.dob).format("MM/DD/YYYY"):"--"} </h2>
                        </div>
                        <p>Gender</p>
                        <div className="gender-display" >
                            <h2> {EmployeeToBeViewed.gender?EmployeeToBeViewed.gender : "-"} </h2>
                        </div>
                        <p>Hobbies</p>
                        {(EmployeeToBeViewed.hobbies.length==0)?
                            <div>-</div> : EmployeeToBeViewed.hobbies?.map((hobby)=>
                            <h2>{hobby}</h2>)
                        }
                    <center><Button variant="contained" onClick={onEmployeeView}>Close</Button></center>
                    </div>
                </Box>
            </div>
        </div>
    )

}

export default ViewEmployee;