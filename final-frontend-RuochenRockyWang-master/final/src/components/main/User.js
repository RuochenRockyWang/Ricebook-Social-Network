import React, { Component } from 'react'
import {Navigate} from "react-router-dom"
import Button from 'react-bootstrap/Button'
import "../css/main.css"

let url = "https://rockybookserver.herokuapp.com/";
export class User extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             newStatus: "",
             picUrl:"",
             redirectLogin: false,
             redirectProfile: false
        }
        this.updateStatus = this.updateStatus.bind(this)
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state.picUrl)
    }
    componentDidMount = () =>{
        this.getPic();
    }

    getPic = async() => {
        const response = await fetch(url + 'avatar',  {
            method: 'GET',
            credentials: 'include',
        })
        const json = await response.json()
        this.setState({picUrl: json.avatar})

    }

    updateStatus = () => {
        this.props.updateStatus(this.state.newStatus)
        this.setState({newStatus: ""})
    }

    // handleLogout = () => {
    //     localStorage.setItem("userId", "")
    //     localStorage.setItem("userValid", "")
    //     this.setState({redirectLogin: true})
    //     localStorage.setItem("redirectMainRegist", false)
    // }
    handleLogout = async () => {
        const response = await fetch(url + 'logout',  {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        const json = await response.json()
        await this.setState({redirectLogin: true})
    }

    handleProfile = () => {
        this.setState({redirectProfile: true})

    }
    
    render() {
        return (
            <div>
                {this.state.redirectLogin && <Navigate to='/' push/>}
                {this.state.redirectProfile && <Navigate to='/Profile' push/>}
                <div  className="user"> 
                    <span ><img className="avatar" src = {this.state.picUrl} alt =""  /></span>
                    <div>
                        <h2>{this.props.username}</h2>
                        <h5>{this.props.status}</h5>  
                        <div> 
                            <input 
                            value={this.state.newStatus} 
                            name="newStatus"
                            onChange={this.change}
                            placeholder="New Status"></input> &nbsp;
                            <Button variant="success" 
                            onClick={this.updateStatus}>Update</Button>
                        </div>
                        <br></br>
                        <div>
                        <button className="btn btn-secondary " style={{ width: '10rem' }} onClick={this.handleProfile}>Profile</button>&nbsp;
                        <button className="btn btn-danger " data-testid={"logOut"} style={{ width: '10rem' }} onClick={this.handleLogout}>Log out</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User