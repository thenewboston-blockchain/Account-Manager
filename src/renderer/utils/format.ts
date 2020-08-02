export const formatAddress = (ipAddress: string, port: number | string | null, protocol: string): string => {
  const formattedPort = port && port !== '80' ? `:${port}` : '';
  return `${protocol}://${ipAddress}${formattedPort}`;
};
