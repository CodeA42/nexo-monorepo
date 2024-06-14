import { WatcherService } from '../../src/watcher/watcher.service';
import { setupApp } from '../util/setupApp';

describe('WatcherService', () => {
  it('test', () => {
    return setupApp(async ({ nestApp }) => {
      const watcherService = nestApp.get(WatcherService);

      const result = await watcherService.track();

      console.log(result);
    });
  });
});
