import process from "node:process";

const BASE_URL = process.env.MONITOR_URL ?? "https://praviel-site.antonnsoloviev.workers.dev";

async function checkScriptEndpoint(base: string) {
  const scriptUrl = new URL("/api/proxy/js/script.js", base);
  const response = await fetch(scriptUrl, { method: "HEAD" });
  if (!response.ok) {
    throw new Error(`Script proxy responded ${response.status}`);
  }
  return {
    url: scriptUrl.toString(),
    status: response.status,
    cacheControl: response.headers.get("cache-control"),
  };
}

async function sendSyntheticEvent(base: string) {
  const eventUrl = new URL("/api/proxy/api/event", base);
  const payload = {
    name: "synthetic_monitor",
    url: "https://praviel.com/monitor",
    domain: "praviel.com",
    referrer: "https://monitor.praviel.com",
    user_agent: "praviel-monitor",
  };

  const response = await fetch(eventUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Event proxy responded ${response.status}: ${text}`);
  }

  return {
    url: eventUrl.toString(),
    status: response.status,
  };
}

async function main() {
  try {
    const scriptResult = await checkScriptEndpoint(BASE_URL);
    const eventResult = await sendSyntheticEvent(BASE_URL);

    console.log("Plausible proxy monitor", {
      baseUrl: BASE_URL,
      script: scriptResult,
      event: eventResult,
    });
  } catch (error) {
    console.error("Plausible monitor failed", error);
    process.exitCode = 1;
  }
}

main();
