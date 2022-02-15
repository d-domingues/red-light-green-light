import { importMapsPlugin } from '@web/dev-server-import-maps';

const filteredLogs = ['Running in dev mode', 'lit-html is in dev mode'];

export default {
  files: 'test/test/**/*.test.js',
  nodeResolve: true,
  filterBrowserLogs(log) {
    for (const arg of log.args) {
      if (typeof arg === 'string' && filteredLogs.some((l) => arg.includes(l))) {
        return false;
      }
    }
    return true;
  },
  plugins: [
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {
            '/test/src/storage.js': '/test/test/storage.mock.js',
          },
        },
      },
    }),
  ],
};
