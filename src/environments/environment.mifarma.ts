import { BrandConfig } from '@shared/models';
import { MIFARMA_FOOTER } from '@shared/constants';

export const environment = {
  production: true,
  brand: {
    brandName: 'MiFarma',
    logoPath: '/logo/mifarma.svg',
    logoAlt: 'MiFarma — ir al inicio',
    announcementText: 'Encuentra todo lo que necesitas para tu salud y bienestar.',
  } satisfies BrandConfig,
  footer: MIFARMA_FOOTER,
};
