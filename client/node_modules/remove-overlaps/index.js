var createTree = require('yaqt');

var removeMethods = {
  circle: require('./lib/circleCheck.js'),
  rectangle: require('./lib/rectCheck.js')
}

module.exports = removeOverlaps;

function removeOverlaps(positions, options) {
  if (!positions) throw new Error('Positions are required to run overlap removal')

  // No items - no problems
  if (!positions.length) return 0;

  if (!options) options = {};

  var currentNode;
  var totalMovement = 0;
  var maxMove = typeof options.maxMove === 'number' ? options.maxMove : 1;
  var maxIterations = typeof options.maxIterations === 'number' ? options.maxIterations : 10;
  var method = getOverlapRemovalMethod(options.method)

  // we let each overlap removal method to validate the proprties of the
  // positions array before running validation.
  if (method.validate) {
    method.validate(positions)
  }

  var tree = createTree();
  // TODO: need to deal better with memory
  tree.init(positions.reduce(toFlatArray, []));

  for (var i = 0; i < maxIterations ; ++i) {
    totalMovement = 0;
    for (var index = 0; index < positions.length; index++) {
      currentNode = positions[index];
      tree.visit(visitTreeNode);
    }
    if (totalMovement < maxMove) break;
  }

  return totalMovement;

  function visitTreeNode(node) {
    var bounds = node.bounds;
    var nodePoints = node.items;
    if (nodePoints) {
      // this is a leaf node, it can hold several items. We should check every
      // Check every item to see if it overlaps with current node.
      nodePoints.forEach(moveIfNeeded);
    } else {
      return method.intersectQuad(currentNode, bounds)
    }
  }

  function moveIfNeeded(nodeIndex) {
    var otherNode = positions[nodeIndex/2];
    if (otherNode === currentNode) return;

    totalMovement += method.removeOverlap(currentNode, otherNode);
  }
}


function toFlatArray(prevValue, currentValue) {
  prevValue.push(currentValue.x, currentValue.y);
  return prevValue;
}

function getOverlapRemovalMethod(request) {
  var method;
  if (typeof request === 'string') {
    method = removeMethods[request]
    if (!method) {
      throw new Error(
        'Unknown remove overlap method: ' + request +
        '; Known methods are: ' + JSON.stringify(Object.keys(removeMethods)));
    }
  } else if (request) {
      // custom user method
      method = request;
  } else if (!request) {
    // use circle by default
    method = removeMethods.circle;
  }

  var validMethod = method.intersectQuad && method.removeOverlap;
  if (!validMethod) throw new Error('Custom remove methods require both `intersectQuad()` and `removeOverlap()`');

  return method;
}
