import React from 'react'
import { API } from '../manage.js'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

class Message_Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messageChats: [],
            content: '',
            username: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {
        API.get(`social_network/getmessagechatview/${this.props.params.id}/`)
        .then(response => {
            this.setState({
                messageChats: response.data
            })
        })
        .catch(error => {
            console.error(error)
        })

        API.get(`account/profile/${Cookies.get('id')}/`)
        .then(response => {
            this.setState({
                username: response.data.username
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

    onSubmit(event) {
        event.preventDefault()
        const formdata = new FormData()
        formdata.append('messageRoom', this.props.params.id)
        formdata.append('user', Cookies.get('id'))
        formdata.append('username', this.state.username)
        formdata.append('content', this.state.content)
        API.defaults.headers = {
            'Authorization': 'Token ' + Cookies.get('token')
        }
        API.post('social_network/messagechat/', formdata)
        .then(response => {
            console.log('sent text successfully !')
            toast.success('sent text successfully !', {position: toast.POSITION.TOP_RIGHT, theme: 'dark'})
            window.location.reload()
        })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="bg-dark">
                        {
                            this.state.messagechats.map(messageChat => (
                                <div className="card bg-dark text-white my-3" key={ messageChat.id }>
                                    <div className="card-body">
                                        <p>{ messageChat.username }</p>
                                        <p>{ messageChat.content }</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="text-center">
                        <form onSubmit={ this.onSubmit } className="bg-dark my-3">
                            <div className="form-floating">
                                <textarea type="text" name="content" value={ this.state.content } onChange={ this.onChange } className="form-control bg-dark text-white" placeholder="content:" />
                                <label className="form-label text-white">content: </label>
                            </div>
                            <br />
                            <button className="btn btn-danger">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function withRouter(props) {
    const params = useParams()
    return <Message_Chat {...props} params={params} />
}

export default withRouter