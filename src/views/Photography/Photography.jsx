import {React,useState, useEffect} from "react"
import NavBar from "../../components/NavBar/NavBar"
import Footer from "../../components/Footer/Footer";
import Gallery from "../../components/Gallery/Gallery";
import "../../style.less";
import { db } from "../../config/firebase-config";
import {collection, getDocs, orderBy, query} from "firebase/firestore";


export default function Photography() {
  //photography view gets json image data and sends it to gallery component
  const [fireData, setFireData] = useState(null);

  useEffect (() => {
    let processing = true;
    firebaseData(processing);
    return () => {
      processing = false;
    }
  }, [])

  const firebaseData = async(processing) => {
    const collectionRef = collection(db, 'photography')
    await getDocs(query(collectionRef, orderBy('id'))).then( res => {
      if (processing) {
        console.log(res)
        var data = res.docs.map((doc) => ({...doc.data(), docId: doc.id}))
        setFireData(data)
        console.log(data)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="page">
      <NavBar/>
      <Gallery kind={2} data={(fireData) ? fireData : null}/>
      <Footer/>
    </div>
  )
}