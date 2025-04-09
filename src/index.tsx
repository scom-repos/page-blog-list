import {
  Module,
  Styles,
  Panel,
  customElements,
  ControlElement,
  customModule,
  Container
} from '@ijstech/components';
import { Model } from './model/index';
import { IBlogItem } from '@scom/page-blog';
import { IBlogList } from './interface';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['i-page-blog-list']: ScomPageBlogListElement;
    }
  }
}

interface ScomPageBlogListElement extends ControlElement {
  data?: IBlogItem[];
}

@customModule
@customElements("i-page-blog-list", {
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
    "type": "object",
    "properties": {
      "data": {
        "type": "array",
        "items": {
          "type": "object",
          properties: {
            title: {
              type: 'string',
            },
            backgroundImageCid: {
              type: 'string'
            },
            backgroundImageUrl: {
              type: 'string'
            },
            description: {
              type: 'string'
            },
            link: {
              "type": "object",
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
              type: 'string'
            },
            userName: {
              type: 'string'
            },
            avatar: {
              type: 'string'
            },
            isExternal: {
              type: 'boolean'
            }
          }
        }
      }
    }
  }
})
export default class ScomPageBlogList extends Module {
  private pnlBlock: Panel;
  private pnlCard: Panel

  private model: Model;

  constructor(parent?: Container, options?: any) {
    super(parent, options);
  }

  get data() {
    return this.model.data
  }

  set data(value: IBlogItem[]) {
    this.model.data = value;
  }

  private async setData(data: IBlogList) {
    this.model.setData(data);
  }

  private onUpdateBlock() {
    if (this.model.tag?.maxWidth) {
      this.pnlBlock.maxWidth = this.model.tag.maxWidth;
    }
    this.renderList();
  }

  private renderList() {
    this.pnlCard.clearInnerHTML();

    const {
      gap,
      background,
      maxWidth,
      ...blogTag
    } = this.model.tag;

    const lytItems = (
      <i-hstack
        width='100%'
        padding={{ bottom: '1rem', left: '1rem', right: '1rem' }}
        gap={gap || '1rem'}
        horizontalAlignment='center'
        background={background}
        wrap='wrap'
      ></i-hstack>
    )
    this.pnlCard.appendChild(lytItems)

    this.data.forEach((product: IBlogItem) => {
      lytItems.append(
        <i-page-blog
          data={product}
          tag={blogTag}
          stack={{grow: '1', shrink: '1', basis: "0%"}}
        />
      )
    })
  }

  // private updateStyle(name: string, value: any) {
  //   value ? this.style.setProperty(name, value) : this.style.removeProperty(name);
  // }

  private onUpdateTheme() {
    // this.updateStyle('--text-primary', this.model.tag?.title?.font?.color);
    // this.updateStyle('--background-main', this.model.tag?.background?.color);
    // this.updateStyle('--text-secondary', this.model.tag?.description?.font?.color);
    // this.updateStyle('--text-third', this.model.tag?.date?.font?.color);
    // this.updateStyle('--text-disabled', this.model.tag?.userName?.font?.color);
    // this.updateStyle('--text-hint', this.model.tag?.link?.font?.color);
  }

  getConfigurators() {
    return this.model.getConfigurators();
  }

  init() {
    super.init();
      this.model = new Model({
        onUpdateBlock: () => this.onUpdateBlock(),
        onUpdateTheme: () => this.onUpdateTheme()
      });
    const data = this.getAttribute('data', true);
    if (data) this.setData({ data });

    const tag = this.getAttribute('tag', true);
    if (tag) this.model.setTag(tag);
  }

  render() {
    return (
      <i-panel id='pnlBlock' background={{ color: 'transparent' }} margin={{left: 'auto', right: 'auto'}}>
        <i-panel id='pnlCard' />
      </i-panel>
    )
  }
}