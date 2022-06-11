import React from 'react'
import background_1 from '../static/img/background_1.png'
import background_2 from '../static/img/background_2.png'
import background_3 from '../static/img/background_3.png'
import social_network from '../static/img/social_network.png'
import online_store from '../static/img/online_store.png'
import learning_platform from '../static/img/learning_platform.png'

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <header>
                    <div className="carousel slide" data-bs-ride="carousel" id="header-slide">
                        <div className="carousel-indicators">
                            <button data-bs-target="#header-slide" data-bs-slide-to="0" className="active"></button>
                            <button data-bs-target="#header-slide" data-bs-slide-to="1"></button>
                            <button data-bs-target="#header-slide" data-bs-slide-to="2"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={ background_1 } className="d-block w-100" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h1>Red_Souls</h1>
                                    <p>A place to communicate, learn and do business</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={ background_2 } className="d-block w-100" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h1>Red_Souls</h1>
                                    <p>A place to communicate, learn and do business</p>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <img src={ background_3 } className="d-block w-100" />
                                <div className="carousel-caption d-none d-md-block">
                                    <h1>Red_Souls</h1>
                                    <p>A place to communicate, learn and do business</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <h1 className="p-5 text-white text-center">The combination of social network, online store, learning platform</h1>
                <div className="container text-white">
                    <div className="row">
                        <div className="col-lg col-md bg-orange rounded mb-3">
                            <h3 className="text-center">Social Network</h3>
                            <p>
                                Come here to entertain, read information, daily news. Develop
                                community, connect with people. Post and share information.
                            </p>
                            <img src={ social_network } className="d-block w-100 pb-3" />
                        </div>
                        <div className="col-lg col-md bg-orange rounded mx-lg-5 mx-md-5 mb-3">
                            <h3 className="text-center">Online Store</h3>
                            <p>
                                Come here to start your own brand, build a business,
                                create quality products.
                            </p>
                            <img src={ online_store } className="d-block w-100 pt-lg-4 pt-md-5 pb-3" />
                        </div>
                        <div className="col-lg col-md bg-orange rounded mb-3">
                            <h3 className="text-center">Learning Platform</h3>
                            <p>
                                Come here to study new things from every discipline
                                such as programming, language, ...
                            </p>
                            <img src={ learning_platform } className="d-block w-100 pt-lg-4 pb-3" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home