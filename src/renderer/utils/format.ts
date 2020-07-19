export const formatAddress = (ipAddress: string, port: string|null, protocol:string) => {
  const _port = (port && port !== '80') ? `:${port}` : '';
  return `${protocol}://${ipAddress}${_port}`;
}
