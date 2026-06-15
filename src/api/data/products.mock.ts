import type { Product } from '../types/product.types';

export const PRODUCTS: Product[] = [
  {
    id: 'a1b2c3d4-0001-4a10-8f01-000000000001',
    sku: '030102',
    slug: 'paracetamol-500mg-tableta',
    name: 'Paracetamol 500mg Tableta',
    brand: 'Genérico',
    category: {
      slug: 'analgesicos',
      name: 'Analgésicos',
    },
    available: true,
    variants: [
      { name: 'Blíster', quantity: 10 },
      { name: 'Caja', quantity: 100 },
    ],
    image: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/030102L.jpg',
    gallery: [
      {
        id: '12345678-0001-4a10-8f01-000000000001',
        url: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/030102L.jpg',
        alt: 'Paracetamol 500mg Tableta - Caja x 100',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001001',
        url: 'https://placehold.co/600x600/283593/FFFFFF?text=Vista+Lateral',
        alt: 'Azitromicina 500mg Tableta - Vista lateral',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001002',
        url: 'https://placehold.co/600x600/1A237E/FFFFFF?text=Caja+x3',
        alt: 'Azitromicina 500mg Tableta - Detalle caja x 3',
      },
    ],
    price: {
      currency: 'PEN',
      current: 0.3,
      original: 0.5,
    },
    descriptionShort: ['Paracetamol 500mg', 'Tableta', 'Caja x 100'],
    regulatoryCode: 'N-30102',
    descriptionLong:
      'Analgésico y antipirético para el alivio del dolor leve a moderado y la fiebre.',
    composition: 'Paracetamol 500 mg',
    contraindications: 'Hipersensibilidad al paracetamol. Insuficiencia hepática grave.',
    warnings: 'No exceder la dosis recomendada. Evitar el consumo de alcohol.',
    relatedProductIds: [
      'a1b2c3d4-0007-4a10-8f01-000000000007',
      'a1b2c3d4-0008-4a10-8f01-000000000008',
    ],
  },
  {
    id: 'a1b2c3d4-0002-4a10-8f01-000000000002',
    sku: '230447',
    slug: 'ibuprofeno-400mg-tableta-recubierta',
    name: 'Ibuprofeno 400mg Tableta Recubierta',
    brand: 'Genérico',
    category: {
      slug: 'analgesicos',
      name: 'Analgésicos',
    },
    available: true,
    variants: [
      { name: 'Caja', quantity: 100 },
    ],
    image: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/230447L.jpg',
    gallery: [
      {
        id: '12345678-0002-4a10-8f01-000000000002',
        url: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/230447L.jpg',
        alt: 'Ibuprofeno 400mg Tableta Recubierta - Caja x 100',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001001',
        url: 'https://placehold.co/600x600/283593/FFFFFF?text=Vista+Lateral',
        alt: 'Azitromicina 500mg Tableta - Vista lateral',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001002',
        url: 'https://placehold.co/600x600/1A237E/FFFFFF?text=Caja+x3',
        alt: 'Azitromicina 500mg Tableta - Detalle caja x 3',
      },
    ],
    price: {
      currency: 'PEN',
      current: 0.4,
      original: 0.6,
    },
    descriptionShort: ['Ibuprofeno 400mg', 'Tableta recubierta', 'Caja x 100'],
    regulatoryCode: 'N-30447',
    descriptionLong:
      'Antiinflamatorio no esteroideo (AINE) que ayuda a reducir el dolor, la inflamación y la fiebre.',
    composition: 'Ibuprofeno 400 mg',
    contraindications: 'Úlcera péptica activa. Hipersensibilidad a AINEs.',
    warnings:
      'Tomar preferiblemente después de las comidas. Precaución en pacientes con problemas gástricos.',
    relatedProductIds: [
      'a1b2c3d4-0001-4a10-8f01-000000000001',
      'a1b2c3d4-0007-4a10-8f01-000000000007',
      'a1b2c3d4-0008-4a10-8f01-000000000008',
    ],
  },
  {
    id: 'a1b2c3d4-0003-4a10-8f01-000000000003',
    sku: '014552',
    slug: 'amoxicilina-500mg-capsula',
    name: 'Amoxicilina 500mg Cápsula',
    brand: 'Portugal',
    category: {
      slug: 'antibioticos',
      name: 'Antibióticos',
    },
    available: true,
    variants: [
      { name: 'Caja', quantity: 100 },
    ],
    image: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/014552L.jpg',
    gallery: [
      {
        id: '12345678-0003-4a10-8f01-000000000003',
        url: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/014552L.jpg',
        alt: 'Amoxicilina 500mg Cápsula - Caja x 100',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001001',
        url: 'https://placehold.co/600x600/283593/FFFFFF?text=Vista+Lateral',
        alt: 'Azitromicina 500mg Tableta - Vista lateral',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001002',
        url: 'https://placehold.co/600x600/1A237E/FFFFFF?text=Caja+x3',
        alt: 'Azitromicina 500mg Tableta - Detalle caja x 3',
      },
    ],
    price: {
      currency: 'PEN',
      current: 0.8,
      original: 1.2,
    },
    descriptionShort: ['Amoxicilina 500mg', 'Cápsula', 'Caja x 100'],
    regulatoryCode: 'N-14552',
    descriptionLong: 'Antibiótico de amplio espectro indicado para infecciones bacterianas.',
    composition: 'Amoxicilina 500 mg',
    contraindications: 'Hipersensibilidad a penicilinas o cefalosporinas.',
    warnings: 'Requiere receta médica. Completar el tratamiento indicado.',
    relatedProductIds: [
      'a1b2c3d4-0010-4a10-8f01-000000000010',
    ],
  },
  {
    id: 'a1b2c3d4-0004-4a10-8f01-000000000004',
    sku: '008542',
    slug: 'omeprazol-20mg-capsula',
    name: 'Omeprazol 20mg Cápsula',
    brand: 'Genérico',
    category: {
      slug: 'salud-digestiva',
      name: 'Salud Digestiva',
    },
    available: true,
    variants: [
      { name: 'Caja', quantity: 30 },
    ],
    image: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/008542L.jpg',
    gallery: [
      {
        id: '12345678-0004-4a10-8f01-000000000004',
        url: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/008542L.jpg',
        alt: 'Omeprazol 20mg Cápsula - Caja x 30',
      },
     {
        id: '12345678-0010-4a10-8f01-000000001001',
        url: 'https://placehold.co/600x600/283593/FFFFFF?text=Vista+Lateral',
        alt: 'Azitromicina 500mg Tableta - Vista lateral',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001002',
        url: 'https://placehold.co/600x600/1A237E/FFFFFF?text=Caja+x3',
        alt: 'Azitromicina 500mg Tableta - Detalle caja x 3',
      },
    ],
    price: {
      currency: 'PEN',
      current: 0.5,
      original: 0.8,
    },
    descriptionShort: ['Omeprazol 20mg', 'Cápsula', 'Caja x 30'],
    regulatoryCode: 'N-08542',
    descriptionLong:
      'Inhibidor de la bomba de protones para el tratamiento de la acidez y el reflujo gastroesofágico.',
    composition: 'Omeprazol 20 mg',
    contraindications: 'Hipersensibilidad al omeprazol.',
    warnings: 'Tomar antes de los alimentos. Consultar si los síntomas persisten.',
    relatedProductIds: [
      'a1b2c3d4-0003-4a10-8f01-000000000003',
    ],
  },
  {
    id: 'a1b2c3d4-0005-4a10-8f01-000000000005',
    sku: '013075',
    slug: 'loratadina-10mg-tableta',
    name: 'Loratadina 10mg Tableta',
    brand: 'Genérico',
    category: {
      slug: 'antialergicos',
      name: 'Antialérgicos',
    },
    available: true,
    variants: [
      { name: 'Caja', quantity: 100 },
    ],
    image: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/013075L.jpg',
    gallery: [
      {
        id: '12345678-0005-4a10-8f01-000000000005',
        url: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/013075L.jpg',
        alt: 'Loratadina 10mg Tableta - Caja x 100',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001001',
        url: 'https://placehold.co/600x600/283593/FFFFFF?text=Vista+Lateral',
        alt: 'Azitromicina 500mg Tableta - Vista lateral',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001002',
        url: 'https://placehold.co/600x600/1A237E/FFFFFF?text=Caja+x3',
        alt: 'Azitromicina 500mg Tableta - Detalle caja x 3',
      },
    ],
    price: {
      currency: 'PEN',
      current: 0.35,
      original: 0.55,
    },
    descriptionShort: ['Loratadina 10mg', 'Tableta', 'Caja x 100'],
    regulatoryCode: 'N-13075',
    descriptionLong:
      'Antihistamínico para aliviar los síntomas de alergias estacionales como estornudos y picazón.',
    composition: 'Loratadina 10 mg',
    contraindications: 'Hipersensibilidad a la loratadina.',
    warnings: 'Generalmente no produce somnolencia. Respetar la dosis indicada.',
    relatedProductIds: [
      'a1b2c3d4-0001-4a10-8f01-000000000001',
      'a1b2c3d4-0002-4a10-8f01-000000000002',
    ],
  },
  {
    id: 'a1b2c3d4-0006-4a10-8f01-000000000006',
    sku: '926015',
    slug: 'metformina-850mg-tableta',
    name: 'Metformina 850mg Tableta',
    brand: 'Genérico',
    category: {
      slug: 'antidiabeticos',
      name: 'Antidiabéticos',
    },
    available: true,
    variants: [
      { name: 'Caja', quantity: 30 },
    ],
    image: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/926015L.jpg',
    gallery: [
      {
        id: '12345678-0006-4a10-8f01-000000000006',
        url: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/926015L.jpg',
        alt: 'Metformina 850mg Tableta - Caja x 30',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001001',
        url: 'https://placehold.co/600x600/283593/FFFFFF?text=Vista+Lateral',
        alt: 'Azitromicina 500mg Tableta - Vista lateral',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001002',
        url: 'https://placehold.co/600x600/1A237E/FFFFFF?text=Caja+x3',
        alt: 'Azitromicina 500mg Tableta - Detalle caja x 3',
      },
    ],
    price: {
      currency: 'PEN',
      current: 0.45,
      original: 0.7,
    },
    descriptionShort: ['Metformina 850mg', 'Tableta', 'Caja x 30'],
    regulatoryCode: 'N-26015',
    descriptionLong: 'Antidiabético oral empleado para el control de la diabetes tipo 2.',
    composition: 'Metformina clorhidrato 850 mg',
    contraindications: 'Insuficiencia renal grave. Acidosis metabólica.',
    warnings: 'Requiere control médico. Tomar con las comidas.',
    relatedProductIds: [
      'a1b2c3d4-0003-4a10-8f01-000000000003',
      'a1b2c3d4-0010-4a10-8f01-000000000010',
    ],
  },
  {
    id: 'a1b2c3d4-0007-4a10-8f01-000000000007',
    sku: '203068',
    slug: 'naproxeno-sodico-550mg-tableta-recubierta',
    name: 'Naproxeno Sódico 550mg Tableta Recubierta',
    brand: 'Genérico',
    category: {
      slug: 'analgesicos',
      name: 'Analgésicos',
    },
    available: true,
    variants: [
      { name: 'Caja', quantity: 50 },
    ],
    image: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/203068L.jpg',
    gallery: [
      {
        id: '12345678-0007-4a10-8f01-000000000007',
        url: 'https://dcuk1cxrnzjkh.cloudfront.net/imagesproducto/203068L.jpg',
        alt: 'Naproxeno Sódico 550mg Tableta Recubierta - Caja x 50',
      },
    {
        id: '12345678-0010-4a10-8f01-000000001001',
        url: 'https://placehold.co/600x600/283593/FFFFFF?text=Vista+Lateral',
        alt: 'Azitromicina 500mg Tableta - Vista lateral',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001002',
        url: 'https://placehold.co/600x600/1A237E/FFFFFF?text=Caja+x3',
        alt: 'Azitromicina 500mg Tableta - Detalle caja x 3',
      },
    ],
    price: {
      currency: 'PEN',
      current: 0.6,
      original: 0.9,
    },
    descriptionShort: ['Naproxeno Sódico 550mg', 'Tableta recubierta', 'Caja x 50'],
    regulatoryCode: 'N-03068',
    descriptionLong:
      'Antiinflamatorio indicado para aliviar dolores musculares, cólicos menstruales y otros.',
    composition: 'Naproxeno sódico 550 mg',
    contraindications: 'Úlcera péptica activa. Hipersensibilidad a AINEs.',
    warnings: 'Tomar con alimentos. Precaución en pacientes con problemas cardiovasculares.',
    relatedProductIds: [
      'a1b2c3d4-0001-4a10-8f01-000000000001',
      'a1b2c3d4-0002-4a10-8f01-000000000002',
    ],
  },
  {
    id: 'a1b2c3d4-0008-4a10-8f01-000000000008',
    sku: 'PENDING-001',
    slug: 'diclofenaco-50mg-tableta',
    name: 'Diclofenaco 50mg Tableta',
    brand: 'Genérico',
    category: {
      slug: 'analgesicos',
      name: 'Analgésicos',
    },
    available: true,
    variants: [
      { name: 'Caja', quantity: 100 },
    ],
    image: 'https://placehold.co/600x600/0E7C5A/FFFFFF?text=Diclofenaco+50mg',
    gallery: [
      {
        id: '12345678-0008-4a10-8f01-000000000008',
        url: 'https://placehold.co/600x600/0E7C5A/FFFFFF?text=Diclofenaco+50mg',
        alt: 'Diclofenaco 50mg Tableta - Caja x 100',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001001',
        url: 'https://placehold.co/600x600/283593/FFFFFF?text=Vista+Lateral',
        alt: 'Azitromicina 500mg Tableta - Vista lateral',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001002',
        url: 'https://placehold.co/600x600/1A237E/FFFFFF?text=Caja+x3',
        alt: 'Azitromicina 500mg Tableta - Detalle caja x 3',
      },
    ],
    price: {
      currency: 'PEN',
      current: 0.4,
      original: 0.6,
    },
    descriptionShort: ['Diclofenaco 50mg', 'Tableta', 'Caja x 100'],
    regulatoryCode: 'N-00000',
    descriptionLong: 'Antiinflamatorio no esteroideo para el alivio del dolor e inflamación.',
    composition: 'Diclofenaco sódico 50 mg',
    contraindications: 'Úlcera péptica activa. Hipersensibilidad a AINEs.',
    warnings: 'Tomar con alimentos. SKU/imagen pendiente de verificación.',
    relatedProductIds: [
      'a1b2c3d4-0001-4a10-8f01-000000000001',
      'a1b2c3d4-0002-4a10-8f01-000000000002',
    ],
  },
  {
    id: 'a1b2c3d4-0009-4a10-8f01-000000000009',
    sku: 'PENDING-002',
    slug: 'salbutamol-100mcg-inhalador',
    name: 'Salbutamol 100mcg Inhalador',
    brand: 'Genérico',
    category: {
      slug: 'respiratorio',
      name: 'Respiratorio',
    },
    available: true,
    variants: [
      { name: 'Inhalador', quantity: 1 },
    ],
    image: 'https://placehold.co/600x600/0E7C5A/FFFFFF?text=Salbutamol+Inhalador',
    gallery: [
      {
        id: '12345678-0009-4a10-8f01-000000000009',
        url: 'https://placehold.co/600x600/0E7C5A/FFFFFF?text=Salbutamol+Inhalador',
        alt: 'Salbutamol 100mcg Inhalador - 200 dosis',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001001',
        url: 'https://placehold.co/600x600/283593/FFFFFF?text=Vista+Lateral',
        alt: 'Azitromicina 500mg Tableta - Vista lateral',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001002',
        url: 'https://placehold.co/600x600/1A237E/FFFFFF?text=Caja+x3',
        alt: 'Azitromicina 500mg Tableta - Detalle caja x 3',
      },
    ],
    price: {
      currency: 'PEN',
      current: 12.9,
      original: 16.0,
    },
    descriptionShort: ['Salbutamol 100mcg', 'Inhalador', '200 dosis'],
    regulatoryCode: 'N-00000',
    descriptionLong: 'Broncodilatador para el alivio del broncoespasmo en asma y EPOC.',
    composition: 'Salbutamol 100 mcg/dosis',
    contraindications: 'Hipersensibilidad al salbutamol.',
    warnings: 'No exceder las dosis indicadas. SKU/imagen pendiente de verificación.',
    relatedProductIds: [
      'a1b2c3d4-0001-4a10-8f01-000000000001',
      'a1b2c3d4-0002-4a10-8f01-000000000002',
    ],
  },
  {
    id: 'a1b2c3d4-0010-4a10-8f01-000000000010',
    sku: 'PENDING-003',
    slug: 'azitromicina-500mg-tableta',
    name: 'Azitromicina 500mg Tableta',
    brand: 'Genérico',
    category: {
      slug: 'antibioticos',
      name: 'Antibióticos',
    },
    available: true,
    variants: [
      { name: 'Caja', quantity: 3 },
    ],
    image: 'https://placehold.co/600x600/0E7C5A/FFFFFF?text=Azitromicina+500mg',
    gallery: [
      {
        id: '12345678-0010-4a10-8f01-000000000010',
        url: 'https://placehold.co/600x600/0E7C5A/FFFFFF?text=Azitromicina+500mg',
        alt: 'Azitromicina 500mg Tableta - Caja x 3',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001001',
        url: 'https://placehold.co/600x600/283593/FFFFFF?text=Vista+Lateral',
        alt: 'Azitromicina 500mg Tableta - Vista lateral',
      },
      {
        id: '12345678-0010-4a10-8f01-000000001002',
        url: 'https://placehold.co/600x600/1A237E/FFFFFF?text=Caja+x3',
        alt: 'Azitromicina 500mg Tableta - Detalle caja x 3',
      },
    ],
    price: {
      currency: 'PEN',
      current: 2.5,
      original: 3.5,
    },
    descriptionShort: ['Azitromicina 500mg', 'Tableta', 'Caja x 3'],
    regulatoryCode: 'N-00000',
    descriptionLong: 'Antibiótico macrólido para infecciones respiratorias y de piel.',
    composition: 'Azitromicina 500 mg',
    contraindications: 'Hipersensibilidad a macrólidos.',
    warnings: 'Requiere receta médica. SKU/imagen pendiente de verificación.',
    relatedProductIds: [
      'a1b2c3d4-0003-4a10-8f01-000000000003',
    ],
  },
];
