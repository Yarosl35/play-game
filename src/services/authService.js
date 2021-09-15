export const isUnauthorized = (message) => {
  return (
    message.indexOf('JsonWebTokenError') > -1 ||
    message.indexOf('tokenError') > -1
  );
}