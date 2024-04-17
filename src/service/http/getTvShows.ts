import { Constants } from "@/constants";
import { TvShowsResponseSchema } from "../models/TvShowsResponse";
import qs from "query-string";

type TVShowQueryParams = {
  air_date?: {
    gte?: Date;
    lte?: Date;
  };
  first_air_date_year?: number;
  first_air_date?: {
    gte?: Date;
    lte?: Date;
  };
  include_adult?: boolean;
  include_null_first_air_dates?: boolean;
  language?: string;
  page?: number;
  screened_theatrically?: boolean;
  sort_by?: string;
  timezone?: string;
  vote_average?: {
    gte?: number;
    lte?: number;
  };
  vote_count?: {
    gte?: number;
    lte?: number;
  };
  watch_region?: string;
  with_companies?: string;
  with_genres?: string;
  with_keywords?: string;
  with_networks?: number;
  with_origin_country?: string;
  with_original_language?: string;
  with_runtime?: {
    gte?: number;
    lte?: number;
  };
  with_status?: string;
  with_watch_monetization_types?: string;
  with_watch_providers?: string;
  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  with_type?: string;
};

//https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc'

const defaultQueryParams: TVShowQueryParams = {
  page: 1,
  language: "en-US",
  include_adult: false,
  include_null_first_air_dates: false,
  sort_by: "popularity.desc",
};

export async function getTvShows(queryParams?: TVShowQueryParams) {
  try {
    const queryParamsString = qs.stringify({
      ...defaultQueryParams,
      ...queryParams,
    });

    const response = await fetch(
      `${Constants.MoviesDbApiBaseUrl}/discover/tv?${queryParamsString}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MOVIES_DB_API_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    return TvShowsResponseSchema.parse(data);
  } catch (error) {
    // console.log("Error fetching TV shows", error);
    return null;
  }
}
