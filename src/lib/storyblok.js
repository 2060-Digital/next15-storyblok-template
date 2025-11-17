import { storyblokInit, apiPlugin, getStoryblokApi } from "@storyblok/react/rsc";

import PageBlok from "@/components/PageBlok";
import ArticlesWidget from "@/components/ArticlesWidget";

/** Register ALL blok components here (keys match Storyblok “component” names) */
export const componentRegistry = {
  page: PageBlok,
  articles_widget: ArticlesWidget
};

export function initStoryblok() {
  storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_PREVIEW_TOKEN,
    use: [apiPlugin],
    components: componentRegistry,
    apiOptions: {
      // Region is “eu” by default; set env to "us" if your space is US
      region: process.env.NEXT_PUBLIC_STORYBLOK_REGION || "eu"
    }
  });
}

/** Re-export SDK helper so other modules can import from our lib */
export { getStoryblokApi };
