"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/Skeleton";

const LessonsDemoCore = dynamic(() => import("./LessonsDemoCore"), {
  ssr: false,
  loading: () => (
    <section className="relative px-6 py-24 sm:py-32 overflow-hidden content-visibility-auto">
      <div className="mx-auto max-w-5xl">
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    </section>
  ),
});

export default function LessonsDemo() {
  return <LessonsDemoCore />;
}
