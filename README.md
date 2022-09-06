# React App Snake


## Structure

Layers: Grid, Points

## Logic of movement snake

if snake move in Y coordinate, then only turn left or right
if snake move in X coordinate, then only turn top or bottom

If button right then increase one of X coordinate.
If button left then decrease one of X coordinate.
If button top then decrease one of Y coordinate.
If button bottom then increase one of Y coordinate.

When the snake moves, a shift occurs, i.e. previous cell positions become next.
The first element (tail snake) is removed and the last element (head snake) is added.

## How snake catch point?

With each shift, I get the Head-snake coordinates and compare them in the points layer.

If there is a match, i.e. XY layer Snake === XY layer Points, then add the score value.


## Settings

Grid size
Grid border
Snake speed
Score random value