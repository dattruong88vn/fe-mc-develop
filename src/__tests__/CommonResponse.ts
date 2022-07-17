//Prepare the response we want to get from axios
export default function mockedResponse<T>(data: T) {
  return {
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {}
  };
}
