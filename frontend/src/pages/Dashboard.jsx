import React, { useEffect, useState, Suspense, lazy } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../Redux/categorySlice";
import { useNavigate } from "react-router-dom";
const Header = lazy(() => import("../components/navbar/Header"));
import { renderStars } from "../utils/renderStars";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories, status } = useSelector((state) => state.categories);


  const getVisibleCount = () => {
    const width = window.innerWidth;
    if (width >= 1440) return 6;
    if (width >= 1024) return 6;
    if (width >= 768) return 3;
    if (width >= 425) return 2;
    return 1;
  };
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {   
    dispatch(fetchCategories());
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
     <Suspense fallback={<div>Loading...</div>}>
       <Header />
     </Suspense>

      <main className="mt-20 px-3 md:px-6">
        {status === "loading" && (
          <div className="flex flex-col items-center mt-24 ">
        <div className="w-10 h-10 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-3 text-gray-600 text-sm">Loading...</p>
      </div>
        )}
        {status === "success" &&
          categories?.map((cat) => (
            <section key={cat.id} className="mb-8">
            
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">{cat.name}</h2>

                {cat.items.length > visibleCount && (
                  <button
                    onClick={() => navigate(`/${cat.id}`)}
                    className="text-blue-600 text-sm hover:underline cursor-pointer"
                  >
                    See all
                  </button>
                )}
              </div>

              
              <div className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-6 
                xl:grid-cols-6 
                gap-4
              ">
                {cat.items.slice(0, visibleCount).map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-md shadow overflow-hidden hover:shadow-xl cursor-pointer transition"
                    onClick={() => navigate(`/product/${item.id}`)}
                  >
            
                    <div className="aspect-square w-full">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3 text-left">
                      <p className="text-sm font-medium truncate">{item.title}</p>

                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm font-bold">${item.price}</span>
                        <span className="text-xs text-green-600">
                          {Math.round(item.discountPercentage)}% off
                        </span>
                      </div>

                      <div className="flex mt-1">{renderStars(item.rating)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
      </main>

      <footer className="bg-blue-600 text-white text-center py-4 mt-auto">
        © 2026 UrbanTrade
      </footer>
    </div>
  );
};

export default Dashboard;
