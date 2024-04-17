import { ApiConfig } from "@/service/models/ApiConfig";
import { Movie } from "@/service/models/MoviesResponse";
import { TvShow } from "@/service/models/TvShowsResponse";
import { getMediaUrl } from "@/utils";
import Image from "next/image";

type MediaCarouselProps<T extends Movie | TvShow> = {
  media?: T[];
  config: ApiConfig;
};

export function MediaCarousel<T extends Movie | TvShow>({
  media = [],
  config,
}: MediaCarouselProps<T>) {
  return (
    <div className="flex w-full relative">
      <div className="absolute z-20 top-0 left-0 h-full flex p-4 text-2xl items-center">
        <span className="flex justify-center items-center w-8 h-8 bg-white text-black rounded-[50%] cursor-pointer">
          {"<"}
        </span>
      </div>
      <div className="flex flex-1 overflow-hidden px-4 carousel-mask">
        <div className="flex gap-4">
          {media.map((item) => {
            const title = (item as Movie).title || (item as TvShow).name;

            return (
              <div key={item.id} className="flex relative w-[200px] ">
                <Image
                  width={384}
                  height={576}
                  src={getMediaUrl(config, item.poster_path, 4)}
                  className="rounded-md"
                  alt={title}
                />
                <div className="flex gap-2 bg-black bg-opacity-80 flex-col justify-end absolute w-full h-full z-10 p-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-bold">{title}</h3>
                  <p className="flex text-sm max-h-[50%] overflow-hidden">
                    {truncateText(item.overview)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute z-20 top-0 right-0 h-full flex p-4 text-2xl items-center">
        <span className="flex justify-center items-center w-8 h-8 bg-white text-black rounded-[50%] cursor-pointer">
          {">"}
        </span>
      </div>
    </div>
  );
}

// helper methos to simulate the elipsis effect text. Limit the text to a certain number of characters

function truncateText(text: string, limit: number = 150) {
  // avoid adding ... if the text is shorter than the limit or ends with a period
  const slice = text.slice(0, limit).trim();
  let dots = "...";
  if (text.length <= limit || slice.endsWith(".")) {
    dots = "";
  }
  return text.length > limit ? `${slice}${dots}` : text;
}
