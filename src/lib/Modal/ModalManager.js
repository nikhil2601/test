/**
 * A simple Modal Manager which provides proper state management for modals.
 */
class ModalManager {
    constructor() {
        // Construct an empty list of modals
        this.modals = [];
    }

    /**
     * Get the current list of modals from the manager
     *
     * @method getModals
     * @return {Array}   The list of modals
     */
    getModals = () => this.modals;

    /**
     * Add a new modal to the current list of modals
     *
     * @method add
     * @param  {Object} modal The modal to add
     */
    add = modal => {
        if (this.modals.indexOf(modal) === -1) {
            this.modals.push(modal);
        }
    };

    /**
     * Remove a modal from the current list of modals
     *
     * @method remove
     * @param  {Object} modal The modal to remove
     */
    remove = modal => {
        const idx = this.modals.indexOf(modal);

        if (idx !== -1) {
            this.modals.splice(idx, 1);
        }
    };

    /**
     * Determine if the passed-in modal is currently the top-most modal
     *
     * @method isTopModal
     * @param  {Object}   modal The modal to check
     * @return {boolean}        Is it the top most modal
     */
    isTopModal = modal =>
        Boolean(this.modals.length && this.modals[this.modals.length - 1] === modal);
}

export default ModalManager;
