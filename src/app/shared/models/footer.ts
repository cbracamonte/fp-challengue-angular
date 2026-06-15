export interface FooterLink {
  readonly label: string;
  readonly href: string;
}

export interface FooterColumn {
  readonly title: string;
  readonly links: readonly FooterLink[];
}

export interface FooterModel {
  readonly columns: readonly FooterColumn[];
  readonly copyright?: string;
}
