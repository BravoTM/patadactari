import { Suspense } from "react";
import MapsPageClient from "./MapsPageClient";

export default function MapsPage() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  return (
    <Suspense fallback={<div className="min-h-screen bg-blue-50" />}>
      <MapsPageClient googleMapsApiKey={googleMapsApiKey} />
    </Suspense>
  );
}
