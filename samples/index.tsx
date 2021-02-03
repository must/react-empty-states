import React, { useState } from 'react';
import { render } from 'react-dom';

import EmptyState, { Button } from '../src';

import EmptyStateImage from './img/EmptyState.png';
import EmptyStateImage2x from './img/EmptyState@2x.png';
import EmptyStateImage3x from './img/EmptyState@3x.png';

import { useStream } from 'react-callbag-streams';
import { debounce, flatten, map, fromPromise, filter } from 'callbag-common';

import { pokeInfo, pokeList } from './pokeInfo';

import styles from './styles/App.module.scss';

import { AiOutlineClear } from 'react-icons/ai';

function App() {
  const [q, setQ] = useState('');
  const [info, loading] = useStream(q,
    filter(q => q !== ''),
    debounce(200),
    map(query => fromPromise(pokeInfo(query.toLocaleLowerCase()))),
    flatten,
  );

  const [list, loadingList] = useStream(undefined,
    debounce(200),
    map(_ => fromPromise(pokeList())),
    flatten,
  );

  return <div className={styles.App}>
    <div className={styles.SearchContainer}>
      <input type='text'
        className={styles.SearchBar}
        placeholder='pokemon name ...'
        value={q}
        onInput={e => setQ((e.target as any).value)}/>
      <div
        onClick={() => setQ('')}
        className={styles.ClearAction}
      ><AiOutlineClear/></div>
    </div>
    <br/>
    <div className={styles.ResultsContainer}>
      {
        q === '' ?
          loadingList ?
            'loading a list of Pokemons ...' :
            <ul className={styles.PokeList}>
              { list?.results.map(result =>
                <li key={result.name} onClick={() => setQ(result.name)}>{result.name}</li>
              )}
            </ul>
          : loading ?
            `searching for a Pokemon with the name "${q}"...` :
            info ?
              <div>
                Found your Pokemon "{info?.name}"! It has a height of {info?.height} and the following abilities:
                <ul>
                  {info.abilities.map(ability => <li>{ability.ability.name} at slot {ability.slot}</li>)}
                </ul>
              </div>
              :
              <EmptyState
                header={'We couldn\'t find it :('}
                image={{ x1: EmptyStateImage, x2: EmptyStateImage2x, x3: EmptyStateImage3x }}
                actions={[
                  <Button onClick={() => setQ('')}>Go back to the list of Pokemons</Button>,
                  <Button onClick={() => setQ(list?.results[Math.floor(Math.random() * list.results.length)].name)}>Or try out a random one!</Button>
                ]}
              >
                <p>We have searched hard for a Pokemon with the name "{q}" but to no avail :/</p>
              </EmptyState>
      }
    </div>
  </div>;
}

render(<App/>, document.body);
