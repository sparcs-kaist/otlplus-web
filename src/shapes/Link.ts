interface DetailedLink {
  pathname?: string;
  search?: string;
  hash?: string;
  state?: object;
}

type Link = string | DetailedLink;

export default Link;
