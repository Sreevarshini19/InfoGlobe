import { useState } from "react";
import Homehead from "./homehead";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './translate.css';
function Translate() {
    
  const location = useLocation();
  const { email } = location.state || {};
    const [text, setText] = useState('');
    const [lang, setLang] = useState('ta');
    const [translatedText, setTranslatedText] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setText('');
        try {
            const response = await axios.post(
                'https://google-translate1.p.rapidapi.com/language/translate/v2',
                new URLSearchParams({
                    q: text,
                    target: lang,
                    source: 'en'
                }),
                {
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'X-RapidAPI-Key': 'b28641226fmshfb04f7e7d9ae708p19b512jsn119e67624875',
                        'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
                    }
                }
            );
            setTranslatedText(response.data.data.translations[0].translatedText);
        } catch (error) {
            console.error(error);
            setTranslatedText('Error translating text.');
        }
    };
    return (
        <>
            <Homehead/>
            <form className="translate" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter the text to be translated"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <select id="language-select" value={lang} onChange={(e) => setLang(e.target.value)}>
                    <option value="ta">Tamil</option>
                    <option value="hi">Hindi</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                    <option value="ru">Russian</option>
                </select>
                <button type="submit">Translate</button>
            </form>
            <div className="translated">
                {translatedText && <p>{translatedText}</p>}
            </div>
        </>
    );
}

export default Translate;
