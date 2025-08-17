import { useState } from "react";
import axios from "axios";
import EmailForm from "./EmailForm.jsx";

export default function UploadForm() {
  const [transcript, setTranscript] = useState("");
  const [instruction, setInstruction] = useState("");
  const [summary, setSummary] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Generate summary (either from uploaded file or manual text)
  const handleGenerate = async (e) => {
    e.preventDefault();

    let finalTranscript = transcript;

    // If a file is selected, upload it first
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const uploadRes = await axios.post(
          "http://localhost:5000/api/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        finalTranscript = uploadRes.data.transcript;
        setTranscript(finalTranscript);
      } catch (err) {
        console.error("File upload error:", err.response?.data || err.message);
        return;
      }
    }

    if (!finalTranscript.trim()) {
      return alert("Please provide a transcript (upload a file or paste text).");
    }

    // Generate summary
    try {
      const response = await axios.post("http://localhost:5000/api/summary", {
        transcript: finalTranscript,
        instruction,
      });
      setSummary(response.data.summary);
      setShowEmailForm(true);
    } catch (err) {
      console.error("Error generating summary:", err.response?.data || err.message);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">
        AI Meeting Notes Summarizer
      </h1>

      <form onSubmit={handleGenerate} className="flex flex-col gap-2">
        <input type="file" accept=".txt" onChange={handleFileChange} />
        <textarea
          placeholder="Or paste transcript here"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          className="border p-2"
          rows={6}
        />
        <input
          type="text"
          placeholder="Instruction (optional)"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Generate Summary
        </button>
      </form>

      {summary && (
        <div className="mt-4">
          <h2 className="font-bold">Summary</h2>
          <textarea
            className="border p-2 w-full"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={6}
          />
        </div>
      )}

      {showEmailForm && <EmailForm summary={summary} />}
    </div>
  );
}


// import { useState } from "react";
// import axios from "axios";
// import EmailForm from "./EmailForm.jsx";

// export default function UploadForm() {
//   const [transcript, setTranscript] = useState("");
//   const [instruction, setInstruction] = useState("");
//   const [summary, setSummary] = useState("");
//   const [showEmailForm, setShowEmailForm] = useState(false);
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   // Generate summary
//   const handleGenerate = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     let finalTranscript = transcript;

//     // If a file is selected, upload it first
//     if (file) {
//       const formData = new FormData();
//       formData.append("file", file);

//       try {
//         const uploadRes = await axios.post(
//           "http://localhost:5000/api/upload",
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );

//         // Backend returns { content: "..." }
//         finalTranscript = uploadRes.data.content || "";
//         setTranscript(finalTranscript);
//       } catch (err) {
//         console.error("File upload error:", err.response?.data || err.message);
//         alert("File upload failed. Please try again.");
//         setLoading(false);
//         return;
//       }
//     }

//     if (!finalTranscript.trim()) {
//       alert("Please provide a transcript (upload a file or paste text).");
//       setLoading(false);
//       return;
//     }

//     // Generate summary
//     try {
//       const response = await axios.post("http://localhost:5000/api/summary", {
//         transcript: finalTranscript,
//         instruction,
//       });
//       setSummary(response.data.summary || "");
//       setShowEmailForm(true);
//     } catch (err) {
//       console.error("Error generating summary:", err.response?.data || err.message);
//       alert("Failed to generate summary. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 max-w-xl mx-auto">
//       <h1 className="text-xl font-bold mb-4 text-center">
//         AI Meeting Notes Summarizer
//       </h1>

//       <form onSubmit={handleGenerate} className="flex flex-col gap-2">
//         <input
//           type="file"
//           accept=".txt"
//           onChange={handleFileChange}
//         />
//         <textarea
//           placeholder="Or paste transcript here"
//           value={transcript}
//           onChange={(e) => setTranscript(e.target.value)}
//           className="border p-2"
//           rows={6}
//         />
//         <input
//           type="text"
//           placeholder="Instruction (optional)"
//           value={instruction}
//           onChange={(e) => setInstruction(e.target.value)}
//           className="border p-2"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 disabled:opacity-50"
//           disabled={loading}
//         >
//           {loading ? "Processing..." : "Generate Summary"}
//         </button>
//       </form>

//       {summary && (
//         <div className="mt-4">
//           <h2 className="font-bold">Summary</h2>
//           <textarea
//             className="border p-2 w-full"
//             value={summary}
//             onChange={(e) => setSummary(e.target.value)}
//             rows={6}
//           />
//         </div>
//       )}

//       {showEmailForm && <EmailForm summary={summary} />}
//     </div>
//   );
// }
