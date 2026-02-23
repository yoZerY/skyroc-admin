import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Button, ShareSheet, Text } from '@skyroc/native-ui';
import type { ShareSheetOption } from '@skyroc/native-ui';

const BASIC_OPTIONS: ShareSheetOption[] = [
  { icon: <AntDesign color="#0bc15f" name="wechat" size={24} />, name: '微信' },
  { icon: <AntDesign color="#38b9fa" name="qq" size={24} />, name: 'QQ' },
  { icon: <AntDesign color="#ee575e" name="weibo-circle" size={24} />, name: '微博' },
  { icon: <Feather color="#3b82f6" name="link" size={24} />, name: '复制链接' },
  { icon: <Feather color="#f97316" name="share-2" size={24} />, name: '分享海报' },
  { icon: <Feather color="#8b5cf6" name="image" size={24} />, name: '二维码' }
];

const MULTI_ROW_OPTIONS: ShareSheetOption[][] = [
  [
    { icon: <AntDesign color="#0bc15f" name="wechat" size={24} />, name: '微信' },
    { icon: <AntDesign color="#7bc845" name="wechat" size={24} />, name: '朋友圈' },
    { icon: <AntDesign color="#38b9fa" name="qq" size={24} />, name: 'qq' },
    { icon: <AntDesign color="#ee575e" name="weibo-circle" size={24} />, name: '微博' }
  ],
  [
    { icon: <Feather color="#3b82f6" name="link" size={24} />, name: '复制链接' },
    { icon: <Feather color="#f97316" name="share-2" size={24} />, name: '分享海报' },
    { icon: <Feather color="#8b5cf6" name="image" size={24} />, name: '二维码' }
  ]
];

const DESC_OPTIONS: ShareSheetOption[] = [
  { description: '描述信息', icon: <AntDesign color="#0bc15f" name="wechat" size={24} />, name: '微信' },
  { description: '描述信息', icon: <AntDesign color="#38b9fa" name="qq" size={24} />, name: 'QQ' },
  { description: '描述信息', icon: <AntDesign color="#ee575e" name="weibo-circle" size={24} />, name: '微博' }
];

const ShareSheetDemo = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [showMulti, setShowMulti] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  return (
    <ScrollView
      className="flex-1 bg-muted"
      contentContainerClassName="pb-20"
      showsVerticalScrollIndicator={false}
    >
      {/* Basic */}
      <Text className="mb-3 mt-4 px-4 text-lg font-semibold">基础用法</Text>
      <View className="px-4">
        <Button onPress={() => setShowBasic(true)}>显示分享面板</Button>
      </View>
      <ShareSheet
        cancelText="取消"
        options={BASIC_OPTIONS}
        show={showBasic}
        onUpdateShow={setShowBasic}
      />

      {/* Multi Row */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">多行选项</Text>
      <View className="px-4">
        <Button onPress={() => setShowMulti(true)}>显示分享面板</Button>
      </View>
      <ShareSheet
        cancelText="取消"
        options={MULTI_ROW_OPTIONS}
        show={showMulti}
        onUpdateShow={setShowMulti}
      />

      {/* With Title */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">展示标题</Text>
      <View className="px-4">
        <Button onPress={() => setShowTitle(true)}>显示分享面板</Button>
      </View>
      <ShareSheet
        cancelText="取消"
        options={BASIC_OPTIONS}
        show={showTitle}
        title="立即分享给好友"
        onUpdateShow={setShowTitle}
      />

      {/* With Description */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">展示描述</Text>
      <View className="px-4">
        <Button onPress={() => setShowDesc(true)}>显示分享面板</Button>
      </View>
      <ShareSheet
        cancelText="取消"
        description="以下渠道可展示描述信息"
        options={DESC_OPTIONS}
        show={showDesc}
        title="立即分享给好友"
        onUpdateShow={setShowDesc}
      />
    </ScrollView>
  );
};

export { ShareSheetDemo };
