import React, { useEffect, useState } from "react";

export default function InternetConnectionTestApp() {
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
    <div style={{ padding: 40, fontFamily: 'Arial', textAlign: 'center' }}>
      <h1>Internet Connection Test</h1>
      {isOnline === null && <p>Checking connection...</p>}
      {isOnline === true && <p style={{ color: "green", fontWeight: 'bold' }}>Internet is working!</p>}
      {isOnline === false && <p style={{ color: "red", fontWeight: 'bold' }}>No internet access from app!</p>}
      <p style={{ marginTop: 30, color: '#555' }}>
        This is a standalone test app to check if your app has internet permission and connectivity.
      </p>
    </div>
  );
} 