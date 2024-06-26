import './App.less'
import { Routes, Route } from 'react-router-dom'
import About from './views/About/About'
import CSPortfolio from './views/CSPortfolio/CSPortfolio'
import MixedMedia from './views/MixedMedia/MixedMedia'
import Photography from './views/Photography/Photography'
import "./index.css";
import Focus from './views/Focus/Focus'
import Resume from './views/Resume/Resume'



function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<About/>}/> 
        <Route path="/cs-portfolio" element={<CSPortfolio/>}/>
        <Route path="/mixed-media" element={<MixedMedia />}/>
        <Route path="/photography" element={<Photography />}/>
        <Route path="/mixed-media/focus/:id" element={<Focus path={"mixed-media"} kind={0}/>}/>
        <Route path="/photography/focus/:id" element={<Focus path={"photography"} kind={1}/>}/>
        <Route path="/resume" element={<Resume/>}/>
      </Routes>  
    </div>
  )
}

export default App
