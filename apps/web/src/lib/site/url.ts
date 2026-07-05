const PRODUCTION_SITE_URL = 'https://dyktigregnskapsforer.no';

function isLocalUrl(url: string) {
  return /localhost|127\.0\.0\.1/i.test(url);
}

/** Produksjons-URL for e-postlenker og redirects. */
export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configured && !isLocalUrl(configured)) {
    return configured.replace(/\/$/, '');
  }

  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return PRODUCTION_SITE_URL;
}
