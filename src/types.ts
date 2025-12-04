export interface DomainCrawlResult{
  baseUrl : string;
  domain : string;
  crawledPages : number;
  timestamp : Date;
  pages: ScrapeResult[];

}

export interface CrawlOptions{
  limit? : number; // numero massimo di pagie da visitare
  concurrent? : number;
  saveToFile? : boolean; 
}

export interface ScrapeResult{
  url: string;
  title? : string;
  markdown? : string;
  description?: string;
  links: string [];
  
}
export type CrawlJob = {
  id: string;
  status: string;
  data: ScrapeResult[]; 
};





/*export interface PageData {
  title: string;
  url: string;
  description?: string;
  content?: string;
}*/
//export type SitemapData = Record<string, string>;

//export interface ScrapeResult {
  //markdown?: string;
  //url: string;
  //links: string[];
  //metadata?: Record<string, any>;
//}

/*export interface FirecrawlConfig {
  apiKey: string;
  formats?: ("markdown" | "html" | "links")[];
}

export interface QueueUrl {
  url: string;
  depth: number;
}
export type VisitedUrls = Set<string>;

export interface CrawledContent {
  url: string;
  title?: string;
  markdown?: Record<string, any>;
}

export interface CrawlOptions {
  maxDepth?: number;
  includePaths?: string[];
  excludePaths?: string[];
  allowExternalLinks?: boolean;
  saveContent?: boolean;
}*/
