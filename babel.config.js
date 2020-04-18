/**
 * Configure @babel v7 options.
 *
 * @method configureBabel
 * @see    {@link https://babeljs.io/docs/en/config-files#config-function-api}
 * @param  {Object}       [api={}] The @babel api
 * @return {Object}                The babel config
 */
function configureBabel(api = {}) {
    // Turn on Cache.
    // @see {@link https://stackoverflow.com/a/51037631}
    // @see {@link https://babeljs.io/docs/en/config-files#apicache}
    api.cache && api.cache(true);
    // Extract some environment variables.
    const NODE_ENV = process.env.NODE_ENV;
    const BABEL_ENV = process.env.BABEL_ENV;
    const WP_ENV = process.env.WP_ENV;
    // Determine the current environment.
    const isBabelEnvEs = BABEL_ENV === 'esm';
    const isBabelEnvModules = BABEL_ENV === 'modules';
    const isWebpackEnvBuild = WP_ENV === 'build';
    const isBabelEnvUmd = BABEL_ENV === 'umd';
    const isEnvDevelopment = NODE_ENV === 'development';
    const isEnvProduction = NODE_ENV === 'production';
    const isEnvTest = NODE_ENV === 'test';
    // Define the plugins for @babel.
    const plugins = [
        '@babel/plugin-transform-destructuring',
        [
            '@babel/plugin-proposal-class-properties',
            {
                loose: true
            }
        ],
        [
            '@babel/plugin-proposal-decorators',
            {
                decoratorsBeforeExport: true
            }
        ],
        [
            '@babel/plugin-proposal-object-rest-spread',
            {
                useBuiltIns: true
            }
        ],
        '@babel/plugin-transform-runtime',
        isEnvProduction && [
            'transform-react-remove-prop-types',
            {
                mode: 'wrap'
            }
        ],
        '@babel/plugin-syntax-dynamic-import',
        'dynamic-import-node',
        [
            'babel-plugin-styled-components',
            {
                displayName              : true,
                fileName                 : true,
                minify                   : true,
                transpileTemplateLiterals: true
            }
        ],
        [
            'module-resolver',
            {
                alias: {
                    constants : './src/constants',
                    demo      : './src/demo',
                    lib       : './src/lib',
                    'pep-comp'   : './src',
                    utils     : './src/utils'
                }
            }
        ]
    ].filter(Boolean);
    // Define the presets for @babel.
    const presets = [
        isEnvTest && [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        (isEnvProduction || isEnvDevelopment) &&
            !isBabelEnvEs && [
            '@babel/preset-env',
            {
                targets: {
                    ie: 9
                },
                ignoreBrowserslistConfig: true,
                modules                 :
                        isBabelEnvModules || isBabelEnvUmd || isWebpackEnvBuild
                            ? false
                            : 'commonjs',
                useBuiltIns: 'entry',
                corejs     : '^2.6.5'
            }
        ],
        [
            '@babel/preset-react',
            {
                development: isEnvDevelopment || isEnvTest,
                useBuiltIns: true
            }
        ]
    ].filter(Boolean);
    // Update @babel settings for production.
    if (NODE_ENV === 'production') {
        // Replace `.scss` extensions to `.css`.
        // NOTE: We're hacking this due to webpack prod build
        // also requiring our `babel.config.js` file, and we need
        // a way to not include this 'babel-plugin-replace-imports'
        // when we're building with Webpack.
        !isWebpackEnvBuild &&
            plugins.push([
                'babel-plugin-replace-imports',
                {
                    test    : /\.scss$/i,
                    replacer: '.css'
                }
            ]);
    }
    // Return the plugins and presets from this func invocation
    return {
        plugins,
        presets
    };
}

/**
 * Export out the `configureBabel` function as the default export.
 *
 * @type {Function}
 */
module.exports = configureBabel;
