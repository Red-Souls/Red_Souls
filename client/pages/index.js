import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import header_slide_image_1 from '../public/img/header_slide_image_1.png'
import header_slide_image_2 from '../public/img/header_slide_image_2.png'
import header_slide_image_3 from '../public/img/header_slide_image_3.png'
import red_souls_network from '../public/img/red_souls_network.png'

class Home extends React.Component {
  render() {
    return (
      <div>
        <Head>
            <title>Red_Souls</title>
        </Head>
        <div className="carousel slide" data-bs-ride="carousel" id="header-slide">
            <div className="carousel-indicators">
                <button data-bs-target="#header-slide" data-bs-slide-to="0" className="active"></button>
                <button data-bs-target="#header-slide" data-bs-slide-to="1"></button>
                <button data-bs-target="#header-slide" data-bs-slide-to="2"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <Image src={header_slide_image_1} className="d-block w-100 darkness" />
                    <div className="carousel-caption d-none d-md-block">
                        <h1 className="text-white text-shadow-red">Red_Souls</h1>
                        <p>Everything you need is here.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <Image src={header_slide_image_2} className="d-block w-100 darkness" />
                    <div className="carousel-caption d-none d-md-block">
                        <h1 className="text-white text-shadow-red">Red_Souls</h1>
                        <p>Everything you need is here.</p>
                    </div>
                </div>
                <div className="carousel-item">
                    <Image src={header_slide_image_3} className="d-block w-100 darkness" />
                    <div className="carousel-caption d-none d-md-block">
                        <h1 className="text-white text-shadow-red">Red_Souls</h1>
                        <p>Everything you need is here.</p>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" data-bs-target="#header-slide" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" data-bs-target="#header-slide" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
            </button>
        </div>
        <div className="container-fluid my-3 text-white text-center">
            <div className="row">
                <div className="col-lg">
                    <div>
                        <Image src={red_souls_network} height="770" className="border-radius-16" />
                    </div>
                </div>
                <div className="col-lg">
                    <div className="bg-orange border-radius-16">
                        <div className="py-100">
                            <h3>Red Souls Network</h3>
                            <p>Share your story, communicate with everyone, start your business.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Home