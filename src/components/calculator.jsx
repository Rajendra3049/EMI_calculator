import React from "react";
import EmiTable from "./table";
import { calculateEMI } from "../helper";

const Calculator = () => {
  const [loanAmount, setLoanAmount] = React.useState(0);
  const [interestRate, setInterestRate] = React.useState(0);
  const [tenure, setTenure] = React.useState(1);

  const [interestAmount, setInterestAmount] = React.useState(0);
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [emiAmount, setEmiAmount] = React.useState(0);
  const [emiDetails, setEmiDetails] = React.useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    let data = calculateEMI({
      principal: loanAmount,
      interestRate: interestRate,
      tenureInMonths: tenure,
    });

    setEmiAmount(data.emi);
    setInterestAmount(data.totalInterest);
    setTotalAmount(loanAmount + Number(data.totalInterest));
    setEmiDetails(data.monthDetails);
    console.log(data.monthDetails);
  }

  return (
    <div className="w-[50%] m-auto mt-8 border-2 p-4 pb-8">
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="loanAmount" className="text-lg font-medium">
            Loan Amount
          </label>
          <input
            name="loanAmount"
            type="number"
            className="w-full px-4 py-2 mt-2 border-2 rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Loan Amount"
            required
            defaultValue={loanAmount}
            onChange={(e) => {
              let num = Number(e.target.value);
              setLoanAmount(num);
            }}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tenure" className="text-lg font-medium">
            Tenure
          </label>
          <input
            name="tenure"
            type="number"
            className="w-full px-4 py-2 mt-2 border-2 rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Tenure"
            defaultValue={tenure}
            onChange={(e) => {
              let num = Number(e.target.value);
              setTenure(num);
            }}
          />
          <span className="ml-2 text-gray-500 ">per month</span>
        </div>
        <div className="mb-4">
          <label htmlFor="interest" className="text-lg font-medium">
            Interest Rate
          </label>
          <input
            id="interest"
            type="range"
            min={0}
            max={30}
            defaultValue={interestRate}
            step={0.5}
            onChange={(e) => {
              let num = Number(e.target.value);
              setInterestRate(num);
            }}
            className="w-full h-1 mt-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-re-700"
          />
          <span className="block mt-2 text-md font-medium">
            {interestRate}%
          </span>
        </div>
        <button
          type="submit"
          className={`w-full px-6 py-3 mt-4 text-lg font-medium text-white bg-blue-400 rounded-full hover:bg-blue-500 focus:outline-none focus:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed`}
          disabled={loanAmount === 0 || interestRate === 0}>
          Calculate EMI
        </button>
      </form>

      <div className=" w-[95%] m-auto mt-4 mb-4 bg-white rounded-lg shadow-md">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Monthly EMI</span>
            <span className="text-lg">₹ {emiAmount}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg">Loan Amount</span>
            <span className="text-lg">₹ {loanAmount}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg">Total Interest</span>
            <span className="text-lg">₹ {interestAmount}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg">Total Amount</span>
            <span className="text-lg">₹ {totalAmount}</span>
          </div>
        </div>
      </div>

      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-3 text-lg font-medium text-gray-700 bg-gray-200">
              MONTHS
            </th>
            <th className="px-4 py-3 text-lg font-medium text-gray-700 bg-gray-200">
              EMI
            </th>
            <th className="px-4 py-3 text-lg font-medium text-gray-700 bg-gray-200">
              TOWARDS LOAN
            </th>
            <th className="px-4 py-3 text-lg font-medium text-gray-700 bg-gray-200">
              TOWARDS INTEREST
            </th>
            <th className="px-4 py-3 text-lg font-medium text-gray-700 bg-gray-200">
              TOTAL PAY
            </th>
            <th className="px-4 py-3 text-lg font-medium text-gray-700 bg-gray-200">
              OUTSTANDING LOAN
            </th>
          </tr>
        </thead>
        <tbody>
          {emiDetails.length > 0 &&
            emiDetails.map((e, i) => (
              <EmiTable
                month={e.month}
                emi={e.emi}
                remaining={e.balance}
                towardLoan={e.principalPaid}
                towardInterest={e.interestCharged}
                totalPay={e.totalPayment}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calculator;
