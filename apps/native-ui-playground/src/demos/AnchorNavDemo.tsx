import { View } from 'react-native';
import { AnchorNav } from '@skyroc/native-ui';
import type { AnchorNavSection } from '@skyroc/native-ui';

const MENU_DATA: AnchorNavSection[] = [
  {
    title: '热销推荐',
    children: [
      { key: 'h1', text: '招牌烤鱼' },
      { key: 'h2', text: '麻辣小龙虾' },
      { key: 'h3', text: '酸菜鱼' },
      { key: 'h4', text: '水煮牛肉' },
      { key: 'h5', text: '剁椒鱼头' }
    ]
  },
  {
    title: '凉菜小吃',
    children: [
      { key: 'l1', text: '口水鸡' },
      { key: 'l2', text: '凉拌黄瓜' },
      { key: 'l3', text: '皮蛋豆腐' },
      { key: 'l4', text: '拍黄瓜' },
      { key: 'l5', text: '凉拌木耳' },
      { key: 'l6', text: '夫妻肺片' }
    ]
  },
  {
    title: '川湘菜系',
    children: [
      { key: 'c1', text: '麻婆豆腐' },
      { key: 'c2', text: '回锅肉' },
      { key: 'c3', text: '宫保鸡丁' },
      { key: 'c4', text: '辣子鸡' },
      { key: 'c5', text: '鱼香肉丝' },
      { key: 'c6', text: '毛血旺' },
      { key: 'c7', text: '水煮鱼片' }
    ]
  },
  {
    title: '粤式点心',
    children: [
      { key: 'y1', text: '虾饺皇' },
      { key: 'y2', text: '烧麦' },
      { key: 'y3', text: '叉烧包' },
      { key: 'y4', text: '肠粉' },
      { key: 'y5', text: '凤爪' }
    ]
  },
  {
    title: '主食面点',
    children: [
      { key: 'z1', text: '扬州炒饭' },
      { key: 'z2', text: '担担面' },
      { key: 'z3', text: '重庆小面' },
      { key: 'z4', text: '葱油拌面' },
      { key: 'z5', text: '炸酱面' },
      { key: 'z6', text: '酸辣粉' }
    ]
  },
  {
    title: '汤品煲仔',
    children: [
      { key: 't1', text: '番茄蛋汤' },
      { key: 't2', text: '紫菜蛋花汤' },
      { key: 't3', text: '酸辣汤' },
      { key: 't4', text: '老火靓汤' },
      { key: 't5', text: '冬瓜排骨汤' }
    ]
  },
  {
    title: '饮品甜品',
    children: [
      { key: 'd1', text: '酸梅汤' },
      { key: 'd2', text: '冰粉' },
      { key: 'd3', text: '椰汁西米露' },
      { key: 'd4', text: '杨枝甘露' },
      { key: 'd5', text: '芒果布丁' }
    ]
  },
  {
    title: '酒水',
    badge: '新',
    children: [
      { key: 'j1', text: '青岛啤酒' },
      { key: 'j2', text: '百威啤酒' },
      { key: 'j3', text: '可乐' },
      { key: 'j4', text: '雪碧' },
      { key: 'j5', text: '矿泉水' },
      { key: 'j6', text: '王老吉' }
    ]
  }
];

const AnchorNavDemo = () => {
  return (
    <View className="flex-1 bg-background">
      <AnchorNav items={MENU_DATA} />
    </View>
  );
};

export { AnchorNavDemo };
