function winEval(cellPlayed) {
  let startingPoints = findPoints(cellPlayed)
  let sequence = [0,0]
  let pointer;
  
  for (let i1 = 0; i1 < 4; i1++) {
    sequence = [0,0];
    pointer = {0:cellPlayed-(startingPoints[0]*gridSize),1:cellPlayed-(startingPoints[1]*(parseInt(gridSize)-1)),2:cellPlayed+startingPoints[2],3:cellPlayed+(startingPoints[3]*(parseInt(gridSize)+1))}[i1];
    
    let increment = {0:gridSize,1:(parseInt(gridSize)-1),2:-1,3:(-parseInt(gridSize)-1)}[i1];
    for (let i2 = 0; i2 < (startingPoints[i1]+startingPoints[i1+4]); i2++) {
      let cellMark = boardData[pointer+(increment*(i2))];
      if (cellMark == sequence[0]) {sequence[1] = sequence[1]+1}
      else {sequence = [cellMark,1]};
      if ((sequence[1] == 5) && (sequence[0] != 0)) {
        return [pointer+(increment*(i2)),i1]};
    }    
  }
  return false
}

function findPoints(cellPlayed) {
  let cellXPosition = cellPlayed%gridSize;
  let cellYPosition = (cellPlayed/gridSize)|0;

  let rightPoint = Math.min((cellXPosition + 4), (parseInt(gridSize)-1))
  let topPoint = Math.max((cellYPosition - 4), 0)
  let leftPoint = Math.max((cellXPosition - 4), 0)
  let bottomPoint = Math.min((cellYPosition + 4), (parseInt(gridSize)-1))
  let topRightPointQuantity = Math.min((rightPoint-cellXPosition),(cellYPosition-topPoint));
  let bottomRightPointQuantity = Math.min((rightPoint-cellXPosition),(bottomPoint - cellYPosition));
  let topLeftPointQuantity = Math.min((cellXPosition - leftPoint),(cellYPosition-topPoint));
  let bottomLeftPointQuantity =Math.min((cellXPosition - leftPoint),(bottomPoint - cellYPosition));

  return [(cellYPosition-topPoint), topRightPointQuantity, (rightPoint-cellXPosition),bottomRightPointQuantity,(bottomPoint-cellYPosition+1),(bottomLeftPointQuantity+1),(cellXPosition-leftPoint+1),(topLeftPointQuantity+1)]
}
