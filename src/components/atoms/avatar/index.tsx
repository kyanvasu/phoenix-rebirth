import classNames from 'classnames';
import React from 'react';
import { AvatarTypes } from '../../../model/types';
import { BaseTheme } from '../../../theme';


export type AvatarSize = 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';

interface Props {
  size: AvatarSize;
  name?: string;
  src?: string;
  alt?: string;
  theme?: AvatarTypes;
}

export function Avatar(props: Props) {
  const { size, alt, name, src, theme } = props;
  const styles = theme || BaseTheme.avatar;
  return (
    <div
      className={classNames(
        styles.container,
        styles[size],
        {
          [styles.default]: !src,
        }
      )}
    >
      {src ? (
        <img
          className={classNames(styles.img, styles[size])}
          src={src}
          alt={alt}
        />
      ) : (
        name?.charAt(0)
      )}
    </div>
  );
}
