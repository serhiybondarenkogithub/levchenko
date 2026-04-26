import "swiper/css";
import "../css/style.css";
import { createApp, reactive } from "petite-vue";
import clickOutside from "./directives/clickOutside";
import { storage } from "./storage";

import { A11y, Autoplay } from "swiper/modules";
import Swiper from "swiper";

storage.init();
storage.state = reactive(storage.state);

const app = createApp({ storage });

app.directive("click-outside", clickOutside);
app.mount();

new Swiper("[data-hero-swiper]", {
  modules: [Autoplay, A11y],
  // autoplay: { delay: 5000 },
  speed: 700,
  loop: true,
  spaceBetween: 18,
  a11y: true,
  breakpoints: {
    1160: {
      speed: 1000,
    },
  },
});
