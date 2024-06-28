import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { useLoginMutation } from "../features/api/apiSlice";
import { setToken, setUsername, setUserid } from "../features/auth/authSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        dispatch(setToken(result.accessToken));
        dispatch(setUsername(result.username));
        dispatch(setUserid(result.userid));
        // console.log("User logged", result);
        navigate("/");
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
