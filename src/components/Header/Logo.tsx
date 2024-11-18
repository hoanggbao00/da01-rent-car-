import React from 'react';
import { Text } from '@mantine/core';
import Link from 'next/link';
import { APP_NAME } from '@/consts';

export const Logo = () => {
  return (
    <Text
      component={Link}
      href="/"
      fz="lg"
      fw="bold"
    >
      {APP_NAME}
    </Text>
  );
};
