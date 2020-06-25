/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign } from '@expo/vector-icons';
import { Block, Text, Photo, Button } from '../../elements';
import { theme } from '../../constants';
import { data, resizeImages } from '../../utils';
import styles from './styles';

const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height;

export default function WelcomeScreen(props) {
  const [dataSource, setDataSource] = useState();

  useEffect(() => {
    const processedImages = resizeImages.processImages(data.content);
    const rows = resizeImages.buildRows(processedImages, maxWidth);
    // eslint-disable-next-line no-const-assign
    const rowsImage = resizeImages.normalizeRows(rows, maxWidth);
    setDataSource(rowsImage);
  }, []);

  function handleSubmit(id) {
    props.navigation.navigate('work', { id });
  }

  function renderItem({ item }) {
    return (
      <Block space="between" row margin={[0, 0, 5, 0]}>
        {item.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </Block>
    );
  }

  function renderLike(item) {
    if (item) {
      return (
        <AntDesign name="heart" size={14} color={theme.colors.secondary} />
      );
    }

    return <AntDesign name="hearto" size={14} color={theme.colors.white} />;
  }

  function Item({ item }) {
    return (
      <Block flex={false}>
        <Button style onPress={() => handleSubmit(item.id)}>
          <Block margin={[theme.sizes.caption / 2]} bottom index={2} absolute>
            <Button style>{renderLike(item.like)}</Button>
          </Block>
          <Photo
            size={item.backgroundWidth}
            height={item.backgroundHeight}
            image={item.background}
          />
        </Button>
      </Block>
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
          <Text h3 bold>
            SWE.
          </Text>
        </Block>
        <Block middle flex={false}>
          <Photo avatar image={data.user.avatar} />
        </Block>
      </Block>
      <Block
        margin={[
          maxHeight / 1.3,
          theme.sizes.base * 6,
          theme.sizes.base,
          theme.sizes.base * 6,
        ]}
        bottom
        absolute
        index={2}
      >
        <Button color="secondary">
          <Text center white stylized>
            Search
          </Text>
        </Button>
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
