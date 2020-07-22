import useSWR from "swr";
import fetcher from "lib/client/fetcher";
import { useEffect } from "react";
import ClientSideUser from "lib/shared/user/ClientSideUser";
import Router from "next/router";

type UseUserOptions = {
  // redirect the user if user is not present
  redirectUrl?: string;
  // if set to true, then hook will redirect to redirectUrl
  // when user is found instead of not found
  redirectIfFound?: boolean;
};
function useUser({
  redirectUrl,
  redirectIfFound = false,
}: UseUserOptions = {}) {
  const { data: user, mutate: mutateUser } = useSWR<ClientSideUser>(
    `/api/auth/user`,
    fetcher
  );
  useEffect(() => {
    // if fetch is in progress
    // OR
    // if no redirect URL specified
    if (!user || !redirectUrl) {
      return;
    }
    // URL is set

    // if no user found, and don't redirect after login
    // OR
    // if user is logged in, and needs to redirect if found
    if (
      (!user.isLoggedIn && !redirectIfFound) ||
      (user.isLoggedIn && redirectIfFound)
    ) {
      Router.push(redirectUrl);
    }
  }, [user, redirectUrl, redirectIfFound]);
  return { user, mutateUser };
}

export default useUser;
