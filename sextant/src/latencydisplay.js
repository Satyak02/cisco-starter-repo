import React, { useEffect, useState } from 'react';

function LatencyDisplay() {
  const [latency, setLatency] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:55455");

    socket.onopen = () => {
      console.log('✅ WebSocket connected to Pylon');
    };

    socket.onmessage = (event) => {
      // console.log("📦 Received raw data:", event.data);

      try {
        let sentTime;

        // Try JSON parsing first
        const parsed = JSON.parse(event.data);
        if (parsed?.data?.timestamp) {
          sentTime = parseInt(parsed.data.timestamp, 10);
        } else if (!isNaN(parseInt(event.data, 10))) {
          // Fall back to plain timestamp
          sentTime = parseInt(event.data, 10);
        }

        if (sentTime) {
          const now = Date.now();
          const calculatedLatency = now - sentTime;
          // console.log(`⏱️ Calculated latency: ${calculatedLatency} ms`);
          setLatency(calculatedLatency);
        } else {
          console.warn("⚠️ Unknown message format:", event.data);
        }
      } catch (err) {
        console.error("❌ Failed to parse message:", err);
      }
    };

    socket.onerror = (err) => {
      console.error("🚫 WebSocket error:", err);
    };

    socket.onclose = () => {
      console.log("🔌 WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="LatencyDisplay">
      <h3>Current Packet Latency:</h3>
      <p>{latency !== null ? `${latency} ms` : "Waiting for data..."}</p>
    </div>
  );
}

export default LatencyDisplay;
