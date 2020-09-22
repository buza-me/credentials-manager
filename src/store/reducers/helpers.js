export const getDestructuredFiles = (folder, records = [], folders = []) => {
  folders.push(folder);
  const { children } = folder;
  if (children?.records) {
    children.records.forEach((record) => records.push(record));
  }
  if (children?.folders) {
    children.folders.forEach((item) => getDestructuredFiles(item, records, folders));
  }
  return { records, folders };
};

export const getStructuredFiles = ({ folders, records }) => {
  const { userId } = folders[0];
  // map of arrays of children, where keys are folder ids (parents),
  // and one key is userId:
  // user is a parent of a root folder
  const parentMap = new Map();

  [...folders, ...records].forEach((item) => {
    const childrenArray = parentMap.get(item.parentId) || [];
    childrenArray.push(item);
    parentMap.set(item.parentId, childrenArray);
  });

  folders.forEach((folder) => {
    const children = parentMap.get(folder._id) || [];
    folder = {
      folders: children.filter((child) => child.objectType === 'folder'),
      records: children.filter((child) => child.objectType === 'record'),
    };
  });

  // user is a parent of a root folder,
  // so parentMap has a record with one item, which parent is a user
  const [rootFolder] = parentMap.get(userId);

  return rootFolder;
};

export const swapChildInOneOfFolders = (folders, child) => {
  const folderIndex = folders.findIndex((folder) => folder._id === child.parentId);
  if (folderIndex > -1) {
    const collectionName = child.objectType === 'folder' ? 'folders' : 'records';
    const childIndex = folders[folderIndex].children[collectionName].findIndex(
      (item) => item._id === child._id
    );
    if (childIndex > -1) {
      folders[folderIndex].children[collectionName][childIndex] = child;
    } else {
      folders[folderIndex].children[collectionName].push(child);
    }
  }
};

export const collectAllRelativeFolders = (parent) => {
  let folders = [parent];

  if (parent?.children?.folders?.length) {
    parent.children.folders.forEach((folder) => {
      folders = [...folders, ...collectAllRelativeFolders(folder)];
    });
  }
  return folders;
};

export const deleteChildInOneOfFolders = (folders, child) => {
  const folderIndex = folders.findIndex((folder) => folder._id === child.parentId);
  if (folderIndex > -1) {
    const collectionName = child.objectType === 'folder' ? 'folders' : 'records';
    folders[folderIndex].children[collectionName] = folders[folderIndex].children[
      collectionName
    ].filter((item) => item._id !== child._id);
  }
};
