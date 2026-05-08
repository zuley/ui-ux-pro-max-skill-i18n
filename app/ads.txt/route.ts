export function GET() {
  const body = 'google.com, pub-0229439021577089, DIRECT, f08c47fec0942fa0\n';

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8'
    }
  });
}
