import { FirecrawlScraper } from './scraper';
import * as fs from 'fs/promises';
import * as path from 'path';

const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || 'fc-d807a0d8d42c456f95f4ca7d8b40168f';
const START_URL = "https://www.missoun.com/";
const OUTPUT_DIR = path.join(process.cwd(), 'output');

async function main() {
    try {
        const scraper = new FirecrawlScraper(FIRECRAWL_API_KEY);
        const sitemap = await scraper.extractLinks(START_URL);
        
        // Salva i risultati
        await fs.mkdir(OUTPUT_DIR, { recursive: true });
        const filePath = path.join(OUTPUT_DIR, 'links.md');
        
        const content = Object.entries(sitemap)
            .map(([name, url]) => `${name}: ${url}`)
            .join('\n');
        
        await fs.writeFile(filePath, content, 'utf-8');
        
        console.log(`\n Link salvati in: ${filePath}`);
        console.log(` Totale link: ${Object.keys(sitemap).length}`);
        
    } catch (error) {
        console.error('ERRORE:', error);
    }
}

main();