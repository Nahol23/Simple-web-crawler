import { Firecrawl } from "@mendable/firecrawl-js";
import { ScrapeResult } from "./types";

const app = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY! });

export async function extractPageData(url: string): Promise<ScrapeResult> {
  try {
    const result = await app.scrape(url, { formats: ["markdown", "links"] });

    const links: string[] = [];
    if (Array.isArray(result.links)) {
      result.links.forEach((link: any) => {
        let href: string | undefined;
        if (typeof link === "string") href = link;
        else if (link?.url) href = link.url;
        else if (link?.href) href = link.href;

        if (href) {
          try {
            const absolute = new URL(href, url).href;
            links.push(absolute);
          } catch {
            // ignora link malformati
          }
        }
      });
    }

    return {
      url:String( result.metadata?.url || result.metadata?.canonical || url),
      title: result.metadata?.title || "",
      description: result.metadata?.description || "",
      markdown: result.markdown || "",
      links,
    };
  } catch (error) {
    console.error(`Errore nell'estrazione dati da ${url}:`, error);
    return { url, links: [] };
  }
}
