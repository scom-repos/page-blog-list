import { IBlogItem, IBlogSettings } from "@scom/page-blog";

interface IBlogList {
  data?: IBlogItem[];
}

interface ISettings extends IBlogSettings {
  maxWidth?: string | number;
  background?: { color?: string };
  gap?: string | number;
}

export {
  IBlogList,
  ISettings
}