import { BrandConfig } from '@shared/models';
import { INKAFARMA_FOOTER } from '@shared/constants';

export const environment = {
  production: true,
  url: 'https://fp-challengue-angular.onrender.com',
  brand: {
    brandName: 'Inkafarma',
    logoPath: '/logo/inkafarma.svg',
    logoAlt: 'Inkafarma — ir al inicio',
    announcementText: 'Es un hecho establecido hace demasiado tiempo que un lector.',
  } satisfies BrandConfig,
  footer: INKAFARMA_FOOTER,
};
