/**
 * Open a new `window` and make an API request.
 *
 * @method openWindowWithApiRequest
 * @param  {string}                  [method='']  The API 'method'
 * @param  {string}                  [url='']     The API 'url'
 * @param  {Object}                  [params={}]  The API 'params'
 * @param  {string}                  [name='']    The name for the new `window`
 * @param  {Object}                  [options=''] The options for the new `window`
 */
export const openWindowWithApiRequest = ({
    method = '',
    url = '',
    params = {},
    name = '',
    options = '',
} = {}) => {
    // Create a dummy `form` element.
    const form = document.createElement('form');
    // Set some attributes on the `form` element.
    form.method = method;
    form.action = url;
    form.target = name;
    form.style.display = 'none';
    // For each of the `params`, we'll append a `hidden` input to the form.
    for (const param in params) {
        if (Object.prototype.hasOwnProperty.call(params, param)) {
            // Create an input field.
            const input = document.createElement('input');
            // Extract the curret value from the `params`.
            const value = params[param];
            // Add a `hidden` input for each of the params with some attributes.
            input.type = 'hidden';
            input.name = param;
            input.value = value;
            // Append the input to the form.
            form.appendChild(input);
        }
    }
    // Add the form to the current `document.body`.
    document.body.appendChild(form);
    // Open up a new window with a name and some options.
    window.open('', name, options);
    // Submit the form.
    form.submit();
    // Remove the form from the body after submission.
    document.body.removeChild(form);
};
