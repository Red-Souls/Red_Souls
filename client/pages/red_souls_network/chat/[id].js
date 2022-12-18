import React from 'react'
import Head from 'next/head'
import RedSoulsNetworkComponent from '../../../components/red_souls_network_component'
import api from '../../../manage'
import {toast} from 'react-toastify'
import {connect} from 'react-redux'
import {getUserTokenAction} from '../../../store/actions/auth'

class ChatMessage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
        }
        this.onChange = this.onChange.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async sendMessage(event) {
        event.preventDefault()
        api.defaults.headers = {
            'Authorization': `Bearer ${this.props.token}`,
        }
        let formdata = new FormData()
        formdata.append('chatRoom', this.props.routeId)
        formdata.append('user', this.props.id)
        formdata.append('username', this.props.name)
        formdata.append('content', this.state.content)
        try {
            await api.post(`red_souls_network/chatmessage/`, formdata)
            toast.success('Sent text successfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
        catch(error) {
            toast.error('Sent text unsuccessfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
    }

    render() {
        let check = false
        let layout = <div>
            <div>
                {this.props.chatMessage.map(chatmessage => (
                    <div className="text-white">
                        <h3>{chatmessage.username}</h3>
                        <p>{chatmessage.content}</p>
                    </div>
                ))}
            </div>
            <div>
                <form onSubmit={this.sendMessage}>
                    <div className="form-floating text-white">
                        <textarea type="text" name="content" value={this.state.content} onChange={this.onChange} className="form-control form-input" placeholder="Content" />
                        <label className="form-label">Content</label>
                    </div>
                    <br />
                    <button className="btn bg-red text-white">Send</button>
                </form>
            </div>
        </div>
        this.props.chatrooms.members.sort()
        let l = 0, r = this.props.chatrooms.members.length, mid
        while (l <= r) {
            mid = (l + r) / 2
            if (this.props.chatrooms.members[mid] == this.props.id) {
                check = true
            }

            if (this.props.chatrooms.members[mid] < this.props.id) {
                l = mid + 1
            }
            else {
                r = mid - 1
            }
        }

        if (check == false) {
            layout = <div>
                <h1 className="text-center text-white text-shadow-red mt-5">You do not have permissions to chat in this room.</h1>
            </div>
        }
        return (
            <div>
                <Head>
                    <title>Red Souls Network - Chat</title>
                </Head>
                <RedSoulsNetworkComponent layout={layout} />
            </div>
        )
    }
}

export async function getServerSideProps(context) {
    let chatMessage = await (await api.get(`red_souls_network/getchatmessage/${context.params.id}/`)).data
    let routeId = context.params.id
    let chatrooms = await (await api.get(`red_souls_network/chatroom/${context.params.id}/`)).data
    return {
        props: {
            chatMessage,
            routeId,
            chatrooms
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
        getUserToken: () => dispatch(getUserTokenAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessage)