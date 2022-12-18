import React from 'react'
import api from '../../../manage'
import Head from 'next/head'
import {connect} from 'react-redux'
import {getUserTokenAction} from '../../../store/actions/auth'
import {toast} from 'react-toastify'
import Link from 'next/link'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.profile.username,
            description: this.props.profile.description,
            image: '',
            posts: [],
            friendAction: <div className="ps-3">
                <button className="rounded-16 btn bg-red text-white">Loading...</button>
            </div>,
            users: [],
            chatrooms: [],
        }
        this.onChange = this.onChange.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
        this.sendFriendRequest = this.sendFriendRequest.bind(this)
        this.unFriend = this.unFriend.bind(this)
    }

    async getUsers() {
        try {
            let response = await api.get('account/userprofile/')
            this.setState({
                users: response.data
            })
        }
        catch(error) {
            console.log(error)
        }
    }

    async getPosts() {
        try {
            let response = await api.get('red_souls_network/post/')
            this.setState({
                posts: response.data
            })
        }
        catch(error) {
            console.log(error)
        }
    }

    checkFriendAction() {
        if (this.props.id == this.props.profile.id) {
            this.setState({
                friendAction: null
            })
        }
        else {
            let check = false
            let friends = this.props.profile.friends
            let left = 0, right = friends.length - 1, mid
            while (left <= right) {
                mid = (left + right) / 2
                if (friends[mid] == this.props.id) {
                    check = true
                }

                if (friends[mid] < this.props.id) {
                    left = mid + 1
                }
                else {
                    right = mid - 1
                }
            }

            if (check == false) {
                this.setState({
                    friendAction: <div className="ps-3">
                        <button className="rounded-16 btn bg-red text-white" onClick={this.sendFriendRequest}>Add Friend</button>
                    </div>
                })
            }
            if (check == true) {
                this.setState({
                    friendAction: <div className="ps-3">
                        <button className="rounded-16 btn bg-red text-white" onClick={this.unFriend}>Unfriend</button>
                    </div>
                })
            }
        }
    }

    async getChatRoom() {
        try {
            let response = await api.get('red_souls_network/getchatroom/')
            this.setState({
                chatrooms: response.data
            })
        }
        catch(error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getPosts()
        this.getUsers()
        setTimeout(() => {
            this.checkFriendAction()
            this.getChatRoom()
        }, 1000)
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onChangeImage(event) {
        this.setState({
            image: event.target.files[0]
        })
    }

    async updateProfile(event) {
        event.preventDefault()
        api.defaults.headers = {
            'Authorization': `Bearer ${this.props.token}`,
        }
        let formdata = new FormData()
        formdata.append('user', this.props.id)
        formdata.append('username', this.state.username)
        formdata.append('description', this.state.description)
        formdata.append('image', this.state.image, this.state.image.name)
        try {
            await api.put(`account/userprofile/${this.props.id}/`, formdata)
            toast.success('Updated profile successfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
        catch(error) {
            toast.error('Updated profile unsuccessfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
    }

    async sendFriendRequest(event) {
        event.preventDefault()
        api.defaults.headers = {
            'Authorization': `Bearer ${this.props.token}`,
        }
        let formdata = new FormData()
        formdata.append('sender', this.props.id)
        formdata.append('sendername', this.props.name)
        formdata.append('receiver', this.props.profile.id)
        formdata.append('content', 'Hi ! Can you accept my friend request ? I want to make friend with you !')
        try {
            await api.post(`red_souls_network/notification/`, formdata)
            toast.success('Sent friend request successfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
        catch(error) {
            toast.error('Sent friend request unsuccessfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
    }

    async unFriend(event) {
        event.preventDefault()
        api.defaults.headers = {
            'Authorization': `Bearer ${this.props.token}`,
        }
        let id = 0
        this.state.chatrooms.map(chatroom => {
            if (chatroom.chatRoomName == `${this.props.name} - ${this.props.profile.username}` || chatroom.chatRoomName == `${this.props.profile.username} - ${this.props.name}`) {
                id = chatroom.id
            }
        })
        let formdata = new FormData()
        formdata.append('user', this.props.profile.id)
        formdata.append('friend', this.props.id)
        try {
            await api.post('account/deletefriend/', formdata)
            await api.delete(`red_souls_network/chatroom/${id}/`)
            toast.success('Unfriend successfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
        catch(error) {
            toast.error('Unfriend unsuccessfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
    }

    render() {
        let updateProfile = <div>
            <button className="rounded-16 btn bg-red text-white" data-bs-toggle="modal" data-bs-target="#update-profile">Update Profile</button>
            <div className="modal fade" id="update-profile" data-bs-backdrop="static">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-black">
                        <form onSubmit={this.updateProfile}>
                            <h1 className="modal-header text-red">Update Profile</h1>
                            <div className="modal-body">
                                <div className="form-floating text-white">
                                    <input type="text" name="username" value={this.state.username} onChange={this.onChange} className="form-control form-input" placeholder="Username" />
                                    <label className="form-label">Username</label>
                                </div>
                                <br />
                                <div className="form-floating text-white">
                                    <textarea type="text" name="description" value={this.state.description} onChange={this.onChange} className="form-control form-input" placeholder="Description" />
                                    <label className="form-label">Description</label>
                                </div>
                                <br />
                                <div className="form-floating text-white">
                                    <input type="file" name="image" onChange={this.onChangeImage} className="form-control form-file" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn bg-red text-white">Update Profile</button>
                                <button type="button" className="btn bg-red text-white" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        let showFriend = <div className="ps-3">
            <button className="rounded-16 btn bg-red text-white" data-bs-toggle="modal" data-bs-target="#show-friend">Show Friend</button>
            <div className="modal fade" id="show-friend" data-bs-backdrop="static">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-black">
                        <h1 className="modal-header text-red">Friend</h1>
                        <div className="modal-body">
                            {this.props.profile.friends.map(friend => (
                                <div>
                                    {this.state.users.filter(user => user.id === friend).map(user => (
                                        <Link href={`/red_souls_network/profile/${user.id}/`}>
                                            <div className="d-flex flex-row my-3 text-white">
                                                <img src={user.image} className="avatar" />
                                                <h3 className="ps-3">{user.username}</h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn bg-red text-white" data-bs-dismiss="modal">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        return (
            <div>
                <Head>
                    <title>Profile</title>
                </Head>
                <div className="container-fluid p-5">
                    <div className="row">
                        <div className="col-lg col-md"></div>
                        <div className="col-lg col-md">
                            <div className="card bg-black border-radius-16 mx-auto p-3">
                                <img src={this.props.profile.image} className="avatar mx-auto" />
                                <div className="card-body text-white">
                                    <h3 className="card-title mb-3 text-center">{this.props.profile.username}</h3>
                                    <p className="text-center">{this.props.profile.description}</p>
                                </div>
                                <div className="d-flex flex-row justify-content-center">
                                    {updateProfile}
                                    {this.state.friendAction}
                                    {showFriend}
                                </div>
                            </div>
                            {this.state.posts.filter(post => post.author == this.props.profile.id).map(post => (
                                <div className="border-radius-16 my-5 mx-auto" key={post.id}>
                                    <Link href={`/red_souls_network/${post.id}/`}>
                                        <div className="card bg-black">
                                            <div className="card-body text-white">
                                                <Link href={`/red_souls_network/profile/${this.props.profile.id}/`}>
                                                    <div className="d-flex flex-row my-3">
                                                        <img src={this.props.profile.image} className="avatar" />
                                                        <h3 className="ps-3">{this.props.profile.username}</h3>
                                                    </div>
                                                </Link>
                                                <h3 className="card-title mb-3">{post.title}</h3>
                                            </div>
                                            <img src={post.image} className="card-img-top mb-3" />
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="col-lg col-md"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export async function getServerSideProps(context) {
    let profile = await (await api.get(`account/userprofile/${context.params.id}/`)).data
    return {
        props: {
            profile,
        }
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.getUserTokenReducer.token,
        id: state.getUserTokenReducer.id,
        name: state.getUserTokenReducer.name,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserToken: () => dispatch(getUserTokenAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)