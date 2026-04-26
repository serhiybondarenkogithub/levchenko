const KEY = "hh_shop";

export const storage = {
  state: { cart: [], likes: [] },

  load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;

      const data = JSON.parse(raw);
      Object.assign(this.state, data);
    } catch (e) {
      console.log(`Bad ${KEY} JSON`, e);
    }
  },

  save() {
    localStorage.setItem(KEY, JSON.stringify(this.state));
  },

  init() {
    if (!localStorage.getItem(KEY)) this.save();
    this.load();

    window.addEventListener("storage", (e) => {
      if (e.key === KEY && e.newValue) {
        try {
          Object.assign(this.state, JSON.parse(e.newValue));
        } catch {}
      }
    });
  },

  addToCart(item, delta = 1) {
    const existing = this.state.cart.find((i) => i.id === item.id);
    if (existing) {
      existing.qty += delta;
      if (existing.qty <= 0) this.removeFromCart(item.id);
    } else {
      this.state.cart.push({ ...item, qty: Math.max(1, delta) });
    }
    this.save();
  },

  removeFromCart(id) {
    this.state.cart = this.state.cart.filter((i) => i.id !== id);
    this.save();
  },
  cartQty() {
    return this.state.cart.reduce((sum, i) => sum + i.qty, 0);
  },
  itemQty(id) {
    return this.state.cart.find((i) => i.id === id)?.qty || 0;
  },
  _addToLikes(item) {
    this.state.likes.push(item);
    this.save();
  },
  _removeFromLikes(id) {
    this.state.likes = this.state.likes.filter((i) => i.id !== id);
    this.save();
  },
  toggleLike(item) {
    if (this.hasLike(item.id)) this._removeFromLikes(item.id);
    else this._addToLikes(item);
  },
  countLikes() {
    return this.state.likes?.length;
  },
  hasLike(id) {
    return this.state.likes.some((i) => i.id === id);
  },
};
