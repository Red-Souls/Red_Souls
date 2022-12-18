import React from 'react'
import Head from 'next/head'
import RedSoulsNetworkComponent from '../../components/red_souls_network_component'
import api from '../../manage'
import {toast} from 'react-toastify'
import {connect} from 'react-redux'
import Link from 'next/link'
import {getUserTokenAction} from '../../store/actions/auth'

class RedSoulsNetwork extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            users: [],
            title: '',
            content: '',
            image: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
        this.addPost = this.addPost.bind(this)
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

    componentDidMount() {
        this.props.getUserToken()
        this.getPosts()
        this.getUsers()
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

    async addPost(event) {
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
                await api.post('red_souls_network/post/', formdata)
                toast.success('Added a new post successfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
            }
            catch(error) {
                toast.error('Added a new post unsuccessfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
            }
        }
    }

    render() {
        let layout = <div>
            <div className="bg-black text-center p-3">
                <button className="border-radius-16 btn bg-red text-white" data-bs-toggle="modal" data-bs-target="#add-post">Add Post</button>
            </div>
            <div className="modal fade" id="add-post" data-bs-backdrop="static">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-black">
                        <form onSubmit={this.addPost}>
                            <h1 className="modal-header text-red">Add Post</h1>
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
                                <button className="btn bg-red text-white">Add Post</button>
                                <button type="button" className="btn bg-red text-white" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {this.state.posts.map(post => (
                <div className="border-radius-16 my-5" key={post.id}>
                    <Link href={`/red_souls_network/${post.id}/`}>
                        <div className="card bg-black">
                            <div className="card-body text-white">
                                {this.state.users.filter(user => user.id === post.author).map(user => (
                                    <Link href={`/red_souls_network/profile/${user.id}/`}>
                                        <div className="d-flex flex-row my-3">
                                            <img src={user.image} className="avatar" />
                                            <h3 className="ps-3">{user.username}</h3>
                                        </div>
                                    </Link>
                                ))}
                                <h3 className="card-title mb-3">{post.title}</h3>
                            </div>
                            <img src={post.image} className="card-img-top mb-3" />
                        </div>
                    </Link>
                </div>
            ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(RedSoulsNetwork)