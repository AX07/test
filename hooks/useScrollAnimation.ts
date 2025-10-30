import { useState, useEffect, useRef } from 'react';

// Custom hook for scroll-triggered animations
const useScrollAnimation = <T extends Element>(options?: IntersectionObserverInit) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (element) {
                    observer.unobserve(element);
                }
            }
        }, { threshold: 0.1, ...options });

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [options]);

    return [ref, isVisible] as const;
};

export default useScrollAnimation;
