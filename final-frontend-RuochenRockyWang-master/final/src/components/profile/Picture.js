import React, { Component } from 'react'
import '../css/profile.css';
let url = "https://rockybookserver.herokuapp.com/";
export class Picture extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username: this.props.username,
             picUrl : "",

        }
        this.fileInput = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleSubmit(event) {
        // event.preventDefault();
        // console.log("in here")
        // window.alert(
        //   `Selected file - ${this.fileInput.current.files[0].name}`
        // );
        const data = new FormData();
        data.append('image', this.fileInput.current.files[0]);  //相当于 input:file 中的name属性
        console.log(this.fileInput.current.files[0]);
        // getAvatar = async () => {
            fetch(url + 'avatar/',  {
                method: 'PUT',
                credentials: 'include',
                // headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, 
                body: data   
            }).then(res => res.json())
            .then(res=> this.setState({picUrl:res.avatar}))
        }  
               


        //   }

        // upload = async() => {
        //     const data = new FormData();
        //     data.append('file', this.fileInput.current.files[0]);  //相当于 input:file 中的name属性
        //     const response = await fetch(url + 'avatar/',  {
        //         method: 'PUT',
        //         credentials: 'include',
        //         headers: { 'Content-Type': 'application/json' }, 
        //         body: data   
        //     })
        //     const response2 = await fetch(url + 'avatar/'+this.state.username,  {
        //         method: 'GET',
        //         credentials: 'include',
        //         headers: { 'Content-Type': 'application/json' }, 
        //     })
        //     const json = await response2.json()
        //     console.log(this.json)

        // };
    
    render(){return (
        <div className = "newPicBlock">
            <div className="mt-5 ml-5">
                <img src={this.state.picUrl} alt=""/>
            </div>
            <div className="mt-3">
                <input type="file" ref={this.fileInput} accept="image/*"/>
            </div>
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
        </div>
    )}
}
export default Picture