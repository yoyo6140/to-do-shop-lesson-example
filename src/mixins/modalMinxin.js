import Modal from 'bootstrap/js/dist/modal';

export default {
  methods: {
    showModal() {
      this.modal.show();
    },
    hideModal() {
      // 先把焦點移出 modal
      const activeEl = document.activeElement;
      if (this.$refs.modal.contains(activeEl)) {
        activeEl.blur();
      }

      this.modal.hide();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
