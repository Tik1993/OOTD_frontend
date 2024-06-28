import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUsername } from "../features/auth/authSlice";
import { useSendLogoutMutation } from "../features/api/apiSlice";

function NavBar() {
  const [isDropdown, setIsDropdown] = useState(false);
  const username = useSelector(selectCurrentUsername);
  const [sendLogout] = useSendLogoutMutation();
  const gender = ["Men", "Women", "Unisex"];

  const toggleDropdown = () => {
    console.log("clicked");
    setIsDropdown(!isDropdown);
  };
  return (
    <>
      <nav className="border-b-4">
        <div className="max-w-screen-2xl mx-auto p-4 flex flex-col md:flex-row items-center justify-between text-3xl">
          <div className="flex flex-row justify-between w-full md:w-auto">
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              OOTD
            </span>
            <button onClick={toggleDropdown} className="md:hidden">
              <span>☰</span>
            </button>
          </div>

          {/* flex flex-row space-x-8 font-medium items-center */}
          <ul
            className={`${
              isDropdown ? "block" : "hidden"
            }  md:block flex flex-col md:flex-row space-y-3 md:space-x-8 md:space-y-0 text-center`}
          >
            <li className="md:inline-block">
              <Link
                to={"/"}
                className="border-b-4 border-sky-500 md:border-b-0 md:text-2xl md:font-medium hover:text-blue-700"
              >
                Home
              </Link>{" "}
            </li>
            {gender.map((g) => (
              <li key={g} className="md:inline-block">
                <Link
                  to={`/items/${g}`}
                  className="border-b-4 border-sky-500 md:border-b-0 md:text-2xl md:font-medium hover:text-blue-700"
                >
                  {g}
                </Link>{" "}
              </li>
            ))}

            <li className="md:inline-block">
              <span className="border-b-4 border-sky-500 md:border-b-0 md:text-2xl md:font-medium hover:text-blue-700">
                About
              </span>
            </li>
            {username ? (
              <>
                <li className="md:inline-block md:text-2xl md:font-medium">
                  Wekcome, {username}
                </li>
                <li className="md:inline-block">
                  <Link
                    to={"/Closet"}
                    className="border-b-4 border-sky-500 md:border-b-0 md:text-2xl md:font-medium hover:text-blue-700"
                  >
                    Your Closet
                  </Link>
                </li>
                <li className="md:inline-block">
                  {" "}
                  <button
                    onClick={() => sendLogout()}
                    className=" text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Logout
                  </button>{" "}
                </li>
              </>
            ) : (
              <>
                <li className="md:inline-block">
                  <Link
                    to={"/register"}
                    className="border-b-4 border-sky-500 hover:text-blue-700 md:border-b-0 md:text-2xl md:font-medium"
                  >
                    Register
                  </Link>
                </li>
                <li className="md:inline-block">
                  <Link
                    to={"/login"}
                    className="border-b-4 border-sky-500 hover:text-blue-700 md:border-b-0 md:text-2xl md:font-medium"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
