import React from 'react';
import { render } from 'react-dom';

import EmptyState, { Button } from '../src';

import EmptyStateImage from './img/EmptyState.png';
import EmptyStateImage2x from './img/EmptyState@2x.png';
import EmptyStateImage3x from './img/EmptyState@3x.png';

render(
  <EmptyState
    header={'header test'}
    image={{ x1: EmptyStateImage, x2: EmptyStateImage2x, x3: EmptyStateImage3x }}
    actions={[
      <Button>Another button thing</Button>
    ]}
  >
    <p>Teting this content</p>
  </EmptyState>,
  document.body);
