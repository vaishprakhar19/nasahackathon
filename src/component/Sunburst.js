import React from 'react'
import Plot from 'react-plotly.js';
import sunburst from '../data/sunburst.json';
const Sunburst = () => {
  return (
    <div>
      <Plot
        data={sunburst.data}
        layout={sunburst.layout}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

export default Sunburst