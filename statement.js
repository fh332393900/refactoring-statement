const Invoice = require('./invoice');

function statement (invoice, plays) {
  const invoiceInstance = new Invoice(invoice);

  let result = `Statement for ${invoiceInstance.customer}\n`;
  result = invoiceInstance.getPerformanceDetails(plays, result);
  result += `Amount owed is ${formatUSD(invoiceInstance.getTotalAmount(plays))}\n`;
  result += `You earned ${invoiceInstance.getTotalVolumeCredits(plays)} credits\n`;
  return result;
}

function formatUSD (number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(number / 100);
}

module.exports = statement;
