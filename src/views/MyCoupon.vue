<template>
  <div>
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openCouponModal">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
      </thead>
      <VueLoading  v-model:active="isLoading"/>
      <tbody>
      <tr v-for="(item, key) in coupons" :key="key">
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}%</td>
        <td>{{ date(item.due_date) }}</td>
        <td>
          <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
          <span v-else class="text-muted">未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm"
                    @click="openCouponModal(false, item)"
            >編輯</button>
            <button class="btn btn-outline-danger btn-sm"
                    @click="openDelCouponModal(item)"
            >刪除</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <couponModal :coupon="tempCoupon" ref="couponModal"
    @update-coupon="updateCoupon"/>
    <DelModal :item="tempCoupon" ref="delModal" @del-item="delCoupon"/>
  </div>
</template>

<script>
import CouponModal from '../components/couponModals.vue';
import DelModal from '../components/DelModals.vue';
import Cookies from 'js-cookie';
import axios from 'axios';
import { date } from '../methods/filters'
export default {
  components: { CouponModal, DelModal },
  props: {
    config: Object,
  },
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 1,
        percent: 100,
        code: '',
      },
      isLoading: false,
      isNew: false,
    };
  },
  methods: {
    date,
    openCouponModal(isNew, item) {
      this.isNew = isNew;
      if (this.isNew) {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
      } else {
        this.tempCoupon = { ...item };
      }
      this.$refs.couponModal.showModal();
    },
    openDelCouponModal(item) {
      this.tempCoupon = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.showModal();
    },
    async getCoupons() {
      this.isLoading = true;
      const apiPath = 'yusei-api';
      const token = Cookies.get('hexToken'); // 取得 token

      if (!token) {
        alert('尚未登入，請先登入');
        this.isLoading = false;
        return;
      }

      const url = `https://vue3-course-api.hexschool.io/api/${apiPath}/admin/coupons`;

      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          }
        });

        if (res.data.success) {
          this.coupons = res.data.coupons;
        } else {
          alert(res.data.message || '取得優惠券失敗');
          console.warn(res.data);
        }
      } catch (err) {
        console.error(err);
        alert('取得優惠券發生錯誤');
      } finally {
        this.isLoading = false;
      }
    },
    async updateCoupon(tempCoupon) {
      const token = Cookies.get('hexToken'); // 取得 token
      if (!token) {
        alert('尚未登入，請先登入');
        return;
      }

      const apiPath = 'yusei-api';
      let url = '';
      let method = '';

      if (this.isNew) {
        url = `https://vue3-course-api.hexschool.io/api/${apiPath}/admin/coupon`;
        method = 'post';
      } else {
        url = `https://vue3-course-api.hexschool.io/api/${apiPath}/admin/coupon/${tempCoupon.id}`;
        method = 'put';
      }

      try {
        const res = await axios({
          method: method,
          url: url,
          headers: {
            Authorization: token,
            'Content-Type': 'application/json'
          },
          data: { data: tempCoupon } // API 要求的格式
        });

        if (res.data.success) {
          this.$httpMessageState(res, this.isNew ? '新增優惠券' : '編輯優惠券');
          this.getCoupons();
          this.$refs.couponModal.hideModal();
        } else {
          alert(res.data.message || '操作失敗');
          console.warn(res.data);
        }
      } catch (err) {
        console.error(err);
        alert('操作發生錯誤');
      }
    },

    async delCoupon() {
      const token = Cookies.get('hexToken');
      if (!token) {
        alert('尚未登入，請先登入');
        return;
      }
      const apiPath = 'yusei-api';
      this.isLoading = true;
      try {
        const res = await axios.delete(
          `https://vue3-course-api.hexschool.io/api/${apiPath}/admin/coupon/${this.tempCoupon.id}`,
          { headers: { Authorization: token, 'Content-Type': 'application/json' } }
        );
        this.$httpMessageState(res, '刪除優惠券');
        this.$refs.delModal.hideModal();
        this.getCoupons();
      } catch (err) {
        console.error(err);
        alert('刪除優惠券發生錯誤');
      } finally {
        this.isLoading = false;
      }
    }
  },
  created() {
    this.getCoupons();
  },
};
</script>