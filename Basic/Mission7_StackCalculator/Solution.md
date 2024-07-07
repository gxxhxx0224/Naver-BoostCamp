## 기능 요구사항
- 스택 내부 공간은 총 8칸만 존재.
- 레지스터는 A, B 두 개만 존재하며, ADD나 SUB 명령으로 계산하는 용도로 사용. 레지스터나 스택 값은 모두 정수형을 기준으로 계산.

## 프로그래밍 요구사항
- `POPA` 명령은 스택 메모리에서 값 하나를 꺼내서 A 레지스터로 복사합니다. 만약 스택에 꺼낼 값이 없으면 "EMPTY"를 출력합니다.
- `POPB` 명령은 스택 메모리에서 값 하나를 꺼내서 B 레지스터로 복사합니다. 만약 스택에 꺼낼 값이 없으면 "EMPTY"를 출력합니다.
- `ADD` 명령은 A와 B 레지스터 값을 더해서 스택에 PUSH합니다.
- `SUB` 명령은 A 레지스터 값에서 B 레지스터 값을 빼서 스택에 PUSH합니다.
- `PUSH0` 명령은 스택에 0 값을 PUSH합니다.
- `PUSH1` 명령은 스택에 1 값을 PUSH합니다.
- `PUSH2` 명령은 스택에 2 값을 PUSH합니다.
- `SWAP` 명령은 A 레지스터 값과 B 레지스터 값을 맞교환합니다.
- `PRINT` 명령은 스택 마지막 값을 꺼내서 출력합니다. 이 때 스택은 하나 줄어듭니다. 만약 스택이 비어있으면 "EMPTY"를 출력에 추가합니다.

## 문제 상황 1
스택 계산기 구현 중, `ADD` 명령어를 실행했을 때, 예상치 못한 "ERROR" 메시지가 출력되었다.

### 원인
`ADD` 명령어를 수행할 때 레지스터 A와 B 중 하나라도 값이 null이면 "ERROR" 메시지를 반환하도록 되어 있었다. 하지만 코드에서 레지스터의 값이 null인지 확인하는 로직이 잘못 구현되어, 항상 "ERROR" 메시지를 반환했다.

### 코드 수정
`ADD` 함수에서 레지스터 A와 B의 값이 null인지 제대로 확인하도록 수정함.

#### 수정 전 코드
<pre><code>
add() {
    if (this.registerA === null || this.registerB === null) {
        return 'ERROR';
    }
    return this.push(this.registerA + this.registerB);
} </code></pre>
#### 수정 후 코드
<pre><code>add() {
    if (this.registerA === null || this.registerB === null) {
        return 'ERROR';
    }
    if (this.stack.length >= this.maxStackSize) {
        return 'OVERFLOW';
    }
    this.stack.push(this.registerA + this.registerB);
    return null;
}
</code></pre>


## 문제상황 2
swap() 로직을 구현하지 못했음.

### 결과
ADD 명령어가 레지스터 A와 B의 값을 제대로 더하고, 스택에 올바르게 값을 추가하게 되었다. "ERROR" 메시지가 더 이상 예상치 않게 출력되지 않으며, 스택 크기 초과 시 "OVERFLOW" 메시지도 올바르게 처리된다. SWAP 로직을 제외하곤 모두 구현했다.
