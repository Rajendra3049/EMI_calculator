import React from "react";

const EmiTable = (props) => {
  const { month, emi, remaining, towardLoan, towardInterest, totalPay } = props;
  return (
    <tr>
      <td className="px-4 py-3 text-center">{month}</td>
      <td className="px-4 py-3 text-center">{emi}</td>
      <td className="px-4 py-3 text-center">{towardLoan}</td>
      <td className="px-4 py-3 text-center">{towardInterest}</td>
      <td className="px-4 py-3 text-center">{totalPay}</td>
      <td className="px-4 py-3 text-center">{remaining}</td>
    </tr>
  );
};

export default EmiTable;
