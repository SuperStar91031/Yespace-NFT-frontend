import React from 'react';
import { LinearProgress } from '@mui/material';
import { LoaderWrapper } from 'components';

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>
);

export default Loader;
