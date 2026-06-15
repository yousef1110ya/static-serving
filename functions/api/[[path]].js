/*
export async function onRequest(context) {
  const { request, env } = context;

  const url = new URL(request.url);

  const filename = decodeURIComponent(
    url.pathname.replace(/^\/api\//, "")
  );

  if (!filename) {
    if (request.method === "GET") {
      const files = await env.DOCS.list();

      return Response.json({
        files: files.objects.map(o => o.key)
      });
    }

    return new Response("Filename required", {
      status: 400
    });
  }

  switch (request.method) {

    case "GET": {
      const object = await env.DOCS.get(filename);

      if (!object) {
        return new Response("Not found", {
          status: 404
        });
      }

      return new Response(await object.text(), {
        headers: {
          "Content-Type": "text/markdown",
          "Cache-Control": "public, max-age=60"
        }
      });
    }

    case "POST": {
      const body = await request.arrayBuffer();

      await env.DOCS.put(filename, body);

      return Response.json({
        status: "uploaded",
        file: filename
      });
    }

    case "DELETE": {
      await env.DOCS.delete(filename);

      return Response.json({
        status: "deleted",
        file: filename
      });
    }

    default:
      return new Response("Method not allowed", {
        status: 405
      });
  }
}

*/

// TESTING !!! 
export async function onRequest(context) {
  const { request } = context;

  const url = new URL(request.url);

  const filename = decodeURIComponent(
    url.pathname.replace(/^\/api\//, "")
  );

  if (!filename) {
    return Response.json({
      files: [
        "README.md"
      ]
    });
  }

  const target =
    `https://codeberg.org/BiroByte/unifi-test/raw/branch/main/${filename}`;

  const response = await fetch(target);

  if (!response.ok) {
    return new Response("Not found", {
      status: response.status
    });
  }

  return new Response(
    await response.text(),
    {
      headers: {
        "Content-Type": "text/markdown",
        "Cache-Control": "public, max-age=60"
      }
    }
  );
}
