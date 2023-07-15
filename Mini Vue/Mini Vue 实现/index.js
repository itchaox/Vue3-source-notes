/*
 * @Version    : v1.00
 * @Author     : itchaox
 * @Date       : 2023-07-15 13:13
 * @LastAuthor : itchaox
 * @LastTime   : 2023-07-15 14:27
 * @desc       :
 */
function createApp(App) {
  return {
    mount(selector) {
      const container = document.querySelector(selector);
      let isMounted = false;

      let oldVnode = null;
      watchEffect(() => {
        if (!isMounted) {
          oldVnode = App.render();
          mount(App.render(), container);
          isMounted = true;
        } else {
          let newVnode = App.render();
          debugger;
          patch(oldVnode, newVnode);
          oldVnode = newVnode;
        }
      });
    },
  };
}
