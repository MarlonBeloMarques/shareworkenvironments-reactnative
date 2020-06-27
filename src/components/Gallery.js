/* eslint-disable no-use-before-define */
/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Platform } from 'react-native';
import Modal from 'react-native-modal';
import Lightbox from 'react-native-lightbox';
import { ScrollView } from 'react-native-gesture-handler';
import { Block, Text } from '../elements';
import { theme } from '../constants';
import { data } from '../utils';

const { height } = Dimensions.get('window');

const Gallery = (props) => {
  const { idGallery } = props;

  const [images, setImages] = useState([]);

  useEffect(() => {
    function loadGallery() {
      data.content.map((item) => {
        if (item.id === idGallery) {
          setImages([item.image1, item.image2, item.image3]);
        }
      });
    }

    loadGallery();
  }, [idGallery]);

  function renderImages() {
    const _images = [];

    images.map((item) => {
      _images.push(
        <Block flex={false} margin={5}>
          <Lightbox>
            <Image
              resizeMode="cover"
              source={{ uri: item }}
              style={{
                minWidth: 140,
                height: 180,
                borderRadius: theme.sizes.radius,
              }}
            />
          </Lightbox>
        </Block>
      );
    });

    return _images;
  }

  return (
    <Modal
      onBackdropPress={props.onRequestClose}
      isVisible={props.visible}
      swipeDirection={['down']}
      onSwipeComplete={props.onRequestClose}
      onRequestClose={props.onRequestClose}
      style={{ margin: 0, marginTop: height / 3 }}
    >
      <Block
        card
        color={theme.colors.primary}
        padding={[Platform.OS === 'ios' ? 20 : 10]}
      >
        <Block flex={false} row padding={[theme.sizes.base, theme.sizes.base]}>
          <Text h3 bold white>
            Gallery
          </Text>
        </Block>

        <ScrollView>
          <Block center style={styles.gallery} margin={theme.sizes.base}>
            {renderImages()}
          </Block>
        </ScrollView>
        <Block flex={false} margin={[theme.sizes.base, 0]}>
          <Text bottom center gray3>
            Clique na imagem para visualizar em tela cheia.
          </Text>
        </Block>
      </Block>
    </Modal>
  );
};

export default Gallery;

Gallery.propTypes = {
  // eslint-disable-next-line react/require-default-props
  onRequestClose: () => {},
};

export const styles = StyleSheet.create({
  gallery: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
});
