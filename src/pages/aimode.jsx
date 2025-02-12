import React from 'react';
import { useState, useEffect } from 'react'
import '../App.css'
import { generateResponse } from "../geminiapi";


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;



if (recognition) {
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";
}

function AIModePage() {
  const [voices, setVoices] = useState([]);
  
  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    // Some browsers require this event listener
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);

    // Select a female voice (if available)
    const femaleVoice = voices.find(voice => 
      voice.name.includes("Female") || voice.voiceURI.includes("Female")
    );

    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    synth.speak(utterance);
  };




  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!recognition) {
      console.error("Browser does not support speech recognition.");
      return;
    }

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setText(transcript);
    };

    recognition.onerror = (event) => console.error("Speech recognition error:", event.error);

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();
      // get the text and get the AI response
      generateResponse(text).then((response) => {
        // speak the response
        speak(response);

      });

    }

    return () => {
      recognition.stop(); // Stop when component unmounts
    };
  }, [isListening]); // Re-run when isListening changes


//   // text to speech
// const speak = (text) => {
//   const synth = window.speechSynthesis;
//   const utterance = new SpeechSynthesisUtterance(text);
//   synth.speak(utterance);
// };



const [inputText, setInputText] = useState("");



  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await generateResponse(prompt);
    setResponse(result);
    // speak the result using tts
    speak(result);
    console.log(result);
  };




return (
    <div style={{ 
      backgroundImage: 'url(../assets/robotic-background.jpg)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100vh', 
      width: '100vw', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
  <div className='App' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
    <div>
      <button onClick={() => setIsListening((prev) => !prev)}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <br />
      <p>{text}</p>
      <input style={{margin: '20px'}}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={() => speak(inputText)}>Speak</button>
    </div>
  </div>
  </div>
);

}




export default AIModePage;