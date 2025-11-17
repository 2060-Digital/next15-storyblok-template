import { draftMode } from "next/headers";
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokComponent } from "@storyblok/react";

export const revalidate = 60;

export default async function Home() {
  const { isEnabled: isDraft } = await draftMode();
  const version   = isDraft ? "draft" : "published";
  const fetchInit = isDraft ? { cache: "no-store" } : undefined;

  const api = getStoryblokApi();
  const { data } = await api.get(
    "cdn/stories/home",               // change if your home full_slug differs
    { version, resolve_links: "url" },
    fetchInit
  );

  const content = data?.story?.content; // expects component: "page" with body []
  return content?.component ? <StoryblokComponent blok={content} /> : null;
}
