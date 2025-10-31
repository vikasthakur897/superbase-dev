import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./components/auth";
import TaskManger from "./components/taskManger";
import "./App.css";
import { useEffect, useState } from "react";
import { supabaseClient } from "./superbase-client";

function App() {

  const [session, setSession] = useState<any>(null);

  const fetchSession = async () => {
   const currentSession = await supabaseClient.auth.getSession();
   console.log('Current session:', currentSession);
   setSession(currentSession.data);
  }

  useEffect(() => {
    fetchSession()
  }, [])
  

 
  return (
    <Router>
      <Routes>
        {
          session ? (
            <Route path="/dashboard" element={<TaskManger />} />
          ) : (
            <Route path="/" element={<Auth />} />
          )}
      </Routes>
    </Router>
  );
}

export default App;
