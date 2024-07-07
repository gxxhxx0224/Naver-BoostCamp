class LogEntry {
  constructor(level, timestamp, process, message) {
    this.level = level;
    this.timestamp = timestamp;
    this.process = process;
    this.message = message;
  }
}

class LogAnalyzer {
  constructor(logs) {
    this.logs = logs;
  }

  filterByLevel(level) {
    return this.logs.filter((log) => log.level === level);
  }

  sortByTimestamp() {
    return this.logs.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
  }

  filterByProcess(process) {
    return this.logs.filter((log) => log.process === process);
  }

  sortByProcess() {
    return this.logs.sort((a, b) => a.process.localeCompare(b.process));
  }

  countByLevel() {
    let count = {};
    this.logs.forEach((log) => {
      if (count[log.level]) {
        count[log.level]++;
      } else {
        count[log.level] = 1;
      }
    });
    return count;
  }

  countByProcess() {
    let count = {};
    this.logs.forEach((log) => {
      if (count[log.process]) {
        count[log.process]++;
      } else {
        count[log.process] = 1;
      }
    });
    return count;
  }
}

// Example usage
const logs = [
  new LogEntry(
    "error",
    "14:22:30.608355+0900",
    "airportd",
    "[corewifi] END REQ [GET BSSID]"
  ),
  new LogEntry(
    "default",
    "14:22:33.784903+0900",
    "Airmail",
    "[C264.1 Hostname#9e7acbfe:993 initial path ((null))] event"
  ),
  new LogEntry(
    "info",
    "14:23:16.765320+0900",
    "bluetoothd",
    "canScanNow session:<private>(Unspecified) allowed:1"
  ),
];

const analyzer = new LogAnalyzer(logs);

console.log(analyzer.filterByLevel("error"));
console.log(analyzer.sortByTimestamp());
console.log(analyzer.filterByProcess("bluetoothd"));
console.log(analyzer.sortByProcess());
console.log(analyzer.countByLevel());
console.log(analyzer.countByProcess());
