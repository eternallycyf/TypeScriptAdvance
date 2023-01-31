import React, { useMemo } from 'react';
import { useLocale } from 'dumi';
import './home-page.less';

export default () => {
  const { id } = useLocale();

  const characteristics = useMemo(() => {
    if (id === 'zh-CN') {
      return [
        {

          img: 'https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png',
          title: '开箱即用',
          txt: '简单易用，降低使用者的代码量',
        },
        {
          img: 'https://gw.alipayobjects.com/zos/antfincdn/Eb8IHpb9jE/Typescript_logo_2020.svg',
          title: 'TypeScript',
          txt: '使用 TypeScript 开发，提供完整的类型定义文件',
        },
        {
          img: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/U3XjS5IA1tUAAAAAAAAAAAAAFl94AQBr',
          title: '预设行为',
          txt: '更少的代码，更少的 Bug',
        },
        {
          img: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/q48YQ5X4ytAAAAAAAAAAAAAAFl94AQBr',
          title: '简单易用',
          txt: '在 Ant Design 上进行了自己的封装，更加易用',
        },
        {
          img: 'https://gw.alipayobjects.com/zos/bmw-prod/b8570f4d-c1b1-45eb-a1da-abff53159967/kj9t990h_w144_h144.png',
          title: '自定义主题',
          txt: '支持自定义主题，满足多样化的产品需求',
        },
        {
          img: 'https://gw.alipayobjects.com/zos/bmw-prod/3863e74a-7870-4874-b1e1-00a8cdf47684/kj9t7ww3_w144_h144.png',
          title: '移动端组件支持',
          txt: 'lordaeron额外支持移动端组件，提供pc/mobile双端支持',
        },
      ];
    }
    return []
    return [
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png',
        title: 'Out of the box',
        txt: 'Easy to use and reduce the users code',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/antfincdn/Eb8IHpb9jE/Typescript_logo_2020.svg',
        title: 'TypeScript',
        txt: 'Use TypeScript development to provide a complete type definition file',
      },
      {
        img: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/U3XjS5IA1tUAAAAAAAAAAAAAFl94AQBr',
        title: 'Preset behavior',
        txt: 'Less code, fewer bugs',
      },
      {
        img: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/q48YQ5X4ytAAAAAAAAAAAAAAFl94AQBr',
        title: 'Easy to use',
        txt: 'Encapsulated on Ant Design to make it easier to use',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/b8570f4d-c1b1-45eb-a1da-abff53159967/kj9t990h_w144_h144.png',
        title: 'Custom theme',
        txt: 'Support custom themes to meet diverse product needs',
      },
      {
        img: 'https://gw.alipayobjects.com/zos/bmw-prod/3863e74a-7870-4874-b1e1-00a8cdf47684/kj9t7ww3_w144_h144.png',
        title: 'Mobile component support',
        txt: 'lordaeron additionally supports mobile components and provides pc/mobile dual-end support',
      },
    ];
  }, [id]);
  return (
    <div className="homePage">
      {/* 内容部分 */}
      <div className="main">
        {/* 功能特性 */}
        <div className="group">
          <ul className="features">
            {characteristics.map((item) => {
              return (
                <li key={item.title}>
                  <p>
                    <img src={item.img} style={{ width: 84, height: 84 }} />
                  </p>
                  <p>{item.title}</p>
                  <p>{item.txt}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
