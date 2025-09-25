// jest.setup.js

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  RN.Dimensions.get = jest.fn().mockImplementation(() => ({
    width: 400,
    height: 800,
  }));

  return RN;
});

// Mock AsyncStorage for Jest environment
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock React Navigation's useNavigation hook
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      setOptions: jest.fn(),
    }),
  };
});

// Mock expo-blur which uses native modules not available in Jest
jest.mock('expo-blur', () => {
  const { View } = require('react-native');
  return {
    BlurView: View,
  };
});

// Mock expo-linear-gradient globally
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: View,
  };
});