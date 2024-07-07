## 기능요구사항
3가지 발판 유형을 가지는 사다리 게임을 구현하려고 한다.

- 다음 요구사항을 만족하도록 사다리 데이터 구조를 결정한다.

- 사다리 데이터를 모두 빈상태로 초기화 함수를 구현한다. reset()

- 사다리 데이터 구조에 발판을 랜덤하게 생성하는 함수를 구현한다. randomFill()

  - 사다리 데이터에 발판 출력용 문자열을 직접 넣지 않는다.

- 사다리 데이터 구조를 분석하는 함수를 구현한다. analyze()

- 사다리 데이터 구조를 문자열로 출력하는 함수를 구현한다. display()

- 사다리 발판 종류

  - --- 1자 발판 : 좌→우, 우→좌 양쪽에서 모두 이동 가능하다.

  - \-\ 우하향 발판 : 좌→우에서만 이동 가능하다.

  - /-/ 좌하향 발판 : 우→좌에서만 이동 가능하다.

- 참가자는 5명으로, 사다리 높이는 5칸으로 고정한다.

## 프로그래밍 요구사항
#### 제약사항
- 클래스나 객체로 구현하지 않고 아래 함수들만 구현해도 무방하다.

- 모든 함수를 main 하나의 파일에 작성한다.

  - 자바스크립트 main.js , 스위프트 main.swift, 코틀린 main.kt

#### reset() 함수
- 사다리 데이터 구조를 초기화한다.

- 모두 비어있는 상태로 만들어야 한다.

#### randomFill() 함수
- 랜덤하게 3가지 발판 종류를 선택해서 사다리 데이터 구조를 채운다.

- 총 발판 몇 개를 채울지도 랜덤하게 결정한다.

#### analyze() 함수
- 사다리 데이터 구조를 분석한 결과를 리턴한다.

  - 좌우에 1자 발판이 연속으로 나오면 false

  - 좌측에 우하향 발판 + 우측에 좌하향 발판이 연속으로 나오면 false
  
  - 좌측에 좌하향 발판 + 우측에 우하향 발판이 연속으로 나오면 false

  - 위에 해당하는 경우가 없으면 true를 return

#### display() 함수
- 사다리 데이터 구조를 분석해서 문자열로 리턴한다.

- 사다리 세로는 | 파이프 문자로 출력한다.

- 발판 종류별로 출력하는 형식은 다음과 같다.

  - --- 1자 발판

  - \-\ 우하향 발판

  - /-/ 좌하향 발판

  - 빈 발판
  
- 한 줄 마지막 끝에는 줄바꿈 문자 \n을 붙여서 출력한다.

- 출력은 analyze() 동작과 상관없이 동작한다.

## 예상결과 및 동작예시
### 예시 1. reset() + display() 한 경우
<pre>
|   |   |   |   |\n
|   |   |   |   |\n
|   |   |   |   |\n
|   |   |   |   |\n
|   |   |   |   |\n</pre>
### 예시 2. reset() + randomFill() + display() 한 경우
<pre>|   |   |---|   |\n
|\-\|---|   |/-/|\n
|   |/-/|---|   |\n
|---|   |\-\|---|\n
|   |\-\|---|   |\n</pre>
### 예시 3. reset() + randomFill() + analyze() false + display() 한 경우
<pre>|   |   |---|   |\n
|\-\|---|---|   |\n
|   |/-/|---|   |\n
|---|   |\-\|---|\n
|   |\-\|---|   |\n </pre>
또는
<pre>
|   |   |---|   |\n
|/-/|---|   |   |\n
|   |/-/|\-\|   |\n
|---|   |\-\|---|\n
|   |\-\|---|   |\n</pre>