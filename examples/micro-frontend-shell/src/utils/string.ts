/**
 * Convert a string to its camelcase version.
 * @param str Input string.
 * @returns The camelcase version of the string.
 */
export const camelize = (str: string) => str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
