import { useEffect, useState } from "react";

export function useSafariCheck() {
  const [isSafari, setIsSafari] = useState(false);
  const [shouldShowPWAPrompt, setShouldShowPWAPrompt] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIosSafari =
      /iphone|ipad|ipod/.test(userAgent) &&
      /safari/.test(userAgent) &&
      !/crios/.test(userAgent);
    setIsSafari(/^((?!chrome|android).)*safari/i.test(userAgent));

    // Check if user has already dismissed the prompt
    const hasUserDismissedPrompt = localStorage.getItem("pwa-prompt-dismissed");

    // Only show prompt for iOS Safari and if not already dismissed
    if (
      isIosSafari &&
      !hasUserDismissedPrompt &&
      !window.matchMedia("(display-mode: standalone)").matches
    ) {
      setShouldShowPWAPrompt(true);
    }
  }, []);

  const dismissPWAPrompt = () => {
    localStorage.setItem("pwa-prompt-dismissed", "true");
    setShouldShowPWAPrompt(false);
  };

  return { isSafari, shouldShowPWAPrompt, dismissPWAPrompt };
}
