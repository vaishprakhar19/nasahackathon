import React from 'react'
import Plot from 'react-plotly.js';
import scatterPlot from '../data/scatterPlot.json';
const ScatterPlot = () => {
  return (
    <div>
      <Plot
        data={scatterPlot.data}
        layout={scatterPlot.layout}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

export default ScatterPlot