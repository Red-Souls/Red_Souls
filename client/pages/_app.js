import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/red_souls.css'
import Link from 'next/link'
import {useEffect} from 'react'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import {Provider} from 'react-redux'
import {store} from '../store/index'
import AuthComponent from '../components/auth_component'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  })

  return (
    <Provider store={store}>
      <div>
        <nav className="navbar navbar-expand-lg bg-black sticky-top">
          <div className="container-fluid">
            <Link href="/" className="navbar-brand">
              <a className="text-red me-3">Red_Souls</a>
            </Link>
            <button className="navbar-toggler text-red" data-bs-toggle="collapse" data-bs-target="#nav-content">Show All</button>
            <div className="collapse navbar-collapse" id="nav-content">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link href="/"><a className="text-red">Home</a></Link>
                </li>
                <li className="nav-item">
                  <Link href="/red_souls_network/"><a className="text-red">Red Souls Network</a></Link>
                </li>
                <AuthComponent />
              </ul>
            </div>
          </div>
        </nav>
        <Component {...pageProps} />
        <ToastContainer />
        <footer className="bg-black text-white text-center">
          <div className="container-fluid">
            <div className="row pt-4">
              <div className="col-lg col-mb">
                <h3>Red_Souls</h3>
                <p>Everything you need is here.</p>
              </div>
              <div className="col-lg col-mb">
                <h3>Pages</h3>
                <Link href="/"><a className="text-red">Home</a></Link>
              </div>
              <div className="col-lg col-mb">
                <h3>Contact Us</h3>
                <Link href="/"><a className="text-red">Instagram</a></Link>
                <br />
                <Link href="/"><a className="text-red">Twitter</a></Link>
                <br />
                <Link href="/"><a className="text-red">Youtube</a></Link>
                <br />
                <Link href="/"><a className="text-red">Twitch</a></Link>
                <br />
                <Link href="/"><a className="text-red">Facebook</a></Link>
              </div>
            </div>
            <h3 className="pb-3">@Red_Souls 2022</h3>
          </div>
        </footer>
      </div>
    </Provider>
  )
}

export default MyApp
