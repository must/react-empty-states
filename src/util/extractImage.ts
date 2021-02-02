export type Image = {
  x1: string;
  x2?: string;
  x3?: string;
};

export const extractImage = (image: string | Image) => {
  if(typeof image === 'string') {
    return {
      src: image,
      srcset: `${image} 1x`
    };
  }

  let x2 = '';
  if(image.x2) {
    x2 = `, ${image.x2} 2x`;
  }

  let x3 = '';
  if(image.x3) {
    x3 = `, ${image.x3} 3x`;
  }

  return {
    src: image.x1,
    srcset: `${image.x1} 1x ${x2} ${x3}`
  };
};
