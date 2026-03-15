import React, { useEffect, useState,Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {  FaTimes, FaUserCircle } from "react-icons/fa";
import { useSelector,useDispatch } from "react-redux";
import { renderStars,  getRatingText } from "../../utils/renderStars";
const Header = lazy(() => import("../navbar/Header"));
import { setRedirectAfterLogin } from "../../Redux/authSlice";
import Modal from "../modal/Modal";
import Login from "../../pages/Login";
import SignUp from "../../pages/Signup";


const ProductDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState();
  const [popupImage, setPopupImage] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  
  const dispatch = useDispatch();

 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
 
  
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setItem(res.data);
        setCurrentImage(res.data.images[0]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (loading) return <h2 className="text-center mt-20">Loading...</h2>;

  const handleBuyNow = () => {
    const paymentUrl =
      "https://buy.stripe.com/test_9B6cN54MqbqFehtaVxgMw00";

    if (!isLoggedIn) {
      dispatch(setRedirectAfterLogin(paymentUrl));
      setShowLoginModal(true);
      return;
    }

    window.location.href = paymentUrl;
  };


  return (
    <>
    <div className="bg-gray-100 ">
 
 
 <Suspense fallback={<div>Loading...</div>}>
       <Header />
     </Suspense>

    <div className="mt-12" >
      <div className="flex flex-col pt-12 lg:flex-row justify-between gap-10">

        {/* LEFT SECTION */}
        <div className="w-full lg:w-2/3 flex flex-col items-center ">

          
          <div className="flex justify-center w-full">
            <div className="flex items-center w-full max-w-125">
              <img
                src={currentImage}
                alt={item.title}
                className="w-full h-auto object-cover bg-white rounded-lg shadow cursor-pointer"
                onClick={() => setPopupImage(currentImage)}
                loading="lazy"
              />
            </div>
          </div>

          <div className="mt-6 w-full px-4 md:px-0">
            <h3 className="font-semibold mb-2 ml-4">Images:</h3>

            <div className="flex gap-3 overflow-x-auto pb-2 ml-4">
              {item.images.map((img, i) => {
                const isActive = img === currentImage;

                return (
                  <img
                    key={i}
                    src={img}
                    className={`
                      w-20 h-20 md:w-28 md:h-28 rounded object-cover cursor-pointer
                      border 
                      ${isActive ? "border-sky-500 " : "border-gray-300"}
                    `}
                    onClick={() => setCurrentImage(img)}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}

        <div  className="w-full lg:w-1/3 px-4 lg:px-0 mr-48    ">
        <div className=" ">

          <h1 className="text-2xl font-bold mb-4">{item.title}</h1>

          <p className="mt-4 text-gray-700">{item.description}</p>
          
          <div className="flex justify-between">
          <div className="">
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="font-bold">Brand:</div>
            <div>{item.brand}</div>
          </div>

          <div className="flex flex-wrap gap-1">
            <div className="font-bold">Tag :</div>
            <div>{item.tags}</div>
          </div>
          </div>
          <div className="flex mt-2 justify-start mr-20 gap-4 ">
           <div 
           className=" flex items-center justify-center h-8 w-24 mt-2 text-white rounded-sm cursor-pointer bg-blue-600 hover:bg-blue-700"
           onClick={handleBuyNow}
           >
           Buy now
           </div>
       
          </div>
          </div>

          <div className="flex flex-wrap gap-3 items-center mt-3">
            <div className="text-xl font-semibold">${item.price}</div>
            <div className="text-sm text-green-600">
              {item.discountPercentage}% off
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2 items-center">
            <div className="font-bold">Rating :</div>
            <div className="flex mt-1.5">{renderStars(item.rating)}</div>
          </div>

          <div className="flex flex-wrap gap-1 mt-1">
            <div className="font-bold">Sku :</div>
            <div>{item.sku}</div>
          </div>

          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              <div className="font-bold">Category :</div>
              <div>{item.category}</div>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="font-bold">Stock :</div>
              <div>{item.stock}</div>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex flex-wrap gap-2">
              <div className="font-bold">Warranty :</div>
              <div>{item.warrantyInformation}</div>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="font-bold">Shipping Info :</div>
              <div>{item.shippingInformation}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            <div className="font-bold">Availability :</div>
            <div>{item.availabilityStatus}</div>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            <div className="font-bold">Order Quantity :</div>
            <div>{item.minimumOrderQuantity}</div>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            <div className="font-bold">Return Policy:</div>
            <div>{item.returnPolicy}</div>
          </div>

          <div className="mt-4 space-y-1">
            <div className="font-bold">Dimensions:</div>
            <div>Width: {item.dimensions?.width}</div>
            <div>Height: {item.dimensions?.height}</div>
            <div>Depth: {item.dimensions?.depth}</div>
            <div>Weight: {item.weight} kg</div>
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold mb-0">Meta Information:</h2>
            <p>Created: {new Date(item.meta?.createdAt).toLocaleString()}</p>
            <p>Updated: {new Date(item.meta?.updatedAt).toLocaleString()}</p>
            <p>Barcode: {item.meta?.barcode}</p>
          </div>
       
      
        </div>
      </div>
</div>
</div>
      
      <div className="mt-12 px-4">
  <h2 className="text-xl font-bold mb-3 text-center">Customer Reviews:</h2>

  <div className="space-y-6 mx-auto border w-[80%] rounded-2xl border-gray-400 bg-white p-6">
    {item.reviews?.map((review, i) => (
      <div key={i} className="border-b pb-6 last:border-none flex justify-center ">

        <div className="grid grid-cols-[50px_1fr] gap-x-1">

          <FaUserCircle
            size={40}
            className="text-gray-600 col-start-1 row-start-1"
          />

          <div className="flex flex-col col-start-2 row-start-1">
            <span className="font-semibold">{review.reviewerName}</span>
            <small className="text-gray-500">{review.reviewerEmail}</small>
          </div>

          <div className="flex flex-col col-start-1 col-end-3  ml-12.5">

            <div className="flex items-center ml-0.5">
              <div className="flex">{renderStars(review.rating)}</div>
              <span className="ml-2 text-sm font-medium">
                {getRatingText(review.rating)}
              </span>
            </div>

            <small className="mt-1 ml-0.5">
              Received on {new Date(review.date).toLocaleDateString()}
            </small>

            <p className="text-gray-600  font-semibold ml-0.5">
              {review.comment}
            </p>
          </div>

        </div>
      </div>
    ))}
  </div>
</div>

      {popupImage && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-9999">

          <button
            onClick={() => setPopupImage(null)}
            className="absolute top-5 right-5 text-white text-4xl cursor-pointer"
          >
            <FaTimes size={20}/>
          </button>

          <img
            src={popupImage}
            alt="Full"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-xl bg-white"
          />
        </div>
      )}

    </div>
    <Modal
  isOpen={showLoginModal}
  onClose={() => setShowLoginModal(false)}
  type="login"
>
  <Login
    onClose={() => setShowLoginModal(false)}
    openSignup={() => {
      setShowLoginModal(false);
      setShowSignupModal(true);
    }}
  />
</Modal>

<Modal
  isOpen={showSignupModal}
  onClose={() => setShowSignupModal(false)}
  type="signup"
>
  <SignUp
    onClose={() => setShowSignupModal(false)}
    openLogin={() => {
      setShowSignupModal(false);
      setShowLoginModal(true);
    }}
  />
</Modal>
</>
  );
};

export default React.memo(ProductDetails);
