import React from 'react'
import { API } from '../manage.js'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

class Social_Network extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            title: '',
            content: '',
            image: '',
            profile: [],
        }
        this.onChange = this.onChange.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        API.get('social_network/post/')
        .then(response => {
            this.setState({
                posts: response.data
            })
        })
        .catch(error => {
            console.error(error)
        })

        API.get(`account/profile/${Cookies.get('id')}/`)
        .then(response => {
            this.setState({
                profile: response.data
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

    onSubmit(event) {
        event.preventDefault()
        const formdata = new FormData()
        formdata.append('userId', Cookies.get('id'))
        formdata.append('title', this.state.title)
        formdata.append('content', this.state.content)
        formdata.append('image', this.state.image, this.state.image.name)
        API.defaults.headers = {
            'Authorization': 'Token ' + Cookies.get('token')
        }
        API.post('social_network/post/', formdata)
        .then(response => {
            console.log('added post successfully !')
            toast.success('added post successfully !', {position: toast.POSITION.TOP_RIGHT, theme: 'dark'})
            API.post('account/notification/', {
                user: Cookies.get('id'),
                username: this.state.profile.username,
                content: `${this.state.profile.username} has added a new post !`,
            })
            window.location.reload()
        })
    }

    render() {
        return (
            <div>
                <div className="text-center m-4" data-bs-toggle="modal" data-bs-target="#addpost">
                    <button className="btn btn-danger">Add Post</button>
                </div>
                <div className="modal fade" id="addpost" data-bs-backdrop="static">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <form onSubmit={ this.onSubmit } className="bg-dark-2">
                                <h1 className="modal-header text-success">Add Post</h1>
                                <div className="modal-body">
                                    <div className="form-floating">
                                        <input type="text" name="title" value={ this.state.title } onChange={ this.onChange } className="form-control bg-dark text-white" placeholder="title:" />
                                        <label className="form-label text-white">title: </label>
                                    </div>
                                    <br />
                                    <div className="form-floating">
                                        <textarea type="text" name="content" value={ this.state.content } onChange={ this.onChange } className="form-control bg-dark text-white" placeholder="content:" />
                                        <label className="form-label text-white">content: </label>
                                    </div>
                                    <br />
                                    <div className="form-floating">
                                        <input type="file" name="image" onChange={ this.onChangeImage } className="form-control bg-dark" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-danger" data-bs-dismiss="modal">Add Post</button>
                                </div>
                            </form>
                        </div>
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
                                    <img src={ post.image } className="card-img-top mb-3" />
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Social_Network
