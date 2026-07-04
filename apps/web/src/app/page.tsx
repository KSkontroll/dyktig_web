import type { Metadata } from 'next';

import { HomePage } from '@/components/site/home-page';
import { SITE_DESCRIPTION, SITE_TITLE } from '@/lib/site/constants';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export default function Page() {
  return <HomePage />;
}
