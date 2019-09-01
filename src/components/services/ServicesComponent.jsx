import React, { Component } from 'react';

import './ServicesComponent.css';

class ServicesComponent extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <section className='probootstrap-intro' style={{backgroundImage: 'url(/assets/homePageBackground.jpeg)'}} data-stellar-background-ratio='0.5'>
                <div className='container-fluid'>
                    <div className='row'>
                    <div className='col-md-7 probootstrap-intro-text'>
                        <h1>Create your own website without the pain of knowing how to code</h1>
                        <div className='probootstrap-subtitle probootstrap-animate'>
                        <h2>A free html website template for creative agency like you! brought to you by</h2>
                        </div>
                        <p className='watch-intro probootstrap-animate'><a href='https://vimeo.com/45830194' className='popup-vimeo'>Watch the video <i className='icon-play2' /></a></p>
                    </div>
                    </div>
                </div>
                <a className='probootstrap-scroll-down js-next' href='#next-section'>Scroll down <i className='icon-chevron-down' /></a>
                </section>
                {
                    function () {
                        let script = document.createElement('script');
                        script.src = "/scripts.min.js";
                        document.body.appendChild(script);
                        let script2 = document.createElement('script');
                        script2.src = "/main.min.js";
                        document.body.appendChild(script2);
                    }()
                }
            </div>
        );
    }
}
 
export default ServicesComponent;