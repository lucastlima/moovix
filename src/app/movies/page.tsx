import { Headline } from "@/components/Headline";
import { getApiConfig } from "@/service/http/getApiConfig";
import { getMovies } from "@/service/http/getMovies";
import { getMediaUrl } from "@/utils";
import Image from "next/image";

export default async function Page() {
  const movies = await getMovies();
  const config = await getApiConfig();

  if (!config) {
    return <div>Error fetching API config</div>;
  }

  return (
    <main className="flex gap-4 flex-col p-4">
      <Headline>Movies</Headline>
      <section className="grid gap-4 grid-cols-2">
        {movies?.results.map((movie) => (
          <div key={movie.id} className="flex">
            <Image
              width={384}
              height={576}
              src={getMediaUrl(config, movie.poster_path, 4)}
              className="rounded-md"
              alt={movie.title}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
