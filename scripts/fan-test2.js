(async () => {
  const q = (s) => document.querySelector(s);
  const counter = () => q('.fan-counter').textContent;
  const results = {};
  q('.fan-auto').click(); // pause autoplay for determinism
  await new Promise((r) => setTimeout(r, 150));
  results.start = counter();
  const rightCard = [...document.querySelectorAll('.fan-card')].find(
    (c) => c.style.getPropertyValue('--i') === '1'
  );
  rightCard.click();
  await new Promise((r) => setTimeout(r, 900));
  results.afterSideCardClick = counter();
  results.caption = q('.fan-caption').textContent;
  const leftCard = [...document.querySelectorAll('.fan-card')].find(
    (c) => c.style.getPropertyValue('--i') === '-1'
  );
  leftCard.click();
  await new Promise((r) => setTimeout(r, 900));
  results.afterLeftCardClick = counter();
  const stage = q('.fan-stage');
  const rect = stage.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const pe = (t, x) =>
    stage.dispatchEvent(
      new PointerEvent(t, { bubbles: true, pointerId: 9, pointerType: 'mouse', button: 0, clientX: x, clientY: cy })
    );
  pe('pointerdown', cx + 100);
  for (let x = 90; x >= -100; x -= 20) {
    pe('pointermove', cx + x);
    await new Promise((r) => setTimeout(r, 25));
  }
  pe('pointerup', cx - 100);
  await new Promise((r) => setTimeout(r, 900));
  results.afterDragLeft = counter();
  const dots = [...document.querySelectorAll('.fan-dot')];
  dots[8].click();
  await new Promise((r) => setTimeout(r, 900));
  results.afterDot9 = counter() + ' | ' + q('.fan-caption').textContent;
  results.dot9IsOn = dots[8].className.includes('is-on');
  return JSON.stringify(results);
})()
