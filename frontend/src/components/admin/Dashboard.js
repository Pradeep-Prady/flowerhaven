import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminProducts } from "../../actions/productActions";
import { getUsers } from "../../actions/userActions";
import { adminOrders as adminOrdersAction } from "../../actions/orderActions";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import MetaData from "./../layouts/MetaData";
export default function Dashboard() {
  const { products = [] } = useSelector((state) => state.productsState);
  const { adminOrders = [] } = useSelector((state) => state.orderState);
  const { users = [] } = useSelector((state) => state.userState);

  const dispatch = useDispatch();
  let outOfStock = 0;

  if (products.length > 0) {
    products.forEach((product) => {
      if (product.stock === 0) {
        outOfStock = outOfStock + 1;
      }
    });
  }

  let totalAmount = 0;
  if (adminOrders.length > 0) {
    adminOrders.forEach((order) => {
      totalAmount += order.totalPrice;
    });
  }

  useEffect(() => {
    dispatch(getAdminProducts);
    dispatch(getUsers);
    dispatch(adminOrdersAction);
  }, [dispatch]);

  return (
    <>
      <MetaData title={"Dashboard"} />
      <div className="w-full  sm:flex">
        <div className="sm:w-1/5 ">
          <Sidebar />
        </div>

        <div className="sm:w-4/5 ">
          <h2 className="text-center my-5">Dashboard</h2>
          <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  p-5">
            <div className="glass text-center p-5 m-5">
              <p>Total Amount</p>
              <p>{totalAmount}</p>
            </div>
            <div className="glass text-center p-5 m-5">
              <p> Products {products.length}</p>
              <Link to="/admin/products">
                <p>View Details</p>
              </Link>
            </div>
            <div className="glass text-center p-5 m-5">
              <p> Orders {adminOrders.length}</p>
              <Link to="/admin/orders">
                <p>View Details</p>
              </Link>
            </div>
            <div className="glass text-center p-5 m-5">
              <p> Users {users.length}</p>
              <Link to="/admin/users">
                <p>View Details</p>
              </Link>
            </div>
            <div className="glass text-center p-5 m-5">
              <p> Out of Stock {outOfStock}</p>
              {/* <p>View Details</p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
