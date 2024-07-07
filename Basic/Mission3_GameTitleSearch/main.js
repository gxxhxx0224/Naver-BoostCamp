// 게임 데이터
const games = [
  {
    name: "Kong",
    extinction: true,
    genre: "Adventure",
    score: 4.1,
    maxPlayers: 1,
    start: "1970.1",
    end: "1981.4",
  },
  {
    name: "Ace",
    extinction: false,
    genre: "Board",
    score: 3.8,
    maxPlayers: 4,
    start: "1987.7",
    end: "2024.7",
  },
  {
    name: "Mario",
    extinction: true,
    genre: "RPG",
    score: 3.3,
    maxPlayers: 2,
    start: "2001.9",
    end: "2007.11",
  },
  {
    name: "Prince",
    extinction: true,
    genre: "RPG",
    score: 4.8,
    maxPlayers: 1,
    start: "1983.3",
    end: "2002.5",
  },
  {
    name: "Dragons",
    extinction: true,
    genre: "Fight",
    score: 3.4,
    maxPlayers: 4,
    start: "1990.5",
    end: "1995.12",
  },
  {
    name: "Civil",
    extinction: false,
    genre: "Simulation",
    score: 4.2,
    maxPlayers: 1,
    start: "2002.6",
    end: "2024.7",
  },
  {
    name: "Tekken",
    extinction: true,
    genre: "Fight",
    score: 4.0,
    maxPlayers: 2,
    start: "1998.7",
    end: "2009.12",
  },
  {
    name: "GoCart",
    extinction: false,
    genre: "Sports",
    score: 4.6,
    maxPlayers: 8,
    start: "2006.12",
    end: "2024.07",
  },
  {
    name: "Football",
    extinction: false,
    genre: "Sports",
    score: 2.9,
    maxPlayers: 8,
    start: "1994.6",
    end: "2024.7",
  },
  {
    name: "Brave",
    extinction: true,
    genre: "RPG",
    score: 4.2,
    maxPlayers: 1,
    start: "1980.6",
    end: "1985.1",
  },
];

// 날짜(문자열)을 파싱해서 Date 객체로 변환
function parseDate(date) {
  const [year, month] = date.split(".").map(Number); // 연, 월 분리(숫자로)
  return new Date(year, month - 1); // 월은 0부터 시작하므로 -1 (js의 Date 객체로 변환)
}

// 조건에 맞는 게임 찾기(날짜, 참가자 수)
function find(param0, param1) {
  // 입력된 날짜 문자열을 파싱하여 Date 객체로 변환
  const date = parseDate(param0.substring(0, 4) + "." + param0.substring(4)); // 날짜(yyyy.mm)
  const player = param1; // 참가자 수

  // 조건에 부합하는 게임 필터링
  const possible = games.filter((game) => {
    const start = parseDate(game.start); // 게임 시작 날짜
    const end = parseDate(game.end); // 게임 종료 날짜

    // 게임이 날짜 범위 내에 있고 참가자 수 조건을 만족하는지 확인
    if (date >= start && date <= end && game.maxPlayers >= player) {
      return true;
    } else {
      return false;
    }
  });

  // 점수 기준 내림차순 정렬
  possible.sort((a, b) => b.score - a.score);

  // 결과 문자열로 변환
  const result = possible.map((game) => {
    const name = game.extinction ? `${game.name}*` : game.name; // 단종된 게임에 * 표시
    return `${name}(${game.genre}) ${game.score}`;
  });

  return result.join(", ");
}

// 입력
console.log(find("198402", 1)); // "Prince*(RPG) 4.8, Brave*(RPG) 4.2"
console.log(find("200008", 8)); // "Football(Sports)"
console.log(find("199004", 5)); // ""
