import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUsername } from "../features/auth/authSlice";
import { useSendLogoutMutation } from "../features/api/apiSlice";
import { logout } from "../features/auth/authSlice";

function NavBar() {
  const dispatch = useDispatch();
  const username = useSelector(selectCurrentUsername);
  const [sendLogout] = useSendLogoutMutation();
  const gender = ["Men", "Women", "Unisex"];

  return (
    <>
      <nav className="border-b-4">
        <div className="max-w-screen-xl mx-auto p-4 flex flex-wrap items-center justify-between">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            OOTD
          </span>
          <ul className="flex flex-row space-x-8 font-medium items-center">
            <li>
              <Link to={"/"} className="hover:text-blue-700">
                Home
              </Link>{" "}
            </li>
            {gender.map((g) => (
              <li key={g}>
                <Link to={`/items/${g}`} className="hover:text-blue-700">
                  {g}
                </Link>{" "}
              </li>
            ))}

            <li>About</li>
            {username ? (
              <>
                <li>Wekcome, {username}</li>
                <li>
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
                <li>
                  <Link to={"/register"} className="hover:text-blue-700">
                    Register
                  </Link>
                </li>
                <li>
                  <Link to={"/login"} className="hover:text-blue-700">
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
