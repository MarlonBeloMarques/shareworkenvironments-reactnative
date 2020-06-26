/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Block, Text, Photo, Button } from '../../elements';
import { theme } from '../../constants';
import { data, resizeImages } from '../../utils';
import styles from './styles';
import WorkScreen from '../WorkScreen';

const maxWidth = Dimensions.get('window').width;
const maxHeight = Dimensions.get('window').height;

export default function ExploreScreen(props) {
  const [dataSource, setDataSource] = useState();
  const [isExplore, setIsExplore] = useState(true);

  useEffect(() => {
    const processedImages = resizeImages.processImages(data.content);
    const rows = resizeImages.buildRows(processedImages, maxWidth);
    // eslint-disable-next-line no-const-assign
    const rowsImage = resizeImages.normalizeRows(rows, maxWidth);
    setDataSource(rowsImage);
  }, []);

  useEffect(() => {
    props.navigation.setParams({ isExplore });
  }, [isExplore]);

  function renderLike(item) {
    if (item) {
      return (
        <AntDesign name="heart" size={14} color={theme.colors.secondary} />
      );
    }

    return <AntDesign name="hearto" size={14} color={theme.colors.white} />;
  }

  function Item({ item, onPhotoOpen, dimensionPhotoClicked }) {
    const [dimensions, setDimensions] = useState({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });

    return (
      <Block flex={false}>
        <TouchableWithoutFeedback
          onPress={() => {
            onPhotoOpen(item);
            dimensionPhotoClicked(dimensions);
            setIsExplore(false);
          }}
        >
          <Block margin={[theme.sizes.caption / 2]} bottom index={2} absolute>
            <Button style>{renderLike(item.like)}</Button>
          </Block>
          <Image
            source={{ uri: item.background }}
            onLayout={(event) => {
              const { x, y, height, width } = event.nativeEvent.layout;
              setDimensions({ x, y, height, width });
            }}
            style={{
              width: item.backgroundWidth,
              height: item.backgroundHeight,
            }}
          />
        </TouchableWithoutFeedback>
      </Block>
    );
  }

  return (
    // eslint-disable-next-line no-use-before-define
    <Block>
      {isExplore && (
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
      )}
      {isExplore && (
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
      )}

      <WorkScreen
        onClosed={({ onClosed }) => setIsExplore(onClosed)}
        renderContent={({ onPhotoOpen, dimensionPhotoClicked }) => (
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
              renderItem={({ item }) => (
                <Block space="between" row margin={[0, 0, 5, 0]}>
                  {item.map((item) => (
                    <Item
                      item={item}
                      key={item.id}
                      onPhotoOpen={onPhotoOpen}
                      dimensionPhotoClicked={dimensionPhotoClicked}
                    />
                  ))}
                </Block>
              )}
            />
          </Block>
        )}
      />
    </Block>
  );
}
