/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-07-12 15:54
 * @LastAuthor : itchaox
 * @LastTime   : 2023-07-13 23:29
 * @desc       : 渲染器实现
 */

/**
 * 1. h 函数
 * 2. mount 函数
 */

// generate vnode
function h(tag, props, children) {
  return {
    tag,
    props,
    children,
  };
}

// mount vnode
function mount(vnode, container) {
  // 1. prepare element
  const el = (vnode.el = document.createElement(vnode.tag));

  // 2. resolve props
  for (let key in vnode.props) {
    const value = vnode.props[key];
    //TODO: Distinguish between events and properties
    el.setAttribute(key, value);
  }

  // 3. resolve children
  if (typeof vnode.children === 'string') {
    el.textContent = vnode.children;
  } else {
    for (let child of vnode.children) {
      mount(child, el);
    }
  }

  container.appendChild(el);
}

// compare vnode
function patch(n1, n2) {
  // 1. different tag
  if (n1.tag !== n2.tag) {
    const n1ElParent = n1.el.parentElement;
    n1ElParent.removeChild(n1.el);
    mount(n2, n1ElParent);
  } else {
    // 2. same tag
    // 2.1 resolve props

    const el = (n2.el = n1.el);
    const oldProps = n1.props || {};
    const newProps = n2.props || {};

    // append newProps
    for (let key in newProps) {
      if (newProps[key] !== oldProps[key]) {
        el.setAttribute(key, newProps[key]);
      }
    }

    // remove oldPorps
    for (let key in oldProps) {
      if (!(key in newProps)) {
        el.removeAttribute(key);
      }
    }

    // 2.2 resolve children
  }
}
