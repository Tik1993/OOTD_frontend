import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetUserDetailQuery } from "../features/api/apiSlice";
import { selectCurrentToken } from "../features/auth/authSlice";

function Homepage() {
  const token = useSelector(selectCurrentToken);
  const { data, error, isLoading, refetch } = token
    ? useGetUserDetailQuery()
    : { data: null, error: null, isLoading: false, refetch: () => {} };

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token]);

  if (isLoading) return <h1>Loading...</h1>;
  // if (error) return <h1>Error: {error.data.message}</h1>;

  let content;

  if (data) {
    // console.log(data);
    content = <h1>Welcome {data.username}</h1>;
  } else {
    content = <h1>Welcome, please login</h1>;
  }

  return <>{content}</>;
}

export default Homepage;
