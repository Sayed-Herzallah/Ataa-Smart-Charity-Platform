  // // ===== Generate Particles =====
  // const pg = document.getElementById('particles');
  // const colors = ['#2e8e98', '#d4af37', '#5ec0cb'];
  // for (let i = 0; i < 30; i++) {
  //   const p = document.createElement('div');
  //   p.className = 'particle';
  //   p.style.cssText = `
  //     left: ${Math.random() * 100}%;
  //     width: ${2 + Math.random() * 3}px;
  //     height: ${2 + Math.random() * 3}px;
  //     background: ${colors[Math.floor(Math.random() * 3)]};
  //     animation-duration: ${5 + Math.random() * 10}s;
  //     animation-delay: ${Math.random() * 8}s;
  //   `;
  //   pg.appendChild(p);
  // }

  // // ===== OTP Logic =====
  // const otpInputs = [...document.querySelectorAll('.otp-input')];
  // otpInputs.forEach((inp, i) => {
  //   inp.addEventListener('input', e => {
  //     const v = e.target.value.replace(/\D/g, '');
  //     inp.value = v;
  //     if (v) { inp.classList.add('filled'); if (i < 3) otpInputs[i + 1].focus(); }
  //     else { inp.classList.remove('filled'); }
  //   });
  //   inp.addEventListener('keydown', e => {
  //     if (e.key === 'Backspace' && !inp.value && i > 0) otpInputs[i - 1].focus();
  //   });
  // });

  // // ===== Countdown Timer =====
  // let timer;
  // let seconds = 120;

  // function startTimer() {
  //   clearInterval(timer);
  //   seconds = 120;
  //   const el = document.getElementById('countdown');
  //   const rb = document.getElementById('resendBtn');
  //   rb.disabled = true;
  //   timer = setInterval(() => {
  //     seconds--;
  //     const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  //     const s = String(seconds % 60).padStart(2, '0');
  //     el.textContent = `${m}:${s}`;
  //     if (seconds <= 0) { clearInterval(timer); el.textContent = '00:00'; rb.disabled = false; }
  //   }, 1000);
  // }

  // // ===== Toast Notification =====
  // function showToast(msg) {
  //   const t = document.getElementById('toast');
  //   t.textContent = msg;
  //   t.classList.add('show');
  //   setTimeout(() => t.classList.remove('show'), 3000);
  // }

  // // ===== Panel Navigation =====
  // function setActivePanel(id) {
  //   document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  //   document.getElementById(id).classList.add('active');
  // }

  // function updateSteps(n) {
  //   for (let i = 1; i <= 3; i++) {
  //     const s = document.getElementById('s' + i);
  //     s.className = 'step' + (i === n ? ' active' : i < n ? ' done' : '');
  //   }
  // }

  // // ===== Step 1 → 2: Send Email =====
  // function goToStep2() {
  //   const email = document.getElementById('emailInput').value;
  //   if (!email || !email.includes('@')) {
  //     document.getElementById('emailInput').style.borderColor = 'var(--accent2)';
  //     return;
  //   }
  //   const btn = document.querySelector('#panel1 .btn');
  //   btn.classList.add('loading');
  //   setTimeout(() => {
  //     btn.classList.remove('loading');
  //     setActivePanel('panel2');
  //     updateSteps(2);
  //     document.getElementById('mainTitle').textContent = 'أدخل كود التحقق';
  //     document.getElementById('mainSub').textContent = 'أرسلنا كود مكون من 4 أرقام إلى ' + email;
  //     document.getElementById('lockIcon').textContent = '📩';
  //     startTimer();
  //     showToast('📧 تم إرسال الكود بنجاح!');
  //     setTimeout(() => otpInputs[0].focus(), 300);
  //   }, 1500);
  // }

  // // ===== Step 2 → 3: Verify OTP =====
  // function goToStep3() {
  //   const code = otpInputs.map(o => o.value).join('');
  //   if (code.length < 4) {
  //     otpInputs.forEach(o => {
  //       o.style.borderColor = 'var(--accent2)';
  //       setTimeout(() => o.style.borderColor = '', 800);
  //     });
  //     return;
  //   }
  //   const btn = document.querySelector('#panel2 .btn');
  //   btn.classList.add('loading');
  //   setTimeout(() => {
  //     btn.classList.remove('loading');
  //     clearInterval(timer);
  //     setActivePanel('panel3');
  //     updateSteps(3);
  //     document.getElementById('mainTitle').textContent = 'كلمة مرور جديدة';
  //     document.getElementById('mainSub').textContent = 'اختر كلمة مرور قوية وآمنة';
  //     document.getElementById('lockIcon').textContent = '🔑';
  //   }, 1200);
  // }

  // // ===== Password Strength =====
  // function checkStrength(v) {
  //   const fill = document.getElementById('strengthFill');
  //   const label = document.getElementById('strengthLabel');
  //   let score = 0;
  //   if (v.length >= 8) score++;
  //   if (/[A-Z]/.test(v)) score++;
  //   if (/[0-9]/.test(v)) score++;
  //   if (/[^A-Za-z0-9]/.test(v)) score++;
  //   const levels = [
  //     { pct: '0%',   color: '',          text: '' },
  //     { pct: '25%',  color: '#ff6584',   text: 'ضعيفة 😟' },
  //     { pct: '50%',  color: '#ffa500',   text: 'متوسطة 😐' },
  //     { pct: '75%',  color: '#6c63ff',   text: 'جيدة 👍' },
  //     { pct: '100%', color: '#43e8d8',   text: 'قوية جداً 💪' },
  //   ];
  //   const l = levels[score] || levels[0];
  //   fill.style.width = l.pct;
  //   fill.style.background = l.color;
  //   label.textContent = l.text;
  //   label.style.color = l.color;
  // }

  // // ===== Step 3: Finish =====
  // function finish() {
  //   const p1 = document.getElementById('pass1').value;
  //   const p2 = document.getElementById('pass2').value;
  //   if (p1.length < 6) {
  //     document.getElementById('pass1').style.borderColor = 'var(--accent2)';
  //     return;
  //   }
  //   if (p1 !== p2) {
  //     document.getElementById('pass2').style.borderColor = 'var(--accent2)';
  //     showToast('❌ كلمتا المرور غير متطابقتين');
  //     return;
  //   }
  //   const btn = document.querySelector('#panel3 .btn');
  //   btn.classList.add('loading');
  //   setTimeout(() => {
  //     btn.classList.remove('loading');
  //     setActivePanel('panelSuccess');
  //     document.querySelector('.steps').style.display = 'none';
  //     document.getElementById('mainTitle').textContent = 'تم بنجاح!';
  //     document.getElementById('mainSub').textContent = '';
  //     document.getElementById('lockIcon').textContent = '🎉';
  //     confetti();
  //   }, 1500);
  // }

  // // ===== Confetti Effect =====
  // function confetti() {
  //   for (let i = 0; i < 60; i++) {
  //     const el = document.createElement('div');
  //     const size = 5 + Math.random() * 8;
  //     const confColors = ['#2e8e98', '#d4af37', '#5ec0cb', '#eaf8f9', '#c9a227'];
  //     el.style.cssText = `
  //       position: fixed;
  //       width: ${size}px; height: ${size}px;
  //       background: ${confColors[Math.floor(Math.random() * 5)]};
  //       top: ${Math.random() * 100}vh;
  //       left: ${Math.random() * 100}vw;
  //       border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
  //       z-index: 999; opacity: 1; pointer-events: none;
  //       animation: confFall ${1 + Math.random() * 2}s ease-out forwards;
  //     `;
  //     document.body.appendChild(el);
  //     setTimeout(() => el.remove(), 3000);
  //   }
  //   if (!document.getElementById('confStyle')) {
  //     const st = document.createElement('style');
  //     st.id = 'confStyle';
  //     st.textContent = '@keyframes confFall { to { transform: translateY(100px) rotate(720deg); opacity: 0; } }';
  //     document.head.appendChild(st);
  //   }
  // }

  // // ===== Resend Code =====
  // function resendCode() {
  //   startTimer();
  //   showToast('📧 تم إعادة إرسال الكود!');
  //   otpInputs.forEach(o => { o.value = ''; o.classList.remove('filled'); });
  //   otpInputs[0].focus();
  // }

  // // ===== Reset =====
  // function reset() {
  //   location.reload();
  // }


  // ========================22222222222222222222222222222222222222222222=================================
  /* ════════════════════════════════════════════════
   Particles
════════════════════════════════════════════════ */
const pg = document.getElementById('particles');

