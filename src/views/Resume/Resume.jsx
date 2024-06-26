import React from "react"
import { useEffect, useState, useRef } from "react";
import NavBar from "../../components/NavBar/NavBar"
import Footer from "../../components/Footer/Footer";
import { storage } from "../../config/firebase-config";
import { getDownloadURL, ref } from "firebase/storage";
import "./Resume.less";


export default function Resume() {
  //displays resume pdf
  const [url, setUrl] = useState("");

  getDownloadURL(ref(storage, 'Hanson_Resume.pdf'))
  .then((url) => { 
    console.log(url);
    setUrl(url);
  })
  .catch((err)=>{
    console.log(err);
  });  


  return (
    <div style={{display:'flex', flexWrap: "wrap", width: "100vw", height: '100vh'}} className="page">
      <NavBar/>
      <div id="resume" style={{minHeight:"80vh", width: "100vw"}}>
        <iframe src={url} width="100%" height="100%"/>
      </div>
      <Footer/>
    </div>
    
    
    
  )
}