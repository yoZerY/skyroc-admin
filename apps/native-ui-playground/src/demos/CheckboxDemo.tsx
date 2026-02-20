import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import {
  Button,
  Checkbox,
  CheckboxCard,
  CheckboxGroup,
  CheckboxGroupCard,
  Text
} from '@skyroc/native-ui';
import type { CheckedState } from '@skyroc/native-ui';
import { ThemeColor } from '@skyroc/ui-types';

const COLORS = ['primary', 'destructive', 'success', 'warning', 'info', 'accent', 'carbon', 'secondary'];
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

const FRUIT_ITEMS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Orange', value: 'orange' },
  { label: 'Banana', value: 'banana' },
  { label: 'Grape', value: 'grape' }
];

const CARD_ITEMS = [
  {
    description: 'Enable color customization',
    icon: <Feather color="#8b5cf6" name="droplet" size={20} />,
    label: 'Color Scheme',
    value: 'color'
  },
  {
    description: 'Add animations and transitions',
    icon: <Feather color="#f59e0b" name="zap" size={20} />,
    label: 'Animations',
    value: 'animations'
  },
  {
    description: 'Optimize for faster load times',
    icon: <Feather color="#22c55e" name="trending-up" size={20} />,
    label: 'Performance',
    value: 'performance'
  }
];

