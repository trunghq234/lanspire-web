const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1890ff',
              '@link-color': '#1890ff',
              '@success-color': '#389e0d',
              '@warning-color': '#ffec3d',
              '@error-color': '#f5222d',
              '@font-size-base': '16px',
              '@font-size-lg': '16px',
              '@heading-color': 'rgba(0, 0, 0, 0.85)',
              '@text-color': '#3f506f',
              '@text-color-secondary': '#5e7ea9',
              '@disabled-color': 'rgba(0, 0, 0, 0.25)',
              '@border-radius-base': '6px',
              '@border-color-base': '#e0e0f3',
              '@box-shadow-base':
                'rgba(137, 172, 202, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
