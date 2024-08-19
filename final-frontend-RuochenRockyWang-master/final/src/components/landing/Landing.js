import React, { Component } from 'react'
import Registration from './Registration'
import Login from './Login'
import '../css/landing.css';
import 'bootstrap/dist/css/bootstrap.min.css'


export class Landing extends Component {
    render() {
        return (
            <div>
                <nav className="navbar nav" >
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">RiceBook</a>
                </div>
                </nav>
                <div className="mt-9">
                    <div>
                        <Registration />
                    </div>
               
                    <div>
                        <Login />
                </div>
                </div>
            </div>
        )
    }
}

export default Landing
