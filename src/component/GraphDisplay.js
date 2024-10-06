import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sunburst from './Sunburst.js';
import Subplots from './Subplots.js';
import Scatterplot from './ScatterPlot.js';
import Choropleth from './Choropleth.js';

function GraphDisplay({ graphType }) {
  const navigate = useNavigate();

  // Map the graphType to the corresponding component
  const graphComponents = {
    sunburst: Sunburst,
    subplots: Subplots,
    scatterplot: Scatterplot,
    choropleth: Choropleth,
  };

  // Get the appropriate graph component
  const GraphComponent = graphComponents[graphType] || (() => <div>Invalid graph type</div>);

  const handleClick = () => {
    document.startViewTransition(() => {
      navigate("/");
    });
  };

  return (
    <div style={{ color: 'white', width: '100%', height: '100%' }} onClick={handleClick}>
      {/* Render the correct graph component */}
      <GraphComponent />
    </div>
  );
}

export default GraphDisplay;
