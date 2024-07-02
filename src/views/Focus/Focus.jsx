import {React, useEffect, useState} from "react";
import { useNavigate,useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { db } from "../../config/firebase-config";
import { AsyncImage } from "loadable-image";
import {collection, count, getDocs, orderBy, query, where} from "firebase/firestore";
import "./Focus.less";

export default function Focus({path,kind}) {
  // get id from path
  //const [processing, setProcessing] = useState(true)

  const { id } = useParams();
  console.log(id)
 
  //displays one enlarged image at a time with relevant details 
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);
  const [width, setWidth] = useState('auto')
  const [height, setHeight] = useState('auto')

  const [ID, setID] = useState(id);

  console.log(ID)

  // get doc image from firebase
  useEffect (() => {
    console.log('In useEffect...')
    let processing = true;
    firebaseData(processing);
    return () => {
      processing = false;
    }
  },[ID])

  const firebaseData = async(processing) => {
    const collectionRef = collection(db, String(path))
    
    await getDocs(query(collectionRef, where('id', '==', Number(ID)))).then( res => {
      if (processing) {
        console.log(res)
        var data = res.docs.map((doc) => ({...doc.data(), docId: doc.id}))
        var img = data[0];

        var topH = window.innerHeight * 0.94;
        var topW = window.innerWidth * 1;
        console.log(topH)

        var newW = topH * img.ratio;
        var newH = topH;
        if (newW >= topW){
          newW = topW;
          newH = topW / img.ratio;
        }
        setWidth(newW);
        setHeight(newH);

        setImage(data[0])
        
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => { 
    //code for tracking window size from medium article cited above
    const handleWindowResize = () => {
      var topH = window.innerHeight * 0.95;
      var topW = window.innerWidth * 1;

      if(image){
        var newW = topH * image.ratio;
        var newH = topH;
        if (newW >= topW){
          newW = topW;
          newH = topW / image.ratio;
        }
        setWidth(newW);
        setHeight(newH);
     } 
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [image]);

  function getSize(){
    if (kind == 0){
      return 15
    }
    else {
      return 14
    }
  }
 
  function handleExit(){
    //navigate back to past route
    navigate(`/${path}`)
  }
 
  function handlePrev(){
    //display previous image 
    var curr = Number(ID)
    var prev = curr - 1;
    if(prev < 0){
      prev = getSize() - 1;
    }
    setID(prev)
    navigate(`/${path}/focus/${prev}`)
    
  }
 
  function handleNext(){
    //display next image
    var curr = Number(ID)
    var next = curr + 1;
    var total = getSize()
    if(next >= total){
      next = 0;
    }
    setID(next)
    navigate(`/${path}/focus/${next}`)
  }

  function Image(){
    if(image && image.id == id){
      //displays when data is loaded
      return(
        <div className='focus-wrapper'>
          <div id='left-col' style={{zIndex:'1',position:'relative'}}>
            <div id='exit'>
              <FontAwesomeIcon icon={faX} onClick={()=>{handleExit()}} id='exitF'/>
            </div>
            <div id='prev'>
              <FontAwesomeIcon icon={faAngleLeft}  id="ptrR" onClick={()=>{handlePrev()}} />
            </div>
            
          </div>
          <div id='mid-col'>
            {(id == ID) ? 
              <AsyncImage
                src={image.url}
                style={{height:height,width:width}}
                loader={<div id='focus-img' color='black' />}
                onClick={(e)=>{handleClick()}}
                id="focus-img"
              />
              : 
              <></>
            }
            <p id="desc">{image.name} • <span style={{fontStyle:'italic'}}>{image.medium}</span></p>
          </div>
          <div id='right-col'>
            <FontAwesomeIcon icon={faAngleRight}  id="ptrL" onClick={()=>{handleNext()}} />
          </div>
          
          
        </div>
      );
    }
    else{
      //before data is loaded
      return(
        <div className='focus-wrapper'/>
      );
    }
  }
 
   return (
     <Image/>
   )
 }

   /*useEffect(()=>{
    const showIcons = () => {
      document.getElementById('exit').style.color = ''

    }
    window.addEventListener('mousemove',showIcons)
    return () =>{
      window.removeEventListener('mousemove',showIcons)
      
    }
  })*/
