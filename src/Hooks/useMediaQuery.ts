import React from "react";

const useMediaQuery = (query: string): boolean => {
    const subscribe = React.useCallback(
        (callback: () => void)  => {
        const matchMedia = window.matchMedia(query);
  
        matchMedia.addEventListener("change", callback);
        return () => {
        matchMedia.removeEventListener("change", callback);
        };
      },
      [query]
    );
  
    const getSnapshot = () => {
      return window.matchMedia(query).matches;
    };
  
    const getServerSnapshot = () => {
      throw Error("useMediaQuery is a client-only hook");
    };
  
    return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  }
  
  export default useMediaQuery;
  