import React from 'react'
import api from '../manage'
import Head from 'next/head'
import {toast} from 'react-toastify'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onLogin = this.onLogin.bind(this)
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async onLogin(event) {
        event.preventDefault()
        try {
            let response = await api.post('account/login/', {
                email: this.state.email,
                password: this.state.password,
            })
            toast.success(response.data.message, {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
        catch(error) {
            toast.error(error, {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Red_Souls - Login</title>
                </Head>
                <div className="container">
                    <h1 className="text-center text-white text-shadow-red mt-5">Login</h1>
                    <form className="py-100" onSubmit={this.onLogin}>
                        <div className="form-floating text-white">
                            <input type="text" name="email" value={this.state.email} onChange={this.onChange} className="form-control form-input" placeholder="Email" />
                            <label className="form-label">Email</label>
                        </div>
                        <br />
                        <div className="form-floating text-white">
                            <input type="password" name="password" value={this.state.password} onChange={this.onChange} className="form-control form-input" placeholder="Password" />
                            <label className="form-label">Password</label>
                        </div>
                        <br />
                        <div className="text-center">
                            <button className="btn bg-red text-white border-radius-16">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login