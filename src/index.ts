import { crawl } from "./crawler";

const baseUrl = process.argv[2] || "https://www.mediaworld.it/";
const limit = parseInt(process.argv[3] || "2");

(async () => {
  console.log(`Inizio crawling da: ${baseUrl}`);

  try {
    const result = await crawl(baseUrl, {limit});

    console.log("\nCrawling Completo");
    console.log(`Link totali trovati: ${result.links.length}`);

    if (result.links.length > 0) {
      console.log("\nLink trovati:");
      result.links.forEach((link, index) => {
        console.log(`${index + 1}. ${link}`);
      });
    } else {
      console.log("\nNessun Link trovato");
    }
  } catch (error) {
    console.error("Errore durante il crawling:", error);
  }
})();



//const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || 'fc-d807a0d8d42c456f95f4ca7d8b40168f';

/*import { FirecrawlScraper } from './scraper';
import { RecursiveCrawler } from './recursiveCrawler';
import * as fs from 'fs/promises';
import * as path from 'path';

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || 'fc-d807a0d8d42c456f95f4ca7d8b40168f';
const START_URL = "https://www.missoun.com/";
const OUTPUT_DIR = path.join(process.cwd(), 'output');


async function main() {
    const scraper = new FirecrawlScraper(FIRECRAWL_API_KEY);
    const crawler = new RecursiveCrawler(scraper, 2); // max depth 2

    const sitemap = await crawler.crawl(START_URL);

    await fs.mkdir(OUTPUT_DIR, { recursive: true });
    const filePath = path.join(OUTPUT_DIR, 'recursive-links.md');
    const content = Object.entries(sitemap)
        .map(([name, url]) => `${name}: ${url}`)
        .join('\n');

    await fs.writeFile(filePath, content, 'utf-8');
    console.log(`Recursive crawl complete. ${Object.keys(sitemap).length} links saved.`);
}

main();*/