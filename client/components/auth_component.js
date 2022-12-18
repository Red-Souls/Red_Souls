import React from 'react'
import Link from 'next/link'
import api from '../manage'
import {connect} from 'react-redux'
import {toast} from 'react-toastify'
import {getUserTokenAction} from '../store/actions/auth'

class AuthComponent extends React.Component {
    constructor(props) {
        super(props)
        this.onLogout = this.onLogout.bind(this)
    }

    componentDidMount() {
        this.props.getUserToken()
    }

    async onLogout(event) {
        event.preventDefault()
        api.defaults.headers = {
            'Authorization': `Bearer ${this.props.token}`,
        }
        try {
            await api.get('account/logout/')
            toast.success(response.data.message, {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
        catch(error) {
            console.log(error)
        }
    }

    render() {
        if (this.props.token != null || this.props.token != undefined) {
            return (
                <div className="position-absolute end-0 d-flex flex-row">
                    <li className="nav-item">
                        <Link href="/"><a className="text-red" onClick={this.onLogout}>Logout</a></Link>
                    </li>
                </div>
            )
        }
        return (
            <div className="position-absolute end-0 d-flex flex-row">
                <li className="nav-item">
                    <Link href="/register/"><a className="text-red">Register</a></Link>
                </li>
                <li className="nav-item">
                    <Link href="/login/"><a className="text-red">Login</a></Link>
                </li>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.getUserTokenReducer.token,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserToken: () => dispatch(getUserTokenAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent)