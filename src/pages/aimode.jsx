import React from 'react';
import { useState, useEffect } from 'react'
import '../App.css'


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

return (
    <div>
        <button onClick={() => setIsListening((prev) => !prev)}>
            {isListening ? "Stop Listening" : "Start Listening"}
        </button>
        {/* add a newline */}
        <br />

        {/* Example Usage */}
        <input 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={() => speak(inputText)}>Speak</button>
        <p>{text}</p>
    </div>
);

}




export default AIModePage;