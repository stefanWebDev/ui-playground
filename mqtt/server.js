import mqtt from "mqtt";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const topics = ["room/plant"];

const client = mqtt.connect(`mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`, {
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS,
});

client.on("connect", () => {
  console.log("Connected to [MQTT] broker");
  topics.forEach((topic) => {
    client.subscribe(topic, (err) => {
      if (err) {
        console.error("[MQTT] Subscription error:", err);
      } else {
        console.log(`[MQTT] Subscribed to topic: ${topic}`);
      }
    });
  });
});

client.on("message", (topic, message) => {
  console.log(`[MQTT] Broker Message received on topic ${topic}:`, message.toString());

  topics.forEach((t) => {
    if (topic === t) {
      try {
        const data = JSON.parse(message.toString());
        fetch(`${process.env.SERVER_URL}/api/mqtt/${encodeURIComponent(t)}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.error(`Error parsing message for topic ${topic}:`, error);
      }
    }
  });
});
