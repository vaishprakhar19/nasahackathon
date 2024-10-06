import React from 'react'
import Plot from 'react-plotly.js';
import subplots from '../data/subplots.json';
const Subplots = () => {
  return (
    <div>
      <Plot
        data={subplots.data}
        layout={subplots.layout}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

export default Subplots