import { ITransaction } from "../types";

const descriptions = [
  "Payment for services",
  "Refund from purchase",
  "Subscription fee",
  "Payment for goods",
  "Invoice payment",
];

export const statuses: ("success" | "pending" | "failed")[] = [
  "success",
  "pending",
  "failed",
];

function generateRandomDate(): string {
  const now = new Date();
  const randomTime = now.getTime() - Math.random() * (30 * 24 * 60 * 60 * 1000);
  const randomDate = new Date(randomTime);
  return randomDate.toISOString().split("T")[0];
}

function generateRandomTransaction(id: number): ITransaction {
  const randomDescription =
    descriptions[Math.floor(Math.random() * descriptions.length)];
  const randomAmount = parseFloat((Math.random() * 1000).toFixed(2));
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomDate = generateRandomDate();

  return {
    id,
    date: randomDate,
    amount: randomAmount,
    description: randomDescription,
    status: randomStatus,
  };
}

function generateTransactions(count: number): ITransaction[] {
  const transactions: ITransaction[] = [];
  for (let i = 1; i <= count; i++) {
    transactions.push(generateRandomTransaction(i));
  }
  return transactions;
}

export const transactions = generateTransactions(100);

export const downloadCSV = (transactions: ITransaction[]) => {
  const csvRows = [
    // Header row
    ["Date", "Amount", "Description", "Status"],
    // Data rows
    ...transactions.map((transaction) => [
      transaction.date,
      transaction.amount.toFixed(2),
      transaction.description,
      transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1),
    ]),
  ];

  const csvContent = csvRows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
  window.URL.revokeObjectURL(url);
};
