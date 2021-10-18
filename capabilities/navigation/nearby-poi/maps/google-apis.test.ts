import { nearbyPoiTest } from './nearby-poi';

nearbyPoiTest(
  'google-apis',
  {
    supertestHooks: {
      afterRecordingLoad: (scopes) => {
        scopes.forEach(scope => {
          scope.filteringPath(
            /key=[^&]*/g,
            'key=credentials-removed-to-keep-them-secure'
          );
        });
      }
    }
  }
);
