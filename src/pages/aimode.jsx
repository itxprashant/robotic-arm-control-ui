import React from 'react';
import { useState, useEffect } from 'react'
import '../App.css'
import { generateResponse } from "../services/geminiapi";
import AnimatedBackground from '../components/AnimatedBackground';
import RoboticArmWebSocket from '../services/websocket';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Toast from '../components/Toast';

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
    ws.executeLuaFunction("moveJoint", [id, newValue]);
  };

  // setup speech recognition
  const [voices, setVoices] = useState([]);
  const [notification, setNotification] = useState(null);

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
    if (!text) return; // Add this line to prevent speaking on page load

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

  const ai_context = 
                `You are a command bot. When I say something like 'set to 360 the angle of joint 1', 
                you should return a JSON object in the format: {\"command\": \"joint\", \"id\": 1, \"angle\": 360}.
                 Return only this JSON object and nothing else.\n`;

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

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setNotification("Error: Could not process speech");
    };

    if (isListening) {
      recognition.start();
    } else {
      recognition.stop();

      generateResponse(ai_context + text).then((response) => {
        console.log("AI Response:", response);
        speak(response);

        try {
          const command = JSON.parse(response);
          console.log(command);
          handleChange(command.id, command.angle);
          setNotification(`Moving joint ${command.id} to ${command.angle} degrees`);
        } catch (error) {
          console.error("Failed to parse JSON response:", error);
          setNotification("Error: Invalid command format");
        }
      });
    }

    return () => {
      recognition.stop(); // Stop when component unmounts
    };
  }, [isListening]); // Re-run when isListening changes

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
        <div style={{ borderRadius: '50%', overflow: 'hidden', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px lightblue' }}>
          <iframe 
            src="/assets/ai_orb.html" 
            style={{ border: 'none', width: '200px', height: '200px' }}
            title="AI Orb Visualization"
            scrolling="no"
          ></iframe>
        </div>
        <div style={{ height: '100px' }}></div>
        <button class="btn-3 btn-border" style={{width: '200px'}} onClick={() => setIsListening((prev) => !prev)}>
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
        <p>{text}</p>
      </div>
      {notification && (
        <Toast
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </AnimatedBackground>
  );
}

export default AIModePage;
