## 요구사항

### 학습 목표
- 배열로 스택 구조를 직접 구현할 수 있다.
- 스택 동작을 이해하고 원하는 동작을 처리할 수 있다.
- 레지스터 역할을 이해할 수 있다.
- 동작 구현을 위해서 함수를 작게 분리할 수 있다.

### 사전지식
- 스택 Stack 동작 방식에 대해 학습해야 합니다.

### 기능요구사항
다음과 같은 명령어를 지원하는 간단한 스택메모리 계산기를 만들려고 합니다.

![image](https://github.com/gxxhxx0224/Naver-BoostCamp/assets/80369805/71b09535-78dd-46e4-8b73-3e6a53c37539)

스택 내부 공간은 총 8칸만 존재합니다.

레지스터는 A, B 두 개만 존재하며, ADD나 SUB 명령으로 계산하는 용도로 사용합니다. 레지스터나 스택 값은 모두 정수형을 기준으로 계산합니다.

### 프로그래밍 요구사항
계산기가 지원하는 명령은 다음과 같습니다.

- `POPA` 명령은 스택 메모리에서 값 하나를 꺼내서 A 레지스터로 복사합니다. 만약 스택에 꺼낼 값이 없으면 "EMPTY"를 출력합니다.
- `POPB` 명령은 스택 메모리에서 값 하나를 꺼내서 B 레지스터로 복사합니다. 만약 스택에 꺼낼 값이 없으면 "EMPTY"를 출력합니다.
- `ADD` 명령은 A와 B 레지스터 값을 더해서 스택에 PUSH합니다.
- `SUB` 명령은 A 레지스터 값에서 B 레지스터 값을 빼서 스택에 PUSH합니다.
- `PUSH0` 명령은 스택에 0 값을 PUSH합니다.
- `PUSH1` 명령은 스택에 1 값을 PUSH합니다.
- `PUSH2` 명령은 스택에 2 값을 PUSH합니다.
- `SWAP` 명령은 A 레지스터 값과 B 레지스터 값을 맞교환합니다.
- `PRINT` 명령은 스택 마지막 값을 꺼내서 출력합니다. 이 때 스택은 하나 줄어듭니다. 만약 스택이 비어있으면 "EMPTY"를 출력에 추가합니다.

### 제한 사항
- 입력값은 명령만 포함하고 있습니다.
- 입력값 배열은 최대 100까지만 포함합니다.
- 입력값 배열에 모든 명령을 처리하고 하면 계산을 멈추고 return 합니다.
- 레지스터 A와 B는 POP 명령으로 스택에서 값을 가져올 수 있습니다. 실행하고 처음에는 값이 없습니다.
- 만약 레지스터 A나 B가 초기 상태로 값이 없으면, ADD, SUB, SWAP 연산을 수행할 수 없어서 "ERROR"를 출력합니다.
- 스택에서 꺼내는 POPA, POPB, PRINT 명령을 수행할 때 값이 없으면 "EMPTY"를 출력합니다.
- 스택에 값을 추가하는 ADD, SUB, PUSH0, PUSH1, PUSH2 명령을 수행할 때, 8칸을 모두 채운 이후에는 "OVERFLOW"를 출력에 추가합니다.
- 입력한 명령 중에 처리할 수 없는 명령의 경우는 "UNKNOWN"을 출력하고 다음 명령을 수행합니다.
- 8개 높이(또는 길이)를 가지는 Stack 동작 PUSH, POP 구현은 각 언어에서 제공하는 배열Array, 리스트List, 벡터Vector 등 자료구조만 이용해서 별도 타입을 구현하세요.
- 긴 함수 하나로 구현하지 말고, 각 명령어 처리는 개별 함수나 메소드로 분리해서 작성해야 합니다. 특히 하나의 명령어는 개별 함수로 분리해서 작성하세요.

### 예상결과 및 동작예시

#### 예시 1
- 입력값: `["PRINT", "PUSH0", "PRINT", "POPA"]`
- 결과: `["EMPTY", "0", "EMPTY"]`

처음 `PRINT`는 스택이 비어있으니 "EMPTY", 그 다음 `PUSH0`을 하고 `PRINT`하면 0을 출력합니다.
그 다음 `POPA`는 스택이 비어있으니 "EMPTY"를 출력합니다.

#### 예시 2
- 입력값: `["PUSH1", "PUSH1", "PUSH2", "POPA", "POPB", "SWAP", "ADD", "PRINT", "PRINT"]`
- 결과: `["3", "1"]`

스택에 1, 1, 2 순서로 값을 넣고 `POPA`로 2를 꺼내서 A에 보관, 1을 꺼내서 B에 보관합니다.
`SWAP`으로 A에 1, B에 2로 바뀌고 `ADD`로 1+2 = 3 값을 다시 스택에 넣고, `PRINT`로 꺼내서 3을 출력하고, 한 번 더 `PRINT`로 1을 꺼내서 출력합니다.

#### 예시 3
- 입력값: `["PUSH2", "PUSH2", "PUSH1", "POPA", "POPB", "SWAP", "SUB", "POPA", "POPB", "ADD", "PRINT"]`
- 결과: `["3"]`

스택에 2, 2, 1 순서로 값을 넣고, `POPA`로 1을 꺼내서 A에 보관, `POPB`로 2를 꺼내서 B에 보관합니다.
`SWAP`으로 A에 2로, B에 1로 바뀌고, `SUB`로 2-1 = 1 값을 다시 스택에 넣고, `POPA`로 1을 꺼내서 A에 보관, 2을 꺼내서 B에 보관합니다.
`ADD`로 1+2 = 4 값을 스택에 넣고 `PRINT`로 꺼내서 3를 출력합니다.

#### 예시 4
- 입력값: `["ADD", "PUSH2", "PUSH1", "PUSH0", "PUSH2", "PUSH1", "PUSH2", "PUSH2", "PUSH0", "PUSH2", "PUSH3"]`
- 결과: `["ERROR", "OVERFLOW", "UNKNOWN"]`

레지스터에 값이 없는 데 `ADD`는 실패해서 "ERROR"를 출력합니다.
`PUSH` 명령을 9개 수행하면서 9번째 명령은 실패해서 "OVERFLOW"를 출력합니다.
마지막 `PUSH3` 명령은 수행하지 못하기 때문에 "UNKNOWN"을 출력합니다.
