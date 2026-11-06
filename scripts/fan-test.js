(async () => {
  const q = (s) => document.querySelector(s);
  const counter = () => q('.fan-counter').textContent;
  const results = {};
  q('.fan-auto').click();
  await new Promise((r) => setTimeout(r, 150));
  results.afterPause = counter();
  const rightCard = [...document.querySelectorAll('.fan-card')].find(
    (c) => c.style.getPropertyValue('--i') === '1'
  );
  rightCard.click();
  await new Promise((r) => setTimeout(r, 900));
  results.afterSideCardClick = counter();
  results.caption = q('.fan-caption').textContent;
  const stage = q('.fan-stage');
  const rect = stage.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const pe = (t, x) =>
    stage.dispatchEvent(
      new PointerEvent(t, { bubbles: true, pointerId: 7, pointerType: 'mouse', button: 0, clientX: x, clientY: cy })
    );
  pe('pointerdown', cx + 100);
  for (let x = 90; x >= -100; x -= 20) {
    pe('pointermove', cx + x);
    await new Promise((r) => setTimeout(r, 30));
  }
  pe('pointerup', cx - 100);
  await new Promise((r) => setTimeout(r, 900));
  results.afterDragLeft = counter();
  results.dragVarsCleared = stage.style.getPropertyValue('--drag-x');
  return JSON.stringify(results);
})()
