import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { Button, NavBar, Text } from '@skyroc/native-ui';
import AntDesign from '@expo/vector-icons/AntDesign';

const NavBarDemo = () => {
  const [title, setTitle] = useState('Page Title');

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Basic */}
      <Text className="px-6 pb-4 pt-6 text-lg font-semibold">Basic</Text>
      <NavBar title="Title" />

      {/* Back Arrow */}
      <Text className="px-6 pb-4 pt-6 text-lg font-semibold">Back Arrow</Text>
      <NavBar
        leftArrow
        title="Title"
        onLeftPress={() => Alert.alert('Back')}
      />

      {/* Arrow + Text */}
      <Text className="px-6 pb-4 pt-6 text-lg font-semibold">Arrow + Text</Text>
      <NavBar
        leftArrow
        leftText="Back"
        title="Title"
        onLeftPress={() => Alert.alert('Back')}
      />

      {/* Right Text */}
      <Text className="px-6 pb-4 pt-6 text-lg font-semibold">Right Text</Text>
      <NavBar
        leftArrow
        rightText="Save"
        title="Title"
        onLeftPress={() => Alert.alert('Back')}
        onRightPress={() => Alert.alert('Saved')}
      />

      {/* Custom Right */}
      <Text className="px-6 pb-4 pt-6 text-lg font-semibold">Custom Right</Text>
      <NavBar
        leftArrow
        right={(
          <View className="flex-row gap-4">
            <AntDesign color="#09090b" name="search1" size={18} />
            <AntDesign color="#09090b" name="ellipsis1" size={18} />
          </View>
        )}
        title="Title"
        onLeftPress={() => Alert.alert('Back')}
      />

      {/* Disabled */}
      <Text className="px-6 pb-4 pt-6 text-lg font-semibold">Disabled</Text>
      <NavBar
        leftArrow
        leftDisabled
        rightDisabled
        rightText="Done"
        title="Title"
      />

      {/* Long Title (stays centered) */}
      <Text className="px-6 pb-4 pt-6 text-lg font-semibold">Long Left / Short Right</Text>
      <NavBar
        left={<Text className="text-sm">Very Long Back Text</Text>}
        right={<Text className="text-sm text-primary">OK</Text>}
        title="Centered Title"
        onLeftPress={() => Alert.alert('Back')}
        onRightPress={() => Alert.alert('OK')}
      />

      {/* No Border */}
      <Text className="px-6 pb-4 pt-6 text-lg font-semibold">No Border</Text>
      <NavBar
        border={false}
        leftArrow
        title="No Border"
        onLeftPress={() => Alert.alert('Back')}
      />

      {/* Dynamic Title */}
      <Text className="px-6 pb-4 pt-6 text-lg font-semibold">Click Title</Text>
      <NavBar
        leftArrow
        title={title}
        onLeftPress={() => Alert.alert('Back')}
        onTitlePress={() => setTitle(prev => (prev === 'Page Title' ? 'Changed!' : 'Page Title'))}
      />

      {/* Custom Title Node */}
      <Text className="px-6 pb-4 pt-6 text-lg font-semibold">Custom Title</Text>
      <NavBar
        leftArrow
        title={(
          <View className="flex-row items-center gap-1">
            <AntDesign color="#09090b" name="enviromento" size={16} />
            <Text className="text-base font-semibold">Shanghai</Text>
            <AntDesign color="#09090b" name="down" size={12} />
          </View>
        )}
        onLeftPress={() => Alert.alert('Back')}
      />

      <View className="h-20" />
    </ScrollView>
  );
};

export { NavBarDemo };