const CheckboxDemo = () => {
  const [controlled, setControlled] = useState(false);
  const [groupValue, setGroupValue] = useState<string[]>(['apple', 'orange']);
  const [cardGroupValue, setCardGroupValue] = useState<string[]>(['color']);

  const checkAllState = useMemo<CheckedState>(() => {
    if (groupValue.length === 0) return false;
    if (groupValue.length === FRUIT_ITEMS.length) return true;
    return 'indeterminate';
  }, [groupValue]);

  const cardCheckAllState = useMemo<CheckedState>(() => {
    if (cardGroupValue.length === 0) return false;
    if (cardGroupValue.length === CARD_ITEMS.length) return true;
    return 'indeterminate';
  }, [cardGroupValue]);

  function handleCheckAll(checked: CheckedState) {
    setGroupValue(checked === true ? FRUIT_ITEMS.map(i => i.value) : []);
  }

  function handleCardCheckAll(checked: CheckedState) {
    setCardGroupValue(checked === true ? CARD_ITEMS.map(i => i.value) : []);
  }

  return (
    <ScrollView
      className="flex-1 bg-muted"
      contentContainerClassName="p-6 pb-20"
      showsVerticalScrollIndicator={false}
    >
      {/* Basic */}
      <Text className="mb-4 text-lg font-semibold">Basic</Text>
      <View className="mb-8 gap-3">
        <Checkbox>Checkbox</Checkbox>
        <Checkbox defaultChecked>Checked by default</Checkbox>
      </View>

      {/* Color */}
      <Text className="mb-4 text-lg font-semibold">Color</Text>
      <View className="mb-8">
        <CheckboxGroup direction="horizontal">
          {COLORS.map(c => (
            <Checkbox key={c} color={c as ThemeColor} defaultChecked name={c}>{c}</Checkbox>
          ))}
        </CheckboxGroup>
      </View>

      {/* Size */}
      <Text className="mb-4 text-lg font-semibold">Size</Text>
      <View className="mb-8 gap-3">
        {SIZES.map(s => (
          <Checkbox key={s} defaultChecked size={s}>{s}</Checkbox>
        ))}
      </View>

      {/* Shape */}
      <Text className="mb-4 text-lg font-semibold">Shape</Text>
      <View className="mb-8 gap-3">
        <Checkbox defaultChecked shape="round">Round (default)</Checkbox>
        <Checkbox defaultChecked shape="square">Square</Checkbox>
      </View>

      {/* States */}
      <Text className="mb-4 text-lg font-semibold">States</Text>
      <View className="mb-8 gap-3">
        <Checkbox checked={false}>Unchecked</Checkbox>
        <Checkbox checked="indeterminate" shape="round">Indeterminate (round)</Checkbox>
        <Checkbox checked="indeterminate" shape="square">Indeterminate (square)</Checkbox>
        <Checkbox defaultChecked>Checked</Checkbox>
      </View>

      {/* Disabled */}
      <Text className="mb-4 text-lg font-semibold">Disabled</Text>
      <View className="mb-8 gap-3">
        <Checkbox disabled>Disabled</Checkbox>
        <Checkbox defaultChecked disabled>Disabled & Checked</Checkbox>
      </View>

      {/* Label Position */}
      <Text className="mb-4 text-lg font-semibold">Label Position</Text>
      <View className="mb-8 gap-3">
        <Checkbox labelPosition="right">Label on right</Checkbox>
        <Checkbox labelPosition="left">Label on left</Checkbox>
      </View>

      {/* Controlled */}
      <Text className="mb-4 text-lg font-semibold">Controlled</Text>
      <View className="mb-8 gap-3">
        <Checkbox checked={controlled} onCheckedChange={setControlled}>
          {controlled ? 'Checked' : 'Unchecked'}
        </Checkbox>
        <Button size="sm" onPress={() => setControlled(v => !v)}>Toggle</Button>
      </View>

      {/* Group with Check All */}
      <Text className="mb-4 text-lg font-semibold">Group</Text>
      <View className="mb-8 gap-3">
        <Checkbox
          checked={checkAllState}
          onCheckedChange={handleCheckAll}
        >
          Check All
        </Checkbox>
        <CheckboxGroup value={groupValue} onChange={setGroupValue}>
          {FRUIT_ITEMS.map(item => (
            <Checkbox key={item.value} name={item.value}>{item.label}</Checkbox>
          ))}
        </CheckboxGroup>
      </View>

      {/* Horizontal Group */}
      <Text className="mb-4 text-lg font-semibold">Horizontal Group</Text>
      <View className="mb-8">
        <CheckboxGroup defaultValue={['a']} direction="horizontal">
          <Checkbox name="a">A</Checkbox>
          <Checkbox name="b">B</Checkbox>
          <Checkbox name="c">C</Checkbox>
          <Checkbox name="d">D</Checkbox>
        </CheckboxGroup>
      </View>

      {/* Max Limit */}
      <Text className="mb-4 text-lg font-semibold">Max Limit (2)</Text>
      <View className="mb-8">
        <CheckboxGroup color="warning" defaultValue={['x']} max={2} shape="square">
          <Checkbox name="x">X</Checkbox>
          <Checkbox name="y">Y</Checkbox>
          <Checkbox name="z">Z</Checkbox>
        </CheckboxGroup>
      </View>

      {/* Card */}
      <Text className="mb-4 text-lg font-semibold">Card</Text>
      <View className="mb-8 gap-3">
        <CheckboxCard
          color="primary"
          defaultChecked
          description="Enable color customization"
          icon={<Feather color="#8b5cf6" name="droplet" size={20} />}
          label="Color Scheme"
        />
        <CheckboxCard
          checkboxPosition="right"
          color="warning"
          description="Add animations and transitions"
          icon={<Feather color="#f59e0b" name="zap" size={20} />}
          label="Animations"
          shape="square"
        />
        <CheckboxCard
          color="success"
          description="Optimize for faster load times"
          disabled
          icon={<Feather color="#22c55e" name="trending-up" size={20} />}
          label="Performance"
        />
      </View>

      {/* Card Group with Check All */}
      <Text className="mb-4 text-lg font-semibold">Card Group</Text>
      <View className="mb-8 gap-3">
        <Checkbox
          checked={cardCheckAllState}
          color="info"
          onCheckedChange={handleCardCheckAll}
        >
          Check All
        </Checkbox>
        <CheckboxGroupCard
          checkboxPosition="right"
          color="info"
          items={CARD_ITEMS}
          shape="square"
          value={cardGroupValue}
          onChange={setCardGroupValue}
        />
      </View>

      {/* Custom Icon */}
      <Text className="mb-4 text-lg font-semibold">Custom Icon</Text>
      <View className="mb-8 gap-3">
        <Checkbox
          checkedIcon={<AntDesign color="#22c55e" name="like" size={20} />}
          defaultChecked
        >
          Custom checked icon
        </Checkbox>
      </View>
    </ScrollView>
  );
};

export { CheckboxDemo };
