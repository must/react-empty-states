import React, {ReactNode} from 'react';

import { extractImage, Image } from './util/extractImage';
import { Button } from './components/Button';
import styles from './EmptyState.module.scss';


export { Button } from './components/Button';
export { Image } from './util/extractImage';

export type EmptyStateProps = {
  header: string;
  image: string | Image;
  actions: ReactNode[];
};

export type SubComponents = {
  Button: typeof Button;
}

type EmptyStateComponent = React.FC<EmptyStateProps> & SubComponents;

const EmptyState: EmptyStateComponent = ((({
  header, image,
  children, actions
}) => {
  const extractedImage = extractImage(image);

  return <div className={styles.EmptyState}>
    <img src={extractedImage.src} srcSet={extractedImage.srcset}></img>
    <h1>{header}</h1>
    {children}
    <div className={styles.Actions}>
      {actions.map((action, i) => <React.Fragment key={i}>{action}</React.Fragment>)}
    </div>
  </div>;
})) as EmptyStateComponent;

EmptyState.Button = Button;

export default EmptyState;
