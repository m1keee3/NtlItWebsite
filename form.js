document.addEventListener('DOMContentLoaded', () => {
  const SELECTORS = [
    { card: '.pricing-form-card', btn: '.pricing-form-card__btn' },
    { card: '.cnt-form-card',     btn: '.cnt-form-card__btn'     },
  ];

  const SUCCESS_HTML = `
    <div class="form-success">
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="28" cy="28" r="26" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
        <circle class="form-success__ring" cx="28" cy="28" r="26" stroke="white" stroke-width="2"
          stroke-dasharray="163" stroke-dashoffset="163"/>
        <path class="form-success__check" d="M16 28L24 36L40 20" stroke="white" stroke-width="2.5"
          stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="34" stroke-dashoffset="34"/>
      </svg>
      <p class="form-success__title">Заявка отправлена!</p>
      <p class="form-success__text">Мы свяжемся с вами в ближайшее время.<br>Режим работы: Пн–Пт, 09:00–18:00</p>
    </div>
  `;

  function showSuccess(card) {
    card.innerHTML = SUCCESS_HTML;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const ring  = card.querySelector('.form-success__ring');
      const check = card.querySelector('.form-success__check');
      if (ring)  ring.style.strokeDashoffset  = '0';
      if (check) check.style.strokeDashoffset = '0';
    }));
  }

  function markInvalid(field) {
    field.classList.add('form-field--invalid');
    field.addEventListener('input', () => field.classList.remove('form-field--invalid'), { once: true });
  }

  SELECTORS.forEach(({ card: cardSel, btn: btnSel }) => {
    document.querySelectorAll(cardSel).forEach(card => {
      const btn = card.querySelector(btnSel);
      if (!btn) return;

      btn.addEventListener('click', () => {
        const name  = card.querySelector('input[type="text"]');
        const phone = card.querySelector('input[type="tel"]');
        let valid = true;

        if (!name?.value.trim())  { markInvalid(name);  valid = false; }
        if (!phone?.value.trim()) { markInvalid(phone); valid = false; }

        if (valid) showSuccess(card);
      });
    });
  });
});
