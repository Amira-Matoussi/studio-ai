"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type TranslationNamespace = "common";

interface TranslationData {
  [key: string]: string;
}

export function useTranslation(namespace: TranslationNamespace = "common") {
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState<string>("en");
  const [translations, setTranslations] = useState<TranslationData>({});

  // Get current locale from URL or localStorage
  useEffect(() => {
    const pathname = window.location.pathname;
    const locale = pathname.split("/")[1];
    
    if (["en", "fr", "ar"].includes(locale)) {
      setCurrentLocale(locale);
    } else {
      // Default to English if no locale in URL
      setCurrentLocale("en");
    }
  }, []);

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${currentLocale}/${namespace}.json`);
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error("Failed to load translations:", error);
        // Fallback to English
        if (currentLocale !== "en") {
          const fallbackResponse = await fetch(`/locales/en/${namespace}.json`);
          const fallbackData = await fallbackResponse.json();
          setTranslations(fallbackData);
        }
      }
    };

    loadTranslations();
  }, [currentLocale, namespace]);

  const t = (key: string): string => {
    return translations[key] || key;
  };

  const changeLanguage = (newLocale: string) => {
    const pathname = window.location.pathname;
    const segments = pathname.split("/");
    
    // Remove current locale if exists
    if (["en", "fr", "ar"].includes(segments[1])) {
      segments.splice(1, 1);
    }
    
    // Add new locale
    const newPath = `/${newLocale}${segments.join("/") || ""}`;
    router.push(newPath);
    setCurrentLocale(newLocale);
  };

  return {
    t,
    i18n: {
      language: currentLocale,
      changeLanguage,
    },
  };
}