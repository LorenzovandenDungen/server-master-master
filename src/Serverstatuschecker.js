import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_IP_ADDRESSES = ['1.2.3.4', '5.6.7.8', '9.10.11.12'];

const ServerStatusChecker = () => {
  const [serverStatuses, setServerStatuses] = useState([]);

  useEffect(() => {
    const fetchServerStatuses = async () => {
      const statusPromises = SERVER_IP_ADDRESSES.map(ip =>
        axios.get(`http://${ip}`)
          .then(() => true)
          .catch(() => false)
      );
      const statuses = await Promise.all(statusPromises);
      setServerStatuses(statuses);
    };
    fetchServerStatuses();
  }, []);

  return (
    <ul>
      {SERVER_IP_ADDRESSES.map((ip, index) => (
        <li key={ip}>
          {ip} {serverStatuses[index] ? <span style={{color: 'green'}}>●</span> : <span style={{color: 'red'}}>●</span>}
        </li>
      ))}
    </ul>
  );
};

export default ServerStatusChecker;
