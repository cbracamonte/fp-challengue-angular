import { BrandConfig } from '@shared/models/brand';
import { INKAFARMA_FOOTER } from '@shared/constants';

export const environment = {
  production: false,
  measurementId: 'G-N2D43NPSRV',
  brand: {
    brandName: 'Inkafarma',
    logoPath: '/logo/inkafarma.svg',
    logoAlt: 'Inkafarma — ir al inicio',
    announcementText: 'Es un hecho establecido hace demasiado tiempo que un lector.',
  } satisfies BrandConfig,
  footer: INKAFARMA_FOOTER,
};
