import { crawl, generateSitemap } from "./crawler";
import { logError, logInfo } from "./utils/logger";

const ROOT_URL = "https://www.missoun.com/";
const LIMIT = 10 ;

(async () => {
  logInfo(` Avvio crawling dalla root: ${ROOT_URL}`);

  try {
    // Avvia direttamente il crawl
    const result = await crawl(ROOT_URL, { 
      limit: LIMIT, 
      saveToFile: true, 
    });

    logInfo("\n Crawling completato");
    logInfo(`Dominio: ${result.domain}`);
    logInfo(`Pagine visitate: ${result.crawledPages}`);

    if (result.pages.length > 0) {
      logInfo("\n Pagine trovate:");
      result.pages.forEach((page, index) => {
        logInfo(
          `${index + 1}. ${page.title || "(senza titolo)"} → ${page.url}`
        );
      });
    } else {
      logInfo("\nNessuna pagina trovata");
    }

    const sitemap = await generateSitemap(ROOT_URL);
    logInfo("\n Sitemap generata:");
    logInfo(JSON.stringify(sitemap, null, 2));
  } catch (error) {
    logError(" Errore durante il crawling:", error);
  }
})();
