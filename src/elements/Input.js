/* eslint-disable no-nested-ternary */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from './Text';
import Block from './Block';
import Button from './Button';
import { theme } from '../constants';

export default function Input(props) {
  const [isToggleSecure, setIsToggleSecure] = useState(false);

  function renderLabel() {
    const { label, error } = props;

    return (
      <Block padding={[0, 0, theme.sizes.base - 10, 4]} flex={false}>
        {label ? (
          <Text gray={!error} accent={error}>
            {label}
          </Text>
        ) : null}
      </Block>
    );
  }

  function renderToggle() {
    const { secure, rightLabel } = props;
    const { toggleSecure } = isToggleSecure;

    if (!secure) return null;

    return (
      <Button
        style={styles.toggle}
        onPress={() => setIsToggleSecure({ toggleSecure: !toggleSecure })}
      >
        {rightLabel || (
          <Icon
            color={theme.colors.white}
            size={theme.sizes.font * 1.35}
            name={!toggleSecure ? 'md-eye' : 'md-eye-off'}
          />
        )}
      </Button>
    );
  }

  function renderRight() {
    const { rightLabel, rightStyle, onRightPress } = props;

    if (!rightLabel) return null;

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}
      >
        {rightLabel}
      </Button>
    );
  }

  const {
    next,
    done,
    email,
    phone,
    number,
    secure,
    error,
    style,
    reference,
    box,
    value,
    defaultValue,
    onChangeText,
    submitEditing,
  } = props;
  const { toggleSecure } = isToggleSecure;
  const isSecure = toggleSecure ? false : secure;
  const inputStyles = [
    box
      ? { height, paddingTop: 12, paddingBottom: 12 }
      : { height: theme.sizes.base * 3 },
    styles.input,
    error && { borderColor: theme.colors.tertiary },
    style,
  ];

  const keyType = next ? 'next' : done ? 'done' : 'done';

  const inputType = email
    ? 'email-address'
    : number
    ? 'numeric'
    : phone
    ? 'phone-pad'
    : 'default';

  // eslint-disable-next-line no-unused-vars
  const [height, setHeight] = useState(theme.sizes.base * 3);

  return (
    <Block flex={false} margin={[theme.sizes.base / 1.5, 0]}>
      {renderLabel()}
      <TextInput
        value={value}
        style={inputStyles}
        secureTextEntry={isSecure}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={inputType}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        returnKeyType={keyType}
        onSubmitEditing={submitEditing}
        ref={reference}
        {...props}
      />
      {renderToggle()}
      {renderRight()}
    </Block>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.tertiary,
    borderRadius: theme.sizes.radius,
    fontSize: theme.sizes.font,
    color: theme.colors.white,
    paddingLeft: theme.sizes.base - 6,
    paddingRight: theme.sizes.base - 6,
  },
  toggle: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
    top: theme.sizes.base * 2.4,
    paddingRight: theme.sizes.base - 6,
    right: 0,
  },
});

Input.propTypes = {
  // eslint-disable-next-line react/require-default-props
  submitEditing: () => {},
};
