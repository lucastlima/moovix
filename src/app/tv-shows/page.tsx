import { Headline } from "@/components/Headline";
import { getApiConfig } from "@/service/http/getApiConfig";
import { getTvShows } from "@/service/http/getTvShows";
import { getMediaUrl } from "@/utils";
import Image from "next/image";

export default async function Page() {
  const tvShows = await getTvShows();
  const config = await getApiConfig();

  if (!config) {
    return <div>Error fetching API config</div>;
  }

  return (
    <main className="flex gap-4 flex-col p-4">
      <Headline>TV Shows</Headline>
      <section className="grid gap-4 grid-cols-2">
        {tvShows?.results.map((tvShow) => (
          <div key={tvShow.id} className="flex">
            <Image
              width={384}
              height={576}
              src={getMediaUrl(config, tvShow.poster_path, 4)}
              className="rounded-md"
              alt={tvShow.name}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
