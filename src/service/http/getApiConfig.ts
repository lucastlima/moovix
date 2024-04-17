import { Constants } from "@/constants";
import { ApiConfigSchema } from "../models/ApiConfig";

export async function getApiConfig() {
  try {
    const response = await fetch(
      `${Constants.MoviesDbApiBaseUrl}/configuration`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MOVIES_DB_API_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    return ApiConfigSchema.parse(data);
  } catch (error) {
    console.error("Error fetching API config", error);
    return null;
  }
}
