const Sidebar = (props: any) => {
  var cycleInterval: any;
  return (
    <div className="sidebar">
      <button
        onClick={() => {
          props.nextGeneration();
        }}
      >
        Next Generation
      </button>
      <div className="pause-play">
        <button
          onClick={() => {
            cycleInterval = setInterval(
              props.nextGeneration,
              props.config.cycleSpeed
            );
          }}
        >
          <i className="fas fa-play"></i>
        </button>
        <button
          onClick={() => {
            clearInterval(cycleInterval);
          }}
        >
          <i className="fas fa-pause"></i>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
