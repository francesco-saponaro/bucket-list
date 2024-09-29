import { useStoreLoader } from "@store/storeLoader";
import Loader from "@common/Loader";
import QueryLoader from "../app/loader";

export default () => {
  const { loader, isQuery } = useStoreLoader();

  return loader ? isQuery ? <QueryLoader /> : <Loader /> : null;
};
