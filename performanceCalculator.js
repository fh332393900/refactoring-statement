module.exports = class PerformanceCalculator {
  getAmount () {
  }
  getVolumeCredits (perf) {
    return Math.max(perf.audience - 30, 0)
  }
}