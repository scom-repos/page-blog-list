/// <amd-module name="@scom/page-blog-list/interface.ts" />
declare module "@scom/page-blog-list/interface.ts" {
    import { IBlogItem, IBlogSettings } from "@scom/page-blog";
    interface IBlogList {
        data?: IBlogItem[];
    }
    interface ISettings extends IBlogSettings {
        maxWidth?: string | number;
        background?: {
            color?: string;
        };
        gap?: string | number;
        item?: {
            minWidth?: string | number;
            maxWidth?: string | number;
            width?: string | number;
        };
        columnsPerRow?: number;
    }
    export { IBlogList, ISettings };
}
/// <amd-module name="@scom/page-blog-list/model/index.ts" />
declare module "@scom/page-blog-list/model/index.ts" {
    import { IBlogItem } from "@scom/page-blog";
    import { ISettings, IBlogList } from "@scom/page-blog-list/interface.ts";
    interface IOptions {
        onUpdateBlock: () => void;
    }
    export class Model {
        private _data;
        private _options;
        private _tag;
        constructor(options: IOptions);
        set tag(value: ISettings);
        get tag(): ISettings;
        get data(): IBlogItem[];
        set data(value: IBlogItem[]);
        setData(data: IBlogList): void;
        private getData;
        private getTag;
        setTag(value: ISettings): void;
        private updateTag;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => any[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        } | {
            name: string;
            target: string;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
            getActions?: undefined;
        })[];
    }
}
/// <amd-module name="@scom/page-blog-list" />
declare module "@scom/page-blog-list" {
    import { Module, ControlElement, Container } from '@ijstech/components';
    import { IBlogItem } from '@scom/page-blog';
    global {
        namespace JSX {
            interface IntrinsicElements {
                ['i-page-blog-list']: ScomPageBlogListElement;
            }
        }
    }
    interface ScomPageBlogListElement extends ControlElement {
        data?: IBlogItem[];
    }
    export default class ScomPageBlogList extends Module {
        private pnlBlock;
        private pnlCard;
        private model;
        constructor(parent?: Container, options?: any);
        get data(): IBlogItem[];
        set data(value: IBlogItem[]);
        private setData;
        private onUpdateBlock;
        private renderList;
        getConfigurators(): ({
            name: string;
            target: string;
            getActions: () => any[];
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
        } | {
            name: string;
            target: string;
            getData: any;
            setData: any;
            getTag: any;
            setTag: any;
            getActions?: undefined;
        })[];
        init(): void;
        render(): any;
    }
}
