import React from 'react'
import { API } from '../manage.js'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

toast.configure()
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(event) {
        this.setState({
            [ event.target.name ]: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault()
        API.post('account/login/', {
            username: this.state.username,
            password: this.state.password,
        })
        .then(response => {
            console.log('logon successfully !')
            toast.success('logon successfully !', {position: toast.POSITION.TOP_RIGHT, theme: 'dark'})
            Cookies.set('token', response.data.token)
            Cookies.set('id', response.data.id)
            this.props.navigate('/')
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.onSubmit } className="mx-auto w-50">
                    <br />
                    <div className="form-floating">
                        <input type="text" name="username" value={ this.state.username } onChange={ this.onChange } className="form-control bg-dark text-white" placeholder="username:" />
                        <label className="form-label text-white">username: </label>
                    </div>
                    <br />
                    <div className="form-floating">
                        <input type="password" name="password" value={ this.state.password } onChange={ this.onChange } className="form-control bg-dark text-white" placeholder="password:" />
                        <label className="form-label text-white">password: </label>
                    </div>
                    <br />
                    <button className="btn btn-danger mb-3">Login</button>
                </form>
            </div>
        )
    }
}

function WithRouter(props) {
    const navigate = useNavigate()
    return <Login {...props} navigate={navigate} />
}

export default WithRouter
