/* eslint-disable no-console, import/no-dynamic-require */

// Do this as the first thing so that any code reading it knows the right env.
// process.env.BABEL_ENV = 'production';
// process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
    throw err;
});

// Ensure environment variables are read.
require('../config/env');

const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
// const bfj = require('bfj');
const chalk = require('chalk');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const fs = require('fs-extra');
const path = require('path');
const printBuildError = require('react-dev-utils/printBuildError');
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
const webpack = require('webpack');
const { checkBrowsers } = require('react-dev-utils/browsersHelper');

const config = require('../config/webpack.config.demo');
const paths = require('../config/paths');

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;
const useYarn = fs.existsSync(paths.yarnLockFile);

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const isInteractive = process.stdout.isTTY;

// Warn and crash if required files are missing
// RAVEN: update with the demo index file
// if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
if (!checkRequiredFiles([paths.appDemoIndexJs])) {
    process.exit(1);
}

// Process CLI arguments
// const argv = process.argv.slice(2);
// const writeStatsJson = argv.indexOf('--stats') !== -1;

function copyPublicFolder() {
    fs.copySync(paths.appPublic, paths.appDemoBuild, {
        dereference: true,
        filter     : file => file !== paths.appHtml
    });
}

// We require that you explicitly set browsers and do not fall back to
// browserslist defaults.
checkBrowsers(paths.appPath, isInteractive)
    .then(() => {
        // First, read the current file sizes in build directory.
        // This lets us display how much they changed later.
        // RAVEN: update with demo build folder
        // return measureFileSizesBeforeBuild(paths.appBuild);
        return measureFileSizesBeforeBuild(paths.appDemoBuild);
    })
    .then(previousFileSizes => {
        // Remove all content but keep the directory so that
        // if you're in it, you don't end up in Trash
        // RAVEN: update with the demo build folder
        // fs.emptyDirSync(paths.appBuild);
        fs.emptyDirSync(paths.appDemoBuild);
        // Merge with the public folder
        copyPublicFolder();
        // Start the webpack build
        return build(previousFileSizes);
    })
    .then(
        ({ stats, previousFileSizes, warnings }) => {
            if (warnings.length) {
                console.log(chalk.yellow('Compiled with warnings.\n'));
                console.log(warnings.join('\n\n'));
                console.log(
                    '\nSearch for the ' +
                        chalk.underline(chalk.yellow('keywords')) +
                        ' to learn more about each warning.'
                );
                console.log(
                    'To ignore, add ' +
                        chalk.cyan('// eslint-disable-next-line') +
                        ' to the line before.\n'
                );
            } else {
                console.log(chalk.green('Compiled successfully.\n'));
            }

            console.log('File sizes after gzip:\n');
            printFileSizesAfterBuild(
                stats,
                previousFileSizes,
                // RAVEN: update with the demo build folder
                // paths.appBuild,
                paths.appDemoBuild,
                WARN_AFTER_BUNDLE_GZIP_SIZE,
                WARN_AFTER_CHUNK_GZIP_SIZE
            );
            console.log();

            const appPackage = require(paths.appPackageJson);
            const publicUrl = paths.publicUrl;
            const publicPath = config.output.publicPath;
            const buildFolder = path.relative(process.cwd(), paths.appDemoBuild);
            printHostingInstructions(appPackage, publicUrl, publicPath, buildFolder, useYarn);
        },
        err => {
            console.log(chalk.red('Failed to compile.\n'));
            printBuildError(err);
            process.exit(1);
        }
    )
    .catch(err => {
        if (err && err.message) {
            console.log(err.message);
        }
        process.exit(1);
    });

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
    // RAVEN: update console msg
    // console.log('Creating an optimized production build...');
    console.log('Creating an optimized build of the demo application...');

    let compiler = webpack(config);
    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            let messages;
            if (err) {
                if (!err.message) {
                    return reject(err);
                }
                messages = formatWebpackMessages({
                    errors  : [err.message],
                    warnings: []
                });
            } else {
                messages = formatWebpackMessages(
                    stats.toJson({ all: false, warnings: true, errors: true })
                );
            }
            if (messages.errors.length) {
                // Only keep the first error. Others are often indicative
                // of the same problem, but confuse the reader with noise.
                if (messages.errors.length > 1) {
                    messages.errors.length = 1;
                }
                return reject(new Error(messages.errors.join('\n\n')));
            }
            if (
                process.env.CI &&
                (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') &&
                messages.warnings.length
            ) {
                console.log(
                    chalk.yellow(
                        '\nTreating warnings as errors because process.env.CI = true.\n' +
                            'Most CI servers set it automatically.\n'
                    )
                );
                return reject(new Error(messages.warnings.join('\n\n')));
            }

            const resolveArgs = {
                stats,
                previousFileSizes,
                warnings: messages.warnings
            };
            // if (writeStatsJson) {
            //     return bfj
            //         .write(paths.appDemoBuild + '/bundle-stats.json', stats.toJson())
            //         .then(() => resolve(resolveArgs))
            //         .catch(error => reject(new Error(error)));
            // }

            return resolve(resolveArgs);
        });
    });
}
