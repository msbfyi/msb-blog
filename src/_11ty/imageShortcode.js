import Image from '@11ty/eleventy-img';
import { generateHTML } from '@11ty/eleventy-img';

export const imageShortcode = async (
  relativeSrc,
  alt,
  className,
  widths = [null, 300, 800, 1280],
  formats = ['webp'],
  sizes = '(min-width: 100px)'
) => {
  const imageMetadata = await Image(relativeSrc, {
    widths,
    formats,
    outputDir: './_site/assets/images/generated/',
    urlPath: '/assets/images/generated/',
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
  };

  if (className) {
    imageAttributes['class'] = className;
  }

  return generateHTML(imageMetadata, imageAttributes);
};
