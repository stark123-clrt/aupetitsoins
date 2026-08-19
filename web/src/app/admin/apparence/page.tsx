import { requireAdmin } from "@/lib/auth";
import { getSiteSetting } from "@/lib/data";
import { ABOUT_PHOTO_KEY } from "@/lib/settings";
import { AboutPhotoManager } from "@/components/admin/about-photo-manager";

export default async function AdminApparencePage() {
  await requireAdmin();
  const photo = await getSiteSetting(ABOUT_PHOTO_KEY);

  return (
    <div>
      <h1 className="text-[34px] leading-tight">Personnalisation</h1>
      <p className="mt-2 text-[15px] text-muted">
        Les images du site que vous pouvez remplacer vous-même.
      </p>
      <div className="mt-8">
        <AboutPhotoManager photo={photo} />
      </div>
    </div>
  );
}
