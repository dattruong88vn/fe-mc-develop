import qs from 'qs';

// parse query params
export function parseQueryParams(location: any) {
  if (location && location.search) {
    const tmp = qs.parse(location.search.slice(1));
    const query: any = {};

    Object.keys(tmp).forEach((key) => {
      if (tmp[key] !== undefined) query[key] = tmp[key];
    });

    return query;
  }

  return {};
}

// stringify query params
export function stringifyQueryParams(query: any) {
  if (typeof query === 'object') {
    return `?${qs.stringify(query)}`;
  }

  return '?';
}
