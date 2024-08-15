const axios = require('axios');
const qs = require('qs');

const translateText = async (text, targetLanguage) => {
  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': 'b28641226fmshfb04f7e7d9ae708p19b512jsn119e67624875',
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    data: qs.stringify({
      q: text,
      target: targetLanguage,
      source: 'en'
    })
  };

  try {
    const response = await axios.request(options);
    console.log(response.data.data.translations[0].translatedText);
  } catch (error) {
    console.error(error);
  }
};

// Translate to Tamil
translateText('Hello, how are you?', 'ta');

// Translate to Hindi
translateText('Hello, how are you?', 'hi');
