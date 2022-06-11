import React from 'react'
import { API } from '../manage.js'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

class Messenger extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messageRooms: [],
            followerMessageRooms: [],
        }
    }

    componentDidMount() {
        API.get(`social_network/getmessageroomview/${Cookies.get('id')}/`)
        .then(response => {
            this.setState({
                messageRooms: response.data
            })
        })
        .catch(error => {
            console.error(error)
        })

        API.get(`social_network/getfollowermessageroomview/${Cookies.get('id')}/`)
        .then(response => {
            this.setState({
                followerMessageRooms: response.data
            })
        })
        .catch(error => {
            console.error(error)
        })
    }

    render() {
        return (
            <div>
                <div className="container">
                    {
                        this.state.messageRooms.map(messageRoom => (
                            <div className="card bg-dark text-white rounded my-3 text-center" key={ messageRoom.id }>
                                <div className="card-body">
                                    <Link to={`/message_chat/${messageRoom.id}/`} className="text-decoration-none text-success"><h3>{ messageRoom.chatname_1 } - { messageRoom.chatname_2 }</h3></Link>
                                </div>
                            </div>
                        ))
                    }
                    {
                        this.state.followerMessageRooms.map(followerMessageRoom => (
                            <div className="card bg-dark text-white rounded my-3 text-center" key={ followerMessageRoom.id }>
                                <div className="card-body">
                                    <Link to={`/message_chat/${followerMessageRoom.id}/`} className="text-decoration-none text-success"><h3>{ followerMessageRoom.chatname_1 } - { followerMessageRoom.chatname_2 }</h3></Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Messenger