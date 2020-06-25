import React from 'react';
import { ScrollView } from 'react-native';
import { Block, Text, Photo } from '../../elements';
import { theme } from '../../constants';
import { data } from '../../utils';
import styles from './styles';

export default function WelcomeScreen(props) {
  function Item({ item }) {
    return <Photo size={200} height={200} image={item.background} />;
  }
  return (
    // eslint-disable-next-line no-use-before-define
    <Block>
      <Block
        color="primary"
        style={styles.header}
        size={64}
        padding={[
          theme.sizes.base,
          theme.sizes.base * 2,
          0,
          theme.sizes.base * 2,
        ]}
        absolute
        index={4}
        flex={false}
        row
      >
        <Block middle>
          <Text h2 bold>
            SWE.
          </Text>
        </Block>
        <Block middle flex={false}>
          <Photo avatar image={data.user.avatar} />
        </Block>
      </Block>
      <Block
        flex={false}
        padding={[
          theme.sizes.base,
          theme.sizes.base * 2,
          0,
          theme.sizes.base * 2,
        ]}
      >
        <ScrollView>
          {data.content.map((photo) => (
            <Item key={photo.id} item={photo} />
          ))}
        </ScrollView>
      </Block>
    </Block>
  );
}
