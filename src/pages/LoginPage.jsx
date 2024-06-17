import React, { useRef } from "react";
import Form from "../components/Form";
import { useLoginMutation } from "../features/api/apiSlice";

function LoginPage() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const person = { username: "", password: "" };
  const [login] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (usernameRef.current.value && passwordRef.current.value) {
      person.username = usernameRef.current.value;
      person.password = passwordRef.current.value;
      try {
        const result = await login(person).unwrap();
        console.log("User logged", result);
      } catch (err) {
        console.log("Failed to login user", err);
      }
    }
  };
  return (
    <>
      <Form
        title="Login Account"
        button="Login"
        handleSubmit={handleSubmit}
        usernameRef={usernameRef}
        passwordRef={passwordRef}
      />
    </>
  );
}
export default LoginPage;
