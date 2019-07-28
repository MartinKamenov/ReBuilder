import React, { Component } from 'react';
import "../theme/css/styles-merged.css"
import "../theme/css/style.min.css"
import "../theme/css/custom.css"


class HomeComponent extends Component {
  state = {  }
  render() { 
    return (  
      <div>
      <div>

        <section className="probootstrap-intro" style={{backgroundImage: 'url(img/hero_bg_2.jpg)'}} data-stellar-background-ratio="0.5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-7 probootstrap-intro-text">
                <h1 className="probootstrap-animate">We're creative agency based in London and New York</h1>
                <div className="probootstrap-subtitle probootstrap-animate">
                  <h2>A free html website template for creative agency like you! brought to you by <a href="https://uicookies.com/" target="_blank">uicookies.com</a></h2>
                </div>
                <p className="watch-intro probootstrap-animate"><a href="https://vimeo.com/45830194" className="popup-vimeo">Watch the video <i className="icon-play2" /></a></p>
              </div>
            </div>
          </div>
          <a className="probootstrap-scroll-down js-next" href="#next-section">Scroll down <i className="icon-chevron-down" /></a>
        </section>
      </div>
    </div>

     );
  }
}
 
export default HomeComponent;
 