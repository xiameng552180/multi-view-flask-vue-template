var test = require('tap').test;
var removeOverlaps = require('../');

test('it can remove circuar overalps', function(t) {
  var circles = [
    {x: 0, y: 0, r: 10},
    {x: 1, y: 0, r: 3}
  ]
  var lastMove = removeOverlaps(circles);
  var dist =  distance(circles[0], circles[1]);
  t.ok(dist >= 13, 'it moved circles far enough');
  t.ok(lastMove < 1, 'it converged!');
  t.end();
});

test('it can remove rectangular overalps', function(t) {
  var rectangles = [
    // x/y are centers of the recangles.
    {x: 0, y: 0, width: 10, height: 10},
    // this rectangle is inside the other one
    {x: 0, y: 0, width: 3, height: 3}
  ]

  var lastMove = removeOverlaps(rectangles, {
    method: 'rectangle'
  });

  t.ok(!rectOverlap(rectangles[0], rectangles[1]), 'it moved rectangles far enough');
  t.ok(lastMove < 1, 'it converged!');
  t.end();
});

function distance(a, b) {
  return Math.sqrt(((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)))
}

function rectOverlap(a, b) {
    // http://stackoverflow.com/questions/306316/determine-if-two-rectangles-overlap-each-other
    var aRect = toRect(a)
    var bRect = toRect(b)
    return aRect.left < bRect.right &&
          aRect.right > bRect.left &&
          aRect.top < bRect.bottom &&
          aRect.bottom > bRect.top;
}

function toRect(a) {
  var h2 = a.height / 2
  var w2 = a.width /2

  return {
    left: a.x - w2,
    top: a.y - h2,
    right: a.x + w2,
    bototm: a.y + h2
  }
}
