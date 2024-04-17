import { ApiConfig } from "./service/models/ApiConfig";

export function getMediaUrl(config: ApiConfig, path: string, size: number = 3) {
  return `${config.images.base_url}${config.images.poster_sizes[size]}${path}`;
}
