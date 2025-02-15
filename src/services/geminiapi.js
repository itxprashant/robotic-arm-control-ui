import axios from "axios";

const API_KEY = "AIzaSyArR9nc8pvBaDQ-_OVO8pCgtUA-072SNiw";
const BASE_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

export const generateResponse = async (prompt) => {
  try {
    const response = await axios.post(
      `${BASE_URL}?key=${API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error fetching response:", error);
    return "Error fetching response";
  }
};
