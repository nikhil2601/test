/**
 * Determine the corresponding mimeType from the given file signature.
 * NOTE: You can call these 'MAGIC NUMBERS'...
 * NOTE: Read and add more file signatures as needed from the link down below.
 *
 * @see    {@link https://en.wikipedia.org/wiki/List_of_file_signatures}
 * @see    {@link https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern}
 * @see    {@link https://www.filesignatures.net/index.php?page=all}
 * @method _getMimeTypeFromSignature
 * @private
 * @param  {string}                  signature           The file signature
 * @param  {string}                  [nativeMimeType=''] The native OS derived mimeType
 * @return {string|boolean}
 */
function _getMimeTypeFromSignature(signature, nativeMimeType = '') {
    switch (signature) {
        case '25504446':
            return 'application/pdf';
        case '504B34':
            // 'application/docx' is simpler than saying...
            // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            return 'application/docx';
        case 'D0CF11E0':
            return 'application/msword';
        default:
            return nativeMimeType;
    }
}

/**
 * Get the mime-type for a given File.
 * NOTE: This func returns a Promise Object.
 * TODO: Write tests...
 *
 * Read the first four bytes of a file to determine the mime-type of the file.
 * This is more accurate way of determining the mime-type rather than just reading
 * the file extension, or the 'sometimes' supplied `file.type` property.
 *
 * NOTE: This method helps determine the 'spoofed' documents as well.
 * Since spoofing the `.ext` only changes the extension, not the binary data.
 *
 * @method getMimeTypeForFile
 * @param  {File}             file     The File object
 * @return {Promise}
 */
export function getMimeTypeForFile(file) {
    // If the file is not a real File, return right away.
    if (!(file instanceof File)) {
        return '';
    }
    // Create an empty `mime-type`
    let mimeType = '';
    // Create a new FileReader instance.
    const fileReader = new FileReader();
    // Return a Promise.
    return new Promise((resolve, reject) => {
        // Attach to the `onError` event, and reject the Promsie.
        fileReader.onerror = () => {
            // Abort reading the file.
            fileReader.abort();
            // Reject the promise.
            reject(new DOMException('Sorry, there seems to be a problem reading the file'));
        };
        // Attach to the `onLoadEnd` event, after successfully reading in a given file.
        fileReader.onloadend = function(evt) {
            // As long as the read request has not been completed,
            // read in the file and carry on...
            // `readyState` provides the current state of the reading operation.
            // `FileReader.DONE` is true when the entire read request has been completed.
            if (evt.target.readyState === FileReader.DONE) {
                // Create a TypedArray to read in the array buffer.
                // `TypedArray` is an array-like view of the underlying binary data buffer.
                // `Uint8Array` is a TypedArray representing 8-bit unsigned integers.
                const uint = new Uint8Array(evt.target.result);
                // Create a placeholder for all the bytes.
                const bytes = [];
                // For each of the bytes in the TypedArray,
                // convert them into hexadecimal format via `toString`.
                uint.forEach(byte => {
                    bytes.push(byte.toString(16));
                });
                // Finally join the hexadecimal list into a single string.
                const hex = bytes.join('').toUpperCase();
                // Determine the file type based on the generated hex value.
                mimeType = _getMimeTypeFromSignature(hex, file.type);
                // Resolve with the buffered mimeType
                resolve(mimeType);
            }
        };
        // We want to take the first 4 bytes of the file and read them in.
        const blob = file.slice(0, 4);
        // Read the first 4 (four) bytes in as an array buffer.
        fileReader.readAsArrayBuffer(blob);
    });
}
