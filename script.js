solution = []
showingSolution = false
height = 0
width = 0

document.addEventListener('keydown', function(key) {
  if (key.code == 'Enter') {
    generateMaze();
  }
})

function updateAlert(text) {
  let alert = document.getElementById('alert');
  alert.innerHTML = text;
}


function generateMaze() {
  if (showingSolution) {
    showSolution()
  }
  height = parseInt(document.getElementById('height').value);
  width = parseInt(document.getElementById('width').value);
  if (isNaN(height) | isNaN(width)) {
    updateAlert('Dimensions must be integer');
  } else if ((height > 10 && height > 200) | (width > 10 && width > 200)) {
    updateAlert('Dimensions must be at least 10 and at most 200');
  } else {
    let grid = document.getElementById('grid');
    if (height < width) {
      document.getElementById('maze-box').style.height = (60 * (height / width)).toString() + 'em';
      document.getElementById('maze-box').style.width = '60em';
    } else if (width < height) {
      document.getElementById('maze-box').style.width = (60 * (width / height)).toString() + 'em';
      document.getElementById('maze-box').style.height = '60em';
    } else {
      document.getElementById('maze-box').style.height = '60em';
      document.getElementById('maze-box').style.width = '60em';
    }
    grid.innerHTML = '';
    grid.style.gridTemplateRows = gridTemplate(height);
    grid.style.gridTemplateColumns = gridTemplate(width);
    for (let i = 0; i < width * height; i++) {
      var element = document.createElement('div');
      element.style.border = '0.1em solid black';
      element.style.color = 'black'
      element.classList.add('grid-item');
      grid.appendChild(element);
    }
    var blocks = Array.prototype.slice.call(document.getElementsByClassName('grid-item'));
    //generating the solution path
    solution = solutionPath();
    for (let i = 0; i < solution.length; i++) {
      blocks[solution[i]].classList.add('path');
      //blocks[path[i]].style.background = 'yellow';
      if (i == 0) {
        blocks[solution[i]].style.background = 'lightgreen'
      }
      if (i == solution.length - 1) {
        blocks[solution[i]].style.background = 'lightcoral'
      }
      drawPath(solution, blocks)
    }
    var pathBlocks = []
    //generating dummy pathBlocks
    while (pathBlocks.length < blocks.length) {
      var pathBlocks = []
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].classList.contains('path')) {
          pathBlocks.push(blocks[i])
        }
      }
      dummy = dummyPath(pathBlocks, blocks)
      drawPath(dummy, blocks)
      document.title = parseInt(100 * (pathBlocks.length / blocks.length)).toString() + '%'
    }
  }
}

function drawPath(path, blocks) {
  for (let i = 1; i < path.length; i++) {
    switch (path[i - 1] - path[i]) {
      case -1:
        blocks[path[i]].style.borderLeft = 'none';
        blocks[path[i - 1]].style.borderRight = 'none';
        break
      case 1:
        blocks[path[i]].style.borderRight = 'none';
        blocks[path[i - 1]].style.borderLeft = 'none';
        break
      case width:
        blocks[path[i]].style.borderBottom = 'none';
        blocks[path[i - 1]].style.borderTop = 'none';
        break
      case -width:
        blocks[path[i]].style.borderTop = 'none';
        blocks[path[i - 1]].style.borderBottom = 'none';
        break;
    }
    blocks[path[i]].classList.add('path')
  }
}


function dummyPath(pathBlocks, blocks) {
  var pathIndex = randInt(pathBlocks.length - 1)
  var blocksIndex = blocks.indexOf(pathBlocks[pathIndex]);

  var dummy = [blocksIndex]

  while (true) {
    var options = []

    if (blocksIndex % width != 0 && !pathBlocks.includes(blocks[blocksIndex - 1]) && !dummy.includes(blocksIndex - 1)) {
      options.push(blocksIndex - 1);
    }
    if (blocksIndex > width && !pathBlocks.includes(blocks[blocksIndex - width]) && !dummy.includes(blocksIndex - width)) {
      options.push(blocksIndex - width)
    }
    if ((blocksIndex + 1) % width != 0 && !pathBlocks.includes(blocks[blocksIndex + 1]) && !dummy.includes(blocksIndex + 1)) {
      options.push(blocksIndex + 1);
    }
    if (blocksIndex < (height - 1) * width && !pathBlocks.includes(blocks[blocksIndex + width]) && !dummy.includes(blocksIndex + width)) {
      options.push(blocksIndex + width)
    }
    if (options.length == 0) {
      break
    }
    dummy.push(randChoice(options))

    blocksIndex = dummy[dummy.length - 1]
  }
  if (dummy.length == 1) {
    dummy = dummyPath(pathBlocks, blocks, height, width) //actually stupid
  }
  return dummy
}

function solutionPath() {
  var path = [];
  //starting position
  path.push(randInt(height - 2) * width + width);
  path.push(path[0] + 1);
  var p = path.slice();
  while ((path[path.length - 1] + 1) % width != 0 && path[path.length - 1] <= (height - 1) * width && path[path.length - 1] > width && path[path.length - 1] % width != 0) {
    var lastBlock = path[path.length - 1];
    var options = []
    if (lastBlock % width != 0 && !path.includes(lastBlock - 1)) {
      options.push(lastBlock - 1);
    }
    if (lastBlock > width && !path.includes(lastBlock - width)) {
      options.push(lastBlock - width)
    }
    if ((lastBlock + 1) % width != 0 && !path.includes(lastBlock + 1)) {
      options.push(lastBlock + 1);
    }
    if (lastBlock < (height - 1) * width && !path.includes(lastBlock + width)) {
      options.push(lastBlock + width)
    }
    if (options.length == 0) {
      path = p
    }
    path.push(randChoice(options))
  }
  if (path.length <= 2 * Math.pow((height * height + width * width), 0.5)) {
    path = solutionPath(height, width) //actually stupid
  }
  return path;
}

function showSolution() {
  var blocks = document.getElementsByClassName('grid-item')
  let solutionButton = document.getElementById('solution-btn');
  if (!showingSolution) {
    for (let i = 1; i < solution.length - 1; i++) {
      blocks[solution[i]].style.background = 'lightyellow';
    }
    showingSolution = true
    solutionButton.innerHTML = 'Hide solution'
  } else {
    for (let i = 1; i < solution.length - 1; i++) {
      blocks[solution[i]].style.background = 'white';
    }
    showingSolution = false
    solutionButton.innerHTML = 'Show solution'
  }
}

function gridTemplate(count) {
  var x = (100 / count).toString();
  var row = '';
  for (let i = 0; i < count; i++) {
    row += x + '% '
  }
  return row;
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

function randChoice(list) {
  return list[randInt(list.length)]
}