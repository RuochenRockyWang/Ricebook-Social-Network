import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Main from './Main'

export class Friends extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name: this.props.friendName
        }
    }

    unfriend = () => {
        this.props.removeFriend(this.state.name)
    }

    

    render() {
        return (
            <div>
                <div className='user'>
                    <span ><img className="avatar" src={this.props.friendAvatar} /></span>
                            <h4>{this.props.friendName}</h4>
                            <p>
                                {this.props.friendStatus}
                            </p>
                        <div>
                            <Button variant="primary" onClick={this.unfriend}>Unfollow</Button>
                        </div>
                </div>
            </div>
        )
    }
}

export default Friends