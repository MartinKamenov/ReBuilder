import React, { Component } from 'react';
import '../../theme/css/styles-merged.css'
import '../../theme/css/style.min.css'
import '../../theme/css/custom.css'
import { Link } from 'react-router-dom';

class HomeComponent extends Component {
  render() {
    return (
      <div>
        <section className='probootstrap-intro' style={{backgroundImage: 'url(/assets/homePageBackground.jpeg)'}} data-stellar-background-ratio='0.5'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-7 probootstrap-intro-text'>
                <h1>Create your own website without the pain of knowing how to code</h1>
                <div className='probootstrap-subtitle probootstrap-animate'>
                  <h2>Website template for creative agency like you</h2>
                </div>
                <p className='watch-intro probootstrap-animate'><a href='https://vimeo.com/45830194' className='popup-vimeo'>Watch the video <i className='icon-play2' /></a></p>
              </div>
            </div>
          </div>
          <a className='probootstrap-scroll-down js-next' href='#next-section'>Scroll down <i className='icon-chevron-down' /></a>
        </section>
        <section className='probootstrap-section'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 mb70 section-heading probootstrap-animate'>
                <h2>Our Services</h2>
                <p className='lead'>
                  We provide a easy way to build and host your own custom created website 
                </p>
              </div>
            </div>
            <div className='row mb70'>
              <div className='col-md-4 probootstrap-animate'>
                <div className='probootstrap-box'>
                  <div className='icon text-center'><i className='icon-tools2' /></div>
                  <h3>Interface Design</h3>
                  <p>
                    Drag and drop HTML elements on your customized page.
                  </p>
                  <ul className='text-left with-icon colored'>
                    <li><i className='icon-radio-checked' /> <span>A small river named Duden</span></li>
                    <li><i className='icon-radio-checked' /> <span>Place and supplie</span></li>
                    <li><i className='icon-radio-checked' /> <span>Roasted parts of sentences</span></li>
                  </ul>
                </div>
              </div>
              <div className='col-md-4 probootstrap-animate'>
                <div className='probootstrap-box'>
                  <div className='icon text-center'><i className='icon-desktop' /></div>
                  <h3>User Experience</h3>
                  <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                  <ul className='text-left with-icon colored'>
                    <li><i className='icon-radio-checked' /> <span>A small river named Duden</span></li>
                    <li><i className='icon-radio-checked' /> <span>Place and supplie</span></li>
                    <li><i className='icon-radio-checked' /> <span>Roasted parts of sentences</span></li>
                  </ul>
                </div>
              </div>
              <div className='col-md-4 probootstrap-animate'>
                <div className='probootstrap-box'>
                  <div className='icon text-center'><i className='icon-lightbulb' /></div>
                  <h3>Product Strategy</h3>
                  <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                  <ul className='text-left with-icon colored'>
                    <li><i className='icon-radio-checked' /> <span>A small river named Duden</span></li>
                    <li><i className='icon-radio-checked' /> <span>Place and supplie</span></li>
                    <li><i className='icon-radio-checked' /> <span>Roasted parts of sentences</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4 col-md-offset-4 probootstrap-animate'>
                <p className='text-center'>
                  <Link to='/services' className='btn btn-primary btn-lg btn-block' role='button'>View All Services</Link>
                </p>
              </div>
            </div>
          </div>
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
 
export default HomeComponent;
 