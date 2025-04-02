import { IBlogItem } from "@scom/page-blog";
import { ISettings, IBlogList } from "../interface";

interface IOptions {
  onUpdateBlock: () => void;
  onUpdateTheme: () => void;
}

export class Model {
  private _data: IBlogList = {};
  private _options: IOptions;
  private _tag: ISettings = {
    light: {},
    dark: {}
  };

  constructor(options: IOptions) {
    this._options = options;
  }

  get tag() {
    return this._tag || {};
  }

  get data() {
    return this._data?.data || [];
  }

  set data(value: IBlogItem[]) {
    this._data.data = value || [];
  }

  setData(data: IBlogList) {
    this._data = data;
    this._options?.onUpdateBlock();
  }

  private getData() {
    return this._data || {};
  }

  private getTag() {
    return this._tag || {};
  }

  setTag(value: ISettings) {
    const newValue = value || {};
    for (let prop in newValue) {
      if (newValue.hasOwnProperty(prop)) {
        if (prop === 'light' || prop === 'dark') this.updateTag(prop, newValue[prop]);
        else this._tag[prop] = newValue[prop];
      }
    }

    this._options?.onUpdateTheme();
    this._options?.onUpdateBlock();
  }

  private updateTag(type: 'light' | 'dark', value: any) {
    this._tag[type] = this._tag[type] || {};
    for (let prop in value) {
      if (value.hasOwnProperty(prop)) this._tag[type][prop] = value[prop];
    }
  }

  getConfigurators() {
    return [
      {
        name: 'Builder Configurator',
        target: 'Builders',
        getActions: () => {
          return []
        },
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this),
      },
      {
        name: 'Emdedder Configurator',
        target: 'Embedders',
        getData: this.getData.bind(this),
        setData: this.setData.bind(this),
        getTag: this.getTag.bind(this),
        setTag: this.setTag.bind(this),
      },
    ];
  }
}