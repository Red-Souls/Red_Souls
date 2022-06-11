import React from 'react'
import { API } from '../manage.js'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            post: [],
            comments: [],
            commentContent: '',
            profile: [],
            author: [],
            title: '',
            content: '',
            image: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmitComment = this.onSubmitComment.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
        this.onUpdatePost = this.onUpdatePost.bind(this)
        this.onDeletePost = this.onDeletePost.bind(this)
    }

    componentDidMount() {
        API.get(`social_network/post/${this.props.params.id}/`)
        .then(response => {
            this.setState({
                post: response.data
            })
            API.get(`account/profile/${response.data.userId}/`)
            .then(response => {
                this.setState({
                    author: response.data
                })
            })
            .catch(error => {
                console.error(error)
            })
        })
        .catch(error => {
            console.error(error)
        })

        API.get(`social_network/getcommentview/${this.props.params.id}/`)
        .then(response => {
            this.setState({
                comments: response.data
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

    onSubmitComment(event) {
        event.preventDefault()
        API.defaults.headers = {
            'Authorization': 'Token ' + Cookies.get('token')
        }
        API.post('social_network/comment/', {
            post: this.state.post.id,
            user: Cookies.get('id'),
            username: this.state.profile.username,
            content: this.state.commentContent,
        })
        .then(response => {
            console.log('added comment successfully !')
            toast.success('added comment successfully !', {position: toast.POSITION.TOP_RIGHT, theme: 'dark'})
            this.props.navigate('/social_network/')
        })
    }

    onChangeImage(event) {
        this.setState({
            image: event.target.files[0]
        })
    }

    onUpdatePost(event) {
        event.preventDefault()
        const formdata = new FormData()
        formdata.append('userId', Cookies.get('id'))
        formdata.append('title', this.state.title)
        formdata.append('content', this.state.content)
        formdata.append('image', this.state.image, this.state.image.name)
        API.defaults.headers = {
            'Authorization': 'Token ' + Cookies.get('token')
        }
        API.put(`social_network/post/${this.props.params.id}/`, formdata)
        .then(response => {
            console.log('updated post successfully !')
            toast.success('updated post successfully !', {position: toast.POSITION.TOP_RIGHT, theme: 'dark'})
            this.props.navigate('/social_network/')
        })
    }

    onDeletePost(event) {
        event.preventDefault()
        API.defaults.headers = {
            'Authorization': 'Token ' + Cookies.get('token')
        }
        API.delete(`social_network/post/${this.props.params.id}/`)
        .then(response => {
            console.log('deleted post successfully !')
            toast.success('deleted post successfully !', {position: toast.POSITION.TOP_RIGHT, theme: 'dark'})
            this.props.navigate('/social_network/')
        })
    }

    render() {
        let postOptions = null
        const userId = Cookies.get('id')
        if (userId == this.state.post.userId) {
            postOptions = <div className="post-options">Post Options
                <div className="options">
                    <Link to="" className="text-decoration-none text-success" data-bs-toggle="modal" data-bs-target="#updatepost">Update Post</Link>
                    <br />
                    <Link to="" className="text-decoration-none text-success" data-bs-toggle="modal" data-bs-target="#deletepost">Delete Post</Link>
                </div>
                <div className="modal fade" id="updatepost" data-bs-backdrop="static">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <form onSubmit={ this.onUpdatePost } className="bg-dark-2">
                                <h1 className="modal-header text-success">Update Post</h1>
                                <div className="modal-body">
                                    <div className="form-floating">
                                        <input type="text" name="title" value={ this.state.title } onChange={ this.OnChange } className="form-control bg-dark text-white" placeholder="title:" />
                                        <label className="form-label text-white">title: </label>
                                    </div>
                                    <br />
                                    <div className="form-floating">
                                        <textarea type="text" name="content" value={ this.state.content } onChange={ this.OnChange } className="form-control bg-dark text-white" placeholder="content:" />
                                        <label className="form-label text-white">content: </label>
                                    </div>
                                    <br />
                                    <div className="form-floating">
                                        <input type="file" name="image" onChange={ this.onChangeImage } className="form-control bg-dark" />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-danger" data-bs-dismiss="modal">Update Post</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="deletepost" data-bs-backdrop="static">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <form onSubmit={ this.onDeletePost } className="bg-dark-2">
                                <h1 className="modal-header text-success">Delete Post</h1>
                                <div className="modal-body">
                                    <h2>Are you sure want to delete this post ?</h2>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-danger" data-bs-dismiss="modal">Delete Post</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        }
        return (
            <div className="card w-500 bg-dark mx-auto rounded my-5" key={ this.state.post.id }>
                <div className="card-body text-white">
                    <p>{ postOptions }</p>
                    <Link to={`/profile/${this.state.author.id}/`} className="text-decoration-none text-white">
                        <img src={ this.state.author.image } className="avatar" />
                        <p>{ this.state.author.username }</p>
                    </Link>
                    <div>
                        <h3 className="card-title">{ this.state.post.title }</h3>
                        <p className="card-text mb-3">{ this.state.post.content }</p>
                    </div>
                </div>
                <img src={ this.state.post.image } className="card-img-top mb-3" />
                <h3 className="text-white ms-3">Comments...</h3>
                <div className="text-center m-4" data-bs-toggle="modal" data-bs-target="#addcomment">
                    <button className="btn btn-danger">Add Comment</button>
                </div>
                <div className="modal fade" id="addcomment" data-bs-backdrop="static">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <form onSubmit={ this.onSubmitComment } className="bg-dark-2">
                                <h1 className="modal-header text-success">Add Comment</h1>
                                <div className="modal-body">
                                    <div className="form-floating">
                                        <textarea type="text" name="comment_content" value={ this.state.comment_content } onChange={ this.OnChange } className="form-control bg-dark text-white" placeholder="content:" />
                                        <label className="form-label text-white">content: </label>  
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-danger" data-bs-dismiss="modal">Add Comment</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {
                    this.state.comments.map(comment => (
                        <div className="text-white ms-3">
                            <Link to={`/profile/${comment.user}/`} className="text-decoration-none text-white">
                                <h3>{ comment.username }</h3>
                            </Link>
                            <p>{ comment.content }</p>
                        </div>
                    ))
                }
            </div>
        )
    }
}

function WithRouter(props) {
    const params = useParams()
    return <Post {...props} params={params} />
}

export default WithRouter