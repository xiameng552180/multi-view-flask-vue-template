# remove-overlaps [![Build Status](https://travis-ci.org/anvaka/remove-overlaps.svg?branch=master)](https://travis-ci.org/anvaka/remove-overlaps)

Given set of N circles at predefined positions attempts to remove overlap between circles.
[Demo](https://anvaka.github.io/remove-overlaps/demo/).

# usage

``` js
var removeOverlaps = require('remove-overlaps')
var circles = [
  {x: 0, y: 0, r: 10},
  {x: 1, y: 0, r: 3}
]
var lastMove = removeOverlaps(circles)
var dist = distance(circles[0], circles[1])
assert(dist >= 13, 'it moved circles far enough')
assert(lastMove < 1, 'it converged!')
```

# license

MIT
