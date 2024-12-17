import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

import { LogoutIcon } from "../components/Icons";

import { useTransactionStore } from "../store/transactionStore";
import { downloadCSV, statuses } from "../utils/transactions";
import { clearToken } from "../utils/auth";
import { StatusType } from "../types";

const Dashboard: React.FC = () => {
  const {
    filterStatus,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    setFilterStatus,
    getSortedFilteredTransactions,
  } = useTransactionStore();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const sortedTransactions = getSortedFilteredTransactions();

  const startIndex = (currentPage - 1) * transactionsPerPage;
  const paginatedTransactions = sortedTransactions.slice(
    startIndex,
    startIndex + transactionsPerPage
  );

  const totalPages = Math.ceil(sortedTransactions.length / transactionsPerPage);

  const handleSort = (column: "date" | "amount") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto sm:p-6 !pb-40">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-white">
          Transactions Dashboard
        </h1>
        <button
          className="flex items-center gap-2"
          onClick={() => {
            clearToken();
            navigate("/login");
          }}
        >
          <span className="hidden sm:inline">Logout</span> <LogoutIcon />
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div className="flex flex-col md:flex-row gap-4 md:items-center text-lg text-white">
          <h2>Total transactions: {sortedTransactions.length}.</h2>
          <h3>Displaying {paginatedTransactions.length} transactions</h3>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <div>
            <label htmlFor="statusFilter" className="text-white mr-2">
              Filter by Status
            </label>
            <select
              id="statusFilter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as StatusType)}
              className="bg-gray-200 p-2 rounded-md text-black"
            >
              {["all", ...statuses].map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => downloadCSV(paginatedTransactions)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            aria-label="Download transactions as CSV"
          >
            Download CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-hidden">
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b">
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("date")}
                >
                  Date
                  {sortBy === "date" &&
                    (sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />)}
                  {sortBy !== "date" && <FaSort />}
                </th>
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("amount")}
                >
                  Amount
                  {sortBy === "amount" &&
                    (sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />)}
                  {sortBy !== "amount" && <FaSort />}
                </th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left flex items-center justify-center">
                  Status
                </th>
                <th className="p-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-3 text-center text-gray-500">
                    No transactions available.
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="p-3">{transaction.date}</td>
                    <td className="p-3">${transaction.amount.toFixed(2)}</td>
                    <td className="p-3">{transaction.description}</td>
                    <td className="p-3 flex items-center justify-center">
                      <span
                        className={`flex items-center justify-center px-2 py-1 rounded-full text-white min-w-[90px] ${
                          transaction.status === "success"
                            ? "bg-green-500"
                            : transaction.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-3">
                      <Link
                        to={`/transaction/${transaction.id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : 1)
          }
        >
          Previous
        </button>
        <div className="flex items-center space-x-2">
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={() =>
            handlePageChange(
              currentPage < totalPages ? currentPage + 1 : totalPages
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
