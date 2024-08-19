import React, { Component } from 'react'
import User from './User.js'
import Friend from './Friend.js'
import Post from './Post.js'
// import Pages from './Pages.js'

import Button from 'react-bootstrap/Button'


let url = "https://rockybookserver.herokuapp.com/";
export class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // userId: localStorage.getItem("userId"),
            // userName: localStorage.getItem("userName"),
            userId: "",   
            userName: "",  
            picUrl:"",  
            users: "",             
            posts: "",             
            // status: localStorage.getItem("newStatus")? localStorage.getItem("newStatus"):"Open for internship!",  
            status: "",           
            friendsList: [],         
            friends: [],           
            newFriendName: "",     
            userPosts: [],           
            timeStamp: new Date().toTimeString(),           
            newPostBody: "",               
            searchPost: "",             
            filteredPosts: [],
            showPosts:[],
            // pageAmount:"",
            pageList:[],
            total:0,
            curPage:1,
            pageSize: 3,
            totalPage: 0,       
        }

        this.change = this.change.bind(this)
        // this.addFriend = this.addFriend.bind(this)
        // this.removeFriend = this.removeFriend.bind(this)
        // this.getUserName = this.getUserName.bind(this)
        // this.handleSearch = this.handleSearch.bind(this)
        // this.filterPost = this.filterPost.bind(this)
        // this.getPagePost = this.getPagePost.bind(this)
        // this.getUserPosts  = this.getUserPosts.bind(this)

    }

    componentDidMount = () => {
        this.getUserName()
        this.getHeadline()
        this.getArticles()
        this.getFollowing()
        this.getPic()
        // this.fetchUsers();
        // this.fetchFriends();
        // this.fetchPosts();
    }

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    getPic = async() => {
        const response = await fetch(url + 'avatar',  {
            method: 'GET',
            credentials: 'include',
        })
        const json = await response.json()
        this.setState({picUrl: json.avatar})
        // const response = fetch(url + 'avatar',  {
        //     method: 'GET',
        //     credentials: 'include',
        // }).then(res => console.log(res)).then(res => this.setState({picUrl:res.avatar}))

    }
    getPagePost(curPage){
        // console.log("ff"+this.state.filteredPosts)
        let totalLength = this.state.filteredPosts.length;
        this.setState({total:totalLength})
        let t = Math.floor((this.state.total - 0.1) / this.state.pageSize) + 1;
        this.setState({totalPage: t})


        let tempArray = [];
        for(let i = 1; i <= this.state.totalPage; i++){
            tempArray.push(i)
        }
        this.setState({pageList:tempArray})
        this.setState({curPage: curPage})
        let showPosts =this.state.filteredPosts.slice((curPage - 1) * this.state.pageSize, (curPage * this.state.pageSize))
        this.setState({showPosts:showPosts})
    }


    getUserName = async () => {
        const response = await fetch(url + 'username',  {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        const json = await response.json()
        // console.log(json.username)
        this.setState({userName: json.username})
    }

    getHeadline = async () => {
        const response = await fetch(url + 'headline',  {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        const json = await response.json()
        console.log(json.headline)
        // console.log(json.username)
        this.setState({status: json.headline})
    }

    //get the feed of the logged-in user, including the user's articles and his friends' articles 
    getArticles = async () => {
        const response = await fetch(url + 'articles',  {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },    
        })
        const json = await response.json()
        // let myJson = JSON.stringify(json)
        this.setState({userPosts: json.articles}, () => this.setState({ filteredPosts: this.state.userPosts }))
        // console.log(typeof json.articles[0].date)
        this.getPagePost(1)
    }

    getFollowing = async () => {
        const response = await fetch(url + 'following',  {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },    
        })
        const json = await response.json()
        // console.log(json.followingList);
        let tempArray = [];
        for(var i = 0; i<json.followingList.length; i++){
            let name = json.followingList[i];
            let tempFriend = [];
            tempFriend.push(name);
            const response2 = await fetch(url + 'avatar/'+name,  {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },    
            })
            const avatarjson = await response2.json()
            tempFriend.push(avatarjson.avatar)
            const response3 = await fetch(url + 'headline/'+name,  {
                method: 'GET',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },    
            })
            const headlinejson = await response3.json()
            tempFriend.push(headlinejson.headline);
            tempArray.push(tempFriend)
        }
        // this.setState({friends: json.followingList})
        this.setState({friends: tempArray})
    
    }
    addFriend = async () => {
        var newMsg = document.getElementById("newMsg");
        const response = await fetch(url + 'following/'+this.state.newFriendName,  {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },    
        })
        const json = await response.json()
        if (json.result === "User does not exist!"){
            newMsg.innerHTML = "This user does not exist!"
        }else{
            this.getFollowing();
            this.getArticles()
        }
        // var flag = false;

        // for(var i = 0;i<this.state.users.length;i++){
        //     if(this.state.newFriendName === this.state.users[i].username){
        //         newMsg.innerHTML = "";
        //         flag = true;
        //         tempArray.push(this.state.users[i])
        //         break;
        //     } 
        // }
        // if(flag === false){
        //     newMsg.innerHTML = "This user does not exist!"
        // }
        // this.setState({ friends: tempArray })
        // this.getUserPosts();
    }

    removeFriend = async friendName => {
        const response = await fetch(url + 'following/'+friendName,  {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },    
        })
        const json = await response.json()
        console.log(json.followingList)
        this.getFollowing();
        this.getArticles()
        // this.setState({ newFriendName: "" })
        // this.setState({ newFriendPosts: "" })
    }

    addPost = async() => {
        if(this.state.newPostBody!==""){
        const response = await fetch(url + 'article',  {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.state.userName,
                text: this.state.newPostBody})    
        })
        // const json = await response.json()
        this.getArticles();
    }}

    clearPost = () => {
        // this.setState({ newPostTitle: "" });
        this.setState({ newPostBody: "" })
    }
    handleStatusChange = async newStatus => {
        const response = await fetch(url + 'headline',  {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({headline: newStatus})
        })
        const json = await response.json()
        // console.log(json.username)
        await this.setState({status: json.headline})

    }

    filterPost = ()=> {
        console.log(this.state.userPosts)
        var filtered = this.state.userPosts.filter(post => {
            return post.text.toLowerCase().includes(this.state.searchPost.toLowerCase())||
            post.author.toLowerCase().includes(this.state.searchPost.toLowerCase())
        }) 
        console.log("FIL:")

        console.log(filtered)
        
        this.setState({filteredPosts: filtered})
        console.log("af")
        console.log(this.state.filteredPosts)
        this.getPagePost(1);
        // console.log(this.state.totalPage)
    }


    render() {
        return (
            <div>
                <div>
                    <nav className="navbar nav" >
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">RiceBook</a>
                    </div>
                    </nav>
                </div>
                <div className = "container">
                    <User username={this.state.userName}
                        status={this.state.status ? this.state.status : ''}
                        updateStatus={this.handleStatusChange} />
                    <div className = "searchUser">
                        <input 
                            name="newFriendName"
                            value={this.state.newFriendName}
                            onChange={this.change}
                            placeholder="Follow a new user" ></input>&nbsp;
                        <Button  className="btn btn-primary btn-sm " onClick={this.addFriend} >Add</Button>
                        <br></br>
                        <span id ="newMsg" className = "warning" ></span>
                            {this.state.friends.map(friend => (
                                <Friend friendName={this.state.friends ? friend[0] : ''}
                                    friendAvatar = {this.state.friends? friend[1]:""}
                                    friendStatus={this.state.friends ? friend[2] : ''}
                                    removeFriend={this.removeFriend}/>
                            ))}  
                    </div>
                </div>
                <div className = "newpost">
                    {/* <div class="mb-3">
                        <label fclass="form-label">Title: </label>
                        <input type="text" name = "newPostTitle" id = "newPostTitle"  value = {this.state.newPostTitle}
                            onChange = {this.change}class="form-control" placeholder="Enter the title of your post here"></input>
                    </div> */}
                    <div className = "mb-3">
                        <label  className = "form-label">Post: </label>
                        <textarea className = "form-control"   type="text" name="newPostBody" value={this.state.newPostBody}
                            onChange={this.change} placeholder="Enter your post here" ></textarea>
                        <input type="file"/>
                    </div>                 
                        <Button className="btn btn-secondary btn-sm " onClick={this.clearPost}>Cancel</Button>&nbsp;&nbsp;
                        <Button className="btn btn-success btn-sm " onClick={this.addPost}>Post</Button>
                </div>                 
                <div className = "postBlock">
                    <h2>Posts</h2>
                        <input  className = "searchBar" type="text"  name = "searchPost" value = {this.state.searchPost} onChange = {this.change} placeholder="search here"/>
                        <br></br>
                        {/* <span>{this.state.jjj}</span> */}
                        <Button className="btn btn-primary btn-sm" onClick={this.filterPost}>Search</Button><p>Double click for search</p>

                        <br></br>
                        {
                            this.state.pageList ? this.state.pageList.map(page =>(
                                <Button className="btn btn-primary btn-sm" onClick = {this.getPagePost.bind(this,page)}>{page}</Button>

                            )):""
                        }
                        {
                            this.state.showPosts ? this.state.showPosts.map(post => (
                                <Post postText={post.text} postTimeStamp = {post.date} postAuthor = {post.author}/>
                            )) 
                            : 
                            ''
                        }
                        {/* {
                            this.state.filteredPosts ? this.state.filteredPosts.map(post => (
                                <Post postText={post.text} postTimeStamp = {post.date} postAuthor = {post.author}/>
                            )) 
                            : 
                            ''
                        } */}
                        {/* {
                            this.state.filteredPosts ? <div><Pages data = {this.state.filteredPosts}></Pages></div>
                            : 
                            ''
                        } */}
                </div>
            </div>
        )
    }
}

export default Main