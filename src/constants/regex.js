/**
 * RegExp map to validate given strings.
 *
 * @type {Object}
 */
export const REGEX_VALIDATE = {
    // Matches any letter, digit or underscore.
    // Equivalent to [a-zA-Z0-9_]
    ALPHANUMERIC: RegExp(`^[\\w ]*$`),
    // Validates an email subject field.
    // Accepted: alphanumeric, space, - : ' " , . ( ) [ ] { } _ % # ? ! $ ^ & *
    EMAIL_SUBJECT: RegExp(
        `^[\\w \\-\\:\\'\\"\\,\\.\\(\\)\\[\\]\\{\\}\\_\\%\\#\\?\\!\\$\\^\\&\\*]*$`
    ),
    // Validates an email name field.
    // Accepted: alphanumeric, space, - ' " , ( ) [ ] { } _ .
    EMAIL_NAME: RegExp(`^[\\w \\-\\'\\"\\,\\(\\)\\[\\]\\{\\}\\_\\.]*$`),
    // Validates an email description field.
    // Accepted: alphanumeric, space, - ' " , ( ) [ ] { } _ .
    EMAIL_DESCRIPTION: RegExp(`^[\\w \\-\\'\\"\\,\\(\\)\\[\\]\\{\\}\\_\\.]*$`),
    // Validates an email note (text-area) field.
    // Accepted: alphanumeric, space, - ' " , ( ) [ ] { } _ . ; / \ | + = % # ? ! $ ^ & *
    EMAIL_NOTE: RegExp(
        `^[\\w \\n\\-\\'\\"\\,\\(\\)\\[\\]\\{\\}\\_\\.\\;\\/\\\\|\\+\\=\\%\\#\\?\\!\\$\\^\\&\\*]*$`
    ),
    WHOLE_NUMBER: RegExp(`^\\d+$`),
};
