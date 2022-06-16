import React from 'react'
import { API } from '../manage.js'
import Cookies from 'js-cookie'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: [],
            posts: [],
            username: '',
            email: '',
            image: '',
            followLists: [],
            usernameTemp: '',
            followers: [],
        }
        this.onChange = this.onChange.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
        this.onUpdateProfile = this.onUpdateProfile.bind(this)
        this.onFollow = this.onFollow.bind(this)
        this.onUnFollow = this.onUnFollow.bind(this)
    }

    componentDidMount() {
        API.get(`account/profile/${this.props.params.id}/`)
        .then(response => {
            this.setState({
                profile: response.data,
                username: response.data.username,
                email: response.data.email,
            })
        })
        .catch(error => {
            console.error(error)
        })

        API.get(`account/profile/${Cookies.get('id')}/`)
        .then(response => {
            this.setState({
                usernameTemp: response.data.username
            })
        })
        .catch(error => {
            console.error(error)
        })

        API.get(`social_network/getpostbyuserview/${this.props.params.id}/`)
        .then(response => {
            this.setState({
                posts: response.data
            })
        })
        .catch(error => {
            console.error(error)
        })

        API.get(`account/getfollowbyuserview/${Cookies.get('id')}/`)
        .then(response => {
            this.setState({
                followLists: response.data
            })
        })
        .catch(error => {
            console.error(error)
        })

        API.get(`account/getuserfollowbyuserview/${Cookies.get('id')}/`)
        .then(response => {
            this.setState({
                followers: response.data
            })
        })
        .catch(error => {
            console.error(error)
        })
    }

    onChange(event) {
        this.setState({
            [ event.target.name ]: event.target.value
        })
    }

    onChangeImage(event) {
        this.setState({
            image: event.target.files[0]
        })
    }

    onUpdateProfile(event) {
        event.preventDefault()
        const formdata = new FormData()
        formdata.append('user', Cookies.get('id'))
        formdata.append('username', this.state.username)
        formdata.append('email', this.state.email)
        formdata.append('image', this.state.image, this.state.image.name)
        API.defaults.headers = {
            'Authorization': 'Token ' + Cookies.get('token')
        }
        API.put(`account/profile/${Cookies.get('id')}/`, formdata)
        .then(response => {
            console.log('updated profile successfully !')
            toast.success('updated profile successfully !', {position: toast.POSITION.TOP_RIGHT, theme: 'dark'})
            this.props.navigate('/profile/')
        })
    }

    onFollow(event) {
        event.preventDefault()
        const formdata = new FormData()
        formdata.append('follower', Cookies.get('id'))
        formdata.append('followerName', this.state.usernameTemp)
        formdata.append('user', this.state.profile.id)
        formdata.append('username', this.state.profile.username)
        API.defaults.headers = {
            'Authorization': 'Token ' + Cookies.get('token')
        }
        API.post('account/follow/', formdata)
        .then(response => {
            console.log('followed an user successfully !')
            toast.success('followed an user successfully !', {position: toast.POSITION.TOP_RIGHT, theme: 'dark'})
            window.location.reload()
            API.post('account/userfollow/', {
                user: this.state.profile.id,
                userFollow: Cookies.get('id'),
                usernameFollow: this.state.usernameTemp,
            })
            API.post('social_network/messageroom/', {
                firstTalker: Cookies.get('id'),
                firstTalkerName: this.state.usernameTemp,
                secondTalker: this.state.profile.id,
                secondTalkerName: this.state.profile.username,
            })
        })
    }

    onUnFollow(event, id) {
        event.preventDefault()
        API.defaults.headers = {
            'Authorization': 'Token ' + Cookies.get('token')
        }
        API.delete(`account/follow/${id}/`)
        .then(response => {
            console.log('unfollowed an user successfully !')
            toast.success('unfollowed an user successfully !', {position: toast.POSITION.TOP_RIGHT, theme: 'dark'})
            window.location.reload()
            API.delete(`account/userfollow/${id}/`)
            API.delete(`social_network/messageroom/${id}/`)
        })
    }

    render() {
        let updateProfile = null
        let followList = null
        let followerList = null
        let follow = <form onSubmit={ this.onFollow }>
            <button className="btn btn-danger">Follow</button>
        </form>
        const user_id = Cookies.get('id')
        if (user_id == this.state.profile.id) {
            updateProfile = <div>
                <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#updateprofile">Update Profile</button>
                <div className="modal fade" id="updateprofile" data-bs-backdrop="static">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <form onSubmit={ this.onUpdateProfile } className="bg-dark-2">
                                <h1 className="modal-header text-success">Update Profile</h1>
                                <div className="modal-body">
                                    <br />
                                    <div className="form-floating">
                                        <input type="text" name="username" value={ this.state.username } onChange={ this.OnChange } className="form-control bg-dark text-white" placeholder="username:" />
                                        <label className="form-label text-white">username: </label>
                                    </div>
                                    <br />
                                    <div className="form-floating">
                                        <input type="text" name="email" value={ this.state.email } onChange={ this.OnChange } className="form-control bg-dark text-white" placeholder="email:" />
                                        <label className="form-label text-white">email: </label>
                                    </div>
                                    <br />
                                    <div className="form-floating">
                                        <input type="file" name="image" onChange={ this.onChangeImage } className="form-control bg-dark" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-danger" data-bs-dismiss="modal">Update Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            followList = <div>
                <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#followlist">Follow List</button>
                <div className="modal fade" id="followlist" data-bs-backdrop="static">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="bg-dark-2">
                                <h1 className="modal-header text-success">Follow List</h1>
                                <div className="modal-body">
                                    {
                                        this.state.followLists.map(follow => (
                                            <div className="card bg-dark text-white rounded mb-3" key={ follow.id }>
                                                <div className="card-body">
                                                    <h3>{ follow.username_1 } - { follow.username_2 }</h3>
                                                    <button className="btn btn-danger" onClick={ () => { this.props.navigate(`/profile/${follow.user_2}/`); window.location.reload() } }>See { follow.username_2 } Profile</button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            followerList = <div>
                <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#followerlist">Follower List</button>
                <div className="modal fade" id="followerlist" data-bs-backdrop="static">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="bg-dark-2">
                                <h1 className="modal-header text-success">Follower List</h1>
                                <div className="modal-body">
                                    {
                                        this.state.followers.map(follow => (
                                            <div className="card bg-dark text-white rounded mb-3" key={ follow.id }>
                                                <div className="card-body">
                                                    <h3>{ follow.username_follow } is following you !</h3>
                                                    <button className="btn btn-danger" onClick={ () => { this.props.navigate(`/profile/${follow.user_follow}/`); window.location.reload() } }>See { follow.username_follow } Profile</button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            follow = null
        }
        this.state.followLists.map(followList => {
            if (followList.user_2 == this.state.profile.id) {
                follow = <form onSubmit={ (event) => this.OnUnFollow(event, followList.id) }>
                    <button className="btn btn-danger">UnFollow</button>
                </form>
            }
        })
        return (
            <div>
                <div className="card mx-auto w-500 bg-dark mt-3 mb-3 rounded">
                    <img src={ this.state.profile.image } className="card-img-top" />
                    <div className="card-body text-white text-center">
                        <h3>{ this.state.profile.username }</h3>
                        <p>{ this.state.profile.email }</p>
                        { updateProfile }
                        <br />
                        { followList }
                        <br />
                        { followerList }
                        { follow }
                    </div>
                </div>
                <div>
                    {
                        this.state.posts.map(post => (
                            <div className="card w-500 bg-dark mx-auto rounded my-5" key={ post.id }>
                                <Link to={`/social_network/${post.id}/`} className="text-decoration-none">
                                    <div className="card-body text-white">
                                        <h3 className="card-title mb-3">{ post.title }</h3>
                                    </div>
                                    <img src={ 'http://localhost:16' + post.image } className="card-img-top mb-3" />
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

function WithRouter(props) {
    const params = useParams()
    const navigate = useNavigate()
    return <Profile {...props} params={params} navigate={navigate} />
}

export default WithRouter