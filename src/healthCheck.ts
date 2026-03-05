import { createServer } from "node:http";

export function startHealthCheck(): void {
  const port = process.env.PORT || 3000;
  createServer((_req, res) => res.writeHead(200).end("OK")).listen(port, () => {
    console.log(`Health check listening on port ${port}`);
  });
}
