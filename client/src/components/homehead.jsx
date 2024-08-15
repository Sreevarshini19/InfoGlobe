
// import React, { useState } from "react";
// import './home.css';
// import searchicon from '../assets/search.webp';
// import './homehead.css';
// import axios from "axios";
// import {useNavigate} from 'react-router-dom';
// function getCurrentDateTime() {
//     const now = new Date();
  
//     const day = now.getDate();
//     const month = now.toLocaleString('default', { month: 'long' });
//     const year = now.getFullYear();
//     const hours = String(now.getHours()).padStart(2, '0');
//     const minutes = String(now.getMinutes()).padStart(2, '0');
//     const seconds = String(now.getSeconds()).padStart(2, '0');
  
//     return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds}`;
// }

// function Homehead({email}) {
//     const today = getCurrentDateTime();
//     const [text, setText] = useState('');
//     console.log(email);
//     const navigate = useNavigate(); // Initialize useNavigate

//     const handleSearch = async () => {
//         if (text.trim()) {
//             // Navigate to results page with query as state
//             navigate('/results', { state: { query: text } });
//         }
//     };

//     const search = (e) => {
//         if (e.key === "Enter") {
//             handleSearch();
//         }
//     };
//     return (
//         <>
//             <div className="heading">
//                 <div className="maininfo">
//                     <div className="title">
//                         <h1>InfoGlobe</h1>
//                     </div>
//                     <div className="date">{today}</div>
//                 </div>
                
//                 <div className="options">
//                   <a href='/home'>
//                     <div className="home"><span>Home</span></div></a>
//                     <div className="search option">
//                         <input 
//                             type="text" 
//                             name="search" 
//                             value={text} 
//                             onChange={(e) => setText(e.target.value)} 
//                             onKeyDown={search} // Handle Enter key press
//                         /> 
//                         <img 
//                             src={searchicon} 
//                             alt="Search" 
//                             onClick={handleSearch} // Handle button click
//                         />
//                     </div>
//                     <a href='/notes'>
//                         <div className="notes option">
//                             <span>Notes</span>
//                         </div>
//                     </a>
//                     <a href='/weather'>
//                         <div className="weather option">
//                             <span>Weather Info</span>
//                         </div>
//                     </a>
//                     <a href='/translate'>
//                     <div className="translate option">
//                         <span>Translate</span>
//                     </div>
//                     </a>
//                     <a href="/">
//                     <div className="logout option">
//                        <span>LogOut</span> 
//                     </div></a>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Homehead;
import React, { useState } from "react";
import './home.css';
import searchicon from '../assets/search.webp';
import './homehead.css';
import { useNavigate, Link } from 'react-router-dom';

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

function Homehead({ email }) {
    const today = getCurrentDateTime();
    const [text, setText] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (text.trim()) {
            navigate('/results', { state: { query: text } });
        }
    };

    const search = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <>
            <div className="heading">
                <div className="maininfo">
                    <div className="title">
                        <h1>InfoGlobe</h1>
                    </div>
                    <div className="date">{today}</div>
                </div>
                
                <div className="options">
                    <Link to='/home'  state={{ email }}>
                        <div className="home"><span>Home</span></div>
                    </Link>
                    <div className="search option">
                        <input 
                            type="text" 
                            name="search" 
                            value={text} 
                            onChange={(e) => setText(e.target.value)} 
                            onKeyDown={search}
                        /> 
                        <img 
                            src={searchicon} 
                            alt="Search" 
                            onClick={handleSearch}
                        />
                    </div>
                    <Link to='/notes' state={{ email }}>
                        <div className="notes option">
                            <span>Notes</span>
                        </div>
                    </Link>
                    <Link to='/weather' state={{ email }}>
                        <div className="weather option">
                            <span>Weather Info</span>
                        </div>
                    </Link>
                    <Link to='/translate' state={{ email }}>
                        <div className="translate option">
                            <span>Translate</span>
                        </div>
                    </Link>
                    <Link to="/">
                        <div className="logout option">
                            <span>LogOut</span>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Homehead;
