import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import ShopkeeperSignIn from "./components/shopkeeper/ShopkeeperSingIn";
import ShopkeeperSignUp from "./components/shopkeeper/ShopkeeperSignUp";
import SignIn from "./components/customer/SignIn";
import SignUp from "./components/customer/SignUp";
import DashBoard from "./components/shopkeeper/DashBoard";
import Home from "./components/customer/Home";
import ProductDetail from "./components/shopkeeper/ProductDetail";
import Navbar from "./components/Navbar";
import './App.css';
import ProductDetails from "./components/customer/ProductDetails";
import Cart from "./components/customer/Cart";
import Error from "./components/Error";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import Payment from "./components/customer/Payment";

function App() {
  const user = localStorage.getItem('user')
 
 
  return (
    <div className="App">
        <Router>
            <Navbar />
            <Routes>
              <Route path='/business' element={!user && <ShopkeeperSignIn />} />
              <Route path='/business/signup' element={!user && <ShopkeeperSignUp />} />
              <Route path="/" element={!user && <SignIn />} />
              <Route path="/signup" element={!user && <SignUp />} />
              <Route path="/dashboard/:params" element={<DashBoard />} />
              <Route path="/home/:paramstwo" element={<Home />} />
              <Route path="/details/:paramsone" element={<ProductDetail />} />
              <Route path="/product/:paramsthree" element={<ProductDetails />} />
              <Route path="/payment/:paramsfour" element={<Payment />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
        </Router>
    </div>
  );
}

export default App;
