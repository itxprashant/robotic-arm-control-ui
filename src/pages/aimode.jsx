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

  return (
    <div>
      <button onClick={() => setIsListening((prev) => !prev)}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p>{text}</p>
    </div>
  );
}



export default AIModePage;