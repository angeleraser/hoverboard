const colorNames = [
  "red",
  "lime",
  "blue",
  "yellow",
  "cyan",
  "magenta",
  "orange",
  "pink",
];

function getRandomIndex(max = 1) {
  return Math.floor(Math.random() * max);
}

function generateBoardCells(size = 0) {
  let html = "";
  for (let rowId = 0; rowId < size; rowId++) {
    for (let colId = 0; colId < size; colId++) {
      html += `<span class="board-cell" data-cell="${rowId},${colId}"></span>`;
    }
  }
  return html;
}

function addCellColor(cell) {
  const color = colorNames[getRandomIndex(colorNames.length)];
  cell.style.backgroundColor = `var(--${color})`;
  cell.style.boxShadow = `0 0 2px var(--${color}), 0 0 10px var(--${color})`;
}

function removeCellColor(cell) {
  cell.style.backgroundColor = `var(--gray)`;
  cell.style.boxShadow = `0 0 2px var(--black), 0 0 10px var(--black)`;
}

function createBoard(element, { size, transitionMs }) {
  element.innerHTML = generateBoardCells(size);
  element.style.transitionDuration = `${transitionMs}ms`;
  element.style.gridTemplateColumns = "1fr ".repeat(size);

  function handleAddCellColor({ target }) {
    if (target.dataset.cell) addCellColor(target);
  }

  element.addEventListener("click", handleAddCellColor);
  element.addEventListener("mouseover", handleAddCellColor);
  element.addEventListener("mouseout", function ({ target }) {
    if (target.dataset.cell) setTimeout(removeCellColor, transitionMs, target);
  });
}

createBoard(document.getElementById("board"), {
  size: 20,
  transitionMs: 600,
});
