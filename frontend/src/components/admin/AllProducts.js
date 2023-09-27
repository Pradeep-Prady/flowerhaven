import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAdminProducts } from "../../actions/productActions";
import { clearError, clearProductDeleted } from "../../slices/productSlice";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function AllProducts() {
  const {
    products = [],
    loading = true,
    error,
  } = useSelector((state) => state.productsState);
  const { isProductDeleted, error: productError } = useSelector(
    (state) => state.productState
  );
  const dispatch = useDispatch();

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error || productError) {
      toast.error(error, {
        position: "bottom-center",
        duration: 2000,
        style: {
          border: "1px solid white",
          background: "rgba(255, 255, 255, 0.08)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          color: "black",
        },
      });
      dispatch(clearError());

      return;
    }
    if (isProductDeleted) {
      toast.success(`Product Deleted Successfully`, {
        position: "bottom-center",
        duration: 2000,
        style: {
          border: "1px solid white",
          background: "rgba(255, 255, 255, 0.08)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          color: "black",
        },
      });
      dispatch(clearProductDeleted());

      return;
    }

    dispatch(getAdminProducts);
  }, [dispatch, error, isProductDeleted, productError]);

  return (
    <div className="w-full  sm:flex">
      <div className="sm:w-1/5 ">
        <Sidebar />
      </div>

      <div className="sm:w-4/5 ">
        <h2 className="text-center my-5">ALl Products</h2>
        <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  p-5">
          {products &&
            products.map((product) => (
              <div className="glass text-center p-1 my-2 sm:p-5 sm:m-5" key={product._id}>
                <div className="flex items-center justify-between">
                  <p>Id </p>
                  <p>{product._id}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Name</p>
                  <p>{product.name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Price</p>
                  <p>{product.price}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Stock</p>
                  <p>{product.stock}</p>
                </div>
                <div className="flex my-3 items-center justify-between">
                  <Link className="btn" to={`/admin/product/${product._id}`}>
                    <i className="fa fa-pencil"></i> Edit Product
                  </Link>
                  <button
                    className="btn"
                    onClick={(e) => deleteHandler(e, product._id)}
                  >
                    <i className="fa fa-trash mr-2"></i>
                    Delete Product
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
