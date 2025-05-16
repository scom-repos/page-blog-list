var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("@scom/page-blog-list/interface.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("@scom/page-blog-list/model/index.ts", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    class Model {
        constructor(options) {
            this._data = {};
            this._tag = {
                light: {},
                dark: {}
            };
            this._options = options;
        }
        set tag(value) {
            this._tag = value;
            this._options?.onUpdateBlock();
        }
        get tag() {
            return this._tag || {};
        }
        get data() {
            return this._data?.data || [];
        }
        set data(value) {
            this._data.data = value || [];
            this._options?.onUpdateBlock();
        }
        setData(data) {
            this._data = data;
            this._options?.onUpdateBlock();
        }
        getData() {
            return this._data || {};
        }
        getTag() {
            return this._tag || {};
        }
        setTag(value) {
            const newValue = value || {};
            for (let prop in newValue) {
                if (newValue.hasOwnProperty(prop)) {
                    if (prop === 'light' || prop === 'dark')
                        this.updateTag(prop, newValue[prop]);
                    else
                        this._tag[prop] = newValue[prop];
                }
            }
            this._options?.onUpdateBlock();
        }
        updateTag(type, value) {
            this._tag[type] = this._tag[type] || {};
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    this._tag[type][prop] = value[prop];
            }
        }
        getConfigurators() {
            return [
                {
                    name: 'Builder Configurator',
                    target: 'Builders',
                    getActions: () => {
                        return [];
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
    exports.Model = Model;
});
define("@scom/page-blog-list", ["require", "exports", "@ijstech/components", "@scom/page-blog-list/model/index.ts"], function (require, exports, components_1, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let ScomPageBlogList = class ScomPageBlogList extends components_1.Module {
        constructor(parent, options) {
            super(parent, options);
        }
        get data() {
            return this.model.data;
        }
        set data(value) {
            this.model.data = value;
        }
        async setData(data) {
            this.model.setData(data);
        }
        onUpdateBlock() {
            if (this.model.tag?.maxWidth) {
                this.pnlBlock.maxWidth = this.model.tag.maxWidth;
            }
            this.renderList();
        }
        renderList() {
            this.pnlCard.clearInnerHTML();
            const { gap, background, maxWidth, item: itemStyles, columnsPerRow, ...blogTag } = this.model.tag;
            const length = this.data.length;
            const validColumns = columnsPerRow && columnsPerRow > length ? length : columnsPerRow && columnsPerRow < 1 ? 1 : columnsPerRow;
            const isValidNumber = (value) => {
                return value && value !== 'auto' && value !== '100%';
            };
            let blogMaxWidth = isValidNumber(itemStyles?.maxWidth) ? itemStyles.maxWidth : undefined;
            if (blogMaxWidth !== undefined && !isNaN(Number(blogMaxWidth)))
                blogMaxWidth = `${blogMaxWidth}px`;
            let blogWidth = isValidNumber(itemStyles?.width) ? itemStyles.width : undefined;
            if (blogWidth !== undefined && !isNaN(Number(blogWidth)))
                blogWidth = `${blogWidth}px`;
            let blogMinWidth = isValidNumber(itemStyles?.minWidth) ? itemStyles.minWidth : undefined;
            if (blogMinWidth !== undefined && !isNaN(Number(blogMinWidth)))
                blogMinWidth = `${blogMinWidth}px`;
            let repeat = '';
            const repeatWidth = blogMaxWidth || blogWidth || '1fr';
            if (blogWidth || blogMinWidth || blogMaxWidth) {
                if (validColumns) {
                    repeat = `repeat(${validColumns}, minmax(${blogMinWidth || blogWidth || 'auto'}, ${repeatWidth}))`;
                }
                else {
                    repeat = `repeat(auto-fit, minmax(${blogMinWidth || blogWidth || 'auto'}, ${repeatWidth}))`;
                }
            }
            else {
                repeat = `repeat(${validColumns || length}, 1fr)`;
            }
            const lytItems = (this.$render("i-card-layout", { width: '100%', padding: { bottom: '1rem', left: '1rem', right: '1rem' }, gap: { column: gap || '1rem', row: gap || '1rem' }, justifyContent: 'center', background: background, templateColumns: [repeat], mediaQueries: [
                    {
                        maxWidth: "767px",
                        properties: {
                            templateColumns: [`repeat(1, ${repeatWidth})`]
                        }
                    },
                    {
                        minWidth: "768px",
                        maxWidth: "1024px",
                        properties: {
                            templateColumns: [`repeat(2, ${repeatWidth})`]
                        }
                    }
                ] }));
            this.pnlCard.appendChild(lytItems);
            this.data.forEach((product) => {
                const blog = this.$render("i-page-blog", { data: product, tag: blogTag, display: 'block', designMode: this.designMode, stack: { grow: '1', shrink: '1', basis: "0%" } });
                if (itemStyles?.maxWidth !== undefined)
                    blog.maxWidth = itemStyles.maxWidth;
                if (itemStyles?.minWidth !== undefined)
                    blog.minWidth = itemStyles.minWidth;
                if (itemStyles?.width !== undefined)
                    blog.width = itemStyles.width;
                lytItems.append(blog);
            });
        }
        getConfigurators() {
            return this.model.getConfigurators();
        }
        init() {
            super.init();
            this.model = new index_1.Model({
                onUpdateBlock: this.onUpdateBlock.bind(this)
            });
            const data = this.getAttribute('data', true);
            if (data)
                this.setData({ data });
            const tag = this.getAttribute('tag', true);
            if (tag)
                this.model.setTag(tag);
            this.width = "100%";
        }
        render() {
            return (this.$render("i-panel", { id: 'pnlBlock', background: { color: 'transparent' }, margin: { left: 'auto', right: 'auto' } },
                this.$render("i-panel", { id: 'pnlCard' })));
        }
    };
    ScomPageBlogList = __decorate([
        components_1.customModule,
        (0, components_1.customElements)("i-page-blog-list", {
            icon: 'stop',
            props: {
                data: {
                    type: 'array',
                    default: []
                }
            },
            className: 'ScomPageBlogList',
            events: {},
            dataSchema: {
                "type": "array",
                "items": {
                    "type": "object",
                    properties: {
                        title: {
                            type: 'string',
                            required: false
                        },
                        backgroundImageCid: {
                            type: 'string',
                            required: false
                        },
                        backgroundImageUrl: {
                            type: 'string',
                            required: false
                        },
                        description: {
                            type: 'string',
                            required: false
                        },
                        link: {
                            "type": "object",
                            required: false,
                            "properties": {
                                "caption": {
                                    "type": "string"
                                },
                                "url": {
                                    "type": "string"
                                }
                            }
                        },
                        date: {
                            format: 'date',
                            type: 'string',
                            required: false
                        },
                        userName: {
                            type: 'string',
                            required: false
                        },
                        avatar: {
                            type: 'string',
                            required: false
                        },
                        isExternal: {
                            type: 'boolean',
                            required: false
                        }
                    }
                }
            }
        })
    ], ScomPageBlogList);
    exports.default = ScomPageBlogList;
});
