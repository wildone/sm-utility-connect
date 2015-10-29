class SmConnectApi {
  beforeRegister() {
    this.is = 'sm-connect-api';

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
      endpoint: {
        computed: '_computeEndpoint(server, key)'
      },

      api: {
        type: String,
        value: simpla.config.api
      },
      params: {
        computed: '_computeParams(api)'
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

  _computeEndpoint(server, key) {
    return `${server}/items/${key}`;
  }

  _computeParams(api) {
    return { api };
  }

  _computeHeaders(token) {
    return token ? {
      'Authorization': `bearer ${token}`
    } : {};
  }

  _savedHandler() {
    this.fire('saved', { value: this.value });
  }

  _loadedHandler() {
    this.fire('loaded', { value: this.value });
  }

  _errorHandler(event) {
    this.fire('error', event.detail);
  }
}

Polymer(SmConnectApi);
