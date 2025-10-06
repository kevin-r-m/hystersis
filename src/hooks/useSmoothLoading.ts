import { useEffect, useRef, useState } from "react";

export type SmoothOptions = {
  showDelay?: number;
  minVisible?: number;
  hideDelay?: number;
};

export function useSmoothLoading(
  isLoading: boolean,
  { showDelay = 500, minVisible = 400, hideDelay = 200 }: SmoothOptions = {}
) {
  const [isLoaderShown, setLoaderShown] = useState(false);

  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shownAt = useRef<number | null>(null);

  const clearTimers = () => {
    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = null;
    }
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  useEffect(() => {
    if (isLoading) {
      if (isLoaderShown) return;

      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }

      if (!showTimer.current) {
        showTimer.current = setTimeout(() => {
          shownAt.current = performance.now();
          setLoaderShown(true);
          showTimer.current = null;
        }, showDelay);
      }

      return;
    }

    if (showTimer.current) {
      clearTimeout(showTimer.current);
      showTimer.current = null;
      setLoaderShown(false);
      shownAt.current = null;
      return;
    }

    if (!isLoaderShown) return;

    const elapsed = shownAt.current ? performance.now() - shownAt.current : 0;
    const remaining = Math.max(minVisible - elapsed, 0);

    if (!hideTimer.current) {
      hideTimer.current = setTimeout(() => {
        setLoaderShown(false);
        shownAt.current = null;
        hideTimer.current = null;
      }, remaining + hideDelay);
    }

    return () => {
      clearTimers();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, showDelay, minVisible, hideDelay]);

  return isLoaderShown;
}
