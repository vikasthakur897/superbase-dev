import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import { useEffect, useState } from "react";
import { supabaseClient } from "./superbase-client";
import { Auth } from "./components/auth";
import TaskManager from "./components/taskManger";

function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch current session
    const fetchSession = async () => {
      const { data } = await supabaseClient.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    fetchSession();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const logOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) console.error("Error signing out:", error.message);
    else setSession(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Auth page */}
        {!session && <Route path="/" element={<Auth />} />}

        {/* Dashboard page */}
        {session && (
            <Route
              path="/dashboard"
              element={<TaskManager logOut={logOut} />}
          />
        )}

        {/* Default redirect logic */}
        <Route
          path="*"
          element={
            session ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
