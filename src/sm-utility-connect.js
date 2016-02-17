class SmUtilityConnect {
  beforeRegister() {
    this.is = 'sm-utility-connect';

    this.properties = {

      value: {
        type: Object,
        notify: true
      },

      server: {
        type: String,
        value: simpla.config.server
      },

      key: String,

      api: {
        type: String,
        value: simpla.config.api
      },

      endpoint: {
        computed: '_computeEndpoint(server, key, api)'
      },

      token: String,
      headers: {
        computed: '_computeHeaders(token)'
      },

      activeSaveRequests: {
        type: Array,
        value: () => []
      },
      activeLoadRequests: {
        type: Array,
        value: () => []
      },

      saving: {
        type: Boolean,
        notify: true,
        value: false
      },

      loading: {
        type: Boolean,
        notify: true,
        value: false
      }
    };
  }

  load() {
    this.$.get.generateRequest();
  }

  save() {
    this.$.post.generateRequest();
  }

  _computeEndpoint(server, key, api) {
    return `${server}/projects/${api}/items/${key}`;
  }

  _computeHeaders(token) {
    return token ? {
      'Authorization': `bearer ${token}`
    } : {};
  }

  _savedHandler() {
    this.fire('saved', { value: this.value }, { bubbles: false });
  }

  _loadedHandler() {
    this.fire('loaded', { value: this.value }, { bubbles: false });
  }

  _errorHandler(event) {
    this.fire('error', event.detail);
  }
}

Polymer(SmUtilityConnect);
