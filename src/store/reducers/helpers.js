export const clone = (item) => JSON.parse(JSON.stringify(item));

export const getDestructuredFiles = (folder, records = [], folders = []) => {
  folders.push(folder);
  const { children } = folder;
  if (children && children.records) {
    children.records.forEach((record) => records.push(record));
  }
  if (children && children.folders) {
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
      records: children.filter((child) => child.objectType === 'record')
    };
  });

  // user is a parent of a root folder,
  // so parentMap has a record with one item, which parent is a user
  const [rootFolder] = parentMap.get(userId);

  return rootFolder;
};
