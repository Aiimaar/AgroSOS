import React from 'react';
import one from "./chart_icon.png";
import two from "./cloud_icon.png";
import three from "./Vector.png";
import four from "./bx_task.png";
import './inside-a-plot-footer-comp.css';

function InsideAPlotFooter(){

  return (
    <footer className="inside-a-plot-footer">
      <div className='inside-a-plot-footer-comp-one'>
        <img src={one} alt="one" className='inside-a-plot-footer-comp-image-one'/>
      </div>
      <div className='inside-a-plot-footer-comp-two'>
        <img src={two} alt="two" className='inside-a-plot-footer-comp-image-two'/>
      </div>
      <div className='inside-a-plot-footer-comp-two'>
        <img src={three} alt="three" className='inside-a-plot-footer-comp-image-three'/>
      </div>
      <div className='inside-a-plot-footer-comp-two'>
        <img src={four} alt="four" className='inside-a-plot-footer-comp-image-four'/>
      </div>
    </footer>
  );
};

export default InsideAPlotFooter;
