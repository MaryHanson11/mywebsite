import React from "react"
import NavBar from "../../components/NavBar/NavBar"
import Demo from "../../components/Demos/Demo"
import "./CSPortfolio.less"
import Footer from "../../components/Footer/Footer"

export default function CSPortfolio() {
  //displays project details for personal CS projects

  return (
    <div id="cs-wrapper" >
      <NavBar/>
      <div className="projects-wrapper">
        <div className="project" style={{flexDirection:"column", width:'fit-content'}}>
          <div className="text">
            <p className="title" id="text-box" >SameSamp</p>
            <p className="desc"  id="text-box" style={{maxWidth:'560px', fontSize: "18px"}}> My team and I used React, Flask, Python, and more to develop 
            this web application to visualize data on sampled songs • To make meaniful connections between sampled songs, we used an undirected adjaceny list graph • We won 
            a best project nomination in our Data Structures and Algorithms class that had more than 200 students</p>
          </div>
          <Demo embedId={"ZmxhAfImc4M?si=k2mLTwevk-UD622i"} width={"560"} height={"315"} />
        </div>
        <div className="project" style={{flexDirection:"column", width:'fit-content'}}>
          <div className="text">
            <p className="title" id="text-box" >JobHunter</p>
            <p className="desc"  id="text-box" style={{maxWidth:'560px', fontSize: "18px"}}>I created this iOS full-stack mobile application to expedite the 
            job application process with a team of four members • We made calls 
            to a API with job offerings for display and a Parse backend to store and authenticate users</p>
          </div>
          <Demo embedId={"v5Ky6M_2av8?si=Nz0AkftWijpXGZ6S"} width={"560"} height={"315"}  />
        </div>
      </div>
      <Footer/>
    </div>
  )
}