if (pg) {

  const colors = [
    '#2e8e98',
    '#d4af37',
    '#5ec0cb'
  ];

  for (let i = 0; i < 30; i++) {

    const p = document.createElement('div');

    p.className = 'particle';

    p.style.cssText = `
      left:${Math.random() * 100}%;
      width:${2 + Math.random() * 3}px;
      height:${2 + Math.random() * 3}px;
      background:${colors[Math.floor(Math.random() * 3)]};
      animation-duration:${5 + Math.random() * 10}s;
      animation-delay:${Math.random() * 8}s;
    `;

    pg.appendChild(p);
  }
}

/* OTP */

const otpInputs = [
  ...document.querySelectorAll('.otp-input')
];

otpInputs.forEach((input, index) => {

  input.addEventListener('input', (e) => {

    let value = e.target.value;

    value = value.replace(/\D/g, '');

    input.value = value;

    input.style.color = '#ffffff';
    input.style.webkitTextFillColor = '#ffffff';

    if (value) {

      input.classList.add('filled');

      if (index < otpInputs.length - 1) {

        otpInputs[index + 1].focus();
      }

    } else {

      input.classList.remove('filled');
    }
  });

  input.addEventListener('keydown', (e) => {

    if (
      e.key === 'Backspace' &&
      !input.value &&
      index > 0
    ) {

      otpInputs[index - 1].focus();
    }
  });
});

