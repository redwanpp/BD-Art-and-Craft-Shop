import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar";
import { useEffect } from "react";


function App() {
  const {user, checkAuth, checkingAuth} = useUserStore();

  useEffect(() => {
    checkAuth();
  },[checkAuth]);


  if (checkingAuth) return <LoadingSpinner />

  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
      {/* Background gradient */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-700 via-cyan-950 to-slate-900' />
				</div>
			</div>
      
    <div className="relative z-50 pt-20">
    <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
    <Toaster />
    </div>
  )
}

export default App
