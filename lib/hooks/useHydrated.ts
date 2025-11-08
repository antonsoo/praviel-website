import { useEffect, useState } from "react";

/**
 * Hook to detect when the component has hydrated on the client.
 * Prevents hydration mismatches by delaying client-only rendering.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