/* Timer */

let timer;
let seconds = 120;

function startTimer() {

  clearInterval(timer);

  seconds = 120;

  const el = document.getElementById('countdown');

  const rb = document.getElementById('resendBtn');

  rb.disabled = true;

  timer = setInterval(() => {

    seconds--;

    const m = String(
      Math.floor(seconds / 60)
    ).padStart(2, '0');

    const s = String(
      seconds % 60
    ).padStart(2, '0');

    el.textContent = `${m}:${s}`;

    if (seconds <= 0) {

      clearInterval(timer);

      el.textContent = '00:00';

      rb.disabled = false;
    }

  }, 1000);
}

/* Toast */

function showToast(msg, icon = 'success') {

  Swal.fire({
    toast: true,
    position: 'top-end',
    icon,
    title: msg,
    showConfirmButton: false,
    timer: 3000
  });
}

/* Panels */

function setActivePanel(id) {

  document
    .querySelectorAll('.panel')
    .forEach(p => p.classList.remove('active'));

  document
    .getElementById(id)
    .classList.add('active');
}

function updateSteps(n) {

  for (let i = 1; i <= 3; i++) {

    const s = document.getElementById('s' + i);

    s.className =
      'step' +
      (
        i === n
          ? ' active'
          : i < n
          ? ' done'
          : ''
      );
  }
}

/* Send Email */

