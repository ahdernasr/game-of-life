import React, { useRef, useEffect } from "react";
import gridConfig from "./gridconfig";
const _ = require("lodash");

const Grid = () => {
  const grid = useRef() as React.MutableRefObject<HTMLInputElement>;

  // 2D Array that will be defined later which allows easy access to nodes
  var nodesArray: any[] = [];
  let allNeighborsArray: HTMLElement[] = [];

  // Grid config has to contain width and height
  interface configCriteria {
    width: number;
    height: number;
  }

  function enhabitNode(node: any) {
    node.classList.add("enhabited");
  }

  function findNeighbors(node: any) {
    let neighborsList: any[] = [];

    try {
      neighborsList = [
        nodesArray[node.data.x + 1][node.data.y],
        nodesArray[node.data.x + 1][node.data.y + 1],
        nodesArray[node.data.x + 1][node.data.y - 1],
        nodesArray[node.data.x - 1][node.data.y],
        nodesArray[node.data.x - 1][node.data.y + 1],
        nodesArray[node.data.x - 1][node.data.y - 1],
        nodesArray[node.data.x][node.data.y + 1],
        nodesArray[node.data.x][node.data.y - 1],
      ];
    } catch (e) {}
    allNeighborsArray = allNeighborsArray.concat(neighborsList);

    return neighborsList;
  }

  function cycleGenerations() {
    setInterval(() => {
      nextGeneration(nodesArray);
    }, 200);
  }

  function nextGeneration(nodesArray: any[]) {
    console.time('Generation start')
    console.log(nodesArray);

    allNeighborsArray = [];

    const enhabitedArray: any[] = Array.from(
      document.querySelectorAll(".enhabited")
    );

    let toRemove: HTMLElement[] = [];
    // what the problem is:
    // two for loops, first one is removing some neighbors which are required for the second loops, hence incorrect functionality
    for (let i = 0; i < enhabitedArray.length; i++) {
      // get a list of the neighbors of the enhabited node
      let neighborsList;

      neighborsList = findNeighbors(enhabitedArray[i]);

      let enhabitedNeighborsList = neighborsList.filter((neighbor) => {
        return neighbor && neighbor.classList.contains("enhabited");
      });

      if (
        enhabitedNeighborsList.length <= 1 ||
        enhabitedNeighborsList.length >= 4
      ) {
        toRemove.push(enhabitedArray[i]);
      }
    }

    for (let n of _.uniq(allNeighborsArray)) {
      let enhabitedNeighborsList = findNeighbors(n).filter((neighbor) => {
        return neighbor && neighbor.classList.contains("enhabited");
      });

      if (
        enhabitedNeighborsList.length === 3 &&
        !n.classList.contains("enhabited")
      ) {
        n.classList.add("enhabited");
      }
    }

    for (let n of toRemove) {
      n.classList.remove("enhabited");
    }

    console.timeEnd('Generation start')
    console.log(nodesArray)

  }

  useEffect(() => {
    const slider: any = document.getElementById("grid");
    let isDown = false;
    let startX: any;
    let startY: any;
    let scrollTop: any;
    let scrollLeft: any;

    slider.addEventListener("mousedown", (e: any) => {
      slider.style.cursor = "grab";
      isDown = true;
      slider.classList.add("active");
      startY = e.pageY - slider.offsetTop;
      startX = e.pageX - slider.offsetLeft;
      scrollTop = slider.scrollTop;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mousemove", (e: any) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const y = e.pageY - slider.offsetTop;
      const walk = (x - startX) * 2; //scroll-fast
      const walkY = (y - startY) * 2;
      slider.scrollLeft = scrollLeft - walk;
      slider.scrollTop = scrollTop - walkY;
    });

    function generateGrid(gridConfig: configCriteria) {

      console.log("Generating grid...");

      const gridContainer = grid.current;

      // Grid generated by forming a row (div) element for the length
      for (let x: number = 0; x < gridConfig.width; x++) {
        let row = document.createElement("div");
        let rowArray: any = [];
        gridContainer.appendChild(row);

        // Fills row element with elements * height
        for (let y: number = 0; y < gridConfig.height; y++) {
          interface propertyCriteria {
            x: number;
            y: number;
          }
          let nodeProperties: propertyCriteria = {
            x: x,
            y: y,
          };

          let gridNode: any = document.createElement("div");
          gridNode.classList.add("grid-node");
          rowArray.push(gridNode);

          gridNode.data = nodeProperties;

          gridNode.onclick = () => {
            enhabitNode(gridNode);
          };

          row.appendChild(gridNode);
        }
        nodesArray.push(rowArray);
      }
    }

    generateGrid(gridConfig);

    // bring the middle element into view;
    nodesArray[gridConfig.width / 2][gridConfig.height / 2].scrollIntoView();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div id="grid" className="grid" ref={grid}></div>
      <button onClick={() => {
        nextGeneration(nodesArray)
      }}>Next Generation</button>
      <button onClick={cycleGenerations}>
        <i className="fas fa-play"></i>
      </button>
      <p>{5}</p>
    </>
  );
};

export default Grid;
