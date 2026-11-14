"use client";

import { useEffect, useRef, useState } from "react";

// Fades children in when they scroll into view. One tiny observer, no animation library.
// Visibility is kept in React state (not added with classList), so a re-render or hot reload
// can never strip the "is-in" class and leave the element stuck invisible.
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    // Reduced-motion users already see everything: globals.css forces .reveal visible for them.
    if (!el || shown) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <Tag ref={ref} className={`reveal ${shown ? "is-in" : ""} ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  );
}
