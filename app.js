import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Monitoramento de Câmeras</h1>
      <video controls autoPlay style={{ width: '100%' }}>
        <source src="http://localhost:3000/api/stream" type="video/mp4" />
      </video>
    </div>
  );
}

export default App;

