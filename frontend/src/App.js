import './App.css';
import React, { useState } from 'react';

function App() {
  const [textArea1, setTextArea1] = useState('');
  const [textArea2, setTextArea2] = useState('');
  const [response1, setResponse1] = useState('');
  const [response2, setResponse2] = useState('');
  const [answer, setAnswer] = useState('');
  const [showResponses, setShowResponses] = useState(false);

  const [highlightedResponse1, setHighlightedResponse1] = useState('');
  const [highlightedResponse2, setHighlightedResponse2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      text1: textArea1,
      text2: textArea2,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      const output = result.result;
      const sorted1 = result.sorted1;
      const sorted2 = result.sorted2;

      const result1List = [];
      const result2List = [];

      const results = highlightDifferences(sorted1, sorted2);

      Object.keys(results).forEach((key) => {
        const result1 = results[key].result1;
        const result2 = results[key].result2;

        result1List.push(`<span class="diff">${key}: ${JSON.stringify(result1)}</span>`);
        result2List.push(`<span class="diff">${key}: ${JSON.stringify(result2)}</span>`);
      });

      setHighlightedResponse1(result1List.join(', '));
      setHighlightedResponse2(result2List.join(', '));

      setAnswer(JSON.stringify(output === true ? "Both objects contain the same data" : "Both objects do not contain the same data"));
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

function highlightDifferences(obj1, obj2) {
  if (typeof obj1 === 'object' && typeof obj2 === 'object' && obj1 !== null && obj2 !== null) {
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      return obj1.map((item, index) => highlightDifferences(item, obj2[index]));
    } else {
      const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
      const result = {};

      Array.from(keys).forEach((key) => {
        const value1 = obj1[key];
        const value2 = obj2[key];

        if (JSON.stringify(value1) !== JSON.stringify(value2)) {
          result[key] = {
            result1: value1 !== undefined ? value1 : null,
            result2: value2 !== undefined ? value2 : null
          };
        }
      });

      return result;
    }
  }

  if (obj1 !== obj2) {
    return { result1: obj1, result2: obj2 };
  }

  return {};
}

  const loadSample = () => {
    setTextArea1('{ "sample": "data1" }');
    setTextArea2('{ "sample": "data2" }');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Actual JSON Comparison</h1>
        <form onSubmit={handleSubmit}>
          <div className="button-container">
            <button type="button" onClick={loadSample}>
              Load Sample
            </button>
            <button type="submit">JSON Compare</button>
          </div>
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
        </form>
        {showResponses && (
          <div className="results">
          <h1>{answer}</h1>
            <div className="textarea-container">
              <div className="textarea-section">
                <label className="textarea-label">Result 1</label>
                 <div
                  className="textarea-readonly"
                  dangerouslySetInnerHTML={{ __html: highlightedResponse1 }}
                />
              </div>
              <div className="textarea-section">
                <label className="textarea-label">Result 2</label>
                <div
                  className="textarea-readonly"
                  dangerouslySetInnerHTML={{ __html: highlightedResponse2 }}
                />
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
