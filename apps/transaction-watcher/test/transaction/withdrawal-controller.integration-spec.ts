import { TransactionFilterEntity } from '../../src/transaction/entities/transation-filter.entity';
import { SuperTestResponse, setupApp } from '../util/setupApp';

describe('Transaction', () => {
  it.only('Basic filter test', () => {
    return setupApp(async ({ app }) => {
      const data = {
        type: '2',
      };

      const response: SuperTestResponse<TransactionFilterEntity> = await app()
        .post('/api/transaction/filter')
        .send(data);
      const { statusCode, body } = response;
      expect(statusCode).toEqual(201);
      expect(body).toEqual(
        expect.objectContaining({
          type: '2',
          id: expect.any(String),
        }),
      );

      const deleteResult: SuperTestResponse<void> = await app()
        .delete(`/api/transaction/filter?id=${body.id}`)
        .send(data);

      expect(deleteResult.statusCode).toEqual(200);
    });
  });
});
