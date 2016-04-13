const uidDefaults = { type: String },
      savingDefaults = { type: Boolean, value: false, reflectToAttribute: true },
      loadingDefaults = { type: Boolean, value: false, reflectToAttribute: true }

export default function(connectId, uid = {}, saving = {}, loading = {}) {
  return {
    properties: {
      uid: Object.assign({}, uidDefaults, uid),
      saving: Object.assign({}, savingDefaults, saving),
      loading: Object.assign({}, loadingDefaults, loading)
    },

    created() {
      window.simpla.elements = window.simpla.elements || [];
      window.simpla.elements.push(this);
    },

    listeners: {
      [`${connectId}.saved`]: '_fireSaved',
      [`${connectId}.loaded`]: '_fireLoaded',
      [`${connectId}.error`]: '_fireError',
      [`${connectId}.error`]: '_removeValue'
    },

    save() {
      let previous,
          current;

      if (typeof this._toObject !== 'function') {
        console.warn(`${this.localName} must implement _toObject()`);
        return;
      }

      if (typeof this._equal !== 'function') {
        console.warn(`${this.localName} must implement _equal()`);
        return;
      }

      previous = this.$[connectId].value;
      current = this._toObject();

      if (!this._equal(current, previous)) {
        this.$[connectId].value = this._toObject();
        this.$[connectId].save();
        return true;
      }
      return false;
    },

    load() {
      this.$[connectId].load();
    },

    _fireSaved(event) {
      this.fire('saved', event.detail, { bubbles: false });
    },

    _fireLoaded(event) {
      this.fire('loaded', event.detail, { bubbles: false });
    },

    _fireError(event) {
      this.fire('error', event.detail, { bubbles: false });
    },

    _removeValue(event) {
      this.$[connectId].value = null;
    }
  };
};
