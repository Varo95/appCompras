import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, {Express} from 'express';
import { join } from 'node:path';
import { Request, Response as ResponseEX, ParamsDictionary } from 'express-serve-static-core';
import QueryString from 'qs';
import {NextFunction} from 'express';

const browserDistFolder: string = join(import.meta.dirname, '../browser');

const app: Express = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req: Request<ParamsDictionary, any, any, QueryString.ParsedQs>, res: ResponseEX, next: NextFunction): void => {
  angularApp
    .handle(req)
    .then((response: Response | null): void | Promise<void> =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Manage the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port: number = Number(process.env['PORT']!) || 4000;
  app.listen(port, (error: Error | undefined): void => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler: Express = createNodeRequestHandler(app);
