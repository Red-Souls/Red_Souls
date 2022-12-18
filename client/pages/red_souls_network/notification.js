import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import api from '../../manage'

class Notification extends React.Component {
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
        setTimeout(() => {
            this.getNotifications()
        }, 1000)
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Notification</title>
                </Head>
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
                <div className="mobile-show">
                    <nav className="sticky-bottom bg-black p-4">
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

export default Notification