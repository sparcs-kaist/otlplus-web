interface linkObject {
  pathname?: string;
  search?: string;
  hash?: string;
  state?: object;
}

type link = string | linkObject;

export default link;
