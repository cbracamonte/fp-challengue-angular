import { FooterModel } from '../models/footer';

export const INKAFARMA_FOOTER: FooterModel = {
  columns: [
    {
      title: 'Categorías',
      links: [
        { label: 'Dermocosmética', href: '/dermocosmetica' },
        { label: 'Farmacia', href: '/farmacia' },
        { label: 'Bienestar', href: '/bienestar' },
        { label: 'Infantil', href: '/infantil' },
        { label: 'Fotoprotección', href: '/fotoproteccion' },
        { label: 'Catálogo', href: '/catalogo' },
      ],
    },
    {
      title: 'Nosotros',
      links: [
        { label: 'Quiénes somos', href: '/nosotros' },
        { label: 'Tiendas', href: '/tiendas' },
        { label: 'Inkaclub', href: '/inkaclub' },
        { label: 'Trabaja con nosotros', href: '/trabaja-con-nosotros' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contáctanos', href: '/contacto' },
      ],
    },
    {
      title: 'Ayuda',
      links: [
        { label: 'Preguntas frecuentes', href: '/faq' },
        { label: 'Términos y condiciones', href: '/terminos' },
        { label: 'Política de privacidad', href: '/privacidad' },
        { label: 'Métodos de pago', href: '/metodos-de-pago' },
        { label: 'Envíos y entregas', href: '/envios' },
        { label: 'Devoluciones', href: '/devoluciones' },
      ],
    },
  ],
  copyright: `Copyright © Inkafarma ${new Date().getFullYear()} Todos los derechos reservados`
};

export const MIFARMA_FOOTER: FooterModel = {
  columns: [
    {
      title: 'Categorías',
      links: [
        { label: 'Medicamentos', href: '/medicamentos' },
        { label: 'Salud y bienestar', href: '/salud-y-bienestar' },
        { label: 'Cuidado personal', href: '/cuidado-personal' },
        { label: 'Infantil', href: '/infantil' },
        { label: 'Veterinaria', href: '/veterinaria' },
        { label: 'Catálogo', href: '/catalogo' },
      ],
    },
    {
      title: 'Nosotros',
      links: [
        { label: 'Quiénes somos', href: '/nosotros' },
        { label: 'Tiendas', href: '/tiendas' },
        { label: 'Mifarma Club', href: '/mifarma-club' },
        { label: 'Trabaja con nosotros', href: '/trabaja-con-nosotros' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contáctanos', href: '/contacto' },
      ],
    },
    {
      title: 'Ayuda',
      links: [
        { label: 'Preguntas frecuentes', href: '/faq' },
        { label: 'Términos y condiciones', href: '/terminos' },
        { label: 'Política de privacidad', href: '/privacidad' },
        { label: 'Métodos de pago', href: '/metodos-de-pago' },
        { label: 'Envíos y entregas', href: '/envios-y-entregas' },
        { label: 'Devoluciones', href: '/devoluciones' },
      ],
    },
  ],
  copyright: `Copyright © Mifarma ${new Date().getFullYear()} Todos los derechos reservados`
};
