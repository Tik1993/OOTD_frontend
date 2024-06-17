import { useRef } from "react";
import { useRegisterMutation } from "../features/api/apiSlice";

function RegisterPage() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const person = { username: "", password: "" };
  const [register] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameRef.current.value && passwordRef.current.value) {
      person.username = usernameRef.current.value;
      person.password = passwordRef.current.value;
      try {
        const result = await register(person).unwrap();
        console.log("User registered", result);
      } catch (err) {
        console.log("Failed to register user", err);
      }
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <div className="flex flex-col bg-white rounded-lg shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          Register Account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Username
            </label>
            <input
              id="username"
              ref={usernameRef}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              id="password"
              ref={passwordRef}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1.5"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
