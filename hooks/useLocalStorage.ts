import { useEffect, useState } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(initialValue);

  // Read value on mount only to avoid SSR/hydration mismatch
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) setState(JSON.parse(raw) as T);
    } catch {
      // ignore parse errors
    }
  }, [key]);

  // Persist whenever it changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignore quota/errors
    }
  }, [key, state]);

  return [state, setState] as const;
}