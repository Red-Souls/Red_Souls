import React from 'react'
import {connect} from 'react-redux'
import api from '../../../manage'
import RedSoulsNetworkComponent from '../../../components/red_souls_network_component'
import Head from 'next/head'
import {toast} from 'react-toastify'

class EditComment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
        }
        this.onChange = this.onChange.bind(this)
        this.updateComment = this.updateComment.bind(this)
        this.deleteComment = this.deleteComment.bind(this)
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async updateComment(event) {
        event.preventDefault()
        if (this.state.content == '') {
            toast.error('Fields must not be empty !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
        else {
            api.defaults.headers = {
                'Authorization': `Bearer ${this.props.token}`,
            }
            let formdata = new FormData()
            formdata.append('post', this.props.comment.post)
            formdata.append('user', this.props.id)
            formdata.append('username', this.props.comment.username)
            formdata.append('content', this.state.content)
            try {
                await api.put(`red_souls_network/comment/${this.props.comment.id}/`, formdata)
                toast.success('Updated a new comment successfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
            }
            catch(error) {
                toast.error('Updated a new comment unsuccessfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
            }
        }
    }

    async deleteComment(event) {
        event.preventDefault()
        api.defaults.headers = {
            'Authorization': `Bearer ${this.props.token}`,
        }
        try {
            await api.delete(`red_souls_network/comment/${this.props.comment.id}/`)
            toast.success('Deleted a new comment successfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
        catch(error) {
            toast.error('Deleted a new comment unsuccessfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
    }

    render() {
        let layout = <div>
            <h1 className="text-center text-white text-shadow-red mt-5">Update Comment</h1>
            <form className="m-5" onSubmit={this.updateComment}>
                <div className="form-floating text-white">
                    <textarea type="text" name="content" value={this.state.content} onChange={this.onChange} className="form-control form-input" placeholder="Content" />
                    <label className="form-label">Content</label>
                </div>
                <br />
                <button className="btn bg-red text-white">Update Comment</button>
            </form>
            <h1 className="text-center text-white text-shadow-red mt-5">Delete Comment</h1>
            <form className="m-5" onSubmit={this.deleteComment}>
                <h3 className="text-white">Are you sure want to delete this comment ?</h3>
                <br />
                <button className="btn bg-red text-white">Delete Comment</button>
            </form>
        </div>
        if (this.props.id != this.props.comment.user) {
            layout = <div>
                <h1 className="text-center text-white text-shadow-red mt-5">This is not your comment, so you don't have permission to delete or update it.</h1>
            </div>
        }
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
    let comment = await (await api.get(`red_souls_network/comment/${context.params.id}/`)).data
    return {
        props: {
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

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)