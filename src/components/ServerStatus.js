import React, { useState } from "react";
import axios from "axios";

function ServerStatusChecker() {
  const [status, setStatus] = useState(null);

  const checkStatus = () => {
    axios.get("https://your-server-url.com")
      .then(response => {
        setStatus("Server is up and running!");
      })
      .catch(error => {
        setStatus("Server is down :(");
      });
  };

  // Poll server status every 10 seconds
  setInterval(checkStatus, 10000);

  return (
    <div>
      <h1>Server Status Checker</h1>
      <button onClick={checkStatus}>Check Status</button>
      {status && <p>{status}</p>}
    </div>
  );
}

export default ServerStatusChecker;