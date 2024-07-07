function play(moves) {
  const boardSize = 16; // 전체 보드 크기 (시작 포함)
  const validPositions = 15; // 소유 가능한 위치 수
  const players = ["A", "B", "C", "D"]; // 참가자 목록
  const positions = { A: 0, B: 0, C: 0, D: 0 }; // 각 참가자의 현재 위치
  const ownership = { A: 0, B: 0, C: 0, D: 0 }; // 각 참가자의 소유 장소 개수
  const board = new Array(validPositions).fill(null); // 소유 가능한 보드 초기화, null은 아무도 소유하지 않음을 의미

  // 보드 이동 경로 정의
  const path = [
    1,2,3,4,5, // 오른쪽으로 이동
    6,7,8,9,10, // 위쪽으로 이동
    11,12,13,14,15, // 왼쪽으로 이동, 아래로 이동
  ];

  let moveIndex = 0; // 이동값 인덱스 초기화

  // 모든 장소가 소유될 때까지 게임 진행
  while (board.includes(null)) {
    const currentPlayer = players[moveIndex % players.length]; // 현재 차례 참가자
    const move = moves[moveIndex % moves.length]; // 이동값

    // 참가자 이동 (현재 위치에서 move만큼 이동)
    positions[currentPlayer] = (positions[currentPlayer] + move) % boardSize;

    // 실제 위치가 시작 지점인 0번인 경우, 소유를 하지 않고 다시 이동
    const currentPos =
      positions[currentPlayer] === 0
        ? 0
        : path[(positions[currentPlayer] - 1) % validPositions];

    // 현재 위치가 아무도 소유하지 않은 경우에만 소유하게 함
    if (currentPos !== 0 && board[currentPos - 1] === null) {
      board[currentPos - 1] = currentPlayer; // 소유자 등록
      ownership[currentPlayer]++; // 소유 장소 개수 증가
    }

    moveIndex++;
  }

  return ownership; // 최종 소유 장소 개수 반환
}

// 예시 입력과 실행
const result = play([1, 2, 3, 4]); // A는 1칸, B는 2칸, C는 3칸, D는 4칸 이동
console.log(result); // 각 참가자가 소유한 장소 개수
