import { Module, customModule } from '@ijstech/components';
import ScomPageBlogList from '@scom/page-blog-list';

@customModule
export default class Main extends Module {
  private pageBlock1: ScomPageBlogList;

  private _data1 = [
    {
      "title": "IJS Makes Strategic Investment into Impossible Finance Leveraging OpenSwap's Booster Queue Technology",
      "backgroundImageUrl": "https://cdn.ijsweb.com/assets/8421b8b3-2d0d-4c79-8126-e8c80d254dda/IF_OS_TF.png",
      "avatar": "https://cdn.ijsweb.com/assets/8421b8b3-2d0d-4c79-8126-e8c80d254dda/IF_OS_TF.png",
      "userName": "IJS",
      "date": "2022-02-11",
      "link": {
        url: "https://www.ijs.network/defi2+-protocol/liquidity-queue-framework",
        caption: "Read More"
      }
    },
    {
      "title": "IJS Technologies: Latest DeFi Technology Developments",
      "backgroundImageUrl": "https://cdn.ijsweb.com/assets/e241fce6-090b-44ab-94cd-d6e4ceef1c40/Defi_Thumbnail.jpg",
      "avatar": "https://cdn.ijsweb.com/assets/e241fce6-090b-44ab-94cd-d6e4ceef1c40/Defi_Thumbnail.jpg",
      "userName": "IJS",
      "date": "2021-08-20",
      "link": {
        url: "https://www.ijs.network/blog-and-news/blog-20210820",
        caption: "Read More"
      }
    },
    {
      "title": "IJS Technologies: Revolutionizing On-Chain Liquidity through OpenSwap",
      "backgroundImageUrl": "https://cdn.ijsweb.com/assets/b7de0144-f275-4cba-aa13-8c0157a85fd0/20210423_OpenSwap_v1.1Thumbnail.jpg",
      "avatar": "https://cdn.ijsweb.com/assets/b7de0144-f275-4cba-aa13-8c0157a85fd0/20210423_OpenSwap_v1.1Thumbnail.jpg",
      "userName": "IJS",
      "date": "2021-04-23",
      "link": {
        url: "https://www.ijs.network/blog-and-news/blog-20210423",
        caption: "Read More"
      }
    }
  ]

  init() {
    super.init();
    const config1 = this.pageBlock1.getConfigurators().find(item => item.target === 'Builders');
    if (config1?.setTag) {
      config1.setTag({
        gap: 20,
        "boxShadow": "5px 8px 29px 1px rgba(125, 138, 159, 0.25)",
        "date": {
          "font": {"size": "12px", "color": "#565656"}
        },
        "title": {
          "font": {"size": "18px", "color": "#565656"}
        },
        "link": {
          "font": {"color": "#F39422"}
        },
        "userName": {
          "font": {"size": "14px", "color": "#565656"}
        }
      });
    }
  }

  render() {
    return <i-vstack width={'100%'} height={'100%'} gap="1rem" margin={{top: '1rem'}}>
      <i-page-blog-list
        id="pageBlock1"
        data={this._data1}
      />
    </i-vstack>
  }
}