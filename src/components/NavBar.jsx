import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUsername } from "../features/auth/authSlice";

function NavBar() {
  const username = useSelector(selectCurrentUsername);

  const gender = ["Men", "Women", "Unisex"];
  return (
    <>
      <nav className="border-b-4">
        <div className="max-w-screen-xl mx-auto p-4 flex flex-wrap items-center justify-between">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            OOTD
          </span>
          <ul className="flex flex-row space-x-8 font-medium">
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
              <li>Wekcome, {username}</li>
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
