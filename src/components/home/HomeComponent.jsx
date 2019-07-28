import React, { Component } from 'react';
import '../../theme/css/styles-merged.css'
import '../../theme/css/style.min.css'
import '../../theme/css/custom.css'

class HomeComponent extends Component {
  state = {  }
  render() {
    return (
      <div>
        <section className='probootstrap-intro' style={{backgroundImage: 'url(https://images.pexels.com/photos/374023/pexels-photo-374023.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)'}} data-stellar-background-ratio='0.5'>
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
        <section className='probootstrap-section'>
          <div className='container'>
            <div className='row'>
              <div className='col-lg-12 col-md-12 mb70 section-heading probootstrap-animate'>
                <h2>Our Services</h2>
                <p className='lead'>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
              </div>
            </div>
            <div className='row mb70'>
              <div className='col-md-4 probootstrap-animate'>
                <div className='probootstrap-box'>
                  <div className='icon text-center'><i className='icon-tools2' /></div>
                  <h3>Interface Design</h3>
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
                  <a href='#' className='btn btn-primary btn-lg btn-block' role='button'>View All Services</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
     );
  }
}
 
export default HomeComponent;
 