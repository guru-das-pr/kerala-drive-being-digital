import { useEffect, useState } from "react";
import "./App.css";
import {
  createBrowserRouter, createRoutesFromElements, Route, RouterProvider,
} from "react-router-dom";
import LoadingSpinner from "./components/spinners/LoadingSpinner";
import LandingPage from "./pages/LandingPage";


export default function App() {
  // <======================================== NOTES START ==============================================>

  // Libraries used :   "tailwind-css" for css
  // Read the documentaion in their respective sites for the above mentioned libraries before making changes in the code.
  // To run the code: npm run dev
  // First install all dependencies :- npm intsall
  // Then run the code :- npm run dev

  // created date : 14-OCT-2024 || created by : Gurudas P R  || module : 1 ||
  // modified date : 05/09/2024 || modified by : Gurudas P R  || module : 1 ||
  // modified date : 24/09/2024 || modified by : Gurudas P R   || module : 1 ||

  // Technical summary(Pre-setups) created date/by :  Gurudas P R  ||
  // Domain :   || 
  // Hosting :   ||
  // SSL :   ||
  // Database :  ||

  // Phase summary :   || created date/by :  Gurudas P R   ||
  // Phase 1 :  SetUps ||
  // Phase 2 :  Development/Main page creation ||
  // Phase 3 :  Production  ||

  // <======================================== NOTES END ==============================================>

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3500); // Adjust the timeout to match your animation duration
    };

    handleRouteChange();
  }, [location.pathname]);

  useEffect(() => {
    // Hide the loading spinner after the initial load
    const initialLoadTimeout = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(initialLoadTimeout);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

        <Route>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/about" element={<h1>Product and Services</h1>} />
        </Route>
      </>

    )
  )
  return (
    <>
      {loading ? <LoadingSpinner /> : <RouterProvider router={router} />}
    </>
  )
}