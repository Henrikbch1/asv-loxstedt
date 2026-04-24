import { footerClasses as APP_FOOTER_CLASSES } from '../../styles/footer.classes';

export type FooterUIClasses = Partial<{
  layout: Partial<Record<keyof typeof APP_FOOTER_CLASSES.layout, string>>;
  brand: Partial<Record<keyof typeof APP_FOOTER_CLASSES.brand, string>>;
  contact: Partial<Record<keyof typeof APP_FOOTER_CLASSES.contact, string>>;
  legal: Partial<Record<keyof typeof APP_FOOTER_CLASSES.legal, string>>;
}>;

export const DEFAULT_FOOTER_CLASSES: FooterUIClasses = APP_FOOTER_CLASSES;

export { DEFAULT_FOOTER_CLASSES as FOOTER_UI_CLASSES };
