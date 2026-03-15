import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../../assets/UTLogo.png";
import { logout } from "../../Redux/authSlice";
import Modal from "../modal/Modal";
import Login from "../../pages/Login";
import SignUp from "../../pages/Signup";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser, isLoggedIn } = useSelector((state) => state.auth);

  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // CLOSE DROPDOWN WHEN CLICK OUTSIDEac
  const menuRef = useRef(null);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitials = (user) => {
    if (!user) return "U";
    return (
      (user.firstName?.[0] || "") + (user.lastName?.[0] || "")
    ).toUpperCase();
  };

  return (
    <>
      <header className="fixed top-0 w-full h-16 bg-white flex items-center justify-between shadow px-4 md:px-6 z-50">
        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={Logo} className="w-8 h-8 rounded" alt="Logo" />
          <h1 className="text-xl font-bold text-blue-600">UrbanTrade</h1>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative" ref={menuRef}>
          {!isLoggedIn && (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-4 py-1 bg-blue-600 text-white rounded-sm hover:bg-blue-700 cursor-pointer "
            >
              Sign In
            </button>
          )}

          {isLoggedIn && (
            <>
              <div
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer"
              >
                {getInitials(currentUser)}
              </div>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md flex flex-col">
                  <button
                    onClick={() => navigate("/profile")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      dispatch(logout());
                      setShowMenu(false);
                      navigate("/");
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </header>

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

export default Header;
