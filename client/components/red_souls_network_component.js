import React from 'react'
import Link from 'next/link'
import {connect} from 'react-redux'
import {getUserTokenAction} from '../store/actions/auth'
import api from '../manage'

class RedSoulsNetworkComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notifications: [],
        }
    }

    async getNotifications() {
        try {
            let response = await api.get(`red_souls_network/getnotificationbyreceiver/`)
            this.setState({
                notifications: response.data
            })
        }
        catch(error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.props.getUserToken()
        setTimeout(() => {
            this.getNotifications()
        }, 1000)
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg col-md bg-black">
                        <div className="p-3 text-center">
                            <Link href={`/red_souls_network/profile/${this.props.id}/`}><a className="text-red">Profile</a></Link>
                        </div>
                        <div className="p-3 text-center">
                            <Link href="/red_souls_network/chat/"><a className="text-red">Chat</a></Link>
                        </div>
                    </div>
                    <div className="col-lg col-md">
                        {this.props.layout}
                    </div>
                    <div className="col-lg col-md bg-black mobile-hide">
                        {this.state.notifications.map(notification => (
                            <div className="p-3 text-white">
                                {notification.content == 'Hi ! Can you accept my friend request ? I want to make friend with you !'
                                    ? <div>
                                        <Link href={`/red_souls_network/friendrequest/${notification.id}/`}>
                                            <div>
                                                <p>From {notification.sendername}</p>
                                                <p>{notification.content}</p>
                                            </div>
                                        </Link>
                                    </div>
                                    : <div>
                                        <p>From {notification.sendername}</p>
                                        <p>{notification.content}</p>
                                    </div>
                                }
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mobile-show sticky-bottom">
                    <nav className="bg-black p-4">
                        <div className="container-fluid">
                            <Link href="/red_souls_network/"><a className="text-red">Red Souls Network</a></Link>
                            <Link href="/red_souls_network/notification/"><a className="text-red ps-3">Notification</a></Link>
                        </div>
                    </nav>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RedSoulsNetworkComponent)