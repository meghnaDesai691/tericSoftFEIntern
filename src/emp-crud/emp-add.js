import {Button, IconButton, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import * as React from "react";
import Alert from '@mui/material/Alert';
import axios from "axios";
import './modal-styles.css';
import emp from '../database.json'
import CancelIcon from "@mui/icons-material/Cancel";


const AddEmployee = ({onEmployeeAdd} )=> {
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
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [name, setName] = React.useState("");
    const [phone, setphone] = React.useState("");
    const [email, setemail] = React.useState("");
    const [id,setId] = React.useState()

    const updateJson = (newemp) => {
        axios.post(`http://localhost:8000/employees/`,
            newemp
        ).then((res) => res.json);


    }
    const emp_obj = () => {
        const data = {};
        console.log(emp.employees[emp.employees.length-1])
        data.id = emp.employees[emp.employees.length-1].id+1;
        data.name = name;
        // console.log(data.name)
        data.email = email;
        data.phone = phone;
        data.dob = value;
        data.gender = document.querySelector('input[name = "gender"]:checked')?.value;
        data.hobbies = [];
        const options = document.getElementsByName("hobby");
        for (let i in options) {
            // console.log(i);
            if (options[i].checked) {
                data.hobbies.push(options[i].value);
                console.log(data.hobbies);
            }
        }
        //cannotAdd(data);
        console.log(data);
        if(data.name=="") {
           return alert("please fill the details");

        }

        else updateJson(data);
        onEmployeeAdd();
        //onEmployeeAdd();
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
                    <h2>Add Employee
                        <IconButton style={{float:"right"}} onClick={onEmployeeAdd}>
                            <CancelIcon/>
                        </IconButton></h2>
                    <div className='Name'>
                        <TextField id="name" label="name" variant="outlined" value={name} onChange={nameChange} fullWidth/>
                    </div>
                    <div className='Email'>
                        <TextField id="email" label="email" variant="outlined" valiue={email}
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
                                name="radio-buttons-group"
                                style={{display:"inline"}}
                            >
                                <FormControlLabel value="female" name="gender" control={<Radio/>} label="Female"/>
                                <FormControlLabel value="male" name="gender" control={<Radio/>} label="Male"/>
                                <FormControlLabel value="other" name="gender" control={<Radio/>} label="Other"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className='hobbies'><span>Hobbies</span>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox/>} name="hobby" value="reading" label="reading"/>
                            <FormControlLabel control={<Checkbox/>} name="hobby" value="dancing" label="dancing"/>
                            <FormControlLabel control={<Checkbox/>} name="hobby" value="Sleeping" label="Sleeping"/>
                            <FormControlLabel control={<Checkbox/>} name="hobby" value="Singing" label="Singing"/>

                        </FormGroup>
                    </div>
                  <center> <Button variant="contained" onClick={emp_obj} >Save</Button></center>
                </Box>

            </div>
        </div>

    )
}


export default AddEmployee;