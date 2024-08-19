import React, { Component } from 'react';
import { Navigate, withRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../css/landing.css';
import 'bootstrap/dist/css/bootstrap.css'

let url = "https://rockybookserver.herokuapp.com/";
export class Registration extends Component {
  constructor(props) {
    super(props)


    this.state = {
      accountName: "",
      accountNameValid:false,
      emailAddress: "",
      emailAddressValid:false,
      phoneNumber: "",
      phoneNumberValid:false,
      dob: "",
      ageValid:false,
      zipCode: "",
      zipValid:false,
      password: "",
      passwordConfrm: "",
      passwordValid: false,
      redirectMain: false,
      userNames:""
    }

    this.change = this.change.bind(this);
    this.nameValidation = this.nameValidation.bind(this);
    this.emailValidation = this.emailValidation.bind(this);
    this.phoneValidation = this.phoneValidation.bind(this);
    this.ageValidation = this.ageValidation.bind(this);
    this.zipValidation = this.zipValidation.bind(this);
    this.passwordValidation = this.passwordValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.checkUniqueName = this.checkUniqueName.bind(this);

    this.fetchUsers();
    
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  fetchUsers = async () => {
    const returned = await fetch(
        'https://jsonplaceholder.typicode.com/users'
    );
    const items = await returned.json()
    let userNamesArray = []
    items.map(user => {
      userNamesArray.push(user.username)
    })
    this.state.userNames = userNamesArray;
    // console.log(this.state.userNames);
  }

  checkUniqueName = (newName) => {
    let unique = true;
    this.state.userNames.map(userName =>{
      if(newName === userName){
        unique = false;
      }
    })
    return unique;
  }

  nameValidation = e =>{
    var newName = e.target.value;
    var nameMsg = document.getElementById("nameMsg");
    if(/^[a-zA-Z][a-zA-Z0-9]{3,15}$/.test(newName)){
      if(this.checkUniqueName(newName)){
        this.setState({accountNameValid:true});
        this.setState({accountName: newName});
        nameMsg.innerHTML = "";
      }else{
        nameMsg.innerHTML = "The name you entered already exist!"
      }
    }else{
      this.setState({accountNameValid:false});
      nameMsg.innerHTML = "4-16 digits of upper or lower case letters and numbers, may not start with a number"
    }
  }

  emailValidation = e => {
    var newEmail = e.target.value;
    var emailMsg = document.getElementById("emailMsg");
    if(/^\S+@\S+\.\S+$/.test(newEmail)){
      this.setState({emailAddressValid:true});
      this.setState({emailAddress: newEmail});
      emailMsg.innerHTML = ""
    }else{
      this.setState({emailAddressValid:false});
      emailMsg.innerHTML = "Email Address not valid"
  }
  }

  phoneValidation = e => {
    var newPhone = e.target.value;
    var phoneMsg = document.getElementById("phoneMsg");
    if(/^\d{3}[\-]?\d{3}[\-]?\d{4}$/.test(newPhone)){
        this.setState({phoneNumberValid:true});
        this.setState({phoneNumber:newPhone});
        phoneMsg.innerHTML = "";
    }else{
        this.setState({phoneNumberValid:false});
        phoneMsg.innerHTML = "Phone number not valid (xxx-xxx-xxxx)";
      }
  }
  
  ageValidation = e => {
    var dob = e.target.value;
    var dobMsg = document.getElementById("dobMsg");
    dob = dob.replace(/\D/g, '');              
    var birthYear = Number(dob.substring(0, 4));
    var birthMonth = Number(dob.substring(4, 6)) - 1;
    var birthDay = Number(dob.substring(6));
    var current = new Date();
    var currentYear = current.getFullYear();
    var currentMonth = current.getMonth();
    var currentDay = current.getDate();
    var age = currentYear - birthYear;
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      age--;
    }
    if (age < 18) {
      this.setState({ ageValid: false })
      dobMsg.innerHTML = "You must be at least 18 years old"
    } else {
      this.setState({ ageValid: true })
      dobMsg.innerHTML = "";
    }
  }

  zipValidation = e =>{
    var newZip = e.target.value;
    var zipMsg = document.getElementById("zipMsg");
    if(/^\d{5}(?:[-\s]\d{4})?$/.test(newZip)){
      this.setState({zipValid:true});
      this.setState({zipCode:newZip});
      zipMsg.innerHTML = "";
    }else{
      this.setState({zipValid:false});
      zipMsg.innerHTML = "Zipcode not valid (xxxxx)"
    }
  }

  passwordValidation = () => {
    var password = document.getElementById("password");
    var passwordConfrm = document.getElementById("passwordConfrm");
    var passwordMsg = document.getElementById("passwordMsg");

    if (password.value === passwordConfrm.value) {
      this.setState({ passwordValid: true })
      this.setState({password:passwordConfrm.value})
      passwordMsg.innerHTML = "";
    } else {
      this.setState({ passwordValid: false })
      passwordMsg.innerHTML = "Passwords do not match"
    }
  }

  addNewUser = async () => {
    let baseUrl = 'http://localhost:3000/'
    // let dob = this.state.dob
    // dob = dob.replace(/\D/g, '')               //convert to string and strip of the '-'
    // let birthYear = Number(dob.substring(0, 4))
    // console.log(birthYear)
    // console.log(typeof birthYear)
    // let birthMonth = Number(dob.substring(4, 6)) - 1
    // let birthDay = Number(dob.substring(6))
    console.log("in add new user")
    console.log(this.state.accountName)
    console.log(this.state.emailAddress)
    console.log(this.state.dob)
    console.log(this.state.zipCode)
    console.log(this.state.password)
    console.log(this.state.phoneNumber)
    const response = await fetch(url + 'register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.accountName,
                                   email: this.state.emailAddress,
                                   birthday: this.state.dob,
                                   zipcode: this.state.zipCode,
                                   password: this.state.password,
                                   phoneNum: this.state.phoneNumber}),
        })
    let responseMsg = document.getElementById("responseMsg")
    

    if(response.status == 400){
      const json = await response.json()
      responseMsg.style = "display: inline; color: red; font-size: 25px"
      responseMsg.innerHTML = response.result
      this.setState({redirectMain: false})
      
      
      console.log(json.Msg)
    }else{
      const json = await response.json()
      responseMsg.style = "display: inline; color: green; font-size: 25px"
      responseMsg.innerHTML = json.result
      if(json.result == "user exists"){
        this.setState({redirectMain:false})
      }else{
        this.setState({redirectMain: true})
      }

      // alert(json.result)
      console.log(json.result)
      console.log(this.state.redirectMain)
    }
  }


  handleSubmit = e => {
    e.preventDefault()
    if(this.state.accountNameValid&&this.state.emailAddressValid && this.state.phoneNumberValid && this.state.ageValid && this.state.zipValid && this.state.passwordValid){
      // localStorage.setItem("userId",11);
      // localStorage.setItem("userName",this.state.accountName);
      // localStorage.setItem("emailAddress",this.state.emailAddress);
      // localStorage.setItem("phoneNumber",this.state.phoneNumber);
      // localStorage.setItem("zipCode",this.state.zipCode);
      // this.setState({redirectMain:true});
      // console.log(this.state.accountName);
      // console.log(this.state.zipCode);
      this.addNewUser()
    }
    console.log(this.state.redirectMain);
  }

  render() {
    return (
      <div className="container">
        { this.state.redirectMain && <Navigate to='/Main' push />}
        <h1>Register</h1>
        <div className="ml-5 mb-2"><span id="responseMsg"></span></div>
        <form className="registrationForm">
            <div className="row ml-5">
              <label>Account Name:</label>
              <input
                name="accountName"
                placeholder="enter account name"
                type = "text"
                onChange={this.nameValidation}
                required
              />
            </div>
            <span id="nameMsg" className = "warning"></span>
            <div className="row ml-5">
              <label>Display Name (optional):</label>
              <input
                name="displayName"
                placeholder="enter display name"
                type = "text"
              />
            </div>
            <div className="row ml-5 mt-2">
              <label>Email Address:</label>
              <input
                name="emailAddress"
                placeholder="enter email address"
                type="text"
                onChange={this.emailValidation}
                required
              />
            </div>
            <span id="emailMsg" className = "warning"></span>
            <div className="row ml-5 mt-2">
              <label>phone Number:</label>
              <input
                name="phoneNumber"
                placeholder="enter phone number"
                type="text"
                onChange={this.phoneValidation}
                required
              />
            </div>
            <span id = 'phoneMsg' className = "warning"></span>
            <div className="row ml-5 mt-2">
              <label>Date of Birth:</label>
              <input
                name="dob"
                type="date"
                onChange={this.ageValidation}
                required
              />
              <span id="dobMsg" className = "warning"></span>
            </div>
            <div className="row ml-5 mt-2">
              <label>Zipcode:</label>
              <input
                name="zipCode"
                placeholder="enter zip code"
                type="text"
                onChange={this.zipValidation}
                required
              />
            </div>
            <span id = "zipMsg" className = "warning"></span>
            <div className="row ml-5 mt-2">
              <label>Password:</label>
              <input
                name="password"
                id="password"
                placeholder="enter password"
                type="password"
                required
              />
            </div>

            <div className="row ml-5 mt-2">
              <label>re-enter:</label>
              <input
                name="passwordConfrm"
                id="passwordConfrm"
                placeholder="re-enter password"
                type="password"
                onChange={this.passwordValidation}
                required
              />
              <span id="passwordMsg" className = "warning"></span>
            </div>
            <div className="button">
              <button className="btn btn-primary btn-sm mt-2" onClick={this.handleSubmit}>Register</button>
            </div>
          {/* </div> */}
        </form>
      </div>
    )
    
  }
}

export default Registration