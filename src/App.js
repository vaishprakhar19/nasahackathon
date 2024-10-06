import './App.css';
import Landing from "./component/Landing";
import GraphDisplay from "./component/GraphDisplay";
import {Route, Routes } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [graphType,setGraphType] = useState('') ;
  return (
      <div className="App" >
        <Routes >
          <Route path="/" element={<Landing setGraph={setGraphType}/>} />
          <Route path="/graphDisplay" element={<GraphDisplay graphType={graphType} />} />
        </Routes>
      </div>
  );
}

export default App;
