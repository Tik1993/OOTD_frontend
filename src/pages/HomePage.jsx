import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { useGetUserDetailQuery } from "../features/api/apiSlice";

function Homepage() {
  const token = useSelector(selectCurrentToken);
  const { data, error, isLoading, refetch } = useGetUserDetailQuery(token, {
    skip: !token,
  });

  useEffect(() => {
    if (token) refetch();
  }, [token, refetch]);
  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.data.message}</h1>;

  let content;

  if (data) {
    content = <h1>Welcome {data.username}</h1>;
  } else {
    content = <h1>Welcome, please login</h1>;
  }

  return <>{content}</>;
}

export default Homepage;
