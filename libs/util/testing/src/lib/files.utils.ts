export const createFile = ({
  content = 'content',
  name = 'image.svg',
  type = 'image/svg+xml',
  lastModified = new Date().getTime(),
} = {}) => {
  return new File([content], name, {
    type,
    lastModified,
  });
};
