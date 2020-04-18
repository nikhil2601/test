import {
    SHADOW_UMBRA_OPACITY as umbra,
    SHADOW_PENUMBRA_OPACITY as penumbra,
    SHADOW_AMBIENT_OPACITY as ambient,
    SHADOW_RGB as rgb,
} from 'constants/shadows';

/**
 * Create a shadow consisting of `umbra`, `penumbra`, and an `ambient` light sources.
 *
 * @method createShadow
 * @see    {@link https://material.io/design/environment/light-shadows.html}
 * @param  {Array}      values  The list of shadows to create.
 * @return {string}             The constructed chadow
 */
export const createShadow = (...values) =>
    [
        `${values[0]}px ${values[1]}px ${values[2]}px ${values[3]}px rgba(${rgb}, ${umbra})`,
        `${values[4]}px ${values[5]}px ${values[6]}px ${values[7]}px rgba(${rgb}, ${penumbra})`,
        `${values[8]}px ${values[9]}px ${values[10]}px ${values[11]}px rgba(${rgb}, ${ambient})`,
    ].join(',');

/**
 * Create a list of shadows for the theme.
 *
 * @method createShadows
 * @return {Array}       The list of shadows
 */
export const createShadows = () => [
    'none',
    createShadow(0, 1, 3, 0, 0, 1, 1, 0, 0, 2, 1, -1),
    createShadow(0, 1, 5, 0, 0, 2, 2, 0, 0, 3, 1, -2),
    createShadow(0, 1, 8, 0, 0, 3, 4, 0, 0, 3, 3, -2),
    createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
    createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
    createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
    createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
    createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
    createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
    createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
    createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
    createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
    createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
    createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
    createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
    createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
    createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
    createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
    createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
    createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
    createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
    createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
    createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
    createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
];

/**
 * Create a list of directional shadows for the theme.
 * Shadows created for the following directions: `top` and `bottom`.
 *
 * @method createDirectionalShadows
 * @return {Object}                 The map of directional shadows.
 */
export const createDirectionalShadows = () => ({
    top: [
        'none',
        createShadow(0, -1, 3, 0, 0, -1, 1, 0, 0, -2, 1, -1),
        createShadow(0, -1, 5, 0, 0, -2, 2, 0, 0, -3, 1, -2),
        createShadow(0, -1, 8, 0, 0, -3, 4, 0, 0, -3, 3, -2),
        createShadow(0, -2, 4, -1, 0, -4, 5, 0, 0, -1, 10, 0),
        createShadow(0, -3, 5, -1, 0, -5, 8, 0, 0, -1, 14, 0),
        createShadow(0, -3, 5, -1, 0, -6, 10, 0, 0, -1, 18, 0),
        createShadow(0, -4, 5, -2, 0, -7, 10, 1, 0, -2, 16, 1),
        createShadow(0, -5, 5, -3, 0, -8, 10, 1, 0, -3, 14, 2),
        createShadow(0, -5, 6, -3, 0, -9, 12, 1, 0, -3, 16, 2),
        createShadow(0, -6, 6, -3, 0, -10, 14, 1, 0, -4, 18, 3),
        createShadow(0, -6, 7, -4, 0, -11, 15, 1, 0, -4, 20, 3),
        createShadow(0, -7, 8, -4, 0, -12, 17, 2, 0, -5, 22, 4),
        createShadow(0, -7, 8, -4, 0, -13, 19, 2, 0, -5, 24, 4),
        createShadow(0, -7, 9, -4, 0, -14, 21, 2, 0, -5, 26, 4),
        createShadow(0, -8, 9, -5, 0, -15, 22, 2, 0, -6, 28, 5),
        createShadow(0, -8, 10, -5, 0, -16, 24, 2, 0, -6, 30, 5),
        createShadow(0, -8, 11, -5, 0, -17, 26, 2, 0, -6, 32, 5),
        createShadow(0, -9, 11, -5, 0, -18, 28, 2, 0, -7, 34, 6),
        createShadow(0, -9, 12, -6, 0, -19, 29, 2, 0, -7, 36, 6),
        createShadow(0, -10, 13, -6, 0, -20, 31, 3, 0, -8, 38, 7),
        createShadow(0, -10, 13, -6, 0, -21, 33, 3, 0, -8, 40, 7),
        createShadow(0, -10, 14, -6, 0, -22, 35, 3, 0, -8, 42, 7),
        createShadow(0, -11, 14, -7, 0, -23, 36, 3, 0, -9, 44, 8),
        createShadow(0, -11, 15, -7, 0, -24, 38, 3, 0, -9, 46, 8),
    ],
    bottom: [
        'none',
        createShadow(0, 1, 3, 0, 0, 1, 1, 0, 0, 2, 1, -1),
        createShadow(0, 1, 5, 0, 0, 2, 2, 0, 0, 3, 1, -2),
        createShadow(0, 1, 8, 0, 0, 3, 4, 0, 0, 3, 3, -2),
        createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0),
        createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
        createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0),
        createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
        createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2),
        createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
        createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
        createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
        createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4),
        createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
        createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
        createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
        createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5),
        createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
        createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
        createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
        createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7),
        createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
        createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
        createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8),
        createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8),
    ],
});
