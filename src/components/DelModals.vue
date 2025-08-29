<template>
  <div class="modal fade" id="delModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" ref="modal">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">
            <span>刪除 {{ item.title }}</span>
          </h5>
          <button type="button" class="btn-close"
                  @click="hideModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除 <strong class="text-danger">{{ item.title }}</strong> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" @click="hideModal">取消</button>
          <button type="button" class="btn btn-danger"
                  @click="$emit('del-item')">確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '../mixins/modalMinxin';
export default {
  name:'DelModal',
  props: {
    item: {},
  },
  data() {
    return {
      modal: '',
    };
  },
  mixins: [modalMixin],
  
};
</script>