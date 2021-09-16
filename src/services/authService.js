export const isUnauthorized = (message) => {
  return (
    message.indexOf('JsonWebTokenError') > -1 ||
    message.indexOf('tokenError') > -1
  );
}

export const isNetworkError = (message) => {
  return (
    message.indexOf('xhr poll error') > -1
  );
}