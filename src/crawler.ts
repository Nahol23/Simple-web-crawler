// Super simple crawler - nessuna complessità
/*
import * as fs from 'fs/promises';
import * as path from 'path';
import { SitemapData } from './types';
import { scrapeUrl } from './scraper';

const OUTPUT_DIR = path.join(process.cwd(), 'output');
const DUMP_FILENAME = 'links.md';  

export class SimpleLinkExtractor {
    constructor(private rootUrl: string) {}

    
    public async run(): Promise<SitemapData> {
        console.log(`Estrazione link da: ${this.rootUrl}`);
        
        const result = await scrapeUrl(this.rootUrl);
        const sitemapData: SitemapData = {};

        if (result) {
            // Aggiungi tutti i link trovati
            result.links.forEach((link, index) => {
                const key = link.name || `link-${index}`;
                sitemapData[key] = link.url;
            });
            
            await this.saveLinks(sitemapData);
            console.log(`Trovati ${Object.keys(sitemapData).length} link`);
        }

        return sitemapData;
    }
    
    
     //Salva i link in un file semplice
     
    private async saveLinks(links: SitemapData): Promise<void> {
        await fs.mkdir(OUTPUT_DIR, { recursive: true });
        const filePath = path.join(OUTPUT_DIR, DUMP_FILENAME);

        const content = Object.entries(links)
            .map(([name, url]) => `${name}: ${url}`)
            .join('\n');

        await fs.writeFile(filePath, content, 'utf-8');
        console.log(`Link salvati in: ${filePath}`);
    }
}*/