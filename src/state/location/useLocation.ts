import { useState, useEffect } from "react";

// Define a type for the location state
export type LocationState = {
  pathname: string;
  search: string;
  hash: string;
};

// Custom hook to get the current location and update it on change
export const useLocation = (): LocationState => {
  const getLocation = (): LocationState => {
    return {
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
    };
  };

  const [location, setLocation] = useState<LocationState>(getLocation());

  useEffect(() => {
    const handleLocationChange = () => {
      setLocation(getLocation());
    };

    // Listen for popstate event on window
    window.addEventListener("popstate", handleLocationChange);

    // Optional: Listen for hash changes
    window.addEventListener("hashchange", handleLocationChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);
  // console.log("used location", location)

  return location;
};
