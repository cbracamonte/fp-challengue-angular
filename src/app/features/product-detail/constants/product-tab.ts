import { Product } from '@api/types/product.types';
import { TabId } from '@features/product-detail/types/tab';

export const PRODUCT_TAB_DEFINITIONS: ReadonlyArray<{
  id: TabId;
  label: string;
  getContent: (p: Product) => string | undefined | null;
}> = [
  { id: 'description', label: 'Descripción', getContent: (p) => p.descriptionLong },
  { id: 'composition', label: 'Composición', getContent: (p) => p.composition },
  { id: 'contraindications', label: 'Contraindicaciones', getContent: (p) => p.contraindications },
  { id: 'warnings', label: 'Advertencias', getContent: (p) => p.warnings },
];
