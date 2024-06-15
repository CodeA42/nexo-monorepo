import { WithdrawalFilterEntity } from '../../src/withdrawal/entities/withdrawal-filter.entity';
import { SuperTestResponse, setupApp } from '../util/setupApp';

describe('Withdrawal', () => {
  it('Basic filter test', () => {
    return setupApp(async ({ app }) => {
      const data = {
        amount: '2',
      };

      const response: SuperTestResponse<WithdrawalFilterEntity> = await app().post('/api/withdrawal/filter').send(data);
      const { statusCode, body } = response;
      expect(statusCode).toEqual(201);
      expect(body).toEqual(
        expect.objectContaining({
          amount: '1',
          id: expect.any(String),
        }),
      );

      const deleteResult: SuperTestResponse<void> = await app()
        .delete(`/api/withdrawal/filter?id=${body.id}`)
        .send(data);

      expect(deleteResult.statusCode).toEqual(200);
    });
  });
});
