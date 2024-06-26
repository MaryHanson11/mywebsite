import {NavLink, useNavigate} from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import './NavBar.less'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
//https://medium.com/coding-beauty/react-get-window-width-height-d47529f56e2c#:~:text=To%20get%20the%20width%20and,innerWidth%20and%20innerHeight%20properties%20respectively.&text=Displaying%20the%20width%20and%20height,scrollbar%2C%20if%20it%20is%20present.

export default function NavBar () {
  //handles navigation for each page
  const [renderNav, setRenderNav] = useState(false);
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]); 
  const navigate = useNavigate();

  useEffect(() => { 
    //code for tracking window size from medium article cited above
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function toggleVisibility(){
    var res = document.getElementById("res-label");
    res.classList.toggle("res-label-gray");
  }

  function handleDropDown (selected){
    if(selected){
      setRenderNav(true);
    }
    else{
      setRenderNav(false);
    }
  }
  
  const navItems = [
    {id: '1', route: '/', content: 'About'},
    {id: '2', route: '/cs-portfolio', content: 'CS Portfolio'},
    {id: '3', route: '/mixed-media', content: 'Mixed Media'},
    {id: '4', route: '/photography', content: 'Photography'}
  ]

  function Navigation () {
    //handles the appearance and visibility of the naviagtion tabs
    if(windowSize[0] < 780){
      if(renderNav){
        return(
          <div>
          <FontAwesomeIcon icon={faX} onClick={()=>{handleDropDown(false)}} className='menu-icon' id='x'/>
          <ul className='menu'>
            {navItems.map(item => { return (
              <li key= {item.id} className='menu-item'>
                <NavLink to={item.route}
                  className={({ isActive }) =>
                  isActive ? 'active': 'inactive'}
                >
                  {item.content}
                </NavLink>
              </li>
            )})}
          </ul>
          </div>
        );
            }
      else{
        return(
          <FontAwesomeIcon icon={faBars} onClick={()=>{handleDropDown(true)}} className='menu-icon'/>
        );
      }

    }
    else{
      return(
        <ul className='menu'>
          {navItems.map(item => { return (
            <li key= {item.id} className='menu-item'>
              <NavLink to={item.route}
                className={({ isActive }) =>
                isActive ? 'active': 'inactive'}
              >
                {item.content}
              </NavLink>
            </li>
          )})}
        </ul>
      
      );
    }
    
  }

  function viewResume(){
    navigate("/resume");
  }



  return(
    <div style={{display:'inline-block', width:'100vw'}}>
    <nav id="nav-container">
      <Navigation/>
      <div className='resume-wrapper'>
        <FontAwesomeIcon icon={faFileLines} onClick={()=>{viewResume()}} onMouseEnter={()=>{toggleVisibility()}} onMouseLeave={()=>{toggleVisibility()}} className='resume-icon'/>
        <div id='res-label'>Resume</div>
      </div>
    </nav>
    </div>
  );
};
