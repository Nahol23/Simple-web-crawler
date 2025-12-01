import FirecrawlApp from '@mendable/firecrawl-js';
import { SitemapData, ScrapeResult } from './types';

export class FirecrawlScraper {
    private app: FirecrawlApp;
    
    constructor(apiKey: string) {
        this.app = new FirecrawlApp({ apiKey });
    }
    
    async extractLinks(url: string): Promise<SitemapData> {
        console.log(`Scraping : ${url}`);
        
        try {
            // Usa scrape per ottenere la pagina con i link
            const result = await this.app.scrape(url, {
                formats: ['html', 'links']
            });
            
            const sitemapData: SitemapData = {};
            
            if (result.links && result.links.length > 0) {
                result.links.forEach((link: string, index: number) => {
                    const key = `link-${index}`;
                    sitemapData[key] = link;
                });
            }
            
            console.log(`Trovati ${Object.keys(sitemapData).length} link`);
            return sitemapData;
            
        } catch (error: any) {
            console.error(` Errore : ${error.message}`);
            return {};
        }
    }
    
    //  il contenuto in markdown
    async scrapeWithContent(url: string): Promise<ScrapeResult> {
        const result = await this.app.scrape(url, {
            formats: ['markdown', 'links', 'html']
        });
        
        return {
            markdown: result.markdown,
            links: result.links,
            metadata: result.metadata
        };
    }
}