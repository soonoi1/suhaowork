import fs from "node:fs/promises";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const savedContentPath = path.resolve(process.cwd(), "src/content.saved.json");

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 10 * 1024 * 1024) {
        reject(new Error("Request body is too large."));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function contentSourceSyncPlugin() {
  return {
    name: "suhaowork-content-source-sync",
    configureServer(server) {
      server.watcher.unwatch(savedContentPath);

      server.middlewares.use("/__suhaowork/save-content-source", async (request, response, next) => {
        if (request.method !== "POST") {
          next();
          return;
        }

        try {
          const body = await readRequestBody(request);
          const payload = JSON.parse(body);

          if (!Array.isArray(payload.pages)) {
            response.statusCode = 400;
            response.end(JSON.stringify({ ok: false, error: "Missing pages array." }));
            return;
          }

          const nextSavedContent = {
            savedAt: new Date().toISOString(),
            pages: payload.pages,
          };

          await fs.writeFile(savedContentPath, `${JSON.stringify(nextSavedContent, null, 2)}\n`, "utf8");

          response.setHeader("Content-Type", "application/json; charset=utf-8");
          response.end(JSON.stringify({ ok: true }));
        } catch (error) {
          response.statusCode = 500;
          response.setHeader("Content-Type", "application/json; charset=utf-8");
          response.end(JSON.stringify({ ok: false, error: error instanceof Error ? error.message : "Save failed." }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), contentSourceSyncPlugin()],
});
