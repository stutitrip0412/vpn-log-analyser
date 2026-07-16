import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {

    return (

        <Routes>

            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="*"
                element={<Navigate to="/login" replace />}
            />

            <Route path="/upload" element={<Dashboard />} />
<Route path="/logs" element={<Dashboard />} />
<Route path="/alerts" element={<Dashboard />} />
<Route path="/analytics" element={<Dashboard />} />
<Route path="/cases" element={<Dashboard />} />
<Route path="/evidence" element={<Dashboard />} />
<Route path="/custody" element={<Dashboard />} />
<Route path="/reports" element={<Dashboard />} />
<Route path="/settings" element={<Dashboard />} />

        </Routes>

    );

};

export default AppRoutes;