import { useState, useEffect } from "react";
import ChatBot from "react-simple-chatbot";
import axios from "axios";
import { ThemeProvider } from "styled-components";

// Theme styling for chatbot
const theme = {
  background: "#f5f8fb",
  headerBgColor: "#007bff",
  headerFontColor: "#fff",
  headerFontSize: "20px",
  botBubbleColor: "#007bff",
  botFontColor: "#fff",
  userBubbleColor: "#f5f8fb",
  userFontColor: "#000",
};

// Function to fetch product comparison from backend
const fetchComparison = async (query) => {
  try {
    const { data } = await axios.post("http://localhost:5000/api/chat-bot/compare", { query });

    return `
      🛒 **Unimarket:** ${data.unimarket?.name || "Not found"} - ₹${data.unimarket?.price || "N/A"}
      🏬 **Flipkart:** ${data.flipkart?.name || "Not found"} - ₹${data.flipkart?.price || "N/A"}
      🛍️ **Amazon:** ${data.amazon?.name || "Not found"} - ₹${data.amazon?.price || "N/A"}
    `;
  } catch (error) {
    return "⚠️ Error fetching product data.";
  }
};

// Custom component for fetching comparison dynamically
const FetchComparison = (props) => {
  const { steps } = props; // Get chatbot steps
  const [response, setResponse] = useState("Fetching data...");

  useEffect(() => {
    fetchComparison(steps.query.value).then(setResponse);
  }, [steps.query.value]);

  return <div>{response}</div>;
};

// Define chatbot steps **AFTER** defining FetchComparison
const steps = [
  { id: "1", message: "Welcome to Unimarket! What product do you want to compare?", trigger: "query" },
  { id: "query", user: true, trigger: "fetchData" },
  { id: "fetchData", component: <FetchComparison />, asMessage: true, trigger: "askAgain" },
  { id: "askAgain", message: "Do you want to compare another product?", trigger: "query" },
];

// Main Chatbot component
const Chatbot = () => {
  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} floating={true} />
    </ThemeProvider>
  );
};

export default Chatbot;
