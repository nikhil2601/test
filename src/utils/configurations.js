import { get, isEmpty } from 'utils';
/**
 * Determine if a `sku` exists in a given confiuration.
 *
 * @method configContainsSku
 * @param  {Object}          [config={}]       The configuration
 * @param  {string}          skuKeyToFind      The sku key to find
 * @param  {boolean}         [returnSku=false] Should we return the found sku?
 * @return {boolean|Object}
 */

export function configContainsSku(config = {}, skuKeysToFind = [], returnSkusList = false) {
    let skusList = get(config, 'skus', []);
    // Test if the skus list is an array.
    skusList = Array.isArray(skusList) ? [...skusList] : [];
    // If skusList is empty, then obviously the config doesn't contain the desired sku.
    if (isEmpty(skusList)) {
        return returnSkusList ? [] : false;
    }
    // Find the desired skus.
    const skusFound = skusList.filter(sku => skuKeysToFind.includes(sku.skuKey));
    // Return a boolean vs a list.
    return returnSkusList ? skusFound : !isEmpty(skusFound);
}
