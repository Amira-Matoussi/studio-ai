"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Typography,
  Input,
} from "@material-tailwind/react";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { useLanguage } from "@/contexts/LanguageContext";

const TRANSLATIONS = {
  en: {
    companyName: "AI Studio",
    online: "Online",
    initialMessage: "Hi! I'm here to help you build your perfect AI solution. What kind of product or service are you looking to create?",
    inputPlaceholder: "Describe your AI project needs...",
    errorMessage: "Sorry, I'm having trouble responding right now. Please try again.",
    technicalDifficulties: "I'm experiencing some technical difficulties. Please try again later or contact our support team.",
    processingError: "I'm sorry, I couldn't process that request."
  },
  fr: {
    companyName: "AI Studio",
    online: "En ligne",
    initialMessage: "Bonjour ! Je suis là pour vous aider à créer votre solution d'IA parfaite. Quel type de produit ou service souhaitez-vous créer ?",
    inputPlaceholder: "Décrivez vos besoins en projet IA...",
    errorMessage: "Désolé, j'ai du mal à répondre en ce moment. Veuillez réessayer.",
    technicalDifficulties: "Je rencontre des difficultés techniques. Veuillez réessayer plus tard ou contacter notre équipe d'assistance.",
    processingError: "Je suis désolé, je n'ai pas pu traiter cette demande."
  }
};

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export function ChatbotWidget() {
  const { language } = useLanguage();
  const t = TRANSLATIONS[language];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: t.initialMessage,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update initial message when language changes
  useEffect(() => {
    setMessages(prev => {
      const newMessages = [...prev];
      if (newMessages[0]?.role === "assistant") {
        newMessages[0] = {
          ...newMessages[0],
          content: t.initialMessage
        };
      }
      return newMessages;
    });
  }, [language, t.initialMessage]);

  const sendMessageToGroq = async (message: string): Promise<string> => {
    try {
      console.log("Sending message to API:", message);
      
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          messages: messages.slice(-5),
          language // Send current language to API
        }),
      });

      console.log("API Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      console.log("API Response data:", data);
      return data.message || t.processingError;
    } catch (error) {
      console.error("Error calling API:", error);
      return t.technicalDifficulties;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToGroq(userMessage.content);
      const assistantMessage: Message = {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: "assistant",
        content: t.errorMessage,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          /* @ts-ignore */
          <Button
            onClick={() => setIsOpen(true)}
            className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
            size="lg"
          >
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 animate-ping opacity-20"></div>
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)]">
            {/* @ts-ignore */}
          <Card className="shadow-2xl border-0">
            {/* @ts-ignore */}
            <CardBody className="p-0">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-t-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    {/* @ts-ignore */}
                    <Typography variant="h6" className="text-white font-semibold">
                      {t.companyName}
                    </Typography>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      {/* @ts-ignore */}
                      <Typography variant="small" className="text-white/80">
                        {t.online}
                      </Typography>
                    </div>
                  </div>
                </div>
                {/* @ts-ignore */}
                <Button
                  variant="text"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/10 p-2"
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "bg-white border shadow-sm"
                      }`}
                    >
                        {/* @ts-ignore */}
                      <Typography
                        variant="small"
                        className={message.role === "user" ? "text-white" : "text-gray-800"}
                      >
                        {message.content}
                      </Typography>
                      {/* @ts-ignore */}
                      <Typography
                        variant="small"
                        className={`text-xs mt-1 ${
                          message.role === "user" ? "text-white/70" : "text-gray-500"
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border shadow-sm p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-white rounded-b-xl">
                <div className="flex gap-2">
                    {/* @ts-ignore */}
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t.inputPlaceholder}
                    disabled={isLoading}
                    className="flex-1"
                    containerProps={{ className: "min-w-0" }}
                  />
                  {/* @ts-ignore */}
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 p-3"
                    size="sm"
                  >
                    <PaperAirplaneIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}