import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserDetailQuery,
  useGetItemsQuery,
} from "../features/api/apiSlice";
import { selectCurrentToken } from "../features/auth/authSlice";
import { selectCurrentUserid } from "../features/auth/authSlice";

function Homepage() {
  const token = useSelector(selectCurrentToken);
  const userId = useSelector(selectCurrentUserid);
  const {
    data: userDeta,
    error: userError,
    isLoading: isUserDateLoading,
    refetch,
  } = useGetUserDetailQuery(userId, {
    skip: !token,
  });

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token]);

  if (isUserDateLoading) return <h1>Loading...</h1>;
  // if (error) return <h1>Error: {error.data.message}</h1>;

  let closetItmes = <h1>closet</h1>;
  let wishlistItems;

  let content = (
    <div>
      <section>
        <h1>Latest Products</h1>
      </section>
      {closetItmes && (
        <section>
          <h1>Closest items</h1>
          {closetItmes}
        </section>
      )}
      {wishlistItems && (
        <section>
          <h1>Wishlist items</h1>
          {wishlistItems}
        </section>
      )}
    </div>
  );

  return <>{content}</>;
}

export default Homepage;
