import ky from "ky/umd";
const fetcher = (path: string) => ky.get(path).json();

export default fetcher;
