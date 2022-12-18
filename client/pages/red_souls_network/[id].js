import React from 'react'
import Head from 'next/head'
import RedSoulsNetworkComponent from '../../components/red_souls_network_component'
import api from '../../manage'
import {toast} from 'react-toastify'
import {connect} from 'react-redux'
import Link from 'next/link'
import {getUserTokenAction} from '../../store/actions/auth'

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.post.title,
            content: this.props.post.content,
            image: this.props.post.image,
            commentContent: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
        this.updatePost = this.updatePost.bind(this)
        this.deletePost = this.deletePost.bind(this)
        this.addComment = this.addComment.bind(this)
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

    async updatePost(event) {
        event.preventDefault()
        if (this.state.title == '' || this.state.content == '') {
            toast.error('Fields must not be empty !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
        else {
            api.defaults.headers = {
                'Authorization': `Bearer ${this.props.token}`,
            }
            let formdata = new FormData()
            formdata.append('author', this.props.id)
            formdata.append('title', this.state.title)
            formdata.append('content', this.state.content)
            formdata.append('image', this.state.image, this.state.image.name)
            try {
                await api.put(`red_souls_network/post/${this.props.post.id}/`, formdata)
                toast.success('Updated a post successfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
            }
            catch(error) {
                toast.error('Updated a post unsuccessfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
            }
        }
    }

    async deletePost(event) {
        event.preventDefault()
        api.defaults.headers = {
            'Authorization': `Bearer ${this.props.token}`,
        }
        try {
            await api.delete(`red_souls_network/post/${this.props.post.id}/`)
            toast.success('Deleted a post successfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
        catch(error) {
            toast.error('Deleted a post unsuccessfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
    }

    async addComment(event) {
        event.preventDefault()
        if (this.state.commentContent == '') {
            toast.error('Fields must not be empty !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
        else {
            api.defaults.headers = {
                'Authorization': `Bearer ${this.props.token}`,
            }
            let formdata = new FormData()
            formdata.append('post', this.props.post.id)
            formdata.append('user', this.props.id)
            formdata.append('username', this.props.user.username)
            formdata.append('content', this.state.commentContent)
            try {
                await api.post(`red_souls_network/comment/`, formdata)
                toast.success('Added a new comment successfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
            }
            catch(error) {
                toast.error('Added a new comment unsuccessfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
            }
        }
    }

    render() {
        let postOptions = <div className="position-absolute end-0 pe-3">
            <button className="border-radius-16 btn bg-red text-white" data-bs-toggle="collapse" data-bs-target="#post-options">Options</button>
            <div className="collapse mt-2" id="post-options">
                <span className="text-red" data-bs-toggle="modal" data-bs-target="#update-post">Update Post</span>
                <br />
                <span className="text-red" data-bs-toggle="modal" data-bs-target="#delete-post">Delete Post</span>
            </div>
            <div className="modal fade" id="update-post" data-bs-backdrop="static">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-black">
                        <form onSubmit={this.updatePost}>
                            <h1 className="modal-header text-red">Update Post</h1>
                            <div className="modal-body">
                                <div className="form-floating text-white">
                                    <input type="text" name="title" value={this.state.title} onChange={this.onChange} className="form-control form-input" placeholder="Title" />
                                    <label className="form-label">Title</label>
                                </div>
                                <br />
                                <div className="form-floating text-white">
                                    <textarea type="text" name="content" value={this.state.content} onChange={this.onChange} className="form-control form-input" placeholder="Content" />
                                    <label className="form-label">Content</label>
                                </div>
                                <br />
                                <div className="form-floating text-white">
                                    <input type="file" name="image" onChange={this.onChangeImage} className="form-control form-file" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn bg-red text-white">Update Post</button>
                                <button type="button" className="btn bg-red text-white" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="delete-post" data-bs-backdrop="static">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-black">
                        <form onSubmit={this.deletePost}>
                            <h1 className="modal-header text-red">Delete Post</h1>
                            <div className="modal-body">
                                <h3 className="text-white">Are you sure want to delete this post ?</h3>
                            </div>
                            <div className="modal-footer">
                                <button className="btn bg-red text-white">Delete Post</button>
                                <button type="button" className="btn bg-red text-white" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        if (this.props.id != this.props.post.author) {
            postOptions = null
        }
        let layout = <div>
            <div className="border-radius-16 my-5" key={this.props.post.id}>
                <div className="card bg-black">
                    <div className="card-body text-white">
                        {postOptions}
                        <Link href={`/red_souls_network/profile/${this.props.user.id}/`}>
                            <div className="d-flex flex-row my-3">
                                <img src={this.props.user.image} className="avatar" />
                                <h3 className="ps-3">{this.props.user.username}</h3>
                            </div>
                        </Link>
                        <h3 className="card-title mb-3">{this.props.post.title}</h3>
                        <p>{this.props.post.content}</p>
                    </div>
                    <img src={this.props.post.image} className="card-img-top mb-3" />
                    <button className="border-radius-16 btn bg-red text-white w-50 mx-auto" data-bs-toggle="collapse" data-bs-target="#add-comment">Add Comment</button>
                    <div className="collapse mt-2" id="add-comment">
                        <form onSubmit={this.addComment}>
                            <div className="form-floating text-white">
                                <textarea type="text" name="commentContent" value={this.state.commentContent} onChange={this.onChange} className="form-control form-input" placeholder="Content" />
                                <label className="form-label">Content</label>
                            </div>
                            <br />
                            <button className="btn bg-red text-white">Add Comment</button>
                        </form>
                    </div>
                    <div className="mt-3 text-white">
                        {this.props.comment.map(comment => (
                            <div>
                                {comment.user == this.props.id
                                    ? <div>
                                        <Link href={`/red_souls_network/editcomment/${comment.id}/`}>
                                            <div>
                                                <h3>{comment.username}</h3>
                                                <p>{comment.content}</p>
                                            </div>
                                        </Link>
                                    </div>
                                    : <div>
                                        <h3>{comment.username}</h3>
                                        <p>{comment.content}</p>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        return (
            <div>
                <Head>
                    <title>Red Souls Network</title>
                </Head>
                <RedSoulsNetworkComponent layout={layout} />
            </div>
        )
    }
}

export async function getServerSideProps(context) {
    let post = await (await api.get(`red_souls_network/post/${context.params.id}/`)).data
    let user = await (await api.get(`account/userprofile/${post.author}/`)).data
    let comment = await (await api.get(`red_souls_network/getcomment/${post.id}/`)).data
    return {
        props: {
            post,
            user,
            comment,
        }
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.getUserTokenReducer.token,
        id: state.getUserTokenReducer.id,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserToken: () => dispatch(getUserTokenAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)