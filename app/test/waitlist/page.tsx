import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Waitlist Form Harness",
  robots: "noindex, nofollow",
};

const envAllow =
  process.env.ENABLE_TEST_ROUTES === "true" || process.env.NODE_ENV !== "production";

type HarnessPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function WaitlistHarnessPage({ searchParams }: HarnessPageProps) {
  const params: Record<string, string | string[] | undefined> = await Promise.resolve(
    searchParams ?? {},
  );
  const queryOverride =
    typeof params["enable-test-routes"] === "string"
      ? params["enable-test-routes"] === "1"
      : false;

  if (!envAllow && !queryOverride) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-lg w-full space-y-4">
        <h1 className="text-2xl font-semibold">Waitlist Form Test Harness</h1>
        <p className="text-sm text-zinc-400">
          This route renders the waitlist form in isolation so automated tests can exercise the
          server action without the marketing hero dependencies.
        </p>
        <WaitlistForm source="test-harness" />
      </div>
    </div>
  );
}
