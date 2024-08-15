import React, { useState ,useEffect} from 'react';
import Loginsignup from './components/loginsignup.jsx';
import Home from './components/home.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Headlines from './components/headlines.jsx';
import Weather from './components/weather.jsx';
import Newspaper from './components/newspaper.jsx';
import Topics from './components/topics.jsx';
import Country from './components/country.jsx';
import Translate from './components/translate.jsx';
import Notes from './components/notes.jsx';
import ResultsPage from './components/resultsPage.jsx';

function App() {
  const [email,setEmail]=useState(null);
  
  return (<>
    <Router>

      <Routes>
        <Route path="/" element={<Loginsignup email={email} setEmail={setEmail}/>} /> 
        <Route path="/notes" element={<Notes email={email} />} />
       
        <Route path="/home" element={<Home  email={email}/>} />
        <Route path="/headlines" element={<Headlines email={email} />} />
        <Route path="/weather" element={<Weather email={email} />} />
        <Route path="/newspaper_indian" element={<Newspaper type="Indian Express" />} />
        <Route path="/newspaper_toi" element={<Newspaper type="The Times of India" />} />
        <Route path="/newspaper_nyt" element={<Newspaper type="The New York Times" />} />
        <Route path="/newspaper_economic" element={<Newspaper type="The Economic Times" />} />
        <Route path="/topic_sports" element={<Topics topic="Sports" />} />
        <Route path="/topic_politics" element={<Topics topic="Politics" />} />
        <Route path="/topic_tech" element={<Topics topic="Technology" />} />
        <Route path="/topic_movies" element={<Topics topic="Movies" />} />
        <Route path="/topic_health" element={<Topics topic="Health" />} />
        <Route path="/country" element={<Country />} />
        <Route path="/translate" element={<Translate email={email} />} />
        <Route path="/results" element={<ResultsPage email={email}/>} />
      </Routes>
    </Router></>
  );
}

export default App;