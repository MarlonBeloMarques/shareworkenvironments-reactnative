import React, { useState, useRef } from 'react';
import { Block, Text, Button, Input } from '../../elements';
import { theme } from '../../constants';

export default function SignupScreen(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef();

  function handleSubmit() {
    props.navigation.navigate('welcome');
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
      <Block center margin={[0, 0, theme.sizes.padding * 4, 0]} flex={false}>
        <Text center bold white h1>
          SWE.
        </Text>
      </Block>
      <Block flex={false}>
        <Input
          label="E-mail"
          defaultValue={email}
          onChangeText={setEmail}
          next
          submitEditing={() => passwordRef.current.focus()}
        />
        <Input
          secure
          label="Password"
          defaultValue={password}
          onChangeText={setPassword}
          reference={passwordRef}
          done
          submitEditing={handleSubmit}
        />
      </Block>
      <Block margin={[theme.sizes.padding * 2, 0]} flex={false}>
        <Button onPress={handleSubmit} color="secondary">
          <Text center stylized>
            Sign Up
          </Text>
        </Button>
      </Block>
    </Block>
  );
}
