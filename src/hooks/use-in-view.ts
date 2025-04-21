import { useState, useEffect, useRef } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView({
  threshold = 0,
  rootMargin = '0px',
  triggerOnce = false,
}: UseInViewOptions = {}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);
  const enteredView = useRef(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isInView = entry.isIntersecting;
        
        if (triggerOnce) {
          if (isInView && !enteredView.current) {
            setInView(true);
            enteredView.current = true;
          }
        } else {
          setInView(isInView);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, inView };
}