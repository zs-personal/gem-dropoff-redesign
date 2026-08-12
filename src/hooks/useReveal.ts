import { useEffect, useRef, useState } from "react";

/**
 * Adds `is-in` once the element scrolls into view, which drives the CSS reveal
 * transitions. Fires once so content never animates away again.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.18) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || seen) return;

    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, seen]);

  return { ref, seen, className: seen ? "is-in" : "" };
}
