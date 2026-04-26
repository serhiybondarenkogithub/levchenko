export default function clickOutside({ el, get }) {
  const listener = (e) => {
    if (e.defaultPrevented || (e.button !== undefined && e.button !== 0)) return;
    if (!el.contains(e.target)) {
      get();
    }
  };

  document.addEventListener("pointerdown", listener, true);

  return () => {
    document.removeEventListener("pointerdown", listener, true);
  };
}
