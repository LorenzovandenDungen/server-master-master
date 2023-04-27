import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const fetchServers = async () => {
      const response = await fetch("http://localhost:3001/servers");
      const data = await response.json();
      setServers(data);
    };
    fetchServers();
  }, []);

  const updateServerStatus = async (ip) => {
    try {
      const response = await fetch(`http://localhost:3001/servers/${ip}`, {
        method: "PUT",
      });
      const data = await response.json();
      setServers(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Server Status Checker</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>IP Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {servers.map((server) => (
              <tr key={server.ip}>
                <td>{server.name}</td>
                <td>{server.ip}</td>
                <td>
                  <button
                    className={`status-${server.status}`}
                    onClick={() => updateServerStatus(server.ip)}
                  >
                    {server.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
