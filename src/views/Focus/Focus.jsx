import {React, useEffect, useState} from "react";
import { useNavigate,useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { storage,db } from "../../config/firebase-config";
import {collection, count, getDocs, orderBy, query, where} from "firebase/firestore";
import "./Focus.less";

export default function Focus({path,kind}) {
  // get id from path
  const { id } = useParams();
  console.log(id)
 
  //displays one enlarged image at a time with relevant details 
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [render, setRender] = useState(false);
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
        setImage(data[0])
        loadImage()
        console.log(data)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  function loadImage(){
    setTimeout(()=>{
      setRender(true);
    }, 200) 
  }

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
    if(image){
      //displays when data is loaded
      return(
        <div className='focus-wrapper'>
          <FontAwesomeIcon icon={faAngleLeft}  id="ptrR" onClick={()=>{handlePrev()}} />
          <FontAwesomeIcon icon={faX} onClick={()=>{handleExit()}} id='exitF'/>
          <img  id="focus-img" onClick={(e)=>{handleClick()}} src={image.url} alt="image"/>
          <FontAwesomeIcon icon={faAngleRight}  id="ptrL" onClick={()=>{handleNext()}} />
          <div id="desc">
            <p id="name">{image.name}</p>
            <p id="dot" style={{margin: '1rem'}}>•</p>
            <p id="medium"> {image.medium}</p>
          </div>
        </div>
      );
    }
    else{
      //before data is loaded
      return(
        <div className='focus-wrapper'>
          processing...
        </div>
      );
    }
  }
 
   return (
     <Image/>
   )
 }
