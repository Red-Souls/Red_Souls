import React from 'react'
import { API } from '../manage.js'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

toast.configure()
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
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
        API.post('account/register/', {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        })
        .then(response => {
            console.log('registered successfully !')
            toast.success('registered successfully !', {position: toast.POSITION.TOP_RIGHT, theme: 'dark'})
            this.props.navigate('/login/')
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
                        <input type="text" name="email" value={ this.state.email } onChange={ this.onChange } className="form-control bg-dark text-white" placeholder="email:" />
                        <label className="form-label text-white">email: </label>
                    </div>
                    <br />
                    <div className="form-floating">
                        <input type="password" name="password" value={ this.state.password } onChange={ this.onChange } className="form-control bg-dark text-white" placeholder="password:" />
                        <label className="form-label text-white">password: </label>
                    </div>
                    <br />
                    <button className="btn btn-danger mb-3">Register</button>
                </form>
            </div>
        )
    }
}

function WithRouter(props) {
    const navigate = useNavigate()
    return <Register {...props} navigate={navigate} />
}

export default WithRouter