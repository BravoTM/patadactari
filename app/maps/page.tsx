import MapsPageClient from "./MapsPageClient";

export default function MapsPage() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  return <MapsPageClient googleMapsApiKey={googleMapsApiKey} />;
}
