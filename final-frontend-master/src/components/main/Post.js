import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

export class Post extends Component {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         comments:''

    //     }
    // }
    render() {
        return (
            <div>
                <div className = "post">
                        <div>
                            <img variant="top" src="https://picsum.photos/600/250" alt=""/>
                            
                                {/* <h3>{this.props.postTitle}</h3> */}
                                <h4>{this.props.postAuthor}</h4>
                                <p>{this.props.postTimeStamp}</p>
                                
                                <p>
                                    {this.props.postText}
                                </p>  
                        </div>
                        <div>
                            <Button variant="primary">Edit</Button>&nbsp;
                            <Button variant="primary">Comment</Button>&nbsp;
                            {/* <Button variant="success">View Comments</Button> */}
                        </div> 
                        <br></br>
                        <div className = "comment">
                            <h4>Comments:</h4>
                            <p>
                            <em>{this.props.postAuthor}: I worte this great article!</em>
                            </p>
                            <p>
                            <em>Karianne: Really nice picture!</em>
                            </p>
                            <p>
                            <em>Samantha: I want to do reasearch with you!</em>
                            </p>
                        </div>
                </div>

            </div>
        )
    }
}

export default Post