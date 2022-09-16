import axios from "axios";
import EmployeeList from "./emp-list";
import emp from "../database.json";
import Box from "@mui/material/Box";
import {Button, IconButton, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import moment from "moment/moment";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";
import './modal-styles.css';
import CancelIcon from "@mui/icons-material/Cancel";


const EditEmployee = ({EmployeeDetails, onEmployeeEdit}) => {

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
    const [value, setValue] = React.useState(EmployeeDetails.dob);
    const [name, setName] = React.useState(EmployeeDetails.name);
    const [phone, setphone] = React.useState(EmployeeDetails.phone);
    const [email, setemail] = React.useState(EmployeeDetails.email);
    const [gender,setGender] = React.useState(EmployeeDetails.gender);
    const [hobbies,setHobbies] = React.useState(EmployeeDetails.hobbies);
    const [checkradio,setCheckradio] = React.useState(EmployeeDetails.gender);
    const [checkbox,setCheckbox] = React.useState(hobbies);
    const editEmp = (EmployeeDetails) => {
        console.log(EmployeeDetails);
        axios.put(`http://localhost:8000/employees/${EmployeeDetails.id}`,
            EmployeeDetails
        ).then((res) => res.data);
    }

    const RadioChange = (event)=>{
            setGender(event.target.value)
    }
    const HobbiesChange = (event) =>{
        let updatedList = [...checkbox];
        if (event.target.checked) {
            updatedList = [...checkbox, event.target.value];
        } else {
            updatedList.splice(checkbox.indexOf(event.target.value), 1);
        }
        setHobbies(updatedList);
        setCheckbox(updatedList);
    }
    const emp_obj = () => {
        const data = {};
        data.id = EmployeeDetails.id;
        data.name = name;
        data.email = email;
        data.phone = phone;
        data.dob = value;
        data.gender = gender;
        data.hobbies = hobbies;
        editEmp(data);
        onEmployeeEdit();
    }

    const nameChange = (event) => {
        setName(event.target.value);
    }
    const phoneChange = (event) => {
        setphone(event.target.value);
    }
    const emailChange = (event) => {
        setemail(event.target.value);
    }
    return (
        <div className='app' style={{height: 750, width: '100%'}}>
            <div className='add-edit-employee' style={{float: "right"}}>
                <Box sx={style}>
                    <h2>Edit Employee
                        <IconButton style={{float:"right"}} onClick={onEmployeeEdit}>
                            <CancelIcon/>
                        </IconButton></h2>
                    <div className='Name'>
                        <TextField id="name" label="name" variant="outlined" value={name} onChange={nameChange} fullWidth/>
                    </div>
                    <div className='Email'>
                        <TextField id="email"  label="email" variant="outlined" value={email}
                                   onChange={emailChange} fullWidth/>
                    </div>
                    <div className="Phone">
                    <TextField id="phone" label="phone" variant="outlined" value={phone} onChange={phoneChange} fullWidth/>
                    </div>
                    <div className='dob'>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Basic example"
                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} fullWidth/>}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className='gender'>
                        <div>Gender</div>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue={EmployeeDetails.gender}
                                name="radio-buttons-group"
                                style={{display:"inline"}}
                            >
                                <FormControlLabel value="female" name="gender" control={<Radio/>} label="Female"

                                                  onChange={(event,checked)=>RadioChange(event)}

                                />
                                <FormControlLabel value="male" name="gender" control={<Radio/>} label="Male"

                                                  onChange={(event,checked)=>RadioChange(event)}


                                />
                                <FormControlLabel value="other" name="gender" control={<Radio/>} label="Other"

                                                  onChange={(event,checked)=>RadioChange(event)}/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='hobbies'><span>Hobbies</span>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox/>} name="hobby" value="reading" label="reading"
                                              checked={hobbies?.includes("reading")}
                                              onChange={(e,checked)=> {
                                                  HobbiesChange(e)
                                              }}/>
                            <FormControlLabel control={<Checkbox/>} name="hobby" value="dancing" label="dancing"
                                              checked={hobbies?.includes("dancing")}
                                              onChange={(event, checked)=>HobbiesChange(event)}/>
                            <FormControlLabel control={<Checkbox/>} name="hobby" value="Sleeping" label="Sleeping"
                                              checked={hobbies?.includes("Sleeping")}
                                              onChange={(event, checked)=>HobbiesChange(event)}/>
                            <FormControlLabel control={<Checkbox/>} name="hobby" value="Singing" label="Singing"
                                              checked={hobbies?.includes("Singing")}
                                              onChange={(event, checked)=>HobbiesChange(event)}/>


                        </FormGroup>
                    </div>
                   <center><Button variant="contained" onClick={emp_obj}>Save</Button></center>
                </Box>

            </div>
        </div>

    )

}


export default EditEmployee;