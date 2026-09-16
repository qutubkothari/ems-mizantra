"use client";

import { useEffect } from "react";

/**
 * A browser may retain an old Next.js page while a new deployment replaces
 * its content-hashed chunks. Reload once into the current build rather than
 * leaving the user on a blank React error screen.
 */
export default function ChunkLoadRecovery() {
  useEffect(() => {
    const reloadForStaleChunk = (value: unknown) => {
      const message = value instanceof Error ? value.message : String(value || "");
      if (!/ChunkLoadError|Loading chunk .* failed/i.test(message)) return;

      const key = "ems:chunk-recovery-attempted";
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
      window.location.reload();
    };

    const onError = (event: ErrorEvent) => reloadForStaleChunk(event.error || event.message);
    const onRejection = (event: PromiseRejectionEvent) => reloadForStaleChunk(event.reason);

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
