import { extractLinksFromPage } from "./scraper";
import { DomainCrawlResult, CrawlOptions } from "./types";
import fs from "fs";
import path from "path";

function getBaseDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

export async function crawl(
  baseUrl: string,
  options: CrawlOptions = {}
): Promise<DomainCrawlResult> {
  const { limit = 5, saveToFile = true } = options;

  const visited = new Set<string>();
  const allLinks = new Set<string>();
  const toVisit: string[] = [baseUrl];
  let count = 0;

  const baseDomain = getBaseDomain(baseUrl);

  while (toVisit.length > 0 && count < limit) {
    const url = toVisit.shift()!;
    if (visited.has(url)) continue;

    try {
      console.log(`Crawling: ${url}`);
      const links = await extractLinksFromPage(url);

      visited.add(url);
      count++;

      links.forEach((link) => {
        if (getBaseDomain(link) === baseDomain) {
          allLinks.add(link);
        }
      });

      // Filtra solo i link interni
      const internalLinks = links
        .filter((link) => getBaseDomain(link) === baseDomain)
        .filter((link) => !visited.has(link));

      toVisit.push(...internalLinks);
    } catch (err) {
      console.error(`Errore su ${url}:`, err);
    }
  }

  const result: DomainCrawlResult = {
    baseUrl,
    domain: baseDomain,
    links: Array.from(allLinks),
    crawledPages: visited.size,
    timestamp: new Date(),
  };

  if (saveToFile) {
    saveLinks(result);
  }

  return result;
}

export function saveLinks(result: DomainCrawlResult) {
  const folderPath = path.join("output", "pages");
  fs.mkdirSync(folderPath, { recursive: true });

  result.links.forEach((link, index) => {
    // Usa solo l’indice come nome file
    const fileName = `${index + 1}.md`;
    const filePath = path.join(folderPath, fileName);

    const content =
      `# Link estratto\n` +
      `URL: ${link}\n` +
      //`Dominio: ${result.domain}\n` +
      `Data: ${result.timestamp.toISOString()}\n`;

    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`Salvato: ${filePath}`);
  });
}

/*function saveLinks(result: DomainCrawlResult) {
  const fileName = `links_${new Date().toISOString().split("T")[0]}.md`;
  const filePath = path.join("output", fileName);

  const content =
    `# Links trovati da: ${result.baseUrl}\n` +
    `# Data: ${result.timestamp.toISOString()}\n\n` +
    result.links.map(link => `- ${link}`).join("\n");

  fs.mkdirSync("output", { recursive: true });
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`Links salvati in: ${filePath}`);
}*/

/*import { extractLinksFromPage } from "./scraper";
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

export async function crawl(baseUrl: string, limit: number = 5): Promise<string[]> {
  const visited = new Set<string>();
  const allLinks = new Set<string>();
  const toVisit: string[] = [baseUrl];
  let count = 0;
  
  const baseDomain = getBaseDomain(baseUrl);

  while (toVisit.length > 0 && count < limit) {
    const url = toVisit.shift()!;
    if (visited.has(url)) continue;

    
    try {
      console.log(`Crawling: ${url}`);
      
      // Estrai solo i link dalla pagina
      const links = await extractLinksFromPage(url);
      
      visited.add(url);
      count++;
      
      // Aggiungi tutti i link trovati
      links.forEach(link => allLinks.add(link));
      
      // Filtra solo i link interni per continuare il crawling
      const internalLinks = links
        .filter(link => getBaseDomain(link) === baseDomain)
        .filter(link => !visited.has(link));
      
      toVisit.push(...internalLinks);
      
    } catch (err) {
      console.error(`Errore su ${url}:`, err);
    }
  }
  
  // Salva i link trovati in un file
  saveLinks(Array.from(allLinks), baseUrl);
  
  return Array.from(allLinks);
}

function saveLinks(links: string[], baseUrl: string) {
  const fileName = `links_${new Date().toISOString().split('T')[0]}.txt`;
  const filePath = path.join("output", fileName);
  
  const content = `# Links trovati da: ${baseUrl}\n# Data: ${new Date().toISOString()}\n\n` +
                  links.map(link => `- ${link}`).join('\n');
  
  fs.mkdirSync("output", { recursive: true });
  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`Links salvati in: ${filePath}`);
}*/
