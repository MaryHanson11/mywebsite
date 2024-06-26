import React, { useEffect, useState } from "react";
import "./About.less";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";


export default function About() {
  //displays headshot and about desc
  const [render, setRender] = useState(true)

  const onLoad = () =>{
    setTimeout(()=>{
      setRender(false);
    }, 500) 
  }

  
  return (
    <div className='page'>
      <NavBar/>
      <div id='about-wrapper'>
        <div id='pic-wrapper'>
          <img id='portrait' className={(render) ? 'animation1' : 'end-animation1'} style={(render) ? {width: '400px'} : {}} src={'https://firebasestorage.googleapis.com/v0/b/mywebsite-9635a.appspot.com/o/portrait-seattle1%20(1).jpeg?alt=media&token=61b87e65-fc44-4235-b7fe-efac59c481e5'} alt='Portrait'/>
        </div>
        <div id='text-wrapper'>
          <p  className='about' id="text-box">Hello, my name is Mary Hanson. As a fourth year Computer Science student at the 
          University of Florida, I am an avid learner. Through various personal projects and my position 
          as Web Master for Tea Literary Magazine, I have gained valuable creative and interpersonal skills.</p>
          <div className='label'>Email</div>
          <p className='about-text' id="text-box">mary.hanson.dev@gmail.com</p>
          <div className='label'>Linkedin</div>
          <p className='about-text' id="text-box"><a href='https://www.linkedin.com/in/mary-hanson-79249b249/'>linkedin.com/in/mary-hanson</a></p>
          <div className='label'>Github</div>
          <p className='about-text' id="text-box"><a href='https://github.com/maryhanson11' >github.com/maryhanson11</a></p>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
