import React, { Component } from 'react';
import {Navigate, withRouter} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/landing.css';

let url = "https://rockybookserver.herokuapp.com/";
export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: "",
            userId: "",
            userName: "",
            password: "",
            userValid: false,
            emailAddress:"",
            phoneNumber:"",
            zipCode:"",
            // redirectMain: false
            redirectMain: false
        }

        this.change = this.change.bind(this)
        // this.userValidation = this.userValidation.bind(this)

        // this.fetchItems()
    }

    change = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
        this.setState({userValid: false})
      }
    
    login = async () => {
        let responseMsg = document.getElementById("responseMsg1")
        if(this.state.userName == ""){
            responseMsg.style = "display: inline; color: red; font-size: 25px"
            responseMsg.innerHTML = "Please provide the user name!"
        }else if(this.state.password == ""){
            responseMsg.style = "display: inline; color: red; font-size: 25px"
            responseMsg.innerHTML = "Please provide the password!"
        }

        const response = await fetch(url + 'login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.userName,
                                    password: this.state.password}),
        })
        const json = await response.json()
        if(json.result !== "success"){
            responseMsg.style = "display: inline; color: red; font-size: 25px"
            responseMsg.innerHTML = json.result;
            this.setState({redirectMain: false})
        }else{
            responseMsg.style = "display: inline; color: green; font-size: 25px"
            responseMsg.innerHTML = json.result;
            this.setState({redirectMain: true})
        }
    }
    

    // userValidation = () => {
    //     var userValid = false;
    //     var passwordValid = false;
    //     var logMsg = document.getElementById("logMsg");
    //     // this.state.data.map(n => {
    //     //     if (this.state.userName === n.username) {
    //     //         userValid = true
    //     //         this.setState({userId: n.id}, () => {localStorage.setItem('userId', this.state.userId)})
    //     //     }
    //     //     if (this.state.password === n.address.street) {
    //     //         passwordValid = true
    //     //     }
    //     // })
    //     for(var i=0;i<this.state.data.length;i++){
    //         if (this.state.userName === this.state.data[i].username) {
    //                     userValid = true
                        
    //                     this.setState({userId: this.state.data[i].id}, () => {localStorage.setItem('userId', this.state.userId)})
    //                 }
    //         if (this.state.password === this.state.data[i].address.street) {
    //                     passwordValid = true
    //                     localStorage.setItem("emailAddress",this.state.data[i].email);
    //                     localStorage.setItem("phoneNumber",this.state.data[i].phone);
    //                     localStorage.setItem("zipCode",this.state.data[i].address.zipcode);
                        
    //                 }
    //         // if(userValid && passwordValid){
    //         //     localStorage.setItem("emailAddress",this.state.data[i].email);
    //         //     localStorage.setItem("phoneNumber",this.state.data[i].phone);
    //         //     localStorage.setItem("zipCode",this.state.data[i].address.zipcode);
    //         // }
    //     }

    //     if(userValid && passwordValid) {
    //         this.setState({userValid: true}, () => {localStorage.setItem("userValid", this.state.userValid)})
    //         // this.setState({userName:localStorage.getItem("userName")})
    //         localStorage.setItem("userName",this.state.userName);
    //         localStorage.setItem("userValid", true)
    //         console.log(this.state.userName);
    //         this.setState({redirectMain: true})
            
    //     } else {
    //         // logMsg.innerHTML = "Invalid Username or password";
    //         localStorage.setItem("userValid", this.state.userValid)
    //     }
    // }

    // fetchItems = async () => {
    //     const returned = await fetch(
    //         'https://jsonplaceholder.typicode.com/users'
    //     );
    //     const items = await returned.json()
    //     this.setState({ data: items })
    // }

    render() {
        return (
            <div className="container">
                {this.state.redirectMain && <Navigate to='/Main' push/>}
                <h1>Log in</h1>
                <div className="mb-2"><span id="responseMsg1"></span></div>
                <div>
                <input
                    name="userName"
                    placeholder="Username"
                    value={this.state.userName}
                    type="text"
                    onChange={this.change}
                    data-testid={"userName"}
                    required
                />
                </div>
                <div className="mt-2">
                <input
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    type="password"
                    onChange={this.change}
                    data-testid={"password"}
                    required
                />
                </div>
                {/* <input id = "redirectMain" data-testid={"redirectMain"} value={this.state.redirectMain} ></input> */}
                <span id = "logMsg" data-testid={"logMsg"}></span>
                <div>
                    <button data-testid={"loginBtn"} className="btn btn-primary btn-sm" onClick={this.login}>Login</button>
                    {/* <button onClick={this.userValidation}>Login</button> */}
                </div>
            </div>
        )
    }
}

export default Login