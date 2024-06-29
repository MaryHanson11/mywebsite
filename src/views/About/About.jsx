import React, { useEffect, useState } from "react";
import "./About.less";
import NavBar from "../../components/NavBar/NavBar";
import { AsyncImage } from 'loadable-image'
import Footer from "../../components/Footer/Footer";


export default function About() {
  //displays headshot and about desc
    const [render, setRender] = useState(true)
    

    var width = window.innerWidth
    var w1, h1;
    if (400 >= width){
      var res = (width / 3) * 2
      w1 = res;
      h1 = res;
    }
    else{
      w1 = 400;
      h1 = 400;
    }
    
    const [w, setW] = useState(w1)
    const [h, setH] = useState(h1)

    console.log(w)
    useEffect(()=>{
      const handlePortraitResize = () => {
        var width = window.innerWidth
        if (width <= w){
          var res = (width / 3) * 2
          setW(res)
          setH(res)
        }
        else{
          setW(400)
          setH(400)
        }
      }

      window.addEventListener('resize', handlePortraitResize)
      return () => {
        window.removeEventListener('resize', handlePortraitResize)
      }
    })
    useEffect(() => {
      const image = new Image();
  
      image.onload = () => {
        setRender(false);
      };
      image.src = 'https://firebasestorage.googleapis.com/v0/b/mywebsite-9635a.appspot.com/o/portrait-seattle1%20(1).jpeg?alt=media&token=61b87e65-fc44-4235-b7fe-efac59c481e5';
    }, []);
  
    
 //<img id='portrait' loading='lazy' className={(render) ? 'animation1' : 'end-animation1'} style={(render) ? {width: '400px'} : {}} src={'https://firebasestorage.googleapis.com/v0/b/mywebsite-9635a.appspot.com/o/portrait-seattle1%20(1).jpeg?alt=media&token=61b87e65-fc44-4235-b7fe-efac59c481e5'} alt='Portrait'/>
  return (
    <div className='page'>
      <NavBar/>
      <div id='about-wrapper'>
        <div id='left-colA'>
          <div id="pic-wrapper" style={{width:`${w}px`, height:`${h}px`, margin:'2rem'}} >
              <AsyncImage     
                src={'https://firebasestorage.googleapis.com/v0/b/mywebsite-9635a.appspot.com/o/portrait-seattle1%20(1).jpeg?alt=media&token=61b87e65-fc44-4235-b7fe-efac59c481e5'}
                style={{width:`${w}px`, height:`${h}px`, borderRadius: '50%'}}
                loader={<div style={{width:`${w}px`, height:`${h}px`}} className={ "portrait-animation"} />}
              />
          </div>
        </div>
       <div id='right-colA'>
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
        
      </div>
      <Footer/>
    </div>
  )
}

/*<div id='pop-up'>
            <div id='title-bar'>
              <i></i>
            </div>
          </div>*/
