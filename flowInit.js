$(document).ready(function() {
  console.log("running flowInit function");
  var $flowchart = $(".example_1");
  var $container = $flowchart.parent();

  var cx = $flowchart.width() / 2;
  var cy = $flowchart.height() / 2;
  var data = {
    operators: {
      operator1: {
        top: cy - 100,
        left: cx - 200,
        properties: {
          title: "Operator 1",
          inputs: {},
          outputs: {
            output_1: {
              label: "Output 1"
            }
          }
        }
      },
      operator2: {
        top: cy,
        left: cx + 140,
        properties: {
          title: "Operator 2",
          inputs: {
            input_1: {
              label: "Input 1"
            },
            input_2: {
              label: "Input 2"
            }
          },
          outputs: {}
        }
      }
    },
    links: {
      link_1: {
        fromOperator: "operator1",
        fromConnector: "output_1",
        toOperator: "operator2",
        toConnector: "input_2"
      }
    }
  };

  // Apply the plugin on a standard, empty div...
  $flowchart.flowchart({
    data: data
  });

  $flowchart
    .parent()
    .siblings(".delete_selected_button")
    .click(function() {
      $flowchart.flowchart("deleteSelected");
    });

  var $draggableOperators = $(".draggable_operator");

  function getOperatorData($element) {
    var nbInputs = parseInt($element.data("nb-inputs"));
    var nbOutputs = parseInt($element.data("nb-outputs"));
    var data = {
      properties: {
        title: $element.text(),
        inputs: {},
        outputs: {}
      }
    };

    var i = 0;
    for (i = 0; i < nbInputs; i++) {
      data.properties.inputs["input_" + i] = {
        label: "Input " + (i + 1)
      };
    }
    for (i = 0; i < nbOutputs; i++) {
      data.properties.outputs["output_" + i] = {
        label: "Output " + (i + 1)
      };
    }

    return data;
  }

  var operatorId = 0;

  $draggableOperators.draggable({
    cursor: "move",
    opacity: 0.7,

    helper: "clone",
    appendTo: "body",
    zIndex: 1000,

    helper: function(e) {
      var $this = $(this);
      var data = getOperatorData($this);
      return $flowchart.flowchart("getOperatorElement", data);
    },
    stop: function(e, ui) {
      var $this = $(this);
      console.log($this);
      var elOffset = ui.offset;
      var containerOffset = $container.offset();
      if (
        elOffset.left > containerOffset.left &&
        elOffset.top > containerOffset.top &&
        elOffset.left < containerOffset.left + $container.width() &&
        elOffset.top < containerOffset.top + $container.height()
      ) {
        var flowchartOffset = $flowchart.offset();

        var relativeLeft = elOffset.left - flowchartOffset.left;
        var relativeTop = elOffset.top - flowchartOffset.top;

        var scaleRatio = $flowchart.flowchart("getScaleRatio");
        console.log(scaleRatio, '=========')
        relativeLeft /= scaleRatio;
        relativeTop /= scaleRatio;

        var data = getOperatorData($this);
        console.log(data);
        data.left = relativeLeft;
        data.top = relativeTop;

        $flowchart.flowchart("addOperator", data);
      }
    }
  });
});
