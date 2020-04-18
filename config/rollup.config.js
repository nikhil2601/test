import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';
import json from 'rollup-plugin-json';
import nodeBuiltins from 'rollup-plugin-node-builtins';
import nodeGlobals from 'rollup-plugin-node-globals';
import nodeResolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import { minify } from 'uglify-es';
import { uglify } from 'rollup-plugin-uglify';

const pkg = require('../package.json');

const { name } = pkg;
const globals = {
    axios                  : 'axios',
    react                  : 'React',
    'popper.js'            : 'Popper',
    'react-dom'            : 'ReactDOM',
    'react-jsonschema-form': 'JSONSchemaForm',
    'styled-components'    : 'styled'
};
const external = [...Object.keys(globals)];
const nodeResolveOptions = {
    preferBuiltins: true,
    jsnext        : true
};
const nodeBuiltinsOptions = {
    // crypto: true
};
const includePathsOptions = {
    paths   : ['src/lib', 'node_modules'],
    external: []
};
const babelOptions = {
    exclude       : 'node_modules/**',
    runtimeHelpers: true
};
const commonjsOptions = {
    // ignoreGlobal: true,
    include     : 'node_modules/**',
    namedExports: {
        'node_modules/react-is/index.js'                    : ['isValidElementType'],
        'node_modules/react-text-mask/dist/reactTextMask.js': ['conformToMask']
    }
};
const uglifyOptions = {
    compress: {
        warnings   : false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false
    },
    output: {
        comments  : false,
        ascii_only: true
    },
    sourceMap: true
};
const getInput = type => {
    return 'src/lib/index.js';
};
const getFilename = (type, env) => {
    const fileName =
        type === 'lib' ? `${type}/umd/${name}.js` : `${type}/umd/${name}.components.js`;

    switch (env) {
    case 'prod':
        return fileName.replace('.js', '.production.min.js');
    default:
        return fileName.replace('.js', '.development.js');
    }
};
const onwarn = warning => {
    // Silence the `CIRCULAR_DEPENDENCY` warnings...
    if (warning.code === 'CIRCULAR_DEPENDENCY') return;
    // Log everything else
    console.warn(warning.message); // eslint-disable-line no-console
};

const rollup = [
    {
        input : getInput(),
        external,
        output: {
            exports  : 'named',
            file     : getFilename('lib'),
            format   : 'umd',
            globals,
            name,
            sourceMap: true
        },
        plugins: [
            json(),
            postcss(),
            babel(babelOptions),
            replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
            nodeResolve(nodeResolveOptions),
            commonjs(commonjsOptions),
            nodeGlobals(),
            nodeBuiltins(nodeBuiltinsOptions),
            includePaths(includePathsOptions)
        ],
        onwarn
    },
    {
        input : getInput(),
        external,
        output: {
            exports: 'named',
            file   : getFilename('lib', 'prod'),
            format : 'umd',
            globals,
            name
        },
        plugins: [
            json(),
            postcss(),
            babel(babelOptions),
            replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
            nodeResolve(nodeResolveOptions),
            commonjs(commonjsOptions),
            nodeGlobals(),
            nodeBuiltins(nodeBuiltinsOptions),
            includePaths(includePathsOptions),
            uglify(uglifyOptions, minify)
        ],
        onwarn
    },
    {
        input : getInput('components'),
        external,
        output: {
            exports  : 'named',
            file     : getFilename('components'),
            format   : 'umd',
            globals,
            name,
            sourceMap: true
        },
        plugins: [
            json(),
            postcss(),
            babel(babelOptions),
            replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
            nodeResolve(nodeResolveOptions),
            commonjs(commonjsOptions),
            nodeGlobals(),
            nodeBuiltins(nodeBuiltinsOptions),
            includePaths(includePathsOptions)
        ],
        onwarn
    },
    {
        input : getInput('components'),
        external,
        output: {
            exports: 'named',
            file   : getFilename('components', 'prod'),
            format : 'umd',
            globals,
            name
        },
        plugins: [
            json(),
            postcss(),
            babel(babelOptions),
            replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
            nodeResolve(nodeResolveOptions),
            commonjs(commonjsOptions),
            nodeGlobals(),
            nodeBuiltins(nodeBuiltinsOptions),
            includePaths(includePathsOptions),
            uglify(uglifyOptions, minify)
        ],
        onwarn
    }
];

export default rollup;
