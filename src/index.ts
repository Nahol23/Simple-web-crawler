// index.ts
import readline from "readline";
import { crawl } from "./crawler";
import { logInfo, logError } from "./utils/logger";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Inserisci l'URL da crawlare: ", async (url) => {
  try {
    if (!url) {
      logError("Nessun URL inserito, uscita dal programma.");
      rl.close();
      return;
    }

    logInfo(`URL ricevuto: ${url}`);
    const result = await crawl(url, { limit: 10, saveToFile: true });
    logInfo(`Crawl completato: ${result.crawledPages} pagine trovate`);
  } catch (error) {
    logError("Errore durante il crawl", error);
  } finally {
    rl.close();
  }
});
