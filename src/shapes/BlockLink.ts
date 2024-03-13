interface DetailedLink {
  pathname?: string;
  search?: string;
  hash?: string;
  state?: object;
}

type BlockLink = string | DetailedLink;

export default BlockLink;
