import React, { useState } from 'react';
import './loginsignup.css';
import mailicon from '../assets/email.jpg';
import passicon from '../assets/password.jpg';
import usericon from '../assets/user.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const Loginsignup = ({email,setEmail }) => {
  const navigate = useNavigate();
  const today = getCurrentDateTime();
  const [act, setAction] = useState("SignUp");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const handleActionChange = (newAction) => {
    setAction(newAction);
    setMessage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    try {
      console.log(`Sending ${act.toLowerCase()} request with data:`, data);
      const response = await axios.post(`http://localhost:3000/${act.toLowerCase()}`, data);
      const mail = response.data.email;
      setEmail(mail);
      setMessage(response.data.message);
      setMessageType("success");
      navigate('/home');
    } catch (error) {
      console.error(`Error in ${act.toLowerCase()} request:`, error);
      setMessage(error.response?.data?.error || error.message);
      setMessageType("error");
    }
  };

  return (
    <>
      <div className="heading">
        <div className="maininfo">
          <div className="title"><h1>InfoGlobe</h1></div>
          <div className="date">{today}</div>
        </div>
      </div>
      <div className="out">
        <div className='container'>
          <div className="header">
            <div style={{ fontSize: "xx-larger", fontWeight: "bolder" }} className={act}>{act}</div>
            <div className="line"></div>
          </div>
          <div className="submit">
            <div className={act === "Login" ? "submitb" : "submitg"} onClick={() => handleActionChange("Login")}>Login</div>
            <div className={act === "SignUp" ? "submitb" : "submitg"} onClick={() => handleActionChange("SignUp")}>Sign up</div>
          </div>
          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              {act === "Login" ? null : (
                <div className="input">
                  <img src={usericon} alt="user" />
                  <input type="text" name="username" placeholder='Username' required />
                </div>
              )}
              <div className="input">
                <img src={mailicon} alt="email" />
                <input type="email" name="email" placeholder='Email' required />
              </div>
              <div className="input">
                <img src={passicon} alt="password" id="passwordicon" />
                <input type="password" name="password" placeholder='Password' required />
              </div>
            </div>
            <button className='enter' type="submit">Enter</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Loginsignup;