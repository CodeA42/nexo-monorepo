import { SuperTestResponse, setupApp } from '../util/setupApp';

describe('WatcherService', () => {
  it('test', () => {
    return setupApp(async ({ app }) => {
      const data = {
        gasLimit: '1',
      };

      const response = await app().post('/api/watcher/filter').send(data);
      const { statusCode, text } = response;
      expect(statusCode).toEqual(201);
      expect(text).toBeString();

      const deleteResult: SuperTestResponse<void> = await app().delete(`/api/watcher/filter?id=${text}`).send(data);

      expect(deleteResult.statusCode).toEqual(200);
    });
  });
});