async function goToStep2() {

  const email = document
    .getElementById('emailInput')
    .value
    .trim();

  if (!email) {

    return showToast(
      'أدخل البريد الإلكتروني',
      'error'
    );
  }

  try {

    const response = await fetch(
      'https://ataa-charity-platform.vercel.app/auth/forgetPassword',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({ email })
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {

      localStorage.setItem(
        'resetEmail',
        email
      );

      setActivePanel('panel2');

      updateSteps(2);

      document.getElementById(
        'mainTitle'
      ).textContent =
        'أدخل كود التحقق';

      document.getElementById(
        'mainSub'
      ).textContent =
        'أرسلنا كود إلى ' + email;

      startTimer();

      showToast('تم إرسال الكود');

      otpInputs[0].focus();

    } else {

      showToast(
        data.message || 'فشل إرسال الكود',
        'error'
      );
    }

  } catch (error) {

    console.log(error);

    showToast(
      'خطأ في الاتصال بالسيرفر',
      'error'
    );
  }
}

/* Verify OTP */

function goToStep3() {

  const code =
    otpInputs.map(o => o.value).join('');

  if (code.length < 6) {

    return showToast(
      'أدخل كود التحقق كاملاً',
      'error'
    );
  }

  localStorage.setItem(
    'resetOTP',
    code
  );

  clearInterval(timer);

  setActivePanel('panel3');

  updateSteps(3);

  document.getElementById(
    'mainTitle'
  ).textContent =
    'كلمة مرور جديدة';

  document.getElementById(
    'mainSub'
  ).textContent =
    'اختر كلمة مرور قوية';
}

/* Password Strength */

function checkStrength(v) {

  const fill =
    document.getElementById('strengthFill');

  const label =
    document.getElementById('strengthLabel');

  let score = 0;

  if (v.length >= 8) score++;
  if (/[A-Z]/.test(v)) score++;
  if (/[0-9]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;

  const levels = [

    { pct: '0%', text: '' },

    { pct: '25%', text: 'ضعيفة 😟' },

    { pct: '50%', text: 'متوسطة 😐' },

    { pct: '75%', text: 'جيدة 👍' },

    { pct: '100%', text: 'قوية 💪' }
  ];

  const l = levels[score];

  fill.style.width = l.pct;

  label.textContent = l.text;
}

/* Reset Password */

async function finish() {

  const password =
    document.getElementById('pass1').value.trim();

  const confirmPassword =
    document.getElementById('pass2').value.trim();

  if (password.length < 8) {

    return showToast(
      'كلمة المرور لازم تكون 8 أحرف أو أكثر',
      'error'
    );
  }

  if (password !== confirmPassword) {

    return showToast(
      'كلمتا المرور غير متطابقتين',
      'error'
    );
  }

  const email =
    localStorage.getItem('resetEmail');

  const code =
    localStorage.getItem('resetOTP');

  try {

    const response = await fetch(
      'https://ataa-charity-platform.vercel.app/auth/resetPassword',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({

          email,
          code,
          password,
          confirmPassword

        })
      }
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {

      localStorage.removeItem('resetEmail');

      localStorage.removeItem('resetOTP');

      Swal.fire({
        icon: 'success',
        title: 'تم تغيير كلمة المرور',
        text: 'يمكنك تسجيل الدخول الآن'
      }).then(() => {

        window.location.href =
          'login-register.html?mode=login';
      });

    } else {

      showToast(
        data.message || 'فشل تغيير كلمة المرور',
        'error'
      );
    }

  } catch (error) {

    console.log(error);

    showToast(
      'خطأ في الاتصال بالسيرفر',
      'error'
    );
  }
}

/* Resend */

async function resendCode() {

  const email =
    localStorage.getItem('resetEmail');

  if (!email) return;

  try {

    await fetch(
      'https://ataa-charity-platform.vercel.app/auth/forgetPassword',
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({ email })
      }
    );

    startTimer();

    showToast('تم إعادة إرسال الكود');

  } catch (error) {

    showToast(
      'فشل إعادة الإرسال',
      'error'
    );
  }
}