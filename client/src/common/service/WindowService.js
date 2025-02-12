const Window = {
  /**
   * Only "auto" | "instant" | "smooth"
   * @param {*} behavior
   */
  scrollToTop: (behavior = "instant") => {
    window.scrollTo({
      top: 0,
      behavior: behavior,
    });
  },
};

export default Window;
