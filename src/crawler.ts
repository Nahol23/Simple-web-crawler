import { Firecrawl } from "@mendable/firecrawl-js";
import { DomainCrawlResult, CrawlOptions, ScrapeResult } from "./types";
import fs from "fs";
import path from "path";

const app = new Firecrawl({ apiKey: "fc-de89269d17cd453fb4aef87132f9d72b" });

function getBaseDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/\./g, "_");
  } catch {
    return "unknown_domain";
  }
}
let lastCrawlTime = 0;
const RATE_LIMIT_MS = 5000; // minimo 5 secondi tra un crawl e l'altro

export async function crawl(
  baseUrl: string,
  options: CrawlOptions = {}
): Promise<DomainCrawlResult> {
  const { limit = 5, saveToFile = true } = options;

  const now = Date.now();
  if (now - lastCrawlTime < RATE_LIMIT_MS) {
    const wait = RATE_LIMIT_MS - (now - lastCrawlTime);
    console.log(` Rate limit attivo, attendo ${wait}ms prima di chiamare Firecrawl...`);
    await new Promise(res => setTimeout(res, wait));
  }
  lastCrawlTime = Date.now();

  console.log(` Avvio crawl con Firecrawl su: ${baseUrl}`);

  const result = await app.crawl(baseUrl, { limit });

  const pages: ScrapeResult[] = result.data.map((page: any, idx: number) => ({
    url: page.url || page.metadata?.url || page.metadata?.canonical || `${baseUrl}#${idx}`,
    title: page.metadata?.title || "",
    description: page.metadata?.description || "",
    markdown: page.markdown || "",
    links: page.links || [],
  }));

  const domainResult: DomainCrawlResult = {
    baseUrl,
    domain: getBaseDomain(baseUrl),
    pages,
    crawledPages: pages.length,
    timestamp: new Date(),
  };

  if (saveToFile) {
    savePages(domainResult);
  }

  return domainResult;
}


export async function generateSitemap(baseUrl: string) {
  const sitemap = await app.map(baseUrl);
  console.log(" Sitemap generata:", sitemap);
  return sitemap;
}
export function savePages(result: DomainCrawlResult) {
  const folderPath = path.join("output", result.domain);
  fs.mkdirSync(folderPath, { recursive: true });

  // Set per evitare duplicati
  const seen = new Set<string>();

  result.pages.forEach((page, index) => {
    // Se manca l'URL, uso un fallback
    const safeUrl = page.url || `url_${index}`;
    const normalizedUrl = safeUrl.replace(/\/$/, ""); // normalizza togliendo lo slash finale

    if (seen.has(normalizedUrl)) {
      console.warn(`URL duplicato, salto: ${normalizedUrl}`);
      return;
    }
    seen.add(normalizedUrl);

    const safeTitle = page.title?.trim() || "Pagina senza titolo";
    const safeDescription = page.description?.trim() || "";
    const safeMarkdown =
      page.markdown?.trim() || "Nessun contenuto disponibile";

    // Nome file derivato dall'URL o fallback
    const safeName = normalizedUrl.replace(/[^a-z0-9]/gi, "_").slice(0, 100);
    const fileName = `${safeName}.md`;
    const filePath = path.join(folderPath, fileName);

    // Contenuto del file
    const content =
      `**URL:** ${safeUrl}\n\n` +
      `# ${safeTitle}\n\n` +
      (safeDescription ? `**Descrizione:** ${safeDescription}\n\n` : "") +
      `**Data:** ${result.timestamp.toISOString()}\n\n` +
      `---\n\n` +
      safeMarkdown +
      `\n\n---\n\n` +
      `## Raw data\n\n` +
      "```json\n" +
      JSON.stringify(page, null, 2) +
      "\n```";

    fs.writeFileSync(filePath, content, "utf-8");
    console.log(` Salvato: ${filePath}`);
  });

  // Salva anche un file JSON unico con tutte le pagine
  const allJsonPath = path.join(folderPath, "all_pages.json");
  fs.writeFileSync(allJsonPath, JSON.stringify(result.pages, null, 2), "utf-8");
  console.log(` Salvato dataset completo: ${allJsonPath}`);
}
