import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { WavyIcon } from "./components/Icons";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import LoginPage from "./pages/Login";
import Dashboard from "./pages/Transactions";
import TransactionDetails from "./pages/TransactionDetails";

const App = () => {
  return (
    <div className="min-h-dvh flex justify-between bg-custom-900 relative text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 w-full">
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />}></Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />}></Route>
            <Route
              path="/transaction/:id"
              element={<TransactionDetails />}
            ></Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <WavyIcon />
      <ToastContainer />
    </div>
  );
};

export default App;
