import { draftMode } from "next/headers";
import { getStories } from "@/lib/sbApi";

/**
 * Self-fetching server component for 'articles_widget' blok.
 * Editors can set 'limit' on the blok schema if desired.
 */
export default async function ArticlesWidget({ blok }) {
  const { isEnabled: isDraft } = await draftMode();
  const version   = isDraft ? "draft" : "published";
  const fetchInit = isDraft ? { cache: "no-store" } : undefined;

  const limit = blok?.limit ?? 100;

  const { stories } = await getStories(
    {
      version,
      starts_with: "articles/",
      content_type: "article",
      sort_by: "first_published_at:desc",
      per_page: limit
    },
    fetchInit
  );

  if (!stories.length) return null;

  return (
    <section className="py-12">
      {blok?.heading && <h2 className="text-2xl font-semibold mb-6">{blok.heading}</h2>}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((s) => (
          <li key={s.uuid} className="rounded border p-4">
            <a href={`/${s.full_slug}`} className="font-medium underline">
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
