import { useEffect, useState } from "react";

import { getResponsiveDevice, responsiveHandle } from "@utils/ScreenService";

export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
}

export function useDots(period: number = 1000) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 6) {
          return "";
        }
        return prevDots + ". ";
      });
    }, period);

    return () => clearInterval(interval);
  }, [period]);

  return dots;
}

export function getResponsive() {
  const responsiveDevice = getResponsiveDevice();
  const [responsive, setResponsive] = useState(responsiveDevice);

  useEffect(() => {
    window.addEventListener("resize", () => responsiveHandle(responsive, setResponsive));
    return () => {
      window.removeEventListener("resize", () => responsiveHandle(responsive, setResponsive));
    };
  }, [responsive]);

  return responsive;
}

export function addEventClick(listener: (event: MouseEvent) => void, dependencies: any[] = []) {
  useEffect(() => {
    window.addEventListener("click", listener);
    return () => {
      window.removeEventListener("click", listener);
    };
  }, dependencies);
}

export function addEventScroll(listener: (event: Event) => void, dependencies: any[] = []) {
  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, dependencies);
}

export function useHideScrollBar(dependencies: any[] = []) {
  useEffect(() => {
    document.body.classList.add("hide-scrollbar");
    return () => {
      document.body.classList.remove("hide-scrollbar");
    };
  }, dependencies);
}

export function useScroll(initial: "Up" | "Down" = "Up") {
  const [direction, setDirection] = useState(initial);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isRequested = false;

    function updateDirection() {
      const scrollY = window.scrollY;
      if (Math.abs(scrollY - lastScrollY) < 0) {
        isRequested = false;
        return;
      }
      setDirection(scrollY > lastScrollY ? "Down" : "Up");
      lastScrollY = scrollY > 0 ? scrollY : 0;
      isRequested = false;
    }

    function onScroll() {
      if (!isRequested) {
        window.requestAnimationFrame(updateDirection);
        isRequested = true;
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [direction]);
  return direction;
}
