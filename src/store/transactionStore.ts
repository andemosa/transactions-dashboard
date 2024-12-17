import { create } from "zustand";

import { transactions } from "../utils/transactions";
import { ITransaction, StatusType } from "../types";

interface ITransactionState {
  transactions: ITransaction[];
  filteredTransactions: ITransaction[];
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
  filterStatus: StatusType;
  setFilterStatus: (status: StatusType) => void;
  setSortBy: (sortBy: "date" | "amount") => void;
  setSortOrder: (order: "asc" | "desc") => void;
  getTransactionById: (id: number) => ITransaction | undefined;
  getSortedFilteredTransactions: () => ITransaction[];
}

export const useTransactionStore = create<ITransactionState>((set, get) => ({
  transactions: transactions,
  filteredTransactions: transactions,
  sortBy: "date",
  sortOrder: "asc",
  filterStatus: "all",

  getTransactionById: (id: number) => {
    return get().transactions.find((t) => t.id === id);
  },

  setSortBy: (sortBy: "date" | "amount") => set(() => ({ sortBy })),
  setSortOrder: (order: "asc" | "desc") => set(() => ({ sortOrder: order })),

  setFilterStatus: (status: StatusType) =>
    set((state) => {
      const filtered = state.transactions.filter(
        (transaction) => status === "all" || transaction.status === status
      );
      return {
        filterStatus: status,
        filteredTransactions: filtered,
      };
    }),

  getSortedFilteredTransactions: () => {
    return get().filteredTransactions.sort(
      (a: ITransaction, b: ITransaction) => {
        const aValue =
          get().sortBy === "date" ? new Date(a.date).getTime() : a.amount;
        const bValue =
          get().sortBy === "date" ? new Date(b.date).getTime() : b.amount;

        return get().sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }
    );
  },
}));
