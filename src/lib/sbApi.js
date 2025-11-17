import { getStoryblokApi } from "@storyblok/react/rsc";

/** Single story (REST) */
export async function getStory(slug, params = {}, init) {
  const api = getStoryblokApi();
  const { data } = await api.get(
    `cdn/stories/${slug}`,
    { version: process.env.STORYBLOK_VERSION ?? "published", ...params },
    init
  );
  return data?.story;
}

/** List stories (REST) */
export async function getStories(params = {}, init) {
  const api = getStoryblokApi();
  const { data } = await api.get(
    "cdn/stories",
    { version: process.env.STORYBLOK_VERSION ?? "published", per_page: 25, page: 1, ...params },
    init
  );
  return { stories: data?.stories ?? [], total: data?.total ?? 0, perPage: data?.perPage ?? 0 };
}
