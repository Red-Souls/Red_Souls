import React from 'react'
import Head from 'next/head'
import RedSoulsNetworkComponent from '../../../components/red_souls_network_component'
import api from '../../../manage'
import {toast} from 'react-toastify'
import {connect} from 'react-redux'
import {getUserTokenAction} from '../../../store/actions/auth'

class FriendRequest extends React.Component {
    constructor(props) {
        super(props)
        this.accept = this.accept.bind(this)
        this.decline = this.decline.bind(this)
    }

    async accept(event) {
        event.preventDefault()
        api.defaults.headers = {
            'Authorization': `Bearer ${this.props.token}`,
        }
        let formdata = new FormData()
        formdata.append('user', this.props.friendRequest.sender)
        formdata.append('friend', this.props.friendRequest.receiver)
        try {
            await api.post('account/addfriend/', formdata)
            await api.delete(`red_souls_network/notification/${this.props.friendRequest.id}/`)
            await api.post('red_souls_network/chatroom/', {
                chatRoomName: `${this.props.name} - ${this.props.friendRequest.sendername}`,
                members: [this.props.id, this.props.friendRequest.sender],
            })
            toast.success('Added new friend successfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
        catch(error) {
            toast.error('Added new friend unsuccessfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
    }

    async decline(event) {
        event.preventDefault()
        api.defaults.headers = {
            'Authorization': `Bearer ${this.props.token}`,
        }
        try {
            await api.delete(`red_souls_network/notification/${this.props.friendRequest.id}/`)
            toast.success('Declined successfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
        catch(error) {
            toast.error('Declined unsuccessfully !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
    }

    render() {
        let layout = <div>
            <div className="text-white">
                <p>From {this.props.friendRequest.sendername}</p>
                <p>{this.props.friendRequest.content}</p>
            </div>
            <div className="d-flex flex-row">
                <div className="pe-3">
                    <button className="rounded-16 btn bg-red text-white" onClick={this.accept}>Accept</button>
                </div>
                <div className="pe-3">
                    <button className="rounded-16 btn bg-red text-white" onClick={this.decline}>Decline</button>
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
    let friendRequest = (await api.get(`red_souls_network/notification/${context.params.id}/`)).data
    return {
        props: {
            friendRequest,
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

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequest)