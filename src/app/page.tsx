import { AutoMediaCarousel } from "@/components/AutoMediaCarousel";
import { MediaCarousel } from "@/components/MediaCarousel";
import { getApiConfig } from "@/service/http/getApiConfig";
import { getMovies } from "@/service/http/getMovies";
import { getTvShows } from "@/service/http/getTvShows";

export default async function Home() {
  const config = await getApiConfig();
  const movies = await getMovies();
  const tvShows = await getTvShows();

  if (!config) {
    return <div>Error fetching API config</div>;
  }

  return (
    <main className="">
      <h1>Moovix</h1>
      <p>All about movies and TV shows</p>
      <section>
        <h2>Popular Movies</h2>
        <div>
          <MediaCarousel config={config} media={movies?.results} />
        </div>
      </section>
      <section>
        <h2>Popular TV Shows</h2>
        <div>
          <MediaCarousel config={config} media={tvShows?.results} />
        </div>
      </section>
    </main>
  );
}
