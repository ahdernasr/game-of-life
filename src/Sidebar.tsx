import React from "react";

const Sidebar = (props: any) => {
  return (
    <div className="sidebar">
      <button
        onClick={() => {
          props.nextGeneration();
        }}
      >
        Next Generation
      </button>
      <div>
        <button onClick={() => props.cycleGenerations()}>
          <i className="fas fa-play"></i>
        </button>
        <button onClick={() => props.pauseGenerations()}>
          <i className="fas fa-pause"></i>
        </button>
      </div>
      <p>{5}</p>
    </div>
  );
};

export default Sidebar;
