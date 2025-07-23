import { Suspense } from "react";
import HomeClient from "./HomeClient";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-10 text-gray-500">Loading page...</div>
      }
    >
      <HomeClient />
    </Suspense>
  );
}