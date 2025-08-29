<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <!-- 上一頁 -->
      <li class="page-item" :class="{ disabled: !pages.has_pre }">
        <button class="page-link" @click="changePage(pages.current_page - 1)">上一頁</button>
      </li>

      <!-- 頁碼 -->
      <li 
        class="page-item" 
        v-for="page in pages.total_pages" 
        :key="page" 
        :class="{ active: page === pages.current_page }"
      >
        <button class="page-link" @click="changePage(page)">{{ page }}</button>
      </li>

      <!-- 下一頁 -->
      <li class="page-item" :class="{ disabled: !pages.has_next }">
        <button class="page-link" @click="changePage(pages.current_page + 1)">下一頁</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'UsePagination',
  props: {
    pages: {
      type: Object,
      required: true,
      default: () => ({
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false
      })
    }
  },
  methods: {
    changePage(page) {
      if (page < 1 || page > this.pages.total_pages) return;
      this.$emit('emit-pages', page); // 發送頁碼給父組件
    }
  }
}
</script>
