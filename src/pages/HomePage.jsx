import { useEffect } from "react";
import { useGetUserDetailQuery } from "../features/api/apiSlice";

function Homepage() {
  const { data, error, isLoading, refetch } = useGetUserDetailQuery();

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.data.message}</h1>;

  let content;

  if (data) {
    console.log(data);
    content = <h1>Welcome {data.username}</h1>;
  } else {
    content = <h1>Welcome, please login</h1>;
  }

  return <>{content}</>;
}

export default Homepage;
