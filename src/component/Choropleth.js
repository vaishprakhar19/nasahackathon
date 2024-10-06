import React from 'react'
import Plot from 'react-plotly.js';
import choropleth from '../data/choropleth.json';
const Choropleth = () => {
  return (
    <div>
      <Plot
        data={choropleth.data}
        layout={choropleth.layout}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}

export default Choropleth