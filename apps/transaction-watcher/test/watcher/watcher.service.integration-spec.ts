import { FilterEntity } from '../../src/watcher/entities/filter.entity';
import { SuperTestResponse, setupApp } from '../util/setupApp';

describe('WatcherService', () => {
  it('test', () => {
    return setupApp(async ({ app }) => {
      const data = {
        gasLimit: '1',
      };

      const response: SuperTestResponse<FilterEntity> = await app().post('/api/watcher/filter').send(data);
      const { statusCode, body } = response;
      expect(statusCode).toEqual(201);
      expect(body).toEqual(
        expect.objectContaining({
          gasLimit: '1',
          id: expect.any(String),
        }),
      );

      const deleteResult: SuperTestResponse<void> = await app().delete(`/api/watcher/filter?id=${body.id}`).send(data);

      expect(deleteResult.statusCode).toEqual(200);
    });
  });
});
