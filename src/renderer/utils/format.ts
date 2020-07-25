export const formatAddress = (ipAddress: string, port: string | null, protocol: string): string => {
  const formattedPort = port && port !== '80' ? `:${port}` : '';
  return `${protocol}://${ipAddress}${formattedPort}`;
};
