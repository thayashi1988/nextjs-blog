import type { VFC } from 'react';
import crypto from 'crypto';

export const GravatarPath: any = (string: string) => {
  const lowerCaseString = string.trim().toLowerCase();
  const md5 = crypto.createHash('md5');
  const digest = md5.update(lowerCaseString, 'binary').digest('hex');
  return `https://www.gravatar.com/avatar/${digest}/?d=robohash`;
};
// https://www.gravatar.com/avatar/4f83492f4b7fc4c920e857b364eb3bd2/?d=robohash
// 88eda924d0f8665078ea0d5d04f58c7b
