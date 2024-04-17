import { Constants } from "@/constants";
import { MoviesResponseSchema } from "../models/MoviesResponse";
import qs from "query-string";

type GetMoviesQueryParams = {
  certification?: {
    gte?: string;
    lte?: string;
  };
  certification_country?: string;
  include_adult?: boolean;
  include_video?: boolean;
  language?: string;
  page?: number;
  primary_release_year?: {
    gte?: number;
    lte?: number;
  };
  primary_release_date?: {
    gte?: Date;
    lte?: Date;
  };
  region?: string;
  release_date?: {
    gte?: Date;
    lte?: Date;
  };
  sort_by?: string;
  vote_average?: {
    gte?: number;
    lte?: number;
  };
  vote_count?: {
    gte?: number;
    lte?: number;
  };
  watch_region?: string;
  with_cast?: string;
  with_companies?: string;
  with_crew?: string;
  with_genres?: string;
  with_keywords?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_people?: string;
  with_release_type?: number;
  with_runtime?: {
    gte?: number;
    lte?: number;
  };
  with_watch_monetization_types?: string;
  with_watch_providers?: string;
  without_companies?: string;
  without_genres?: string;
  without_keywords?: string;
  without_watch_providers?: string;
  year?: number;
};

//https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'

const defaultQueryParams: GetMoviesQueryParams = {
  page: 1,
  language: "en-GB",
  include_adult: false,
  include_video: false,
  sort_by: "popularity.desc",
};

export async function getMovies(queryParams?: GetMoviesQueryParams) {
  try {
    const newQueryParams = {
      ...defaultQueryParams,
      ...queryParams,
    };

    const response = await fetch(
      `${Constants.MoviesDbApiBaseUrl}/movie/popular?${qs.stringify(
        newQueryParams,
        { encode: true }
      )}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MOVIES_DB_API_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    return MoviesResponseSchema.parse(data);
  } catch (error) {
    console.error("Error fetching movies", error);
    return null;
  }
}
