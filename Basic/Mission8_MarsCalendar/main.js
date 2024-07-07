const readline = require("readline");

// readline 모듈을 사용하여 사용자 입력을 받기 위한 인터페이스 생성
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 화성 달력 계산에 필요한 상수들
const martianYearLength = 668; // 기본 화성년의 길이
const martianLeapYearLength = 669; // 윤 화성년의 길이
const martianDaysInMartianYear = 668.5907; // 화성일 기준 1 화성년
const martianWeekLength = 7; // 화성 주의 길이
const martianMonthLength = 28; // 기본 화성 월의 길이

// 화성 요일 이름
const martianDaysOfWeek = ["Sol", "Lun", "Mar", "Mer", "Jov", "Ven", "Sat"];

// 지구 달력의 윤년인지 확인하는 함수
function isLeapYear(year) {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      return year % 400 === 0;
    }
    return true;
  }
  return false;
}

// 지구 날짜를 화성 날짜로 변환하는 함수
function convertToMartianDate(earthDate) {
  const earthEpoch = new Date("0001-01-01");
  const inputDate = new Date(earthDate);

  // 입력된 날짜와 에포크 사이의 일 수 차이 계산
  let daysDifference = Math.floor(
    (inputDate - earthEpoch) / (1000 * 60 * 60 * 24)
  );

  // 윤년 계산
  let years = earthEpoch.getFullYear();
  for (
    let year = earthEpoch.getFullYear();
    year < inputDate.getFullYear();
    year++
  ) {
    if (isLeapYear(year)) {
      daysDifference++;
    }
  }

  // 화성 년, 월, 일 계산
  let martianYears = Math.floor(daysDifference / martianDaysInMartianYear);
  let martianDaysLeft = daysDifference % martianDaysInMartianYear;

  // 윤 화성 년 처리
  if (martianDaysLeft >= martianYearLength) {
    martianYears++;
    martianDaysLeft -= martianYearLength;
  }

  // 화성 월과 일 계산
  let martianMonths = Math.floor(martianDaysLeft / martianMonthLength);
  let martianDays = (martianDaysLeft % martianMonthLength) + 1; // 화성일은 1부터 시작

  // 화성 요일 계산
  let martianDayOfWeek = martianDaysOfWeek[martianDaysLeft % martianWeekLength];

  return {
    martianYears: martianYears,
    martianMonths: martianMonths + 1, // 화성 월은 1부터 시작
    martianDays: martianDays,
    martianDayOfWeek: martianDayOfWeek,
  };
}

// Progress Bar 구현 함수
function showProgressBar(callback) {
  let currentPercentage = 0;
  const totalSeconds = 5;
  const interval = setInterval(() => {
    currentPercentage += 10;
    const progressBar = Array.from({ length: 10 }, (_, index) =>
      index < currentPercentage / 10 ? "▓" : "░"
    ).join("");
    process.stdout.write(`\r${progressBar} ${currentPercentage}%`);

    if (currentPercentage >= 100) {
      clearInterval(interval);
      console.log("\n화성까지 여행 100%");
      callback();
    }
  }, (totalSeconds * 1000) / 10); // 10% 마다 업데이트
}

// 사용자로부터 지구 날짜를 입력 받음
rl.question("지구날짜는? (YYYY-MM-DD) ", (earthDate) => {
  // Progress Bar 시작
  showProgressBar(() => {
    // 화성 날짜로 변환
    const martianDate = convertToMartianDate(earthDate);

    // 화성 날짜 출력
    console.log(
      `\n지구날은 ${earthDate} => ${martianDate.martianYears} 화성년 ${martianDate.martianMonths}월 ${martianDate.martianDays}일`
    );

    // 화성 달력 출력
    console.log(
      `\n     ${martianDate.martianYears}년 ${martianDate.martianMonths}월`
    );
    console.log(martianDaysOfWeek.join(" "));

    let day = 1;
    for (let week = 0; week < 4; week++) {
      let weekLine = "";
      for (let dayOfWeek = 0; dayOfWeek < martianWeekLength; dayOfWeek++) {
        if (day <= martianMonthLength) {
          weekLine += `${day.toString().padStart(2, " ")} `;
          day++;
        } else {
          weekLine += "   ";
        }
      }
      console.log(weekLine.trim());
    }

    rl.close();
  });
});
