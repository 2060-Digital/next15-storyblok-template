import { draftMode } from "next/headers";
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokComponent } from "@storyblok/react";

export const revalidate = 60;

/** Pre-generate static params for all published pages */
export async function generateStaticParams() {
  const api = getStoryblokApi();
  const { data } = await api.get("cdn/stories", {
    version: "published",
    per_page: 100
  });

  return (data?.stories || [])
    .filter((s) => s.full_slug !== "home")
    .map((story) => ({
      slug: story.full_slug.split("/")
    }));
}


export default async function DynamicPage({ params }) {
  const slug = params?.slug?.length ? params.slug.join("/") : "home";

  const { isEnabled: isDraft } = await draftMode();
  const version   = isDraft ? "draft" : "published";
  const fetchInit = isDraft ? { cache: "no-store" } : undefined;

  const api = getStoryblokApi();
  const { data } = await api.get(
    `cdn/stories/${slug}`,
    { version, resolve_links: "url" },
    fetchInit
  );

  const content = data?.story?.content;
  if (!content?.component) {
    return (
      <main className="p-12 text-center">
        <h1 className="text-2xl font-semibold mb-4">404 — Page Not Found</h1>
        <p className="text-neutral-600">
          No Storyblok entry found for <code>{slug}</code>
        </p>
      </main>
    );
  }

  return <StoryblokComponent blok={content} />;
}
