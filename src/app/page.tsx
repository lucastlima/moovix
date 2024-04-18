import { AutoMediaCarousel } from "@/components/AutoMediaCarousel";
import { Headline } from "@/components/Headline";
import { MediaCarousel } from "@/components/MediaCarousel";
import { getApiConfig } from "@/service/http/getApiConfig";
import { getMovies } from "@/service/http/getMovies";
import { getTvShows } from "@/service/http/getTvShows";
import Link from "next/link";

export default async function Home() {
  const config = await getApiConfig();
  const movies = await getMovies();
  const tvShows = await getTvShows();

  if (!config) {
    return <div>Error fetching API config</div>;
  }

  return (
    <main className="flex flex-col h-dvh">
      <nav className="flex flex-col gap-2 p-4">
        <Headline>MoviX</Headline>
        <div className="flex gap-2">
          <Link prefetch href={"/movies"}>
            Movies
          </Link>
          <Link href={"/tv-shows"}>TV Shows</Link>
        </div>
      </nav>
      <section className="flex h-full items-center justify-center">
        <p>All about movies and TV shows</p>
      </section>
    </main>
  );
}
