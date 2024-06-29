import React from "react"
import { useEffect, useState} from "react";
import './Gallery.less'
import { useNavigate } from "react-router-dom";
import { AsyncImage } from 'loadable-image'

// image transitions from https://www.npmjs.com/package/loadable-image
/*sources: 
  https://medium.com/@josh.j.pearson/tracking-window-size-in-react-redux-9559a597fc04
  https://medium.com/@danrschlosser/building-the-image-grid-from-google-photos-6a09e193c74a 
*/

//<img key={index}   onClick={(e)=>{handleFocus(image.id)}} style={{height: `${newHeight}px`, width: `${width}px`, cursor:'pointer'}}  src={image.url} alt='image' />
              
export default function Gallery({kind, data}) {
  //displays images depending on route mixed media or photography
  //row images have the same height and fit the window width
  //images grow and shrink depending on window size
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]); 
  const [images, setImages] = useState(null);
  const [path, setPath] = useState("");
  const [renderImgs, setRenderImages] = useState(false);
  const [focus, setFocus] = useState(false);
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
 
 
  function handleFocus(id) {
    //load data for navigating to focus route
    navigate(`/${path}/focus/${id}`)
  }

 

  function Images() {
    //displays images
    //set image height and width based on min ratio
    var minRatio =  windowSize[0] / 380; //window width / max desired height
    var cols = 0;
    var newHeight = 0;

    if(images){
      return(
        <div className='gallery-wrapper'>
          {images.map((image, index) => {
            //O(n^2)
            
            if(cols == 0){ //look ahead for row height
              var ratios = 0; //reset ratios
              for(var i = index; i < images.length; i++){
                ratios += images[i].ratio;
                cols++;
                if(ratios > minRatio){
                  newHeight = windowSize[0] / ratios;
                  break;
                }
              }
            }

            var width = newHeight * image.ratio;
            cols--; //decrement columns

            return(
              <div className={ "animation"}>
                <AsyncImage
                    key={index}
                    src={image.url}
                    style={{ width: width, height: newHeight, cursor: 'pointer'}}
                    loader={<div className={ "animation"} />}
                    onClick={()=> {handleFocus(image.id)}}
                    id='border-img'
                />
              </div>
            )
          })}
        </div>
      );
    }
  }

 
  function LoadImages(){
    if (data) {
      if(kind == 1){ //load images based on route
        setImages(data);
        setPath("mixed-media");
      }
      else{
        setImages(data);
        setPath("photography");
      }

      return (
        <Images/>
      );
    }
    else{
      return(
        //while data being fetched
        <div id="processing"/>
      );
    } 
  }

  
  return (
    <LoadImages/> 
  )
}