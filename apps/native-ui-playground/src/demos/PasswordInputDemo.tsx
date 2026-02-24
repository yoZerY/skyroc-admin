import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { PasswordInput, Text } from '@skyroc/native-ui';

const PasswordInputDemo = () => {
  const [basic, setBasic] = useState('');
  const [short, setShort] = useState('');
  const [gutterVal, setGutterVal] = useState('');
  const [plain, setPlain] = useState('');
  const [infoVal, setInfoVal] = useState('');
  const [infoError, setInfoError] = useState('');

  function handleInfoChange(text: string) {
    setInfoVal(text);
    if (text.length === 6 && text !== '123456') {
      setInfoError('密码错误');
    } else {
      setInfoError('');
    }
  }

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-20" showsVerticalScrollIndicator={false}>
      {/* 基础用法 */}
      <Text className="mb-3 mt-4 px-4 text-lg font-semibold">基础用法</Text>
      <View className="px-4">
        <PasswordInput
          value={basic}
          onChange={setBasic}
          onComplete={(val) => Alert.alert('输入完成', val)}
        />
      </View>

      {/* 自定义长度 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">自定义长度</Text>
      <View className="px-4">
        <PasswordInput
          length={4}
          value={short}
          onChange={setShort}
          onComplete={(val) => Alert.alert('输入完成', val)}
        />
      </View>

      {/* 格子间距 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">格子间距</Text>
      <View className="px-4">
        <PasswordInput
          gutter={10}
          value={gutterVal}
          onChange={setGutterVal}
        />
      </View>

      {/* 明文展示 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">明文展示</Text>
      <View className="px-4">
        <PasswordInput
          mask={false}
          value={plain}
          onChange={setPlain}
        />
      </View>

      {/* 提示信息 */}
      <Text className="mb-3 mt-6 px-4 text-lg font-semibold">提示信息</Text>
      <View className="px-4">
        <PasswordInput
          errorInfo={infoError}
          info="密码为 6 位数字"
          value={infoVal}
          onChange={handleInfoChange}
        />
      </View>
    </ScrollView>
  );
};

export { PasswordInputDemo };
