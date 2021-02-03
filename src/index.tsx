import React, {ReactNode} from 'react';

import { extractImage, Image } from './util/extractImage';
import { Button } from './components/Button';

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

  return <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: '"Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif',
    }}
  >
    <img src={extractedImage.src} srcSet={extractedImage.srcset}></img>
    <h1>{header}</h1>
    {children}
    {actions.map((action, i) => <React.Fragment key={i}>{action}</React.Fragment>)}
  </div>;
})) as EmptyStateComponent;

EmptyState.Button = Button;

export default EmptyState;
