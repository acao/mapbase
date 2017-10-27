// @flow
export default () => null;

export function checkUri(networkInterface) {
  if (!isValidGraphcoolEndpoint(networkInterface._uri)) {
    console.error('Please specify a valid graphcool endpoint url for the network interface in src/root.js');
  }
}

function isValidGraphcoolEndpoint(uri: String) {
  const lastSlash: Int = uri.lastIndexOf('/');
  const projectId: String = uri.slice(lastSlash + 1, uri.length);

  return isCuid(projectId);
}

function isCuid(str) {
  return /^c[^\s-]{8,}$/.test(str);
}
