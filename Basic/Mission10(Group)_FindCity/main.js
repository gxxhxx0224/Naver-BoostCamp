const data = [
    ['0', '서울', '1946', '37.5665', '126.9780', '9720846'],
    ['1', '부산', '1963', '35.1796', '129.0756', '3413841'],
    ['2', '인천', '1981', '37.4563', '126.7052', '2938420'],
    ['3', '대구', '1981', '35.8714', '128.6014', '2414220'],
    ['4', '대전', '1995', '36.3504', '127.3845', '1475221'],
    ['5', '광주', '1986', '35.1595', '126.8526', '1454677'],
    ['6', '울산', '1997', '35.5384', '129.3114', '1159673'],
    ['7', '세종', '2012', '36.4875', '127.2816', '362259'],
    ['8', '수원', '1949', '37.2636', '127.0286', '1240374'],
    ['9', '창원', '2010', '35.2286', '128.6811', '1046188'],
    ['10', '포항', '1949', '36.0190', '129.3435', '511807'],
    ['11', '전주', '1949', '35.8242', '127.1480', '658346'],
    ['12', '청주', '1949', '36.6424', '127.4890', '847110'],
    ['13', '제주', '1955', '33.4996', '126.5312', '486306'],
    ['14', '고양', '1992', '37.6564', '126.8350', '1075500'],
    ['15', '용인', '1996', '37.2411', '127.1776', '1081914'],
    ['16', '천안', '1995', '36.8151', '127.1139', '666417'],
    ['17', '김해', '1995', '35.2342', '128.8811', '559648'],
    ['18', '평택', '1986', '36.9921', '127.1122', '519075'],
    ['19', '마산', '1949', '35.2138', '128.5833', '424192'],
    ['20', '군산', '1949', '35.9672', '126.7364', '266569'],
    ['21', '원주', '1955', '37.3422', '127.9202', '364738'],
    ['22', '의정부', '1963', '37.7389', '127.0455', '442782'],
    ['23', '김포', '1998', '37.6236', '126.7145', '442453'],
    ['24', '광명', '1981', '37.4772', '126.8664', '345262'],
    ['25', '춘천', '1995', '37.8813', '127.7298', '285584'],
    ['26', '안산', '1995', '36.7898', '127.0049', '321355'],
    ['27', '성남', '1973', '37.4200', '127.1265', '944626'],
    ['28', '구미', '1978', '36.1195', '128.3446', '402607'],
    ['29', '시흥', '1989', '37.3803', '126.8031', '446420'],
    ['30', '목포', '1949', '34.8118', '126.3922', '238718'],
    ['31', '익산', '1947', '35.9483', '126.9577', '292524'],
    ['32', '경주', '1955', '35.8562', '129.2247', '257041'],
    ['33', '의왕', '1986', '37.3446', '126.9688', '157346'],
    ['34', '부천', '1973', '37.4989', '126.7831', '843794'],
    ['35', '남양주', '1995', '37.6367', '127.2143', '736287'],
    ['36', '파주', '1997', '37.7598', '126.7805', '453589'],
    ['37', '거제', '1989', '34.8806', '128.6216', '241253'],
    ['38', '화성', '2001', '37.1997', '126.8310', '791057'],
    ['39', '강릉', '1995', '37.7519', '128.8761', '213658'],
  ];
  
  // 랜덤으로 K개의 중심점을 선택하는 함수
  function getRandom(K) {
    const randomNums = [];
    let i = 0;
  
    while (i < K) {
      let randomNum = Math.floor(Math.random() * 40);
      if (!randomNums.includes(randomNum)) {
        randomNums.push(randomNum);
        i++;
      }
    }
  
    return randomNums; // ex) [0, 14]
  }
  
  // K개의 빈 2차원 배열 생성 함수
  function createEmpty2DArray(rows) {
    let arr = [];
    for (let i = 0; i < rows; i++) {
      arr.push([]);
    }
    return arr;
  }
  
  // 배열에서 최소값의 인덱스를 찾는 함수
  function findMinIndex(arr) {
    if (arr.length === 0) {
      return -1; // 빈 배열 처리
    }
    return arr.reduce(
      (minIndex, currentValue, currentIndex, array) =>
        currentValue < array[minIndex] ? currentIndex : minIndex,
      0
    );
  }
  
  // 주어진 중심점을 기반으로 각 도시가 속하는 그룹을 설정하는 함수
  function makeGroup(centerValues) {
    const group = createEmpty2DArray(centerValues.length);
  
    for (let i = 0; i < data.length; i++) {
      const distances = [];
      for (let centerIdx of centerValues) {
        const distance = Math.sqrt(
          (parseFloat(data[i][3]) - parseFloat(data[centerIdx][3])) ** 2 +
            (parseFloat(data[i][4]) - parseFloat(data[centerIdx][4])) ** 2
        );
        distances.push(distance);
      }
      const minIndex = findMinIndex(distances);
      group[minIndex].push(data[i][1]);
    }
  
    return group;
  }
  
  // kmeans_pop 함수 구현
  function kmeans_pop(K) {
    const centerValues = getRandom(K);
    const groups = makeGroup(centerValues);
  
    // 각 그룹의 중심점 계산
    const centers = centerValues.map((centerIdx) => ({
      year: parseInt(data[centerIdx][2]),
      population: parseInt(data[centerIdx][5]),
    }));
  
    // 결과 출력 형식
    for (let i = 0; i < K; i++) {
      console.log(
        `그룹 #${i + 1} 중심값: (${centers[i].year}, ${centers[i].population})`
      );
      console.log(`그룹 #${i + 1} 도시들: ${JSON.stringify(groups[i])}`);
    }
  }
  
  // kmeans_long 함수 구현
  function kmeans_long(K) {
    const centerValues = getRandom(K);
    const groups = makeGroup(centerValues);
  
    // 각 그룹의 중심점 계산
    const centers = centerValues.map((centerIdx) => ({
      year: parseFloat(data[centerIdx][2]),
      longitude: parseFloat(data[centerIdx][4]),
    }));
  
    // 결과 출력 형식
    for (let i = 0; i < K; i++) {
      console.log(
        `그룹 #${i + 1} 중심값: (${centers[i].year.toFixed(2)}, ${centers[
          i
        ].longitude.toFixed(2)})`
      );
      console.log(`그룹 #${i + 1} 도시들: ${JSON.stringify(groups[i])}`);
    }
  }
  
  // 예시 실행
  console.log('kmeans_pop() 동작');
  kmeans_pop(2);
  console.log('kmeans_long() 동작');
  kmeans_long(4);
