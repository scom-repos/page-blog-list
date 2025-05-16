import {
  Module,
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
export default class ScomPageBlogList extends Module {
  private pnlBlock: Panel;
  private pnlCard: Panel;

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
      item: itemStyles,
      columnsPerRow,
      ...blogTag
    } = this.model.tag;

    const length = this.data.length;
    const validColumns = columnsPerRow && columnsPerRow > length ? length : columnsPerRow && columnsPerRow < 1 ? 1 : columnsPerRow;

    const isValidNumber = (value: string | number) => {
      return value && value !== 'auto' && value !== '100%';
    }

    let blogMaxWidth = isValidNumber(itemStyles?.maxWidth) ? itemStyles.maxWidth : undefined;
    if (blogMaxWidth !== undefined && !isNaN(Number(blogMaxWidth))) blogMaxWidth = `${blogMaxWidth}px`;
    let blogWidth = isValidNumber(itemStyles?.width) ? itemStyles.width : undefined;
    if (blogWidth !== undefined && !isNaN(Number(blogWidth))) blogWidth = `${blogWidth}px`;
    let blogMinWidth = isValidNumber(itemStyles?.minWidth) ? itemStyles.minWidth : undefined;
    if (blogMinWidth !== undefined && !isNaN(Number(blogMinWidth))) blogMinWidth = `${blogMinWidth}px`;

    let repeat = '';
    const repeatWidth = blogMaxWidth || blogWidth || '1fr';
    
    if (blogWidth || blogMinWidth || blogMaxWidth) {
      if (validColumns) {
        repeat = `repeat(${validColumns}, minmax(${blogMinWidth || blogWidth || 'auto'}, ${repeatWidth}))`;
      } else {
        repeat = `repeat(auto-fit, minmax(${blogMinWidth || blogWidth || 'auto'}, ${repeatWidth}))`;
      }
    }
    else {
      repeat = `repeat(${validColumns || length}, 1fr)`;
    }

    const lytItems = (
      <i-card-layout
        width='100%'
        padding={{ bottom: '1rem', left: '1rem', right: '1rem' }}
        gap={{column: gap || '1rem', row: gap || '1rem'}}
        justifyContent='center'
        background={background}
        templateColumns={[repeat]}
        mediaQueries={[
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
        ]}
      ></i-card-layout>
    )

    this.pnlCard.appendChild(lytItems)

    this.data.forEach((product: IBlogItem) => {
      const blog = <i-page-blog
        data={product}
        tag={blogTag}
        display='block'
        designMode={this.designMode}
        stack={{grow: '1', shrink: '1', basis: "0%"}}
      />

      if (itemStyles?.maxWidth !== undefined) blog.maxWidth = itemStyles.maxWidth;
      if (itemStyles?.minWidth !== undefined) blog.minWidth = itemStyles.minWidth;
      if (itemStyles?.width !== undefined) blog.width = itemStyles.width;

      lytItems.append(blog);
    })
  }

  getConfigurators() {
    return this.model.getConfigurators();
  }

  init() {
    super.init();
      this.model = new Model({
        onUpdateBlock: this.onUpdateBlock.bind(this)
      });
    const data = this.getAttribute('data', true);
    if (data) this.setData({ data });

    const tag = this.getAttribute('tag', true);
    if (tag) this.model.setTag(tag);
    this.width = "100%";
  }

  render() {
    return (
      <i-panel id='pnlBlock' background={{ color: 'transparent' }} margin={{left: 'auto', right: 'auto'}}>
        <i-panel id='pnlCard' />
      </i-panel>
    )
  }
}