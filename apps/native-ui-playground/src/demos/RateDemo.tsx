import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Rate, Text } from '@skyroc/native-ui';

const RateDemo = () => {
  const [basicValue, setBasicValue] = useState(3);
  const [halfValue, setHalfValue] = useState(2.5);
  const [customValue, setCustomValue] = useState(3);
  const [clearableValue, setClearableValue] = useState(3);
  const [eventValue, setEventValue] = useState(3);
  const [eventText, setEventText] = useState('');

  function handleEventChange(val: number) {
    setEventValue(val);
    setEventText(`Current: ${val}`);
  }

  return (
    <ScrollView className="flex-1 bg-muted" contentContainerClassName="pb-20" showsVerticalScrollIndicator={false}>
      {/* Basic */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Basic</Text>
      <View className="bg-background px-4 py-4">
        <Rate value={basicValue} onChange={setBasicValue} />
      </View>

      {/* Custom Icon */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Custom Icon</Text>
      <View className="bg-background px-4 py-4">
        <Rate
          icon={(_, active) => <AntDesign color={active ? '#ee0a24' : '#c8c9cc'} name="heart" size={24} />}
          value={customValue}
          voidIcon={(_, active) => <AntDesign color={active ? '#ee0a24' : '#c8c9cc'} name="heart" size={24} />}
          onChange={setCustomValue}
        />
      </View>

      {/* Half Star */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Half Star</Text>
      <View className="bg-background px-4 py-4">
        <Rate allowHalf value={halfValue} onChange={setHalfValue} />
      </View>

      {/* Custom Style */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Custom Style</Text>
      <View className="bg-background px-4 py-4">
        <Rate
          color="#ffd21e"
          count={6}
          defaultValue={4}
          gutter={8}
          size={32}
          voidColor="#eee"
        />
      </View>

      {/* Readonly */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Readonly</Text>
      <View className="bg-background px-4 py-4">
        <Rate readonly value={3.7} allowHalf />
      </View>

      {/* Readonly Integer */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Readonly (Integer)</Text>
      <View className="bg-background px-4 py-4">
        <Rate readonly value={3} />
      </View>

      {/* Disabled */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Disabled</Text>
      <View className="bg-background px-4 py-4">
        <Rate disabled value={3} />
      </View>

      {/* Clearable */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Clearable</Text>
      <View className="bg-background px-4 py-4">
        <Rate clearable value={clearableValue} onChange={setClearableValue} />
      </View>

      {/* Change Event */}
      <Text className="px-4 py-3 text-sm text-muted-foreground">Change Event</Text>
      <View className="bg-background px-4 py-4">
        <Rate value={eventValue} onChange={handleEventChange} />
        {eventText ? <Text className="mt-2 text-sm text-muted-foreground">{eventText}</Text> : null}
      </View>
    </ScrollView>
  );
};

export { RateDemo };
