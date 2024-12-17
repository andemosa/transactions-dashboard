import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { LogoutIcon } from "../components/Icons";

import { useTransactionStore } from "../store/transactionStore";
import { clearToken } from "../utils/auth";

const TransactionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getTransactionById } = useTransactionStore();
  const transaction = getTransactionById(Number(id!));

  const navigate = useNavigate();

  if (!transaction) {
    return <div className="text-center text-white">Transaction not found</div>;
  }

  return (
    <div className="container mx-auto p-6 pb-40">
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
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
      >
        <FaArrowLeft />
        <span>Back to Dashboard</span>
      </button>

      <div className="mt-6 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Transaction ID:</h3>
            <p>{transaction.id}</p>
          </div>

          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Date:</h3>
            <p>{new Date(transaction.date).toLocaleString()}</p>
          </div>

          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Amount:</h3>
            <p>${transaction.amount.toFixed(2)}</p>
          </div>

          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Description:</h3>
            <p>{transaction.description}</p>
          </div>

          <div className="flex justify-between">
            <h3 className="text-xl font-semibold">Status:</h3>
            <span
              className={`px-2 py-1 rounded-full text-white ${
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
