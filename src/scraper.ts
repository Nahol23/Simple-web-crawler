import { Firecrawl } from "@mendable/firecrawl-js";
import { PageData } from "./types";

const app = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY! });

export async function scrapePage(url: string): Promise<PageData> {
  const result = await app.scrape(url);

  return {
    title: result.metadata?.title || "Untitled",
    url,
    description: result.metadata?.description,
    content: result.markdown || "",
  };
}






/*import FirecrawlApp from '@mendable/firecrawl-js';
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





import Firecrawl from '@mendable/firecrawl-js';
import '*' as fs from 'fs/promises';



     const firecrawl = new Firecrawl({apiKey: "fc-YOUR_API_KEY"});

    // Scrape a website
        const scrapeResponse = await firecrawl.scrape('https://firecrawl.dev', {
    formats: ['markdown', 'html'],
    });

    console.log(scrapeResponse)

    // Crawl a website
    const crawlResponse = await firecrawl.crawl('https://firecrawl.dev', {
    limit: 2,
    scrapeOptions: {
        formats: ['markdown', 'html'],
    }
    });

    console.log(crawlResponse)
*/
    
/*    
    // esegui il fetch HTTP usando Firecrawl API
    
    import { Firecrawl, FirecrawlApp } from '@mendable/firecrawl-js';
    import { ScrapeResult } from './types';
    
    // API Key di Firecrawl
    const FIRECRAWL_API_KEY = process.env.FIRECRAWL_API_KEY || 'your-api-key-here';
    
    /**
     * Esegue lo scraping di un singolo URL usando Firecrawl API.
     * @param url L'URL da raschiare.
     * @returns I link estratti dalla pagina, con nome e URL.
    export async function scrapeUrl(url: string): Promise<ScrapeResult | null> {
        console.log(`Firecrawl scraping: ${url}`);
        
        try {
            // Inizializza Firecrawl
            const app = new Firecrawl({ 
                apiKey: FIRECRAWL_API_KEY 
            });
            
            // Scrape della pagina
            const scrapeResult = await app.scrape(url );
            
            if (!scrapeResult) {
                console.error(`Firecrawl errore: ${scrapeResult}`);
                return null;
            }
            
            const data = scrapeResult;
            const extractedLinks: { name: string, url: string }[] = [];
            const uniqueUrls = new Set<string>();
            
            // Estrai i link dal risultato di Firecrawl
            if (data.links && Array.isArray(data.links)) {
                data.links.forEach((link: any, i: number) => {
                    try {
                        const linkUrl = link.href || link.url;
                        
                        if (linkUrl) {
                            // Normalizza URL (rimuovi hash)
                            const urlWithoutHash = linkUrl.split('#')[0];
                            
                            // Filtra solo URL HTTP/HTTPS e non duplicati
                            if (urlWithoutHash.startsWith('http') && !uniqueUrls.has(urlWithoutHash)) {
                                uniqueUrls.add(urlWithoutHash);
                                
                                // Prendi il testo del link o usa un nome generico
                                const linkText = link.text || link.name || `link-${i + 1}`;
                                const name = linkText
                                .trim()
                                .replace(/\s+/g, ' ')
                                .substring(0, 50); // Limita la lunghezza
                                
                                extractedLinks.push({ 
                                    name: name || `link-${i + 1}`, 
                                    url: urlWithoutHash 
                                });
                            }
                        }
                    } catch (e) {
                        // Ignora link malformati
                    }
                });
            }
            
            console.log(` Firecrawl ha trovato ${extractedLinks.length} link`);
            
            return {
                url,
                links: extractedLinks,
            };
            
        } catch (error: any) {
            console.error(` Errore Firecrawl: ${error.message}`);
            return null;
        }
    }
    */




