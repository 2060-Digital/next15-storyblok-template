import { StoryblokComponent } from "@storyblok/react";
import { componentRegistry } from "@/lib/storyblok";

/** Simple dev-friendly fallback to avoid crashes for unknown components */
function Missing({ blok }) {
  return (
    <pre className="p-4 my-4 rounded border bg-yellow-50">
      Missing Storyblok mapping for: <b>{blok.component}</b>
    </pre>
  );
}

/** Server component: renders the page’s Blocks array exactly once */
export default function PageBlok({ blok }) {
  const items = Array.isArray(blok?.body) ? blok.body : [];
  if (!items.length) return null;

  return (
    <main>
      {items.map((nested) =>
        componentRegistry[nested.component] ? (
          <StoryblokComponent blok={nested} key={nested._uid} />
        ) : (
          <Missing blok={nested} key={nested._uid} />
        )
      )}
    </main>
  );
}
