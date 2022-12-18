import React from 'react'
import api from '../manage'
import Head from 'next/head'
import {toast} from 'react-toastify'

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onRegister = this.onRegister.bind(this)
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async onRegister(event) {
        event.preventDefault()
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (this.state.username == '' || this.state.email == '' || this.state.password == '') {
            toast.error('Fields must not be empty !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
        else if (!regex.test(this.state.email)) {
            toast.error('Email is not valid !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
        else if (this.state.password.length < 8) {
            toast.error('Password length must be at least 8 !', {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
        }
        else {
            try {
                let response = await api.post('account/register/', {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                })
                toast.success(response.data, {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
            }
            catch(error) {
                toast.error(error, {position: toast.POSITION.TOP_CENTER, theme: 'dark'})
            }
        }
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Red_Souls - Register</title>
                </Head>
                <div className="container">
                    <h1 className="text-center text-white text-shadow-red mt-5">Register</h1>
                    <form className="py-100" onSubmit={this.onRegister}>
                        <div className="form-floating text-white">
                            <input type="text" name="username" value={this.state.username} onChange={this.onChange} className="form-control form-input" placeholder="Username" />
                            <label className="form-label">Username</label>
                        </div>
                        <br />
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
                            <button className="btn bg-red text-white border-radius-16">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Register