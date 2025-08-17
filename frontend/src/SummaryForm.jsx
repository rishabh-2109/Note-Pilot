import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL=import.meta.env.MODE==="development"?"http://localhost:5000/api/summary":"/api/summary";

const SummaryForm = ({ transcript, setSummary }) => {
  const [instruction, setInstruction] = useState('');
  const [loading, setLoading] = useState(false);
  const [editableSummary, setEditableSummary] = useState(''); // <-- new state

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post({BASE_URL}, { transcript, instruction });
      setEditableSummary(res.data.summary); // <-- set editable
      setSummary(res.data.summary);
    } catch (err) {
      console.error('Generate summary error:', err.response?.data || err.message);
    }
    setLoading(false);
  };

  // Update summary whenever user edits
  const handleEdit = (e) => {
    setEditableSummary(e.target.value);
    setSummary(e.target.value);
  };

  return (
    <div className="mb-4">
      <textarea
        rows={3}
        placeholder="Custom instruction (optional)"
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        className="w-full border p-1 mb-2"
      />
      <button onClick={handleGenerate} className="p-1 bg-indigo-500 text-white rounded mb-2">
        {loading ? 'Generating...' : 'Generate Summary'}
      </button>

      {editableSummary && (
        <div>
          <h2 className="font-semibold mt-2">Editable Summary:</h2>
          <textarea
            rows={8}
            value={editableSummary}
            onChange={handleEdit}
            className="w-full border p-2 mt-1"
          />
        </div>
      )}
    </div>
  );
};

export default SummaryForm;
