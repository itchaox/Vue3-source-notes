/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-07-12 15:54
 * @LastAuthor : wangchao
 * @LastTime   : 2023-07-12 16:31
 * @desc       : 渲染器实现
 */

/**
 * 1. h 函数
 * 2. mount 函数
 */

function h(tag, props, children) {
  return {
    tag,
    props,
    children,
  };
}

function mount(vnode, container) {
  // 1. 准备 el 元素
  const el = document.createElement(vnode.tag);

  // 2. props 处理
  for (let key in vnode.props) {
    const value = vnode.props[key];
    //TODO: 区分事件与属性
    el.setAttributer(key, value);
  }

  // 3. children 处理
  if (typeof vnode.children === 'string') {
    el.textContent = vnode.children;
  } else {
    for (let child of vnode.children) {
      mount(child, el);
    }
  }

  container.appendChild(el);
}
