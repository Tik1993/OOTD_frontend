import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import {
  useGetUserDetailQuery,
  useRefreshTokenMutation,
} from "../features/api/apiSlice";
import { setToken } from "../features/auth/authSlice";

function Homepage() {
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const { data, error, isLoading, refetch } = useGetUserDetailQuery(token, {
    skip: !token,
  });
  const [refreshToken] = useRefreshTokenMutation();

  useEffect(() => {
    if (token) refetch();
  }, [token]);

  useEffect(() => {
    const refresh = async () => {
      if (error) {
        try {
          const result = await refreshToken().unwrap();
          dispatch(setToken(result.accessToken));
          console.log("Token refreshed", result);
        } catch (err) {
          console.log("Failed to refresh token", err);
        }
      }
    };
    refresh();
  }, [error]);

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
