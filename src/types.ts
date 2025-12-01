export type SitemapData = Record<string, string>;

export interface ScrapeResult {
    markdown?: string;
    links?: string[];
    metadata?: Record<string, any>;
}

export interface FirecrawlConfig {
    apiKey: string;
    formats?: ('markdown' | 'html' | 'links')[];
}