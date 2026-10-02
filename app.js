'use strict';
const sprite = document.getElementById('sprite');
const toggle = document.getElementById('toggle');
const description = document.getElementById('description');
const buttons = [...document.querySelectorAll('[data-activity]')];
const activities = {
  rest: ['休息', '闭上眼睛，慢慢放松。'],
  walk: ['散步', '迈开小小的步子，一起走走。'],
  observe: ['观察', '左看看，右看看，世界里有什么新鲜事？'],
};
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let paused = reducedMotion.matches;
function reflectPlayback() {
  sprite.classList.toggle('paused', paused);
  toggle.textContent = paused ? '播放动作' : '暂停播放';
  toggle.setAttribute('aria-pressed', String(paused));
}
for (const button of buttons) {
  button.addEventListener('click', () => {
    const activity = button.dataset.activity;
    if (!Object.hasOwn(activities, activity)) return;
    sprite.classList.remove(...Object.keys(activities));
    sprite.classList.add(activity);
    sprite.setAttribute('aria-label', `蔓蔓正在${activities[activity][0]}`);
    description.textContent = activities[activity][1];
    for (const item of buttons) item.setAttribute('aria-pressed', String(item === button));
  });
}
toggle.addEventListener('click', () => {
  paused = !paused;
  sprite.classList.toggle('motion-enabled', !paused);
  reflectPlayback();
});
reducedMotion.addEventListener('change', event => {
  paused = event.matches;
  sprite.classList.remove('motion-enabled');
  reflectPlayback();
});
reflectPlayback();
