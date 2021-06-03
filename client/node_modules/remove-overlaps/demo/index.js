var graph = require('ngraph.graph')();
var render = require('ngraph.svg');
var graph = require('miserables');
var removeOverlaps = require('../');
graph.forEachNode(addSize);

var svg = render.svg;

var renderer = render(graph, {
  physics: {
    springLength: 60
  }
});

var layout = renderer.layout;
var positions = [];

graph.forEachNode(rememberPosition);

renderer.node(createNode).placeNode(renderNode);
//renderer.run();
for (var i = 0; i < 100; ++i) {
  layout.step();
}
renderer.renderOneFrame();

document.onclick = remove;

layout.on('tick', remove);

function remove() {
  for (var i = 0; i < positions.length; ++i) {
    var p = positions[i];
    var pos = layout.getNodePosition(p.id);
    p.x = pos.x;
    p.y = pos.y;
  }
  removeOverlaps(positions);
  positions.forEach(updateNodePositions);
  renderer.renderOneFrame();
}
function updateNodePositions(pos) {
  layout.setNodePosition(pos.id, pos.x, pos.y);
}

function rememberPosition(node) {
  // TODO: this is very painful in terms of memory and garbage collector
  var pos = layout.getNodePosition(node.id);
  positions.push({
    id: node.id,
    x: pos.x,
    y: pos.y,
    r: node.data.r
  });
}

function createNode(n) {
  var node = n.data;
  return svg("circle", {
    r: node.r,
    fill: "#00a2e8"
  });
}

function renderNode(nodeUI, pos) {
  nodeUI.attr("cx", pos.x).attr("cy", pos.y);
}

function addSize(node) {
  var r = Math.random() * 20 + 4;
  node.data = {
    r: r,
  };
}
