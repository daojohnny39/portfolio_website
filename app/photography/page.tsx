import PhotographyClient from "@/components/photography/PhotographyClient";
import { getMonths, parsePhotos } from "@/lib/photography";

export default function PhotographyPage() {
  const photos = parsePhotos();
  const months = getMonths(photos);

  return <PhotographyClient photos={photos} months={months} totalPhotoCount={photos.length} />;
}
