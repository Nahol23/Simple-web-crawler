# Web Crawler with Firecrawl

A TypeScript-based web crawler and scraper built with Firecrawl API for extracting structured content from websites.

## Features

- **Website Crawling**: Recursively crawl websites with configurable limits
- **Content Extraction**: Extract page metadata, titles, descriptions, and markdown content
- **Link Discovery**: Collect all links from crawled pages
- **Rate Limiting**: Built-in rate limiting to respect API limits
- **File Export**: Save results as markdown files and JSON datasets
- **Sitemap Generation**: Generate sitemaps for websites
- **Duplicate Detection**: Prevent processing duplicate URLs

## Prerequisites

- Node.js (v14 or higher)
- Firecrawl API key (get one from [Firecrawl](https://firecrawl.dev))

## Installation

1. Clone the repository:
   
   ```bash
   git clone <your-repo-url>
   cd <project-folder>
   ```

2. Install dependencies:
   
   ```bash
   npm install
   ```

3. Set up your Firecrawl API key:
   
   - Option 1: Set as environment variable:
     
     ```bash
     export FIRECRAWL_API_KEY="your-api-key-here"
     ```
   - Option 2: Edit `crawler.ts` and replace `"Your API Key from FirecrawlApiKey"` with your actual key

## Project Structure

```
├── crawler.ts      # Main crawling logic with rate limiting
├── scraper.ts      # Single page data extraction
├── index.ts        # CLI entry point
├── types.ts        # TypeScript interfaces
├── utils/logger.ts # Logging utilities 
└── output/         # Generated output folder (created automatically)
```

## Usage

### Interactive Mode (CLI)

Run the interactive crawler:

```bash
npm start
# or
ts-node index.ts
```

When prompted, enter the URL you want to crawl.

### Programmatic Usage

Import and use the crawler in your code:

```typescript
import { crawl, generateSitemap } from './crawler';

// Crawl a website
const result = await crawl('https://example.com', {
  limit: 10,
  saveToFile: true
});

// Generate sitemap
const sitemap = await generateSitemap('https://example.com');
```

### API Reference

#### `crawl(baseUrl: string, options?: CrawlOptions): Promise<DomainCrawlResult>`

Crawls a website starting from the base URL.

**Parameters:**

- `baseUrl`: Starting URL for the crawl
- `options`: Optional configuration
  - `limit`: Maximum number of pages to crawl (default: 5)
  - `saveToFile`: Whether to save results to files (default: true)

**Returns:** `DomainCrawlResult` containing crawled pages and metadata

#### `generateSitemap(baseUrl: string): Promise<any>`

Generates a sitemap for the given URL.

#### `extractPageData(url: string): Promise<ScrapeResult>`

Extracts data from a single page.

## Output Format

### File Structure

Crawled content is saved in the `output/` directory:

```
output/
└── example_com/               # Domain folder (dots replaced with underscores)
    ├── homepage_md            # Individual page markdown files
    ├── about_us_md
    ├── contact_md
    └── all_pages.json         # Complete dataset in JSON format
```

### Markdown File Format

Each page is saved as a markdown file containing:

- Source URL
- Page title
- Description (if available)
- Crawl timestamp
- Extracted markdown content
- Raw JSON data

### JSON Output

The `all_pages.json` file contains an array of all scraped pages with:

- URL
- Title
- Description
- Markdown content
- Links found on the page

## Configuration

### Rate Limiting

The crawler includes built-in rate limiting with a minimum 5-second delay between requests. Adjust `RATE_LIMIT_MS` in `crawler.ts` if needed.

### Environment Variables

- `FIRECRAWL_API_KEY`: Your Firecrawl API key (required)

## Error Handling

The crawler includes comprehensive error handling:

- Invalid URLs are logged and skipped
- API errors are caught and logged
- Missing page data is handled with fallback values
- Malformed links are ignored

## Limitations

- Requires a valid Firecrawl API key
- Rate limited to 1 request per 5 seconds by default
- External links are not followed unless configured
- Maximum crawl depth is controlled by Firecrawl API limits

## Development

### Building the Project

```bash
# Install dependencies
npm install

# Run TypeScript compiler
tsc

# Run tests (if available)
npm test
```

### Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is available for use under the MIT License.

## Support

For issues or questions:

1. Check the Firecrawl API documentation
2. Review existing issues
3. Create a new issue with detailed information

## Acknowledgments

- Built with [Firecrawl](https://firecrawl.dev) API
- TypeScript for type safety
- Node.js for runtime environment