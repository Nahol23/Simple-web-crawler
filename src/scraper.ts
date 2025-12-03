import { Firecrawl } from "@mendable/firecrawl-js";

const app = new Firecrawl({ apiKey: process.env.FIRECRAWL_API_KEY! });

/**
 * Estrae solo i link da una pagina senza processare il contenuto
 */
export async function extractLinksFromPage(url: string): Promise<string[]> {
  try {
    const result = await app.scrape(url, {
      formats: ['links'] // Richiedi solo i link
    });

    // Estrai i link dal risultato
    const links: string[] = [];
    
    if (result.links && Array.isArray(result.links)) {
      // Itera sui link e aggiungi solo quelli validi
      result.links.forEach((link: any) => {
        if (link && typeof link === 'string') {
          links.push(link);
        } else if (link && link.url) {
          links.push(link.url);
        } else if (link && link.href) {
          links.push(link.href);
        }
      });
    }
    
    console.log(`Trovati ${links.length} link su ${url}`);
    return links;
    
  } catch (error) {
    console.error(`Errore nell'estrazione link da ${url}:`, error);
    return [];
  }
}

