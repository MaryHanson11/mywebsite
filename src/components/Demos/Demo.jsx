import React from "react";
import "./Demo.less"


//youtube provides base iframe code
export default function Demo({ embedId, width, height }) {
//display youtube demo for projects in CSPortfolio

return(
  <div className="demo">
    <iframe
      width={width}
      height={height}
      frameBorder="none"
      src={`https://www.youtube.com/embed/${embedId}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
  )
}

