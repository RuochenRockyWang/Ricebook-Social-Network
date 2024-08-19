import Picture from './Picture'
import Update from './Update'
import '../css/profile.css';
import {Navigate} from "react-router-dom"
import React, { Component } from 'react'
let url = "https://rockybookserver.herokuapp.com/";
export class Profile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             redirectMain: false,
             username:""
        }
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
        this.setState({username: json.username})
    }
    handleMain = () => {
        this.setState({redirectMain: true})
    } 
    
    render() {
        return (
            
            <div className="profile">
                {this.state.redirectMain && <Navigate to='/Main' push/>}
                <div>
                    <nav className="navbar nav" >
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">RiceBook</a>
                    </div>
                    </nav>
                </div>
                <button className="btn btn-primary btn-sm back" onClick={this.handleMain}>Back to main page</button>
                <div className="row">
                    <div className="col-md-6 mb-2 mt-10">
                        <Picture username = {this.state.username}/>

                    </div>
                    <div className="col-md-6 mb-2 mt-2">
                        <Update />
                    </div>
                </div>


            </div>
        )
    }
}

export default Profile