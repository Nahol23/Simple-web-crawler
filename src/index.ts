import { crawl, generateSitemap } from "./crawler";

const ROOT_URL = "https://www.missoun.com/";
const LIMIT = 5;

(async () => {
  console.log(` Avvio crawling dalla root: ${ROOT_URL}`);

  try {
    // Avvia direttamente il crawl
    const result = await crawl(ROOT_URL, { 
      limit: LIMIT, 
      saveToFile: true, 
    });

    console.log("\n Crawling completato");
    console.log(`Dominio: ${result.domain}`);
    console.log(`Pagine visitate: ${result.crawledPages}`);

    if (result.pages.length > 0) {
      console.log("\n Pagine trovate:");
      result.pages.forEach((page, index) => {
        console.log(
          `${index + 1}. ${page.title || "(senza titolo)"} → ${page.url}`
        );
      });
    } else {
      console.log("\nNessuna pagina trovata");
    }

    const sitemap = await generateSitemap(ROOT_URL);
    console.log("\n Sitemap generata:");
    console.log(JSON.stringify(sitemap, null, 2));
  } catch (error) {
    console.error(" Errore durante il crawling:", error);
  }
})();
