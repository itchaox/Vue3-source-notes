/*
 * @Version    : v1.00
 * @Author     : wangchao
 * @Date       : 2023-07-12 15:54
 * @LastAuthor : itchaox
 * @LastTime   : 2023-07-15 14:31
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
    if (key.startsWith('on')) {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  }

  // 3. resolve children
  if (typeof vnode.children === 'string') {
    el.textContent = vnode.children;
    debugger;
  } else {
    for (let child of vnode.children) {
      mount(child, el);
    }
  }

  container.appendChild(el);
}

// compare vnode
function patch(n1, n2) {
  console.log('---', n1, n2);
  // 1. different tag
  if (n1.tag !== n2.tag) {
    const n1ElParent = n1.el.parentElement;
    n1ElParent.removeChild(n1.el);
    mount(n2, n1ElParent);
  } else {
    // 2. same tag
    // 2.1 resolve props

    const el = (n2.el = n1.el);
    console.log(el);
    const oldProps = n1.props || {};
    const newProps = n2.props || {};

    // append newProps
    for (let key in newProps) {
      if (newProps[key] !== oldProps[key]) {
        if (key.startsWith('on')) {
          el.addEventListener(key.slice(2).toLowerCase(), newProps[key]);
        } else {
          el.setAttribute(key, newProps[key]);
        }
      }
    }

    // remove oldPorps
    for (const key in oldProps) {
      if (!(key in newProps)) {
        if (key.startsWith('on')) {
          const value = oldProps[key];
          el.removeEventListener(key.slice(2).toLowerCase(), value);
        } else {
          el.removeAttribute(key);
        }
      }
    }

    // 2.2 resolve children

    const oldChildren = n1.children || [];
    const newChildren = n2.children || [];

    if (typeof newChildren === 'string') {
      // newChildren type is string
      if (typeof oldChildren === 'string' && newChildren !== oldChildren) {
        el.textContent = newChildren;
      } else {
        el.innerHTML = newChildren;
      }
    } else {
      // newChildren type is Array

      if (typeof oldChildren === 'string') {
        el.innerHTML = '';
        for (const item of newChildren) {
          mount(item, el);
        }
      } else {
        // oldChildren and newChildren type are Array

        // oldChildren: [v1, v3, v5]
        // newChildren: [v1, v3, v7, v8, v10]

        //TODO: resolve key
        const minLength = Math.min(oldChildren.length, newChildren.length);

        // compare same length
        for (let i = 0; i < minLength; i++) {
          patch(oldChildren[i], newChildren[i]);
        }

        // append more children
        if (newChildren.length > oldChildren.length) {
          newChildren.slice(minLength).forEach((item) => {
            mount(item, el);
          });
        }

        // remove more children
        if (newChildren.length < oldChildren.length) {
          oldChildren.slice(minLength).forEach((item) => {
            el.removeChild(item.el);
          });
        }
      }
    }
  }
}
