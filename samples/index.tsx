import React, { useState } from 'react';
import { render } from 'react-dom';

import EmptyState, { Button } from '../src';

import EmptyStateImage from './img/EmptyState.png';
import EmptyStateImage2x from './img/EmptyState@2x.png';
import EmptyStateImage3x from './img/EmptyState@3x.png';

import { useStream } from 'react-callbag-streams';
import { debounce, flatten, map, fromPromise, filter } from 'callbag-common';

import { pokeInfo, pokeList } from './pokeInfo';


function App() {
  const [q, setQ] = useState('');
  const [info, loading] = useStream(q,
    filter(q => q !== ''),
    debounce(200),
    map(query => fromPromise(pokeInfo(query))),
    flatten,
  );

  const [list, loadingList] = useStream(undefined,
    debounce(200),
    map(_ => fromPromise(pokeList())),
    flatten,
  );

  return <div>
    <input type='text'
      placeholder='pokemon name ...'
      onInput={e => setQ((e.target as any).value)}/>
    <br/>
    <div>
      {
        q === '' ?
          loadingList ?
            'loading ...' :
            <ul>
              { list?.results.map(result => <div key={result.name}>{result.name} {result.url}</div>) }
            </ul>
          : loading ?
            'loading ...' :
            info ?
              <div>{info?.height}</div>
              :
              <EmptyState
                header={'header test'}
                image={{ x1: EmptyStateImage, x2: EmptyStateImage2x, x3: EmptyStateImage3x }}
                actions={[
                  <Button>Another button thing</Button>
                ]}
              >
                <p>Teting this content</p>
              </EmptyState>
      }
    </div>
  </div>;
}

render(<App/>, document.body);
