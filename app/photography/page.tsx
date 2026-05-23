import { LoadingScreen } from "@/components/core/LoadingScreen";
import PhotographyClient from "@/components/photography/PhotographyClient";
import { getMonths, parsePhotos } from "@/lib/photography";

export default function PhotographyPage() {
  const photos = parsePhotos();
  const months = getMonths(photos);
  const criticalUrls = photos
    .filter((p) => !p.categories.includes("bw"))
    .slice(0, 16)
    .map((p) => p.url);

  return (
    <>
      <LoadingScreen variant="photography" criticalImages={criticalUrls} />
      <PhotographyClient
        photos={photos}
        months={months}
        totalPhotoCount={photos.length}
      />
    </>
  );
}
