const TragedyCalculator = require('./tragedyCalculatore');
const ComedyCalculator = require('./comedyCalculator');

module.exports = class Invoice {
  constructor(props) {
    Object.assign(this, props);
  }

  getTotalVolumeCredits (plays) {
    let volumeCredits = 0;
    for (let perf of this.performances) {
      const play = plays[perf.playID];
      volumeCredits += this.createCalculator(play.type).getVolumeCredits(perf);
    }
    return volumeCredits;
  }

  getTotalAmount (plays) {
    let totalAmount = 0;
    for (let perf of this.performances) {
      const play = plays[perf.playID];
      totalAmount += this.createCalculator(play.type).getAmount(perf);
    }
    return totalAmount;
  }

  getPerformanceDetails (plays, result) {
    let details = '';
    for (let perf of this.performances) {
      const play = plays[perf.playID];
      let thisAmount = 0;
      thisAmount = this.createCalculator(play.type).getAmount(perf);
      // print line for this order
      details += `  ${play.name}: ${this.formatUSD(thisAmount)} (${perf.audience} seats)\n`;
    }
    result += details;
    return result;
  }

  formatUSD (number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(number / 100);
  }

  createCalculator (type) {
    let calculator;
    switch (type) {
      case 'tragedy':
        calculator = new TragedyCalculator();
        break;
      case 'comedy':
        calculator = new ComedyCalculator();
        break;
      default:
        throw new Error(`unknown type: ${type}`);
    }
    return calculator;
  }
}