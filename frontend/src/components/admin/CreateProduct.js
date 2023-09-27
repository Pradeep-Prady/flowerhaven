import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNewProduct } from "../../actions/productActions";
import { clearError, clearProductCreated } from "../../slices/productSlice";
import Sidebar from "./Sidebar";
import toast from "react-hot-toast";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [seller, setSeller] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { loading, isProductCreated, error } = useSelector(
    (state) => state.productState
  );

  const categories = [
    "Alstroemeria",
    "Carnations",
    "Casa Blanca Lilies",
    "Chrysanthemums",
    "Daffodils",
    "Daisies",
    "Gerbera Daisies",
    "Gladiolus",
    "Hydrangeas",
    "Iris",
    "Lilies",
    "Orchids",
    "Peonies",
    "Rose",
    "Sunflowers",
    "Tulips",
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onImagesChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
          setImages((oldArray) => [...oldArray, file]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("description", description);
    formData.append("seller", seller);
    formData.append("category", category);
    images.forEach((image) => {
      formData.append("images", image);
    });
    dispatch(createNewProduct(formData));
  };

  useEffect(() => {
    if (isProductCreated) {
      toast.success(`Product Created Successfully`, {
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
      dispatch(clearProductCreated());

      navigate("/admin/products");
      return;
    }

    if (error) {
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
  }, [isProductCreated, error, dispatch, navigate]);

  return (
    <div className="w-full  sm:flex">
      <div className="sm:w-1/5 ">
        <Sidebar />
      </div>

      <div className="sm:w-4/5 glass m-5">
        <h2 className="text-center my-5">Create Product</h2>

        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-1 md:grid-cols-2 p-5">
            <div className="sm:mx-5">
              <div>
                <p> Product Images</p>
                <div className="grid grid-cols-3 ">
                  {imagesPreview.map((image) => (
                    <img
                      className="my-3 w-[50px] h-[50px] sm:w-[100px] sm:h-[100px]"
                      src={image}
                      key={image}
                      alt="ImagePreview"
                    />
                  ))}
                </div>
              </div>

              <div className="my-3">
                <p> Choose Images</p>
                <input
                  className="w-full bg-mywhite px-2 py-3 outline-none my-2"
                  onChange={onImagesChange}
                  value={name}
                  type="file"
                  multiple
                />
              </div>
              <div className="my-3">
                <p>Product Category</p>

                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-mywhite px-2 py-3 outline-none my-2"
                >
                  <option value="">Select</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:mx-5">
              <div>
                <p>Product Name</p>
                <input
                  className="w-full bg-mywhite px-2 py-3 outline-none my-2"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                />
              </div>
              <div className="my-3">
                <p>Product Price</p>
                <input
                  className="w-full bg-mywhite px-2 py-3 outline-none my-2"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  type="number"
                />
              </div>
              <div>
                <p>Product Description</p>
                <textarea
                  className="w-full h-[200px] bg-mywhite px-2 py-3 outline-none my-2"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  type="text"
                />
              </div>
              <div className="my-3">
                <p>Product Stock</p>
                <input
                  className="w-full bg-mywhite px-2 py-3 outline-none my-2"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                  type="number"
                />
              </div>
              <div className="my-3">
                <p>Product Seller Name</p>
                <input
                  className="w-full bg-mywhite px-2 py-3 outline-none my-2"
                  onChange={(e) => setSeller(e.target.value)}
                  value={seller}
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" disabled={loading} className="btn w-full sm:w-1/3 m-10">
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
