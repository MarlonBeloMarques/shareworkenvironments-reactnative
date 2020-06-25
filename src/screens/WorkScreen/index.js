import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Block, Photo, Text, Button } from '../../elements';

import { theme } from '../../constants';
import { data } from '../../utils';
import styles from './styles';

const maxWidth = Dimensions.get('window').width;

export default function WorkScreen(props) {
  const id = props.navigation.getParam('id');

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
        if (item.id === id) {
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

  return (
    // eslint-disable-next-line no-use-before-define
    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
}
