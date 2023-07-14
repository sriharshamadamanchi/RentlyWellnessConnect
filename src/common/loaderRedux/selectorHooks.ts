import { useSelector } from "react-redux";

export const useRefreshLoader = (): any => {

  return useSelector((store: any) => {
    return store.loader.loaders.RefreshDetails || { loading: false };
  });
};
