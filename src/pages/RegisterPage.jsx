import { useRef } from "react";
import { useRegisterMutation } from "../features/api/apiSlice";
import Form from "../components/Form";

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
    <>
      <Form
        title="Register Account"
        button="Register"
        handleSubmit={handleSubmit}
        usernameRef={usernameRef}
        passwordRef={passwordRef}
      />
    </>
  );
}

export default RegisterPage;
