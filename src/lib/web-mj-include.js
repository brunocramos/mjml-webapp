import axios from 'axios';

/**
 * Get list of requested includes from provided mjml content
 * @param content
 * @returns {Array}
 */
const getListOfIncludes = content => {
  const regex = /<mj-include path=\"(.*?)\" [^>]*\/>/gi;
  const includes = [];
  let match;
  while ((match = regex.exec(content)) != null) {
    includes.push(match[1]);
  }

  return includes;
};

/**
 * Loads single file
 * @param file
 */
const loadFile = file => {
  return axios.get(file);
};

/**
 * Fetch all files from list
 * @param includeList
 */
const loadFilesFromList = includeList => {
  const loadedIncludes = {};

  const includeListPromises = includeList
    .map(includeFile =>
      loadFile(includeFile)
        .then((res) => {
          loadedIncludes[includeFile] = res.data;
        }, err => {
          console.error(err);
        }));

  return  Promise.all(includeListPromises).then(() => {
    return Promise.resolve(loadedIncludes);
  }, () => {
    return Promise.reject();
  })
};

/**
 * Fill content with respective includes
 * @param content
 * @param includeListContent
 */
const fillContentWithFiles = (content, includeListContent) => {
  let newContent = content;
  for (const include in includeListContent) {
    const regex = new RegExp('<mj-include path=\"(' + include +')\" [^>]*\/>', 'gi');
    newContent = newContent.replace(regex, includeListContent[include]);
  }

  return newContent;
};

/**
 * Load all included contents into provided content
 * @param content
 * @returns {*}
 */
const loadContentIncludes = (content) => {
  const includeList = getListOfIncludes(content);

  // No file needed to be included, just return default content
  if (!includeList.length) return Promise.resolve(content);

  // Load files from list
  return loadFilesFromList(includeList)
    .then(includeListContent => {
      // Fill content with loaded files
      const newContent = fillContentWithFiles(content, includeListContent);

      // Check if there are still files needed to be included
      // TODO: In case of error, this will enter in an infinite loop. This is used for nested includes
      // if (getListOfIncludes(newContent).length > 0) {
      //   return loadContentIncludes(newContent);
      // }

      // Return generated content
      return Promise.resolve(newContent);
    }, (err) => {
      console.error(err);
      return Promise.resolve(content);
    });
};

export default loadContentIncludes;
