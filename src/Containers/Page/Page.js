import React from 'react';
import Fade from '@material-ui/core/Fade';
import { PAGE_TRANSITION_DURATION } from 'Constants';

export const Page = ({ children }) => (
  <Fade in timeout={PAGE_TRANSITION_DURATION}>
    {children}
  </Fade>
);
