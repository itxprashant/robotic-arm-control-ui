import React from 'react';
import { useState, useEffect } from 'react'
import '../App.css'
import { generateResponse } from "../services/geminiapi";
import AnimatedBackground from '../components/AnimatedBackground';
import RoboticArmWebSocket from '../services/websocket';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;



if (recognition) {
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "en-US";
}

function AIModePage() {


  // get websocket instance
  const [value, setValue] = useState(0);
  const ws = RoboticArmWebSocket.getInstance();

  const handleChange = (id, newValue) => {
    setValue(newValue);
    ws.sendJointCommand(id, newValue);
  };

  // setup speech recognition
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

    // synth.speak(utterance);
  };




  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);


  const ai_context = "You are a command bot. When I say something like 'set to 360 the angle of joint 1', you should return a JSON object in the format: {\"command\": \"joint\", \"id\": 1, \"angle\": 360}. Return only this JSON object and nothing else.\n";
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
    //   generateResponse(text).then((response) => {
    //     // speak the response
    //     speak(response);
    //   });



      generateResponse(ai_context + text).then((response) => {
        // Log the response for debugging
        console.log("AI Response:", response);

        // speak the response
        speak(response);

        // parse the response and send the command via WebSocket
        try {
          const command = JSON.parse(response);
          console.log(command);
          handleChange(command.id, command.angle);
        } catch (error) {
          console.error("Failed to parse JSON response:", error);
        }
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
  <AnimatedBackground>
  <NavBar />
  <div class='app-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
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
  </AnimatedBackground>
);

}




export default AIModePage;