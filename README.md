# simplejs-maze-generator
fun for everybody

## what is this
this was a small personal project intended for me to get better at javascript. this generates mazes with any dimensions from 10-200 cells of width/height. mazes are marked with a green and red tile, representing the start and finish respectively. as such, every maze does have a solution that takes you from the start to finish.

every maze can have it's solution shown and be downloaded as an image.

## what's bad
#### recursion
path generation requires recursion whenever it gets to a stuck state or it doesn't meet some requirements. in some cases, the generation will fail. you can most likely reliable generate at most 100x100 mazes.

#### random starts and finishes
the starts and finishes of the mazes are predetermined randomly and can't be selected manually. the pros of this is that the solution is really easy as we generate it ourselves. in all other cases, i don't prefer it. to have selectable points, we select the start and finish after the maze is generated. there is a solution to for these selected points, but since the script doesn't genreate it, we have to pathfind to it in order to display it. i might adding a pathfinding algorithim, but this project wasn't intended for that.

#### spaghetti code
spaghetti code

## what i might do
- fix recursion thing
- selectable points + path finding
