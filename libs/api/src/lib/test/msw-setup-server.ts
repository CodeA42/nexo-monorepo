import { SetupServer, setupServer } from 'msw/node';

export const setupMswServer = (): SetupServer => {
  const server = setupServer();

  server.listen({
    onUnhandledRequest(request, print) {
      if (request.url.startsWith('http://127.0.0.1:')) {
        return;
      }

      print.warning();
    },
  });

  return server;
};
