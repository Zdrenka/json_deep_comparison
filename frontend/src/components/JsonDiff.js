import React, { useState } from 'react';
import './JsonDiff.css'; // Correct path for CSS

function JsonDiff() {
  const [textArea1, setTextArea1] = useState('');
  const [textArea2, setTextArea2] = useState('');
  const [response1, setResponse1] = useState('');
  const [response2, setResponse2] = useState('');
  const [answer, setAnswer] = useState('');
  const [showResponses, setShowResponses] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { text1: textArea1, text2: textArea2 };

    try {
      const response = await fetch(`http://localhost:3000/api/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      const output = result.result;
      const sorted1 = result.sorted1;
      const sorted2 = result.sorted2;

      setAnswer(output === true ? "Both objects contain the same data" : "Both objects do not contain the same data");
      setResponse1(JSON.stringify(sorted1, null, 2));
      setResponse2(JSON.stringify(sorted2, null, 2));
      setShowResponses(true);
    } catch (error) {
      console.error('Error submitting data:', error);
      setResponse1('Failed to submit data.');
      setResponse2('Failed to submit data.');
      setShowResponses(true);
    }
  };

  const resetComparison = () => {
    setTextArea1('');
    setTextArea2('');
    setResponse1('');
    setResponse2('');
    setAnswer('');
    setShowResponses(false);
  };

  const loadSample = () => {
    setTextArea1('{ "user": { "id": 123456, "name": "Guy Everyman", "email": "guy@example.com", "isActive": true, "roles": [ { "roleId": 1, "roleName": "Admin", "permissions": [ "read", "write", "delete" ] } ] } }');
    setTextArea2('{ "user": { "name": "Guy Everyman", "isActive": true, "roles": [ { "permissions": [ "write", "delete", "read" ], "roleName": "Admin", "roleId": 1 } ], "email": "guy@example.com", "id": 123456 } }');
  };

  return (
        <div>
          <h1>JSON Diff (Deep Comparison)</h1>
          <form onSubmit={handleSubmit}>
            <h1>{answer}</h1>
            <div className="button-container">
              {!showResponses && (
                <>
                  <button type="button" onClick={loadSample}>
                    Load Sample
                  </button>
                  <button type="submit">JSON Compare</button>
                </>
              )}
              {showResponses && (
                <button type="button" onClick={resetComparison}>
                  New Comparison
                </button>
              )}
            </div>

            {!showResponses ? (
              // Input Textareas
              <div className="textarea-container">
                <div className="textarea-section">
                  <label className="textarea-label">Input 1</label>
                  <textarea
                    placeholder="Enter JSON 1"
                    value={textArea1}
                    onChange={(e) => setTextArea1(e.target.value)}
                  />
                </div>
                <div className="textarea-section">
                  <label className="textarea-label">Input 2</label>
                  <textarea
                    placeholder="Enter JSON 2"
                    value={textArea2}
                    onChange={(e) => setTextArea2(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              // Response Textareas
              <div className="textarea-container">
                <div className="textarea-section">
                  <label className="textarea-label">Result 1</label>
                  <textarea
                    className="textarea-readonly"
                    value={response1}
                    readOnly
                  />
                </div>
                <div className="textarea-section">
                  <label className="textarea-label">Result 2</label>
                  <textarea
                    className="textarea-readonly"
                    value={response2}
                    readOnly
                  />
                </div>
              </div>
            )}
          </form>
        </div>
  );
}

export default JsonDiff;