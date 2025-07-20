import { useEffect, useState } from "react";

export default function InternetTest() {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const res = await fetch("https://www.google.com/favicon.ico", { method: "HEAD" });
        setIsOnline(res.ok);
      } catch {
        setIsOnline(false);
      }
    };
    checkConnection();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Internet Test</h2>
      {isOnline === null && <p>Checking...</p>}
      {isOnline === true && <p style={{ color: "green" }}>Internet is working!</p>}
      {isOnline === false && <p style={{ color: "red" }}>No internet access from app!</p>}
    </div>
  );
} 