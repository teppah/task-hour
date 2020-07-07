const fetcher = (path: string) => fetch(path).then((r) => r.json());

export default fetcher;
