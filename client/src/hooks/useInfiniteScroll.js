import { useCallback, useEffect, useRef } from "react";

function useInfiniteScroll(onIntersect, options = {}) {
  const ref = useRef(null);

  const handleIntersect = useCallback(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect(entry, observer);
        }
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, handleIntersect, options]);

  return ref;
}

export default useInfiniteScroll;
