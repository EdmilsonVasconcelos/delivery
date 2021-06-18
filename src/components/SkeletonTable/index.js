import React from 'react';

import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

export default function SkeletonTable() {
  return (
    <Box p={3}>
      <Skeleton height={50} />
      <Skeleton height={50} />
      <Skeleton height={50} />
      <Skeleton height={50} />
      <Skeleton height={50} />
      <Skeleton height={50} />
    </Box>
  );
}
