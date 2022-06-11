import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import BaseRouter from './manage.js'
import { toast } from 'react-toastify'
import { API } from './manage.js'
import './static/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'

toast.configure()
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notification: [],
    }
  }

  componentDidMount() {
    API.get('account/notification/')
    .then(response => {
        this.setState({
          notification: response.data
        })
    })
    .catch(error => {
        console.error(error)
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <nav className="navbar navbar-expand-lg sticky-top bg-dark" id="menu">
            <div className="container-fluid">
              <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </button>
              <div className="navbar-collapse collapse" id="menu-content">
                <Link to="/" className="navbar-brand text-success">Red_Souls</Link>
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <Link to="" className="nav-link text-success dropdown-toggle" data-bs-toggle="dropdown" data-bs-target="#social_network_dropdown">Social Network</Link>
                    <ul className="dropdown-menu bg-dark" id="social_network_dropdown">
                      <Link to="/social_network/" className="dropdown-item text-success">Social Network</Link>
                      <Link to="/messenger/" className="dropdown-item text-success">Messenger</Link>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link to="/register/" className="nav-link text-success">Register</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login/" className="nav-link text-success">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to={`/profile/${Cookies.get('id')}/`} className="nav-link text-success">Profile</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="" className="nav-link text-success" data-bs-toggle="modal" data-bs-target="#notification">Notification</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="modal fade" id="notification" data-bs-backdrop="static">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="bg-dark-2">
                  <h1 className="modal-header text-success">Notification</h1>
                    <div className="modal-body">
                      {
                        this.state.notification.map(notification => (
                            <div className="card bg-dark text-white rounded mb-3" key={ notification.id }>
                                <div className="card-body">
                                    <h3>{ notification.username }</h3>
                                    <p>{ notification.content }</p>
                                </div>
                            </div>
                        ))
                      }
                    </div>
                    <div className="modal-footer">
                      <button className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <BaseRouter></BaseRouter>
          <footer className="bg-dark text-white text-center">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg mb-2">
                  <h3>Red_Souls</h3>
                  <p>A place to communicate, learn and do business</p>
                </div>
                <div className="col-lg mb-4">
                  <h3>Pages</h3>
                  <Link to="/" className="text-white text-decoration-none">Home</Link>
                  <br />
                  <Link to="/social_network/" className="text-white text-decoration-none">Social Network</Link>
                </div>
                <div className="col-lg mb-5">
                  <h3>Contact Us</h3>
                  <Link to="" className="text-white text-decoration-none">Instagram</Link>
                  <br />
                  <Link to="" className="text-white text-decoration-none">Twitter</Link>
                  <br />
                  <Link to="" className="text-white text-decoration-none">Youtube</Link>
                  <br />
                  <Link to="" className="text-white text-decoration-none">Twitch</Link>
                  <br />
                  <Link to="" className="text-white text-decoration-none">Facebook</Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    )
  }
}

export default App