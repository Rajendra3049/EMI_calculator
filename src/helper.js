export function calculateEMI({ principal, interestRate, tenureInMonths }) {
  let monthlyInterestRate = interestRate / 12 / 100;
  let numerator =
    principal *
    monthlyInterestRate *
    Math.pow(1 + monthlyInterestRate, tenureInMonths);
  let denominator = Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1;
  let emi = numerator / denominator;

  let totalInterest = emi * tenureInMonths - principal;

  let monthDetails = [];

  let balance = principal;
  for (let month = 1; month <= tenureInMonths; month++) {
    let interestCharged = balance * monthlyInterestRate;
    let principalPaid = emi - interestCharged;
    let totalPayment = emi;
    balance = Math.abs(balance - principalPaid);

    monthDetails.push({
      month,
      emi: emi.toFixed(2),
      principalPaid: principalPaid.toFixed(2),
      interestCharged: interestCharged.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      balance: balance.toFixed(2),
    });
  }
  return {
    emi: emi.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    monthDetails,
  };
}
