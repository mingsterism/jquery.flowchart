const data = [
  {
    name: "decision",
    nodeStyle: "rectangle",
    nodeLogic: {
      input: 1,
      output: 1
    }
  },
  {
    name: "start",
    nodeStyle: "rectangle",
    nodeLogic: {
      input: 0,
      output: 1
    }
  },
  {
    name: "end",
    nodeStyle: "rectangle",
    nodeLogic: {
      input: 1,
      output: 0
    }
  },
  {
    name: "step",
    nodeStyle: "rectangle",
    nodeLogic: {
      input: 1,
      output: 1
    }
  }
];
console.log("DATA =================");
var string = "";
for (let i = 0; i < data.length; i++) {
  console.log("Inserting operators");
  string += `
        <div
            class="draggable_operator"
            style="width:100%;display:flex;justify-content: center;align-items: center;margin-bottom: 10px"
            data-shape="${data[i].nodeStyle}"
            data-nb-inputs="${data[i].nodeLogic.input}"
            data-nb-outputs="${data[i].nodeLogic.output}"
            data-name="${data[i].name}"
          >
            ${data[i].name}
          </div>
        `;
}
let div = document.getElementsByClassName("draggable_operators_divs")[0];
div.innerHTML = string;
