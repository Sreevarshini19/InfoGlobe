import React ,{useContext}from "react";
import './home.css';
import Homehead from "./homehead.jsx";
import im from '../assets/image1.png';
function getCurrentDateTime() {
  const now = new Date();
  const day = now.getDate();
  const month = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
}

function Home({email}){
  
    const today = getCurrentDateTime();
    console.log(email);
    return (
      <>
      <Homehead email={email}/>
        <div className="main">
          <div className="topics"  style={{
    backgroundImage: `url(${im})`,
    
  }}>
     <div className="newspaper topic" >
              <a href='/headlines'><span>Headlines</span></a>
            </div>
            <div className="newspaper topic" >
              <a href='/newspaper_indian'><span>The Indian Express</span></a>
            </div>
            <div className="newspaper topic">
              <a href='/newspaper_economic' ><span>The Economic Times</span></a>
            </div>
            <div className="newspaper topic" >
              <a href='/newspaper_toi'><span>The Times of India</span></a>
            </div>
            <div className="newspaper topic" >
               <a href='/newspaper_nyt'><span>The New York Times</span></a>
             </div>
            <div className="newspaper topic" >
             <a href="/topic_politics"><span>Politics</span></a>
             </div>
             <div className="topic">
              <a href="/topic_tech"><span>Technology</span></a>
            </div>
             <div className="topic">
              <a href="/topic_movies"><span>Entertainment</span></a></div>
             <div className="topic">
              <a href="/topic_sports"><span>Sports</span></a></div>
              <div className="topic">
              <a href="/topic_health"><span>Health</span></a></div>
             <div className="topic">
              <a href="/country"><span>Country News</span></a></div>
           </div>
         </div>
        
      </>
    );
}
export default Home;