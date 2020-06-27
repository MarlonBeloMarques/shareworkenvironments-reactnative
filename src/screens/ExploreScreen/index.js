/* eslint-disable no-shadow */
import React, { useEffect, useState, useRef } from 'react';
import { Dimensions, FlatList, Image, StyleSheet } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AntDesign } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
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

  const { startColor, endColor, locations } = props;

  useEffect(() => {
    const processedImages = resizeImages.processImages(data.content);
    const rows = resizeImages.buildRows(
      processedImages,
      maxWidth - theme.sizes.base * 4
    );
    // eslint-disable-next-line no-const-assign
    const rowsImage = resizeImages.normalizeRows(
      rows,
      maxWidth - theme.sizes.base * 4
    );
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
    const elementRef = useRef();
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
            ref={elementRef}
            source={{ uri: item.background }}
            // eslint-disable-next-line no-unused-vars
            onLayout={(event) => {
              if (elementRef) {
                elementRef.current.measureInWindow((x, y, width, height) => {
                  setDimensions({ x, y, height, width });
                });
              }
            }}
            style={{
              width: item.backgroundWidth,
              height: item.backgroundHeight,
              borderRadius: theme.sizes.base,
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
        <Block size={64} absolute index={4} flex={false}>
          <LinearGradient
            style={[
              StyleSheet.absoluteFill,
              {
                flexDirection: 'row',
                paddingTop: theme.sizes.base,
                paddingRight: theme.sizes.base * 2,
                paddingLeft: theme.sizes.base * 2,
              },
            ]}
            locations={locations}
            colors={[startColor, endColor]}
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
          </LinearGradient>
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

ExploreScreen.defaultProps = {
  startColor: theme.colors.primary,
  endColor: 'rgba(52, 52, 52, 0.0)',
  locations: [0.4, 1],
  opacity: 0.8,
};
