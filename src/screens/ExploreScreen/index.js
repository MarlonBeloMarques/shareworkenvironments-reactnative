/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { Block, Text, Photo } from '../../elements';
import { theme } from '../../constants';
import { data, resizeImages } from '../../utils';
import styles from './styles';

const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height;

export default function WelcomeScreen() {
  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    const processedImages = resizeImages.processImages(data.content);
    const rows = resizeImages.buildRows(processedImages, maxWidth);
    // eslint-disable-next-line no-const-assign
    const rowsImage = resizeImages.normalizeRows(rows, maxWidth);
    setDataSource(rowsImage);
  }, []);

  function renderItem({ item }) {
    return (
      <Block space="between" row margin={[0, 0, 5, 0]}>
        {item.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </Block>
    );
  }

  function Item({ item }) {
    return (
      <Photo
        size={item.backgroundWidth}
        height={item.backgroundHeight}
        image={item.background}
      />
    );
  }

  return (
    // eslint-disable-next-line no-use-before-define
    <Block>
      <Block
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
        <Block color="primary" absolute style={styles.header} />
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
        <FlatList
          style={{ height: maxHeight, paddingTop: theme.sizes.base * 4 }}
          data={dataSource}
          renderItem={renderItem}
        />
      </Block>
    </Block>
  );
}
