import { I18n } from "i18n-js";
import en from "./en";

const i18n = new I18n({
  en,
});

i18n.defaultLocale = "en";
i18n.locale = "en";

export function translate(
  key: string,
  replacements: Record<string, any> = {},
): string {
  return i18n.t(key, replacements);
}
declare module "i18n-js" {
  interface CustomTypeOptions {
    defaultNS: "en";
    resources: {
      en: typeof en;
    };
  }
}
