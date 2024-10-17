import React, { useState } from 'react';

function JsonValidator() {
  const [jsonInput, setJsonInput] = useState('');

  const isValidJson = (jsonString) => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <div>
    <h1>{isValidJson(jsonInput) ? 'Valid JSON' : 'Invalid JSON'}</h1>
              <div className="textarea-container">
                <div className="textarea-section">
                  <label className="textarea-label">Input</label>
                    <textarea
                      placeholder="Enter JSON to validate"
                      value={jsonInput}
                      onChange={(e) => setJsonInput(e.target.value)}
                    />
                </div>
              </div>
    </div>

  );
}

export default JsonValidator;