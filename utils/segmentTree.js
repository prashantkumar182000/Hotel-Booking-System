class SegmentTree {
    constructor(size) {
      this.size = size;
      this.tree = new Array(2 * size).fill(0);
    }
  
    update(index, value) {
      index += this.size;
      this.tree[index] = value;
      while (index > 1) {
        index >>= 1;
        this.tree[index] = Math.max(this.tree[2 * index], this.tree[2 * index + 1]);
      }
    }
  
    query(l, r) {
      l += this.size;
      r += this.size;
      let max = 0;
      while (l <= r) {
        if (l % 2 === 1) max = Math.max(max, this.tree[l++]);
        if (r % 2 === 0) max = Math.max(max, this.tree[r--]);
        l >>= 1;
        r >>= 1;
      }
      return max;
    }
  }
  
  module.exports = SegmentTree;