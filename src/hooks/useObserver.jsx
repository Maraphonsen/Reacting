import { useEffect, useRef, useCallback } from "react";

export const useObserver = (ref, canLoad, isLoading, callback) => {
  const observer = useRef();
  const memoizedCallback = useCallback(callback, [callback]);

  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    const cb = (entries) => {
      if (entries[0].isIntersecting && canLoad) {
        memoizedCallback();
      }
    };

    observer.current = new IntersectionObserver(cb);
    if (ref.current) observer.current.observe(ref.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [isLoading, canLoad, ref, memoizedCallback]);
};