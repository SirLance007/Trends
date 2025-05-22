import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./pages/Home";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CollectionPage from "./pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import MyOrdersPage from "./pages/MyOrdersPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./components/Admin/AdminHomePage";
import UserManagment from "./components/Admin/UserManagment";
import ProductManagment from "./components/Admin/ProductManagment";
import EditProducts from "./components/Admin/EditProducts";
import OrderManagment from "./components/Admin/OrderManagment";

import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectRoute from "./components/Common/ProtectRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <ToastContainer position="top-right" autoClose={2000} />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/collections/:collection"
              element={<CollectionPage />}
            />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route
              path="/order-confirmation"
              element={<OrderConfirmation />}
            ></Route>
            <Route path="order/:id" element={<OrderDetailsPage />}></Route>
            <Route path="my-orders" element={<MyOrdersPage />}></Route>
          </Route>
          {/* Admin Routes */}
          <Route
            path="/admin"
            role="admin"
            element={
              <ProtectRoute>
                {" "}
                <AdminLayout />{" "}
              </ProtectRoute>
            }
          >
            <Route index element={<AdminHomePage />}></Route>
            <Route path="users" element={<UserManagment />}></Route>
            <Route path="products" element={<ProductManagment />}></Route>
            <Route path="products/:id/edit" element={<EditProducts />}></Route>
            <Route path="orders" element={<OrderManagment />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
