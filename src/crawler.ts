import { scrapePage } from "./scraper";
import { PageData } from "./types";
import fs from "fs";
import path from "path";


function getBaseDomain(url: string): string {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname; 
  } catch (e) {
    return ""; 
  }
}

export async function crawl(baseUrl: string, limit: number = 5): Promise<void> {
  const visited = new Set<string>();
  const toVisit: string[] = [baseUrl];
  let count = 0;
  
  
  const baseDomain = getBaseDomain(baseUrl); 

  while (toVisit.length > 0 && count < limit) {
    const url = toVisit.shift()!;
    if (visited.has(url)) continue; 
    try {
      const page: PageData = await scrapePage(url);
      saveMarkdown(page);
      visited.add(url);
      count++;

      if (page.content) {
        const links = extractLinks(page.content);
        
        const internalLinks = links
          .filter(link => getBaseDomain(link) === baseDomain) 
          
          .filter(l => !visited.has(l)); 
          
        toVisit.push(...internalLinks);
      }
    } catch (err) {
      console.error(`Errore su ${url}:`, err);
    }
  }
}

function saveMarkdown(page: PageData) {
  const fileName = page.title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  const filePath = path.join("output", `${fileName}.md`);

  const mdContent = `# ${page.title}\n\n` +
                    `**Link:** ${page.url}\n\n` +
                    (page.description ? `**Descrizione:** ${page.description}\n\n` : "") +
                    `${page.content || ""}`;

  fs.mkdirSync("output", { recursive: true });
  fs.writeFileSync(filePath, mdContent, "utf-8");
}

function extractLinks(content: string): string[] {
  const regex = /\[.*?\]\((https?:\/\/[^\s)]+)\)/g;

  const links: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    links.push(match[1]); 
  }

  return links;
}