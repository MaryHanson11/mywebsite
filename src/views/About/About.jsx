import React, { useEffect, useState, useRef } from "react";
import "./About.less";
import NavBar from "../../components/NavBar/NavBar";
import { AsyncImage } from 'loadable-image'
import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,  faCircleMinus, faCirclePlus, faCircleXmark} from "@fortawesome/free-solid-svg-icons";


export default function About() {
  //displays headshot and about desc
  const enlarge = useRef(true)
  const [z, setZ] = useState([3,2,1])
  const [heart1,setHeart1] = useState(false);
  const [heart2,setHeart2] = useState(false);
  const [heart3,setHeart3] = useState(false);
  const [shake1, setShake1] = useState(false);
  const [shake2, setShake2] = useState(false);
  const [shake3, setShake3] = useState(false);
  //handle portrait sizing on load
  function getWidth(){
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
    return w1
  }
  function getHeight(){
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
    return h1
  }
  
  
  const [w, setW] = useState(getWidth())
  const [h, setH] = useState(getHeight())

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
  //'https://firebasestorage.googleapis.com/v0/b/mywebsite-9635a.appspot.com/o/portrait-seattle1%20(1).jpeg?alt=media&token=61b87e65-fc44-4235-b7fe-efac59c481e5'
  
  const hidePopUp = (id) => {
    document.getElementById(id).style.visibility = 'hidden';
    show(id)
  }
  const enlargePopUp = (id) => {
    //MUST BE FIXED
    /*if (window.innerWidth <= 780){
      if (enlarge.current) {
        document.getElementById(id).style.width = '80vw';
        enlarge.current = false;
      }
      else{
        document.getElementById(id).style.width = '70vw';
        enlarge.current = true;
      }
      
    }
    else{
      if (enlarge.current) {
        document.getElementById(id).style.width = '35vw';
        enlarge.current = false;
      }
      else{
        document.getElementById(id).style.width = '30vw';
        enlarge.current = true;
      }
      
    }*/
  }

  function show(id){
    if (id == 1){
      setTimeout(() => {
        document.getElementById(id).style.visibility = 'visible';
        handleShake(id)
      }, 1000);
    }
    if (id == 2){
      setTimeout(() => {
        document.getElementById(id).style.visibility = 'visible';
        handleShake(id)
      }, 1000);
    }
    else if (id == 3){
      setTimeout(() => {
        document.getElementById(id).style.visibility = 'visible';
        handleShake(id)
      }, 1000);

      
    }
  }

  function handleShake(id){
    if (id == 1){
      setShake1(true)
      setTimeout(() => {
        setShake1(false)
      }, 250);

    }
    if (id == 2){
      setShake2(true)
      setTimeout(() => {
        setShake2(false)
      }, 250);

    }
    else if (id == 3){
      setShake3(true)
      setTimeout(() => {
        setShake3(false)
      }, 250);

    }
    
  }

  function toggleHeart(id){
    if (id == 1){
      if (!heart1) {
        setHeart1(true)
      }
      else{
        setHeart1(false)
      }
    }
    else if (id == 2){
      if (!heart2) {
        setHeart2(true)
      }
      else{
        setHeart2(false)
      }
    }
    else if (id == 3){
      if (!heart3) {
        setHeart3(true)
      }
      else{
        setHeart3(false)
      }
    }
    
  }

  function bringToFront(id){
    var res = [0,0,0]
    if (id == 1){
      res[0] = 3
      if(z[0] < z[1] && z[0] < z[2]){
        if(z[1] > z[2]){
          res[1] = 2
          res[2] = 1
        }
        else{
          res[2] = 2
          res[1] = 1
        }
      }
      else if (z[0] < z[1]){
        res[1] = 2
        res[2] = 1
      }
      else if (z[0] < z[2]){
        res[2] = 2
        res[1] = 1
      }
      else{
        res[1] = z[1]
        res[2] = z[2]
      }
    }
    else if (id == 2){
      res[1] = 3
      if(z[1] < z[0] && z[1] < z[2]){
        if(z[0] > z[2]){
          res[0] = 2
          res[2] = 1
        }
        else{
          res[2] = 2
          res[0] = 1
        }
      }
      else if (z[1] < z[0]){
        res[0] = 2
        res[2] = 1
      }
      else if (z[1] < z[2]){
        res[2] = 2
        res[0] = 1
      }
      else{
        res[2] = z[2]
        res[0] = z[0]
      }
    }
    else{
      res[2] = 3
      if(z[2] < z[0] && z[2] < z[1]){
        if(z[0] > z[1]){
          res[0] = 2
          res[1] = 1
        }
        else{
          res[1] = 2
          res[0] = 1
        }
      }
      else if (z[2] < z[0]){
        res[0] = 2
        res[1] = 1
      }
      else if (z[2] < z[1]){
        res[1] = 2
        res[0] = 1
      }
      else{
        res[1] = z[1]
        res[0] = z[0]
      }
    }

    setZ(res);
  }




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
        <div id='pop-ups' style={{ position:"relative"}}>
          <div className={(shake1) ? 'appear' : 'pop-up'} onClick={()=>{bringToFront(1)}} id='1' style={{zIndex: z[0], position:"absolute", top: '7px',left:'15%'}}>
              <div id='title-bar'>
                <FontAwesomeIcon icon={faCircleXmark} id='xt' onClick={()=>{hidePopUp(1)}}/>
                <FontAwesomeIcon icon={faCircleMinus} id='minus' onClick={()=>{hidePopUp(1)}}/>
                <FontAwesomeIcon icon={faCirclePlus} id='plus' onClick={()=>{enlargePopUp(1)}}/>
              </div>
              <div id='msg'>
                <p>Hi! My name is Mary Hanson.</p>
              </div>
              <div id='user-accept'>
                  <FontAwesomeIcon id='accept' className={(heart1)? 'heart': 'no-heart'} onClick={()=>{toggleHeart(1)}} icon={faHeart} />
              </div>
          </div>
          <div id='2' className={(shake2) ? 'appear' : 'pop-up'} onClick={()=>{bringToFront(2)}} style={{zIndex: z[1], position: 'absolute', left: '20px', top: '50%'}}>
              <div id='title-bar'>
                <FontAwesomeIcon icon={faCircleXmark} id='xt' onClick={()=>{hidePopUp(2)}}/>
                <FontAwesomeIcon icon={faCircleMinus} id='minus' onClick={()=>{hidePopUp(2)}}/>
                <FontAwesomeIcon icon={faCirclePlus} id='plus' onClick={()=>{enlargePopUp(2)}}/>
              </div>
              <div id='msg'>
                <p style={{padding:'5px'}}>As a fourth year Computer Science student at the University of Florida, I am an avid learner.</p>
              </div>
              <div id='user-accept'>
                  <FontAwesomeIcon id='accept' className={(heart2)? 'heart': 'no-heart'} onClick={()=>{toggleHeart(2)}} icon={faHeart} />
              </div>
          </div>
          <div className={(shake3) ? 'appear' : 'pop-up'} id='3' onClick={()=>{bringToFront(3)}} style={{zIndex: z[2], position: 'absolute', right: '20px', top: '30%'}}>
              <div id='title-bar'>
                <FontAwesomeIcon icon={faCircleXmark} id='xt' onClick={()=>{hidePopUp(3)}}/>
                <FontAwesomeIcon icon={faCircleMinus} id='minus' onClick={()=>{hidePopUp(3)}}/>
                <FontAwesomeIcon icon={faCirclePlus} id='plus' onClick={()=>{enlargePopUp(3)}}/>
              </div>
              <div id='msg'>
                <p style={{padding:'5px'}}>Through various personal projects and my position 
                as Web Master for Tea Literary Magazine, I have gained valuable creative and interpersonal skills.</p>
              </div>
              <div id='user-accept'>
                  <FontAwesomeIcon id='accept'  className={(heart3)? 'heart': 'no-heart'} onClick={()=>{toggleHeart(3)}} icon={faHeart} />
              </div>
          </div>
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

/*<div id='text-wrapper'>
            <p  className='about' id="text-box">Hello, my name is Mary Hanson. As a fourth year Computer Science student at the 
            University of Florida, I am an avid learner. Through various personal projects and my position 
            as Web Master for Tea Literary Magazine, I have gained valuable creative and interpersonal skills.</p>
            <div className='label'>Email</div>
            <p className='about-text' id="text-box">mary.hanson.dev@gmail.com</p>
            <div className='label'>Linkedin</div>
            <p className='about-text' id="text-box"><a href='https://www.linkedin.com/in/mary-hanson-79249b249/'>linkedin.com/in/mary-hanson</a></p>
            <div className='label'>Github</div>
            <p className='about-text' id="text-box"><a href='https://github.com/maryhanson11' >github.com/maryhanson11</a></p>
          </div>*/
