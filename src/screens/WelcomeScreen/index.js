import React from 'react';
import { Block, Text, Photo, Button } from '../../elements';
import logo from '../../assets/images/logo.png';
import facebook from '../../assets/images/facebook.png';
import { theme } from '../../constants';

export default function WelcomeScreen(props) {
  function onSignupClicked() {
    props.navigation.navigate('signup');
  }
  return (
    // eslint-disable-next-line no-use-before-define
    <Block
      padding={[
        theme.sizes.base,
        theme.sizes.base * 2,
        0,
        theme.sizes.base * 2,
      ]}
      middle
    >
      <Block center flex={false}>
        <Block margin={[0, 0, theme.sizes.padding, 0]} flex={false}>
          <Text center bold white h1>
            SWE.
          </Text>
        </Block>
        <Photo resizeMode="contain" size={350} height={250} image={logo} />
        <Text white center bold h3>
          find the best work environments to inspire you
        </Text>
      </Block>
      <Block margin={[theme.sizes.padding * 2, 0]} flex={false}>
        <Button color="secondary">
          <Block middle row flex={false}>
            <Photo
              size={20}
              height={20}
              image={facebook}
              style={{ marginRight: theme.sizes.caption }}
            />
            <Text center stylized>
              Continue with Facebook
            </Text>
          </Block>
        </Button>
        <Button onPress={onSignupClicked} color="tertiary">
          <Text center stylized>
            Sign Up
          </Text>
        </Button>
      </Block>
    </Block>
  );
}
