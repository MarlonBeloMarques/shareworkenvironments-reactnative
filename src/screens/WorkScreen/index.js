import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Animated } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Block, Photo, Text, Button } from '../../elements';

import { theme } from '../../constants';
import { data } from '../../utils';
import styles from './styles';

const maxWidth = Dimensions.get('window').width;

function WorkDetailScreen(props) {
  const { photo, onClose, sourcePhotoDimensions } = props;

  const [openProgress, setOpenProgress] = useState(new Animated.Value(0));

  const [sourcePhoto, setSourcePhoto] = useState({
    x: sourcePhotoDimensions.x,
    y: sourcePhotoDimensions.y,
    width: sourcePhotoDimensions.width,
    height: sourcePhotoDimensions.height,
  });

  const [destinePhoto, setDestinePhoto] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const [work, setWork] = useState({
    id: '',
    like: false,
    title: '',
    address: '',
    about: '',
    background: '',
    image1: '',
    image2: '',
    image3: '',
  });

  useEffect(() => {
    function findWork() {
      data.content.map((item) => {
        if (item.id === photo.id) {
          setWork({
            id: item.id,
            like: item.like,
            title: item.title,
            address: item.address,
            about: item.about,
            background: item.background,
            image1: item.image1,
            image2: item.image2,
            image3: item.image3,
          });
        }
      });
    }

    findWork();
  }, []);

  useEffect(() => {
    Animated.timing(openProgress, {
      toValue: 1,
      duration: 300,
    }).start();
  }, []);

  return (
    <Block
      style={[StyleSheet.absoluteFill]}
      onLayout={(event) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        setDestinePhoto({ x, y, width, height });
      }}
      flex={false}
    >
      <Block
        margin={[theme.sizes.padding * 2, theme.sizes.base]}
        flex={false}
        absolute
        index={2}
      >
        <Button style onPress={onClose}>
          <AntDesign name="close" size={28} color={theme.colors.secondary} />
        </Button>
      </Block>
      <Photo size={maxWidth} height={280} image={work.background} />
      <Block
        margin={[0, theme.sizes.base * 2, 0, theme.sizes.base * 2]}
        absolute
        index={2}
        style={{ top: theme.sizes.base * 15 }}
      >
        <Text h2 bold>
          {work.title}
        </Text>
      </Block>
      <Block
        padding={[
          theme.sizes.base,
          theme.sizes.base * 2,
          theme.sizes.base,
          theme.sizes.base * 2,
        ]}
      >
        <Text bold>{work.address}</Text>
        <Block padding={[theme.sizes.base, 0]} border center row flex={false}>
          <Block row left>
            <AntDesign name="heart" size={28} color={theme.colors.secondary} />
          </Block>
          <Block row right>
            <Ionicons
              name="ios-share"
              size={28}
              color={theme.colors.secondary}
            />
          </Block>
        </Block>
        <Block flex={false} margin={[theme.sizes.base * 2, 0]}>
          <Text h3 bold>
            About
          </Text>
          <Block flex={false} margin={[theme.sizes.base, 0]}>
            <Text>{work.about}</Text>
          </Block>
        </Block>

        <Block flex={false}>
          <Text bold h3>
            Galeria
          </Text>

          <Block
            padding={[theme.sizes.base * 2, theme.sizes.base]}
            row
            flex={false}
          >
            <Block padding={[0, 15, 0, 0]} flex={false}>
              <Photo size={80} height={80} card image={work.image1} />
            </Block>
            <Block padding={[0, 15, 0, 0]} flex={false}>
              <Photo size={80} height={80} card image={work.image2} />
            </Block>
            <Block flex={false}>
              <Button style={styles.plus}>
                <Text h3>+3</Text>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
}

export default function WorkScreen(props) {
  const [photo, setPhoto] = useState(null);
  const [dimensions, setDimensions] = useState({});

  function open(photo) {
    setPhoto(photo);
  }
  function close() {
    setPhoto(null);
  }

  function sourcePhoto(dimensions) {
    setDimensions(dimensions);
  }

  return (
    // eslint-disable-next-line no-use-before-define
    <ScrollView>
      {props.onClosed({ onClosed: photo === null })}
      {props.renderContent({
        onPhotoOpen: open,
        dimensionPhotoClicked: sourcePhoto,
      })}
      {photo && (
        <WorkDetailScreen
          photo={photo}
          onClose={close}
          sourcePhotoDimensions={dimensions}
        />
      )}
    </ScrollView>
  );
}
