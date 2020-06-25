/* eslint-disable no-plusplus */
export const TARGET_HEIGHT = 100;
export const BORDER_OFFSET = 10;

function makeSmaller(image, amount) {
  amount = amount || 1;

  const newHeight = image.backgroundHeight - amount;
  image.backgroundWidth *= newHeight / image.backgroundHeight;
  image.backgroundHeight = newHeight;

  return image;
}

function getCumulativeWidth(images) {
  let width = 0;

  for (let i = 0; i < images.length; i++) {
    width += images[i].backgroundWidth;
  }

  width += (images.length - 1) * BORDER_OFFSET;

  return width;
}

function fitImagesInRow(images, maxWidth) {
  while (getCumulativeWidth(images) > maxWidth) {
    for (let i = 0; i < images.length; i++) {
      images[i] = makeSmaller(images[i]);
    }
  }

  return images;
}

export function processImages(photos) {
  return photos.map((photo) => {
    const aspectRatio = photo.backgroundWidth / photo.backgroundHeight;
    photo.backgroundWidth = TARGET_HEIGHT * aspectRatio;
    photo.backgroundHeight = TARGET_HEIGHT;
    return photo;
  });
}

export function buildRows(processedImages, maxWidth) {
  let currentRow = 0;
  let currentWidth = 0;
  const rows = [];
  processedImages.forEach((image) => {
    if (currentWidth >= maxWidth) {
      currentRow++;
      currentWidth = 0;
    }

    if (!rows[currentRow]) {
      rows[currentRow] = [];
    }

    rows[currentRow].push(image);
    currentWidth += image.backgroundWidth;
  });
  return rows;
}

export function normalizeRows(rows, maxWidth) {
  for (let i = 0; i < rows.length; i++) {
    rows[i] = fitImagesInRow(rows[i], maxWidth);

    const difference = maxWidth - getCumulativeWidth(rows[i]);
    const amountOfImages = rows[i].length;

    if (amountOfImages > 1 && difference < 10) {
      const addToEach = difference / amountOfImages;
      for (let n = 0; n < rows[i].length; n++) {
        rows[i][n].backgroundWidth += addToEach;
      }
      rows[i][rows[i].length - 1].backgroundWidth +=
        maxWidth - getCumulativeWidth(rows[i]);
    }
  }
  return rows;
}
