function solution(telno) {
  // 입력 전에 모든 '-' 제거
  const tel = telno.replace(/-/g, "");
  const failure = ["전국", "X"];
  const map = {
    "010": "휴대폰",
    "011": "휴대폰",
    "016": "휴대폰",
    "017": "휴대폰",
    "018": "휴대폰",
    "019": "휴대폰",
    "031": "경기",
    "032": "인천",
    "033": "강원",
    "041": "충청",
    "042": "대전",
    "044": "세종",
    "051": "부산",
    "052": "울산",
    "053": "대구",
    "054": "경북",
    "055": "경남",
    "061": "전남",
    "062": "광주",
    "063": "전북",
    "064": "제주",
  };

  // 새로운 요구사항: 국제전화 번호 처리
  if (tel.startsWith("001") || tel.startsWith("002")) {
    const internationalNumber = tel.substring(3);
    if (internationalNumber.length < 8 || internationalNumber.length > 12)
      return failure;
    return ["국제전화", "O"];
  }

  if (tel.length > 11 || tel.length < 9) return failure;
  else if (tel[0] !== "0") return failure;

  const top = tel.substring(0, 3);
  const ext = tel.substring(tel.length - 4);

  if (tel[1] === "2") {
    if (tel.length !== 10) return ["서울", "X"];
    if (ext[0] === ext[1] && ext[1] === ext[2] && ext[2] === ext[3])
      return ["서울", "X"];
    return ["서울", "O"];
  } else if (tel[1] === "1") {
    if (!map[top]) return failure;
    if (tel[2] !== "0") return ["휴대폰", "X"];
    if (tel.length === 11 && parseInt(tel[3]) % 2 === 0) return ["휴대폰", "O"];
    return ["휴대폰", "X"];
  } else if (map[top]) {
    if (tel.length === 10 && tel[3] === "0") return [map[top], "X"];
    return [map[top], "O"];
  }

  return failure;
}

console.log(solution("010-123-1234")); //휴대폰 X
console.log(solution("010-2234-1234")); //휴대폰 O
console.log(solution("010-1234-1234")); //휴대폰 X
console.log(solution("016-2234-1234")); //휴대폰 X
console.log(solution("02-1234-1234")); //서울 O
console.log(solution("0212341111")); //서울 X
console.log(solution("0311237890")); //경기 O
console.log(solution("061-012-7890")); //전남 X
console.log(solution("015-0157899")); //전국 X
console.log(solution("042-2123-7890")); //대전 O
console.log();

console.log(solution("001-1234-5678")); // ["국제전화", "O"]
console.log(solution("0021234567890")); // ["국제전화", "O"]
