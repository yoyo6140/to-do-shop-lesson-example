<template>
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel"  ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>訂單細節</span>
          </h5>
          <button type="button" class="btn-close"
                  @click="hideModal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-4">
              <h3>用戶資料</h3>
              <table class="table">
                <tbody v-if="tempOrder.user">
                  <tr>
                    <th style="width: 100px;">姓名</th>
                    <td>{{ tempOrder.user.name }}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{{ tempOrder.user.email }}</td>
                  </tr>
                  <tr>
                    <th>電話</th>
                    <td>{{ tempOrder.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>地址</th>
                    <td>{{ tempOrder.user.address }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-8">
              <h3>訂單細節</h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th style="width: 100px">訂單編號</th>
                    <td>{{ tempOrder.id }}</td>
                  </tr>
                  <tr>
                    <th>下單時間</th>
                    <td>{{ tempOrder.create_at ? $filters.date(tempOrder.create_at) : '-' }}</td>
                  </tr>
                  <tr>
                    <th>付款時間</th>
                    <td>
                      <span v-if="tempOrder.paid_date">
                        {{ $filters.date(tempOrder.paid_date) }}
                      </span>
                      <span v-else>時間不正確</span>
                    </td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <strong v-if="tempOrder.is_paid" class="text-success">已付款</strong>
                      <span v-else class="text-muted">尚未付款</span>
                    </td>
                  </tr>
                  <tr>
                    <th>總金額</th>
                    <td>{{ tempOrder.create_at ? formatDate(tempOrder.create_at) : '-' }}</td>
                  </tr>
                </tbody>
              </table>
              <h3>選購商品</h3>
              <table class="table">
                <thead>
                  <tr>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in tempOrder.products" :key="item.id">
                    <th>
                      {{ item.product.title }}
                    </th>
                    <td>
                      {{ item.qty }} / {{ item.product.unit }}
                    </td>
                    <td class="text-end">
                      {{ $filters.currency(item.final_total) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary"
                  @click="hideModal">取消
          </button>
          <button type="button" class="btn btn-primary"
                  @click="$emit('update-order', tempOrder)">確認</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'orderModal',
  props: {
    order: {
      type: Object,
      default() { return {}; },
    },
  },
  data() {
    return {
      status: {},
      modal: '',
      tempOrder: {
        products: [],
        user: null,
    },
      isPaid: false,
    };
  },
  emits: ['update-product'],
  inject: ['emitter'],
  watch: {
    order() {
        // ✅ 複製 props，避免直接修改 props
        this.tempOrder = { 
        ...this.order,
        products: this.order.products || [],  // 確保 products 是陣列
        user: this.order.user || null,       // 確保 user 有值或 null
        };
        this.isPaid = this.tempOrder.is_paid;
    
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return '-';
      return new Date(date).toLocaleString();
    },
    formatCurrency(value) {
      if (value == null) return '-';
      return new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD' }).format(value);
    },
  },
  
};
</script>