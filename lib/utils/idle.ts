type ExtendedWindow = Window & {
  requestIdleCallback?: (_callback: () => void, _options?: { timeout?: number }) => number;
  cancelIdleCallback?: (_handle: number) => void;
};

export type IdleTaskOptions = {
  /**
   * Maximum time in milliseconds to wait before the task runs even if the
   * browser never reports an idle period. Defaults to 2500ms.
   */
  timeout?: number;
};

/**
 * Schedule a task to run during the browser's idle time (or after the timeout).
 * Returns a cleanup function that cancels the pending callbacks.
 */
export function scheduleIdleTask(task: () => void, options?: IdleTaskOptions) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const extendedWindow = window as ExtendedWindow;
  const timeout = options?.timeout ?? 2500;
  let cancelled = false;

  const run = () => {
    if (cancelled) return;
    cancelled = true;
    task();
  };

  let idleHandle: number | null = null;
  if (extendedWindow.requestIdleCallback) {
    idleHandle = extendedWindow.requestIdleCallback(run, { timeout });
  }

  const timeoutId = window.setTimeout(run, timeout);

  return () => {
    cancelled = true;
    if (idleHandle !== null) {
      extendedWindow.cancelIdleCallback?.(idleHandle);
    }
    window.clearTimeout(timeoutId);
  };
}
