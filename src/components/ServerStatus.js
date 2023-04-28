import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServerStatus = () => {
  const [isServerUp, setIsServerUp] = useState(false);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await axios.get('http://example.com/api/healthcheck');
        setIsServerUp(response.status === 200);
      } catch (error) {
        setIsServerUp(false);
      }
    };

    checkServerStatus();
    setInterval(checkServerStatus, 30000); // check server status every 30 seconds
  }, []);

  return (
    <div>
      <h2>Server Status: {isServerUp ? 'UP' : 'DOWN'}</h2>
    </div>
  );
};

export default ServerStatus;