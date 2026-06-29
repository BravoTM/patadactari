import FacilitiesClient from "./FacilitiesClient";
import { getMapsApiKey } from "@/lib/env.server";

export default function FacilitiesPage() {
  return <FacilitiesClient mapsApiKey={getMapsApiKey()} />;
}
