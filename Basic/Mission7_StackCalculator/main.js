class StackCalculator {
  constructor() {
    this.stack = [];
    this.registerA = null;
    this.registerB = null;
    this.maxStackSize = 8;
  }

  // 명령어 수행 메소드
  executeCommands(commands) {
    let output = [];
    for (let command of commands) {
      switch (command) {
        case "POPA":
          output.push(this.popA());
          break;
        case "POPB":
          output.push(this.popB());
          break;
        case "ADD":
          output.push(this.add());
          break;
        case "SUB":
          output.push(this.sub());
          break;
        case "PUSH0":
          output.push(this.push(0));
          break;
        case "PUSH1":
          output.push(this.push(1));
          break;
        case "PUSH2":
          output.push(this.push(2));
          break;
        case "PRINT":
          output.push(this.print());
          break;
        default:
          output.push("UNKNOWN");
      }
    }
    return output.filter((result) => result !== null);
  }

  // A 레지스터에 스택에서 값 하나 복사
  popA() {
    if (this.stack.length === 0) {
      return "EMPTY";
    }
    this.registerA = this.stack.pop();
    return null;
  }

  // B 레지스터에 스택에서 값 하나 복사
  popB() {
    if (this.stack.length === 0) {
      return "EMPTY";
    }
    this.registerB = this.stack.pop();
    return null;
  }

  // A와 B 레지스터 값을 더해서 스택에 PUSH
  add() {
    if (this.registerA === null || this.registerB === null) {
      return "ERROR";
    }
    return this.push(this.registerA + this.registerB);
  }

  // A 레지스터 값에서 B 레지스터 값을 빼서 스택에 PUSH
  sub() {
    if (this.registerA === null || this.registerB === null) {
      return "ERROR";
    }
    return this.push(this.registerA - this.registerB);
  }

  // 스택에 값 PUSH
  push(value) {
    if (this.stack.length >= this.maxStackSize) {
      return "OVERFLOW";
    }
    this.stack.push(value);
    return null;
  }

  // 스택 마지막 값을 꺼내서 출력
  print() {
    if (this.stack.length === 0) {
      return "EMPTY";
    }
    return this.stack.pop().toString();
  }
}

// 테스트 케이스
const calc = new StackCalculator();

console.log(calc.executeCommands(["PRINT", "PUSH0", "PRINT", "POPA"])); // ["EMPTY", "0", "EMPTY"]
console.log(
  calc.executeCommands([
    "PUSH1",
    "PUSH1",
    "PUSH2",
    "POPA",
    "POPB",
    "ADD",
    "PRINT",
    "PRINT",
  ])
); // ["3", "1"]
console.log(
  calc.executeCommands([
    "PUSH2",
    "PUSH2",
    "PUSH1",
    "POPA",
    "POPB",
    "SUB",
    "POPA",
    "POPB",
    "ADD",
    "PRINT",
  ])
); // ["3"]
console.log(
  calc.executeCommands([
    "ADD",
    "PUSH2",
    "PUSH1",
    "PUSH0",
    "PUSH2",
    "PUSH1",
    "PUSH2",
    "PUSH2",
    "PUSH0",
    "PUSH2",
    "PUSH3",
  ])
); // ["ERROR", "OVERFLOW", "UNKNOWN"]
