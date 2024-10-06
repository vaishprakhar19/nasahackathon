import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Landing.css";
import starImage from "./star.png";
import choropleth from './choropleth.png';
import subplots from './subplots.png';
import { useNavigate } from "react-router-dom";
import Sunburst from "./sunburst.png";
import scatter from "./scatter.png"

const Landing = ({setGraph}) => {
  const mountRef = useRef(null);
  let frameId = useRef(null); // Store the animation frame ID for cleanup

  useEffect(() => {
    let scene, camera, renderer, stars, starGeo;

    function init() {
      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(
          60,
          window.innerWidth / window.innerHeight,
          1,
          1000
      );
      camera.position.z = 1;
      camera.rotation.x = Math.PI / 2;

      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      }

      // Using THREE.BufferGeometry instead of THREE.Geometry
      starGeo = new THREE.BufferGeometry();

      const starVertices = [];
      for (let i = 0; i < 6000; i++) {
        const x = Math.random() * 600 - 300;
        const y = Math.random() * 600 - 300;
        const z = Math.random() * 600 - 300;
        starVertices.push(x, y, z);
      }

      starGeo.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(starVertices, 3)
      );

      let sprite = new THREE.TextureLoader().load(starImage);
      let starMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.7,
        map: sprite,
      });

      stars = new THREE.Points(starGeo, starMaterial);
      scene.add(stars);

      window.addEventListener("resize", onWindowResize, false);

      animate();
    }

    function onWindowResize() {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    }

    function animate() {
      const positions = starGeo.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += 0.02; // Move stars along the Z-axis towards the camera
        if (positions[i + 2] > 200) {
          positions[i + 2] = -200; // Reset Z position
        }
      }
      starGeo.attributes.position.needsUpdate = true;
      stars.rotation.x += 0.002;
      stars.rotation.z += 0.002;
      renderer.render(scene, camera);
      frameId.current = requestAnimationFrame(animate); // Save frameId for cleanup
    }

    init();

    // Clean up on component unmount
    return () => {
      window.removeEventListener("resize", onWindowResize);

      if (frameId.current) {
        cancelAnimationFrame(frameId.current); // Cancel the animation frame
      }

      if (renderer && renderer.domElement && mountRef.current) {
        mountRef.current.removeChild(renderer.domElement); // Ensure proper cleanup
      }

      renderer.dispose(); // Dispose renderer to free up resources
      scene = null;
      camera = null;
      starGeo.dispose(); // Dispose geometry to prevent memory leaks
    };
  }, []);

  const navigate = useNavigate();
  const handleClick = (type) => {
    setGraph(type);
    document.startViewTransition(()=> {
      navigate("/graphDisplay");
    });
  };

  return (
    <div className="landing-container">
      <div className="text-box">
        <div className="heading">CodeStronauts</div>
        <div className="button-wrapper">
          <img className="images" alt="choropleth" src={choropleth} onClick={() => handleClick('choropleth')} />
          <img className="images" alt="subplots" src={subplots} onClick={() => handleClick('subplots')} />
          <img className="images" alt="sunburst" src={Sunburst} onClick={() => handleClick('sunburst')} />
          <img className="images" alt="scatterplot" src={scatter} onClick={() => handleClick('scatterplot')} />
        </div>
      </div>
      <div ref={mountRef}></div>
    </div>
  );
};

export default Landing;
