import React, { Component } from 'react'
import '../css/profile.css';

let url = "https://rockybookserver.herokuapp.com/";
export class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: "",
            userName: "",
            email: "",
            emailValid: true,
            phone: "",
            phoneValid: true,
            zipcode: "",
            zipValid: true,
            password: "123123",
            passwordValid: true
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }
    componentDidMount = () => {
        this.getInfo();
    }

    getInfo = async() =>{
        const response = await fetch(url + 'username',  {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        const json = await response.json()
        // console.log(json.username)
        this.setState({userName: json.username})
        const response2 = await fetch(url + 'email',  {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        const json2 = await response2.json()

        this.setState({email: json2.email})
        const response3 = await fetch(url + 'phoneNum',  {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        const json3 = await response3.json()
        // console.log(json.username)
        this.setState({phone: json3.phoneNum})
        const response4 = await fetch(url + 'zipcode',  {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        const json4 = await response4.json()
        this.setState({zipcode: json4.zipcode})

    }

    checkEmail = () =>{
        var newEmail = document.getElementById("email").value;
        var emailMsg = document.getElementById("emailMsg");
        if(newEmail != ''){
            if(/^\S+@\S+\.\S+$/.test(newEmail)){
                var oldEmail = this.state.email;
                if(newEmail != oldEmail){
                    emailMsg.innerHTML = '';
                    this.setState({emailValid:true});
                }else{
                    emailMsg.innerHTML = "You entered the same email as before!"
                    this.setState({emailValid:false});
                }
            }else{
                emailMsg.innerHTML = 'Invalid Email Address!';
                this.setState({emailValid:false});
            }
        }else{
            emailMsg.innerHTML = '';
            this.setState({emailValid:true})
        }
    }

    checkPhone = () =>{
        var phoneNumber = document.getElementById("phone").value;
        var phoneMsg = document.getElementById("phoneMsg");
        if(phoneNumber != ''){
            if(/^\d{3}[\-]?\d{3}[\-]?\d{4}$/.test(phoneNumber)){
                var oldPhone = this.state.phone;
                if(phoneNumber != oldPhone){
                    phoneMsg.innerHTML = '';
                    this.setState({phoneValid:true});
                }else{
                    phoneMsg.innerHTML = "You entered the same phone number as before!";
                    this.setState({phoneValid:false});
                }
            }else{
                phoneMsg.innerHTML = 'Invalid Phone Number!';
                this.setState({phoneValid:false});
            }
        }else{
            phoneMsg.innerHTML ='';
            this.setState({phoneValid:true});
        }
    }

    checkZipcode = () => {
        var zipcode = document.getElementById("zip").value;
        var zipMsg = document.getElementById("zipMsg");
        if(zipcode != ''){
            if(/^\d{5}(?:[-\s]\d{4})?$/.test(zipcode)){
                var oldZip = this.state.zipcode;
                if(zipcode!=oldZip){
                    zipMsg.innerHTML = '';
                    this.setState({zipValid:true});
                }else{
                    zipMsg.innerHTML = 'You entered the same zipcode as before!';
                    this.setState({zipValid:false});
                }
            }else{
                zipMsg.innerHTML = "Invalid Zipcode!";
                this.setState({zipValid:false});
            }
        }else{
            zipMsg.innerHTML = '';
            this.setState({zipValid:true});
        }
    }

    checkPassword = () => {
        var password = document.getElementById('pass').value;
        var passMsg = document.getElementById("passMsg");
        var confirmPassword = document.getElementById("passConfirm").value;
        if(password != confirmPassword){
            passMsg.innerHTML = "Passwords do not match";
            this.setState({passwordValid:false});
        }else{
            passMsg.innerHTML = '';
            this.setState({passwordValid:true});
        }
    }

    handleUpdate = e => {
        e.preventDefault();
        var updateInfo = '';
        var flag = true;
        var Info = document.getElementById("Info");
        var newEmail = document.getElementById("email").value;
        var oldEmail = this.state.email;
        var newPhone = document.getElementById("phone").value;
        var oldPhone = this.state.phone;
        var newZip = document.getElementById("zip").value;
        var oldZip = this.state.zipcode;
        var newPass = document.getElementById("pass").value;
        var oldPass = this.state.password;
        if(this.state.emailValid && this.state.phoneValid && this.state.zipValid && this.state.passwordValid ){
            flag = true;
            // localStorage.setItem("emailAddress",this.state.email);
            // localStorage.setItem("phoneNumber",this.state.phone);
            // localStorage.setItem("zipCode",this.state.zipcode);
        }else{
            flag = false;
        }
        if(flag == true){
            if(newEmail!=''){
                const response = fetch(url + 'email',  {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({email: newEmail})    
                })
                updateInfo = updateInfo + 'Email Address changes from '+ oldEmail + ' to ' + newEmail +'<br>';
                this.setState({email:newEmail});
            }
            if(newPhone!=''){
                const response = fetch(url + 'phoneNum',  {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({phoneNum: newPhone})    
                })
                updateInfo = updateInfo + 'Phone number changes from '+ oldPhone + ' to ' + newPhone +'<br>';
                this.setState({phone:newPhone});
            }
            if(newZip!= ''){
                const response = fetch(url + 'zipcode',  {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({zipcode: newZip})    
                })
                updateInfo = updateInfo + 'Zipcode changes from '+ oldZip + ' to ' + newZip +'<br>';
                this.setState({zipcode:newZip});
            }
            if(newPass!= ''){
                const response = fetch(url + 'password',  {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({password: newPass})    
                })
                updateInfo = updateInfo + 'Pass changes from '+ Array(oldPass.length+1).join('*') + ' to ' + Array(newPass.length+1).join('*') +'<br>';
                this.setState({password:newPass});
            }
            Info.innerHTML = updateInfo;
            setTimeout(function(){
                Info.innerHTML = '';
                updateInfo = '';
            },5000);
        }
            
            
    }

    

    render() {
        return (
            <div>
                <div className = "updateBlock">
                <h1 className="ml-5">Update Info</h1>
                <h2 className = "ml-5" >Account Name: {this.state.userName}</h2>
                <div className = 'field' id = "emailAddress">
                    <div>Email Address: </div>
                    <div><input type = "text" size = "30" id = "email" onChange = {this.checkEmail}></input></div>
                    <span id = "emailMsg" className = "warning"></span>
                    <div id = "emailShow">{this.state.email}</div>
                </div>
                <div className = 'field' id = "phoneNumber">
                    <div>Phone Number:</div>
                    <div><input type = "tel" size = "30" id = "phone" onChange = {this.checkPhone}></input></div>
                    <span id = "phoneMsg" className = "warning"></span>
                    <div id = "phoneShow">{this.state.phone}</div>
                </div>
                <div classname = 'field' id = "zipcode">
                    <div>Zipcode: </div>
                    <div><input type = "text" size = "30" id = "zip" onChange = {this.checkZipcode}></input></div>
                    <span id = "zipMsg" className = "warning"></span>
                    <div id = "zipShow">{this.state.zipcode}</div>
                </div>
                <div className = 'field' id = "password">
                    <div>Password: </div>
                    <div><input type = "text" size = "30" id = "pass"></input></div>
                    <div id = "passShow">*******</div>
                </div>
                <div className = 'field' id = "filedConfirm">
                    <div>Confirm Password: </div>
                    <div><input type = "text" size = "30" id = "passConfirm" onChange = {this.checkPassword}></input></div>
                    <span id = "passMsg" className = "warning"></span>
                </div>
                <div>
		                <button type="button" id = "btn" className="btn btn-primary btn-sm mt-2" onClick={this.handleUpdate}>Update</button>
	            </div>
                <span id = "Info" className = "warning"></span>
                </div>
            </div>
        )
    }
}

export default Profile