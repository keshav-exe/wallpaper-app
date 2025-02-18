import { useEffect, useState } from "react";

export function useSafariCheck() {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsSafari(/^((?!chrome|android).)*safari/i.test(userAgent));
  }, []);

  return isSafari;
}
