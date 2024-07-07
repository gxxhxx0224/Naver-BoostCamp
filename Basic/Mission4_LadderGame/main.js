let ladder = [];

// 발판의 종류
const empty = 0;
const left = 1;
const right = 2;
const cross = 3;
const boards = [empty, left, right, cross];

// 발판의 문자열 표시
const BOARD_STRINGS = {
  0: "   ", // empty
  1: "/-/", // left
  2: "---", // right
  3: "\\-\\", // cross
};

// reset 함수: 사다리를 빈 상태로 초기화.
function reset(row = 5, col = 5) {
  ladder = [];
  for (let i = 0; i < row; i++) {
    let rows = [];
    for (let j = 0; j < col; j++) {
      rows.push(empty); // 빈 발판으로 초기화
    }
    ladder.push(rows);
  }
}

//사다리 데이터 구조를 랜덤으로 채움
function randomFill() {
  const row = ladder.length;
  const col = ladder[0].length;

  // 총 발판 개수를 랜덤결정
  const totalBoards = Math.floor(Math.random() * (row * col));

  // 랜덤으로 발판을 채움
  for (let i = 0; i < totalBoards; i++) {
    const randomRow = Math.floor(Math.random() * row);
    const randomCol = Math.floor(Math.random() * col);
    const randomBoard = boards[Math.floor(Math.random() * boards.length)];
    ladder[randomRow][randomCol] = randomBoard;
  }
}


// 사다리 데이터 구조를 분석한 결과를 리턴
function analyze() {
  const row = ladder.length;
  const col = ladder[0].length;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col - 1; j++) {
      if (ladder[i][j] === right && ladder[i][j + 1] === right) {
        return false; // 1자 발판이 연속으로 나오면 false
      }
      if (ladder[i][j] === left && ladder[i][j + 1] === cross) {
        return false; // 좌측에 우하향 발판 + 우측에 좌하향 발판 연속으로 나오면 false
      }
      if (ladder[i][j] === cross && ladder[i][j + 1] === left) {
        return false; // 좌측에 좌하향 발판 + 우측에 우하향 발판 연속으로 나오면 false
      }
    }
  }
  return true;
}

// 사다리의 현재 상태를 문자열로 리턴
function display() {
  let result = "";
  for (let i = 0; i < ladder.length; i++) {
    let rowStr = "|";
    for (let j = 0; j < ladder[i].length; j++) {
      rowStr += BOARD_STRINGS[ladder[i][j]] + "|";
    }
    result += rowStr + "\n";
  }
  return result;
}


// 테스트
reset();
randomFill();
console.log(display());
console.log(analyze());
