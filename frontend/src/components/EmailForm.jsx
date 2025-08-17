import { useState } from "react";
import axios from "axios";

export default function EmailForm({ summary }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("Meeting Summary");
  const [message, setMessage] = useState(summary);

  const handleSend = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/email", { to, subject, text: message });
      alert(response.data.message);
    } catch (err) {
      console.error("Send email error:", err.response?.data || err.message);
      alert("Failed to send email");
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-2">
      <input
        type="email"
        placeholder="Recipient email"
        value={to}
        onChange={e => setTo(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="text"
        placeholder="Email subject"
        value={subject}
        onChange={e => setSubject(e.target.value)}
        className="border p-2"
      />
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="border p-2"
        rows={4}
      />
      <button onClick={handleSend} className="bg-green-500 text-white p-2">Send Email</button>
    </div>
  );
}
