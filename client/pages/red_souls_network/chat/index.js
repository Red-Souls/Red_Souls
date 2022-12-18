import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import RedSoulsNetworkComponent from '../../../components/red_souls_network_component'
import api from '../../../manage'

class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chatrooms: [],
        }
    }

    async getChatRoom() {
        try {
            let response = await api.get('red_souls_network/getchatroom/')
            this.setState({
                chatrooms: response.data
            })
        }
        catch(error) {
            console.log(error)
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.getChatRoom()
        }, 1000)
    }

    render() {
        let layout = <div>
            <h1 className="text-center text-white text-shadow-red mt-5">Chat</h1>
            {this.state.chatrooms.map(chatroom => (
                <div className="p-3 text-center">
                    <Link href={`/red_souls_network/chat/${chatroom.id}/`}><a className="text-red">{chatroom.chatRoomName}</a></Link>
                </div>
            ))}
        </div>
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

export default Chat