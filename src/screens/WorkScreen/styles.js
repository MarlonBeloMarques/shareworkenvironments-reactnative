import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  plus: {
    backgroundColor: theme.colors.gray,
    padding: 20,
    borderRadius: theme.sizes.radius,
  },
});
