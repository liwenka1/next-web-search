import { FaBlog, FaBook, FaPaperPlane } from 'react-icons/fa'
import { AiFillGithub, AiFillWechat, AiFillMail, AiFillTwitterCircle } from 'react-icons/ai'
import { SiBaidu, SiMicrosoftbing, SiGoogle, SiGithub, SiZhihu, SiBilibili, SiSinaweibo } from 'react-icons/si'

const SiteInfoLinks = [
  {
    href: 'https://blog.liwenkai.fun',
    icon: FaBlog,
    text: 'Blog'
  },
  // {
  //   href: 'https://www.liwenkai.asia/',
  //   icon: FaMusic,
  //   text: 'Music'
  // },
  {
    href: 'https://nav.liwenkai.fun',
    icon: FaBook,
    text: 'Nav'
  },
  {
    href: 'https://me.liwenkai.fun',
    icon: FaPaperPlane,
    text: 'Me'
  }
]

const ContactLinks = [
  {
    icon: AiFillGithub,
    href: 'https://github.com/liwenka1'
  },
  {
    icon: AiFillWechat,
    href: 'https://weixin.sogou.com/weixin?type=1&query=kk%E6%83%B3%E5%BD%93%E7%A8%8B%E5%BA%8F%E5%91%98'
  },
  {
    icon: AiFillMail,
    href: 'mailto:2020583117@qq.com'
  },
  {
    icon: AiFillTwitterCircle,
    href: 'https://twitter.com/liwenka1'
  }
]

const EngList = [
  {
    title: '百度',
    icon: SiBaidu,
    href: 'https://www.baidu.com/s?wd='
  },
  {
    title: '必应',
    icon: SiMicrosoftbing,
    href: 'https://www.bing.com/search?q='
  },
  {
    title: '谷歌',
    icon: SiGoogle,
    href: 'https://www.google.com/search?q='
  },
  {
    title: 'Github',
    icon: SiGithub,
    href: 'https://github.com/search?q='
  },
  {
    title: '知乎',
    icon: SiZhihu,
    href: 'https://www.zhihu.com/search?q='
  },
  {
    title: 'Bilibili',
    icon: SiBilibili,
    href: 'https://search.bilibili.com/all?keyword='
  },
  {
    title: '微博',
    icon: SiSinaweibo,
    href: 'https://s.weibo.com/weibo?q='
  }
]

export { SiteInfoLinks, ContactLinks, EngList }
