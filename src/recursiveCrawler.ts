/*import { FirecrawlScraper } from './scraper';
import { CrawledContent, SitemapData, VisitedUrls, CrawlOptions } from './types';

export class RecursiveCrawler {
    private visited : VisitedUrls = new Set();
    private sitemap: SitemapData = {};
    private crawledContent : CrawledContent[] = []; 
    private options: Required<CrawlOptions>; 
   // private maxDepth: number;


    constructor(
        private scraper : FirecrawlScraper,
        options: CrawlOptions = {}

    ) {
        this.options = {
            maxDepth: options.maxDepth || 2,
            includePaths: options.includePaths || [],
            excludePaths: options.excludePaths || [],
            allowExternalLinks: options.allowExternalLinks || false,
            saveContent: options.saveContent || false,
        };
    }
        private shouldCrawlLink(url: string, baseUrl: string): boolean {
            const parsedUrl = new URL(url);
            const baseDomain = new URL(baseUrl).hostname;
            const urlDomain = parsedUrl.hostname;

            // Controlla se il link è esterno
            if (!this.options.allowExternalLinks && urlDomain !== baseDomain) {
                return false;
            }
            const path = parsedUrl.pathname;
            
            // Controlla i pattern di inclusione
            if(this.options.excludePaths.length > 0){
                for (const pattern of this.options.excludePaths) {
                    if (path.includes(pattern)) {
                        return false;
                    }
            }

        }

            if (this.options.includePaths.length > 0) {
                let included = false;
                for (const pattern of this.options.includePaths) {
                    if (path.includes(pattern)) {
                        included = true;
                        break;
                    }
                }
                return true;
            }
            

        }

    public async crawl(startUrl: string): Promise<{sitemap : SitemapData; content?:CrawledContent[]}> 
    {
        const queue : {url: string; depth: number}[] = [{url: startUrl, depth: 0}];
        const baseUrl = new URL(startUrl);

        this.crawledContent = [];

        while(queue.length > 0)
        {
            const {url, depth} = queue.shift()!

            if (this.visited.has(url) || depth > this.options.maxDepth) continue;

            this.visited.add(url);
            console.log(`[Depth ${depth}] Crawling: ${url}`);

            try {
                const result = await this.scraper.scrapeWithContent(url);

                if(this.options.saveContent && result.markdown)
                {
                    const title = result.metadata?.title || result.metadata?.ogTitle || new URL(url).pathname.split('/').pop() || url;


                    this.crawledContent.push({
                        url,
                        title,
                        markdown: result.markdown,
                        metadata: result.metadata
                        
                    })
                }
            }
        }



    }

       


}*/