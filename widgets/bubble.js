(function () {
  'use strict';

  var CDN = 'https://cdn.jsdelivr.net/gh/nancywang3641/sound-files@main/stickers/';

  // Add a new style by adding an entry here.
  var STYLES = {
    'default': { bg: '#4A5C7A', fg: '#F3EBDD', radius: '16px 16px 16px 4px', side: 'left' },
    'rae':     { bg: '#F3EBDD', fg: '#4A5C7A', radius: '16px 16px 4px 16px', side: 'right' }
  };

  var CSS =
    '.ky{display:flex;gap:8px;padding:4px 0;align-items:flex-end;background:transparent;}' +
    '.ky.ky-left{flex-direction:row;justify-content:flex-start;}' +
    '.ky.ky-right{flex-direction:row-reverse;justify-content:flex-start;}' +
    '.ky .ky-avatar{width:56px;height:56px;border-radius:50%;object-fit:cover;flex-shrink:0;}' +
    '.ky .ky-bubble{padding:10px 14px;font-size:15px;line-height:1.6;max-width:240px;' +
    'word-break:break-word;white-space:pre-wrap;box-sizing:border-box;}';

  function injectStyle() {
    if (document.getElementById('ky-bubble-style')) return;
    var st = document.createElement('style');
    st.id = 'ky-bubble-style';
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  function render(el) {
    if (el.getAttribute('data-ky-done') === '1') return;
    var text = el.getAttribute('data-t') || '';
    var avatar = el.getAttribute('data-a');
    var name = el.getAttribute('data-s');
    var st = (name && Object.prototype.hasOwnProperty.call(STYLES, name)) ? STYLES[name] : STYLES['default'];

    while (el.firstChild) el.removeChild(el.firstChild);
    el.className = (el.className ? el.className + ' ' : '') + (st.side === 'right' ? 'ky-right' : 'ky-left');

    if (avatar) {
      var img = document.createElement('img');
      img.className = 'ky-avatar';
      img.src = /^https?:\/\//i.test(avatar) ? avatar : CDN + avatar;
      img.alt = '';
      el.appendChild(img);
    }

    var b = document.createElement('div');
    b.className = 'ky-bubble';
    b.style.background = st.bg;
    b.style.color = st.fg;
    b.style.borderRadius = st.radius;
    b.textContent = text.split(/\n|\|/).join('\n');
    el.appendChild(b);

    el.setAttribute('data-ky-done', '1');
  }

  function run() {
    injectStyle();
    var list = document.querySelectorAll('.ky');
    for (var i = 0; i < list.length; i++) render(list[i]);
  }

  if (document.readyState !== 'loading') run();
  else document.addEventListener('DOMContentLoaded', run);
})();
