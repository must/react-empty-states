import React from 'react';
import { render } from 'react-dom';
import { should } from 'chai';
import register from 'jsdom-global';
import {shallow} from 'enzyme';

import EmptyState from '../index';
import { EmptyImage } from './util/EmptyImage';


import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from '../components/Button';

configure({ adapter: new Adapter() });

should();

describe('EmptyState', () => {
  beforeEach(function() {
    this.clean = register('<div id="root"/>');
  });

  afterEach(function() {
    this.clean();
  });

  it('should display the header.', () => {
    render(<EmptyState
      header='hola'
      image={EmptyImage}
      actions={[]}
    ></EmptyState>, document.getElementById('root'));

    document.body.textContent!.should.equal('hola');
  });

  it('should display the correct image.', () => {
    const emptyState = shallow(<EmptyState
      header=''
      image={EmptyImage}
      actions={[]}
    ></EmptyState>);

    emptyState.find('img').prop('src')?.should.equal(EmptyImage);
  });

  it('should display the correct action elements.', () => {
    const action1 = <Button>Action 1</Button>;
    const action2 = <Button>Action 2</Button>;
    const emptyState = shallow(<EmptyState
      header=''
      image={EmptyImage}
      actions={[action1, action2]}
    ></EmptyState>);

    emptyState.find('Button').at(0).prop('children')!.should.equal('Action 1');
    emptyState.find('Button').at(1).prop('children')!.should.equal('Action 2');
  });
});
