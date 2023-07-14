export const loaderSelector = (name: string): any => (store: any) => {
  return store.loader.loaders[name] || { loading: false };
};
