import React from 'react';
import { Block, Text, Photo } from '../../elements';
import { theme } from '../../constants';
import { data } from '../../utils';

export default function WelcomeScreen(props) {
  return (
    // eslint-disable-next-line no-use-before-define
    <Block
      padding={[
        theme.sizes.base,
        theme.sizes.base * 2,
        0,
        theme.sizes.base * 2,
      ]}
    >
      <Block flex={false} center row>
        <Block>
          <Text h2 bold>
            SWE.
          </Text>
        </Block>
        <Block flex={false}>
          <Photo avatar image={data.user.avatar} />
        </Block>
      </Block>
    </Block>
  );
}
