export interface Env {
  ASSETS: Fetcher;
}

type DefinitionType = 'gender' | 'sexuality';

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

async function lookupKeyword(env: Env, origin: string, keyword: string) {
  const types: DefinitionType[] = ['gender', 'sexuality'];

  for (const type of types) {
    const assetUrl = new URL(`/${type}/${keyword}.txt`, origin);
    const response = await env.ASSETS.fetch(assetUrl);

    if (response.ok) {
      const content = (await response.text()).trim();
      return { content, type };
    }
  }

  return null;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const { pathname } = url;

    // Root endpoint
    if (pathname === '/') {
      return json({ message: 'why you here lul' });
    }

    // Health check endpoint
    if (pathname === '/health') {
      return json({ status: 'ok' });
    }

    // Lol, yeah sure I'll add this Ari
    if (pathname === '/coffee') {
      return json(
        {
          error: "I'm a teapot",
          message: 'This server is a teapot, not a coffee maker. I cannot brew coffee',
        },
        418,
      );
    }

    // Okay this I have to do
    if (pathname === '/coke') {
      return json(
        {
          error: 'Enhance Your Calm',
          message: 'Damn... error 420 is srsly called this?',
        },
        420,
      );
    }

    // Serve gifs (and any other files) out of the gifs/ folder, nested paths and all
    if (pathname.startsWith('/gifs/')) {
      const assetResponse = await env.ASSETS.fetch(new URL(pathname, url.origin));

      if (assetResponse.ok) {
        return assetResponse;
      }

      return json(
        {
          error: 'File not found',
          message: `No file found at: ${pathname}`,
        },
        404,
      );
    }

    // Main endpoint to get content from define/
    const apiMatch = pathname.match(/^\/api\/([^/]+)$/);
    if (apiMatch) {
      const keyword = decodeURIComponent(apiMatch[1]);

      try {
        const result = await lookupKeyword(env, url.origin, keyword);

        if (!result) {
          return json(
            {
              error: 'File not found',
              message: `No content found for keyword: ${keyword}`,
            },
            404,
          );
        }

        return json(result);
      } catch (error) {
        return json(
          {
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error',
          },
          500,
        );
      }
    }

    return json(
      {
        error: 'Page Not Found',
        message: 'Yeah this is just a simple api mate, nothing major',
      },
      404,
    );
  },
} satisfies ExportedHandler<Env>;
