import React from 'react';
import { useState, useEffect } from 'react'
import '../App.css'


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");
    setText(transcript);
  };

  recognition.onerror = (event) => console.error("Speech recognition error", event.error);

  const startListening = () => {
    setIsListening(true);
    recognition.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  return { text, isListening, startListening, stopListening };
};

function AutomaticPage() {
  const { text, isListening, startListening, stopListening } = useSpeechRecognition();

  return (
    <div>
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p>{text}</p>
    </div>
  );
}



// function AutomaticPage(){
//     return (<p>This is the automatic page</p>);
// }

export default AutomaticPage;