// register.js — Wizard multi-step registration + validation مطابق للباك + أيقونة العين

// document.addEventListener('DOMContentLoaded', () => {
//     const form          = document.getElementById('registerForm');
//     const roleSelect    = document.getElementById('reg-role');
//     const charityFields = document.getElementById('charity-fields');
//     const adminFields   = document.getElementById('admin-fields');

//     /* ══════════════════════════════════════════
    //    Wizard State
//     ══════════════════════════════════════════ */
//     let currentStep = 1;
//     const TOTAL_STEPS = 3;
//     const progressFill = document.getElementById('progressFill');

//     const updateProgress = (step) => {
//         const pct = (step / TOTAL_STEPS) * 100;
//         if (progressFill) progressFill.style.width = pct + '%';

//         for (let i = 1; i <= TOTAL_STEPS; i++) {
//             const dot   = document.getElementById(`dot-${i}`);
//             const label = document.getElementById(`label-${i}`);
//             if (!dot || !label) continue;

//             dot.className   = 'step-dot';
//             label.className = 'step-label';

//             if (i < step)  { dot.classList.add('done');   label.classList.add('done'); }
//             if (i === step) { dot.classList.add('active'); label.classList.add('active'); }
//         }
//     };

//     const goToStep = (next) => {
//         const current = document.getElementById(`step-${currentStep}`);
//         const target  = document.getElementById(`step-${next}`);
//         if (!current || !target) return;

//         current.classList.remove('active');
//         target.classList.add('active');
//         currentStep = next;
//         updateProgress(next);
//     };

//     /* ══════════════════════════════════════════
//        Validation Rules — مطابقة 100% للباك
//     ══════════════════════════════════════════ */
//     const rules = {
//         userName: {
//             re:  /^[a-zA-Z\u0621-\u064A][^#&<>"~;$^%{}]{2,29}$/,
//             msg: 'اسم المستخدم: يبدأ بحرف، 3-30 حرف، بدون رموز خاصة',
//             ok:  'اسم المستخدم مقبول ✓'
//         },
//         email: {
//             re:  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(com|net|edu)$/,
//             msg: 'صيغة البريد غير صحيحة — يجب أن ينتهي بـ .com أو .net أو .edu',
//             ok:  'البريد الإلكتروني صالح ✓'
//         },
//         password: {
//             re:  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
//             msg: 'يجب أن تحتوي على: حرف كبير، حرف صغير، رقم، و8 أحرف على الأقل',
//             ok:  'كلمة المرور قوية ✓'
//         },
//         phone: {
//             re:  /^(002|\+2)?01[0125][0-9]{8}$/,
//             msg: 'رقم غير صالح — أدخل رقماً مصرياً صحيحاً (مثال: 01012345678)',
//             ok:  'رقم الهاتف صالح ✓'
//         },
//         address: {
//             fn:  v => v.length >= 5 && v.length <= 100,
//             msg: 'العنوان يجب أن يكون بين 5 و 100 حرف',
//             ok:  'العنوان مقبول ✓'
//         },
//         charityName: {
//             fn:  v => v.length >= 3,
//             msg: 'اسم الجمعية يجب أن يكون 3 أحرف على الأقل',
//             ok:  'اسم الجمعية مقبول ✓'
//         },
//         licenseNumber: {
//             re:  /^(?=.{6,20}$)[A-Z0-9]{2,5}[-]?[A-Z0-9]{3,10}[-]?[0-9]{2,6}$/,
//             msg: 'رقم الترخيص غير صالح — يجب أن يكون بصيغة: AB-12345-2023',
//             ok:  'رقم الترخيص صالح ✓'
//         },
//         nationalID: {
//             re:  /^(2\d{2}|30[0-9]|310)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-9]|2[0-9]|88)\d{5}$/,
//             msg: 'الرقم القومي غير صالح — تأكد من إدخال 14 رقماً صحيحاً',
//             ok:  'الرقم القومي صالح ✓'
//         }
//     };

//     const isValid = (value, rule) =>
//         rule.fn ? rule.fn(value) : rule.re.test(value);

//     /* ══════════════════════════════════════════
//        Field State + Hints
//     ══════════════════════════════════════════ */
//     const setFieldState = (id, state, customMsg = '') => {
//         const input = document.getElementById(id);
//         const hint  = document.getElementById(`hint-${id}`);
//         if (!input) return;

//         input.classList.remove('input-valid', 'input-invalid');

//         if (state === 'valid') {
//             input.classList.add('input-valid');
//             const ruleKey = getRuleKey(id);
//             const msg = customMsg || (ruleKey && rules[ruleKey]?.ok) || '';
//             if (hint) {
//                 hint.className = 'field-hint hint-success';
//                 hint.innerHTML = msg ? `<i class="fa-solid fa-circle-check"></i> ${msg}` : '';
//             }
//             const statusIcon = input.parentElement.querySelector('.status-icon');
//             if (statusIcon) {
//                 statusIcon.className = 'fa-solid fa-circle-check status-icon';
//                 statusIcon.style.color = 'var(--success)';
//             }
//         } else if (state === 'invalid') {
//             input.classList.add('input-invalid');
//             const ruleKey = getRuleKey(id);
//             const msg = customMsg || (ruleKey && rules[ruleKey]?.msg) || 'قيمة غير صالحة';
//             if (hint) {
//                 hint.className = 'field-hint hint-error';
//                 hint.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${msg}`;
//             }
//             const statusIcon = input.parentElement.querySelector('.status-icon');
//             if (statusIcon) {
//                 statusIcon.className = 'fa-solid fa-circle-xmark status-icon';
//                 statusIcon.style.color = 'var(--error)';
//             }
//         } else {
//             if (hint) { hint.className = 'field-hint'; hint.innerHTML = ''; }
//         }
//     };

//     const getRuleKey = (id) => {
//         const map = {
//             'reg-username':      'userName',
//             'reg-email':         'email',
//             'reg-password':      'password',
//             'reg-phone':         'phone',
//             'reg-address':       'address',
//             'reg-charityName':   'charityName',
//             'reg-licenseNumber': 'licenseNumber',
//             'reg-nationalID':    'nationalID'
//         };
//         return map[id] || null;
//     };

//     /* ══════════════════════════════════════════
//        Toast Helper
//     ══════════════════════════════════════════ */
//     const toast = (title, icon, text = '') => Swal.fire({
//         toast: true,
//         position: 'top-end',
//         icon,
//         title,
//         text,
//         showConfirmButton: false,
//         timer: 4000,
//         timerProgressBar: true,
//         customClass: { popup: 'swal-toast-custom' },
//         didOpen: (t) => {
//             t.addEventListener('mouseenter', Swal.stopTimer);
//             t.addEventListener('mouseleave', Swal.resumeTimer);
//         }
//     });

//     /* ══════════════════════════════════════════
//        أيقونة العين (toggle password visibility)
//     ══════════════════════════════════════════ */
//     const togglePassword = (inputId, btn) => {
//         const input = document.getElementById(inputId);
//         if (!input || !btn) return;
//         const isHidden = input.type === 'password';
//         input.type = isHidden ? 'text' : 'password';
//         const icon = btn.querySelector('i');
//         if (icon) {
//             icon.className = isHidden ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
//         }
//     };

//     document.getElementById('toggle-reg-password')?.addEventListener('click', function () {
//         togglePassword('reg-password', this);
//     });
//     document.getElementById('toggle-reg-confirmPassword')?.addEventListener('click', function () {
//         togglePassword('reg-confirmPassword', this);
//     });

//     /* ══════════════════════════════════════════
//        Password Strength Meter
//     ══════════════════════════════════════════ */
//     const getStrength = (pw) => {
//         let score = 0;
//         if (pw.length >= 8)  score++;
//         if (pw.length >= 12) score++;
//         if (/[A-Z]/.test(pw)) score++;
//         if (/[a-z]/.test(pw)) score++;
//         if (/\d/.test(pw))    score++;
//         if (/[^a-zA-Z0-9]/.test(pw)) score++;
//         return score;
//     };

//     const strengthConfig = [
//         { label: 'ضعيفة جداً',  color: '#ef4444', pct: 16  },
//         { label: 'ضعيفة',       color: '#f97316', pct: 33  },
//         { label: 'مقبولة',      color: '#eab308', pct: 50  },
//         { label: 'جيدة',        color: '#84cc16', pct: 66  },
//         { label: 'قوية',        color: '#22c55e', pct: 83  },
//         { label: 'قوية جداً',   color: '#16a34a', pct: 100 }
//     ];

//     document.getElementById('reg-password')?.addEventListener('input', (e) => {
//         const pw   = e.target.value;
//         const wrap = document.getElementById('passwordStrength');
//         const fill = document.getElementById('strengthFill');
//         const text = document.getElementById('strengthText');

//         if (!pw) { if (wrap) wrap.style.display = 'none'; return; }
//         if (wrap) wrap.style.display = 'block';

//         const score = Math.max(0, Math.min(5, getStrength(pw) - 1));
//         const cfg   = strengthConfig[score];
//         if (fill) { fill.style.width = cfg.pct + '%'; fill.style.background = cfg.color; }
//         if (text) { text.textContent = `قوة كلمة المرور: ${cfg.label}`; text.style.color = cfg.color; }
//     });

//     /* تأكيد كلمة المرور */
//     document.getElementById('reg-confirmPassword')?.addEventListener('blur', () => {
//         const pw  = document.getElementById('reg-password')?.value  || '';
//         const cpw = document.getElementById('reg-confirmPassword')?.value || '';
//         if (!cpw) { setFieldState('reg-confirmPassword', 'reset'); return; }
//         if (pw === cpw) {
//             setFieldState('reg-confirmPassword', 'valid', 'كلمتا المرور متطابقتان ✓');
//         } else {
//             setFieldState('reg-confirmPassword', 'invalid', 'كلمتا المرور غير متطابقتين');
//         }
//     });

//     /* ══════════════════════════════════════════
//        Blur Live Validation
//     ══════════════════════════════════════════ */
//     const blurFields = [
//         'reg-username', 'reg-email', 'reg-password',
//         'reg-phone',    'reg-address',
//         'reg-charityName', 'reg-licenseNumber', 'reg-nationalID'
//     ];

//     blurFields.forEach(id => {
//         document.getElementById(id)?.addEventListener('blur', ({ target }) => {
//             const ruleKey = getRuleKey(id);
//             if (!ruleKey || !rules[ruleKey]) return;
//             const val = target.value.trim();
//             if (!val) { setFieldState(id, 'reset'); return; }
//             setFieldState(id, isValid(val, rules[ruleKey]) ? 'valid' : 'invalid');
//         });
//     });

//     /* ══════════════════════════════════════════
//        Charity / Admin Fields Visibility
//     ══════════════════════════════════════════ */
//     const usernameGroup = document.getElementById('reg-username')?.closest('.input-group');
//     const usernameHint  = document.getElementById('hint-reg-username');

//     const toggleUsernameVisibility = (role) => {
//         const isCharity = role === 'charity';
//         if (usernameGroup) usernameGroup.style.display = isCharity ? 'none' : '';
//         if (usernameHint)  usernameHint.style.display  = isCharity ? 'none' : '';
//         const usernameInput = document.getElementById('reg-username');
//         if (usernameInput)  usernameInput.required = !isCharity;
//     };

//     if (roleSelect) {
//         roleSelect.addEventListener('change', ({ target }) => {
//             const role = target.value;
//             charityFields?.classList.toggle('show', role === 'charity');
//             adminFields?.classList.toggle('show',   role === 'admin');
//             toggleUsernameVisibility(role);
//         });
//     }

//     /* ══════════════════════════════════════════
//        Wizard Navigation
//     ══════════════════════════════════════════ */

//     /* الخطوة 1 → 2 */
//     document.getElementById('nextStep1')?.addEventListener('click', () => {
//         const role = roleSelect?.value || '';
//         const isCharity = role === 'charity';

//         if (!isCharity) {
//             const usernameVal = document.getElementById('reg-username')?.value.trim() || '';
//             if (!isValid(usernameVal, rules.userName)) {
//                 setFieldState('reg-username', 'invalid');
//                 document.getElementById('reg-username')?.focus();
//                 return toast(rules.userName.msg, 'error');
//             }
//             setFieldState('reg-username', 'valid');
//         }

//         const remainingFields = [
//             { id: 'reg-email',    key: 'email'    },
//             { id: 'reg-password', key: 'password' }
//         ];

//         for (const { id, key } of remainingFields) {
//             const val = document.getElementById(id)?.value.trim() || '';
//             if (!isValid(val, rules[key])) {
//                 setFieldState(id, 'invalid');
//                 document.getElementById(id)?.focus();
//                 return toast(rules[key].msg, 'error');
//             }
//             setFieldState(id, 'valid');
//         }

//         const pw  = document.getElementById('reg-password')?.value  || '';
//         const cpw = document.getElementById('reg-confirmPassword')?.value || '';
//         if (pw !== cpw || !cpw) {
//             setFieldState('reg-confirmPassword', 'invalid', 'كلمتا المرور غير متطابقتين');
//             document.getElementById('reg-confirmPassword')?.focus();
//             return toast('كلمتا المرور غير متطابقتين', 'error');
//         }
//         setFieldState('reg-confirmPassword', 'valid', 'كلمتا المرور متطابقتان ✓');

//         goToStep(2);
//     });

//     /* الخطوة 2 ← 1 */
//     document.getElementById('prevStep2')?.addEventListener('click', () => goToStep(1));

//     /* الخطوة 2 → 3 */
//     document.getElementById('nextStep2')?.addEventListener('click', () => {
//         const phone   = document.getElementById('reg-phone')?.value.trim()   || '';
//         const address = document.getElementById('reg-address')?.value.trim() || '';

//         if (!isValid(phone, rules.phone)) {
//             setFieldState('reg-phone', 'invalid');
//             document.getElementById('reg-phone')?.focus();
//             return toast(rules.phone.msg, 'error');
//         }
//         setFieldState('reg-phone', 'valid');

//         if (!isValid(address, rules.address)) {
//             setFieldState('reg-address', 'invalid');
//             document.getElementById('reg-address')?.focus();
//             return toast(rules.address.msg, 'error');
//         }
//         setFieldState('reg-address', 'valid');

//         goToStep(3);
//     });

//     /* الخطوة 3 ← 2 */
//     document.getElementById('prevStep3')?.addEventListener('click', () => goToStep(2));

//     /* ══════════════════════════════════════════
//        Form Submit
//     ══════════════════════════════════════════ */
//     if (!form) return;

//     form.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const role = roleSelect?.value || '';

//         if (!role) {
//             const hint = document.getElementById('hint-reg-role');
//             if (hint) {
//                 hint.className = 'field-hint hint-error';
//                 hint.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> يرجى اختيار نوع الحساب';
//             }
//             return toast('يرجى اختيار نوع الحساب', 'error');
//         }

//         /* ─── بناء الـ payload مطابق لـ POST /auth/register ─── */
//         const payload = {
//             email:    document.getElementById('reg-email')?.value.trim(),
//             password: document.getElementById('reg-password')?.value,
//             phone:    document.getElementById('reg-phone')?.value.trim(),
//             address:  document.getElementById('reg-address')?.value.trim(),
//             roleType: role
//         };

//         // userName مطلوب لـ user و admin فقط (ليس charity)
//         if (role !== 'charity') {
//             payload.userName = document.getElementById('reg-username')?.value.trim();
//         }

//         /* ─── Charity fields ─── */
//         if (role === 'charity') {
//             payload.charityName        = document.getElementById('reg-charityName')?.value.trim();
//             payload.licenseNumber      = document.getElementById('reg-licenseNumber')?.value.trim().toUpperCase();
//             payload.charityDescription = document.getElementById('reg-charityDescription')?.value.trim();

//             if (!isValid(payload.charityName, rules.charityName)) {
//                 setFieldState('reg-charityName', 'invalid');
//                 document.getElementById('reg-charityName')?.focus();
//                 return toast(rules.charityName.msg, 'error');
//             }
//             setFieldState('reg-charityName', 'valid');

//             if (!isValid(payload.licenseNumber, rules.licenseNumber)) {
//                 setFieldState('reg-licenseNumber', 'invalid');
//                 document.getElementById('reg-licenseNumber')?.focus();
//                 return toast(rules.licenseNumber.msg, 'error');
//             }
//             setFieldState('reg-licenseNumber', 'valid');
//         }

//         /* ─── Admin fields ─── */
//         if (role === 'admin') {
//             payload.nationalID = document.getElementById('reg-nationalID')?.value.trim();

//             if (!payload.nationalID) {
//                 setFieldState('reg-nationalID', 'invalid', 'الرقم القومي مطلوب للتسجيل كأدمن');
//                 document.getElementById('reg-nationalID')?.focus();
//                 return toast('الرقم القومي مطلوب للتسجيل كأدمن', 'error');
//             }

//             if (!isValid(payload.nationalID, rules.nationalID)) {
//                 setFieldState('reg-nationalID', 'invalid');
//                 document.getElementById('reg-nationalID')?.focus();
//                 return toast(rules.nationalID.msg, 'error');
//             }
//             setFieldState('reg-nationalID', 'valid');
//         }

//         setTimeout(() => { 
//              window.location.href = "login&&register.html"; 
//         }, 1500);
//     });

//     /* init */
//     updateProgress(1);
// });


//=======================================================2222222222222222222222222222222222222222222================================

// register.js — Wizard multi-step registration + API Integration

document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('registerForm');
    const roleSelect = document.getElementById('reg-role');
    const charityFields = document.getElementById('charity-fields');
    const adminFields = document.getElementById('admin-fields');

    /* ══════════════════════════════════════════
       Wizard State
    ══════════════════════════════════════════ */

    let currentStep = 1;
    const TOTAL_STEPS = 3;

    const progressFill = document.getElementById('progressFill');

    const updateProgress = (step) => {

        const pct = (step / TOTAL_STEPS) * 100;

        if (progressFill) {
            progressFill.style.width = pct + '%';
        }

        for (let i = 1; i <= TOTAL_STEPS; i++) {

            const dot = document.getElementById(`dot-${i}`);
            const label = document.getElementById(`label-${i}`);

            if (!dot || !label) continue;

            dot.className = 'step-dot';
            label.className = 'step-label';

            if (i < step) {
                dot.classList.add('done');
                label.classList.add('done');
            }

            if (i === step) {
                dot.classList.add('active');
                label.classList.add('active');
            }
        }
    };

    const goToStep = (next) => {

        const current = document.getElementById(`step-${currentStep}`);
        const target = document.getElementById(`step-${next}`);

        if (!current || !target) return;

        current.classList.remove('active');
        target.classList.add('active');

        currentStep = next;

        updateProgress(next);
    };

    /* ══════════════════════════════════════════
       Validation Rules
    ══════════════════════════════════════════ */

    const rules = {

        userName: {
            re: /^[a-zA-Z\u0621-\u064A][^#&<>"~;$^%{}]{2,29}$/,
            msg: 'اسم المستخدم: يبدأ بحرف، 3-30 حرف، بدون رموز خاصة',
            ok: 'اسم المستخدم مقبول ✓'
        },

        email: {
            re: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(com|net|edu)$/,
            msg: 'صيغة البريد غير صحيحة',
            ok: 'البريد الإلكتروني صالح ✓'
        },

        password: {
            re: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            msg: 'يجب أن تحتوي على حرف كبير وصغير ورقم و8 أحرف على الأقل',
            ok: 'كلمة المرور قوية ✓'
        },

        phone: {
            re: /^(002|\+2)?01[0125][0-9]{8}$/,
            msg: 'رقم الهاتف غير صالح',
            ok: 'رقم الهاتف صالح ✓'
        },

        address: {
            fn: v => v.length >= 5 && v.length <= 100,
            msg: 'العنوان يجب أن يكون بين 5 و100 حرف',
            ok: 'العنوان صالح ✓'
        },

        charityName: {
            fn: v => v.length >= 3,
            msg: 'اسم الجمعية يجب أن يكون 3 أحرف على الأقل',
            ok: 'اسم الجمعية صالح ✓'
        },

        licenseNumber: {
            re: /^(?=.{6,20}$)[A-Z0-9-]+$/,
            msg: 'رقم الترخيص غير صالح',
            ok: 'رقم الترخيص صالح ✓'
        },

        nationalID: {
            re: /^\d{14}$/,
            msg: 'الرقم القومي يجب أن يكون 14 رقم',
            ok: 'الرقم القومي صالح ✓'
        }
    };

    const isValid = (value, rule) => {
        return rule.fn ? rule.fn(value) : rule.re.test(value);
    };

    /* ══════════════════════════════════════════
       Helpers
    ══════════════════════════════════════════ */

    const toast = (title, icon, text = '') => {

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon,
            title,
            text,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        });
    };

    const getRuleKey = (id) => {

        const map = {
            'reg-username': 'userName',
            'reg-email': 'email',
            'reg-password': 'password',
            'reg-phone': 'phone',
            'reg-address': 'address',
            'reg-charityName': 'charityName',
            'reg-licenseNumber': 'licenseNumber',
            'reg-nationalID': 'nationalID'
        };

        return map[id];
    };

    const setFieldState = (id, state, customMsg = '') => {

        const input = document.getElementById(id);
        const hint = document.getElementById(`hint-${id}`);

        if (!input) return;

        input.classList.remove('input-valid', 'input-invalid');

        if (state === 'valid') {

            input.classList.add('input-valid');

            if (hint) {

                hint.className = 'field-hint hint-success';

                const key = getRuleKey(id);

                hint.innerHTML = `
                    <i class="fa-solid fa-circle-check"></i>
                    ${customMsg || rules[key]?.ok || ''}
                `;
            }

        } else if (state === 'invalid') {

            input.classList.add('input-invalid');

            if (hint) {

                hint.className = 'field-hint hint-error';

                const key = getRuleKey(id);

                hint.innerHTML = `
                    <i class="fa-solid fa-circle-exclamation"></i>
                    ${customMsg || rules[key]?.msg || ''}
                `;
            }

        } else {

            if (hint) {
                hint.className = 'field-hint';
                hint.innerHTML = '';
            }
        }
    };

    /* ══════════════════════════════════════════
       Password Toggle
    ══════════════════════════════════════════ */

    const togglePassword = (inputId, btn) => {

        const input = document.getElementById(inputId);

        if (!input || !btn) return;

        const isHidden = input.type === 'password';

        input.type = isHidden ? 'text' : 'password';

        const icon = btn.querySelector('i');

        if (icon) {
            icon.className = isHidden
                ? 'fa-solid fa-eye-slash'
                : 'fa-solid fa-eye';
        }
    };

    document.getElementById('toggle-reg-password')
        ?.addEventListener('click', function () {

            togglePassword('reg-password', this);
        });

    document.getElementById('toggle-reg-confirmPassword')
        ?.addEventListener('click', function () {

            togglePassword('reg-confirmPassword', this);
        });

    /* ══════════════════════════════════════════
       Confirm Password
    ══════════════════════════════════════════ */

    document.getElementById('reg-confirmPassword')
        ?.addEventListener('blur', () => {

            const pw =
                document.getElementById('reg-password')?.value || '';

            const cpw =
                document.getElementById('reg-confirmPassword')?.value || '';

            if (!cpw) return;

            if (pw === cpw) {

                setFieldState(
                    'reg-confirmPassword',
                    'valid',
                    'كلمتا المرور متطابقتان ✓'
                );

            } else {

                setFieldState(
                    'reg-confirmPassword',
                    'invalid',
                    'كلمتا المرور غير متطابقتين'
                );
            }
        });

    /* ══════════════════════════════════════════
       Live Validation
    ══════════════════════════════════════════ */

    const blurFields = [
        'reg-username',
        'reg-email',
        'reg-password',
        'reg-phone',
        'reg-address',
        'reg-charityName',
        'reg-licenseNumber',
        'reg-nationalID'
    ];

    blurFields.forEach(id => {

        document.getElementById(id)
            ?.addEventListener('blur', ({ target }) => {

                const key = getRuleKey(id);

                if (!key || !rules[key]) return;

                const val = target.value.trim();

                if (!val) {
                    setFieldState(id, 'reset');
                    return;
                }

                setFieldState(
                    id,
                    isValid(val, rules[key]) ? 'valid' : 'invalid'
                );
            });
    });

    /* ══════════════════════════════════════════
       Role Change
    ══════════════════════════════════════════ */

    roleSelect?.addEventListener('change', ({ target }) => {

        const role = target.value;

        charityFields?.classList.toggle(
            'show',
            role === 'charity'
        );

        adminFields?.classList.toggle(
            'show',
            role === 'admin'
        );
    });

    /* ══════════════════════════════════════════
       Navigation
    ══════════════════════════════════════════ */

    document.getElementById('nextStep1')
        ?.addEventListener('click', () => {

            const fields = [
                { id: 'reg-username', key: 'userName' },
                { id: 'reg-email', key: 'email' },
                { id: 'reg-password', key: 'password' }
            ];

            for (const field of fields) {

                const val =
                    document.getElementById(field.id)
                        ?.value.trim() || '';

                if (!isValid(val, rules[field.key])) {

                    setFieldState(field.id, 'invalid');

                    return toast(
                        rules[field.key].msg,
                        'error'
                    );
                }

                setFieldState(field.id, 'valid');
            }

            const pw =
                document.getElementById('reg-password')?.value || '';

            const cpw =
                document.getElementById('reg-confirmPassword')?.value || '';

            if (pw !== cpw) {

                setFieldState(
                    'reg-confirmPassword',
                    'invalid',
                    'كلمتا المرور غير متطابقتين'
                );

                return toast(
                    'كلمتا المرور غير متطابقتين',
                    'error'
                );
            }

            goToStep(2);
        });

    document.getElementById('prevStep2')
        ?.addEventListener('click', () => goToStep(1));

    document.getElementById('nextStep2')
        ?.addEventListener('click', () => {

            const phone =
                document.getElementById('reg-phone')
                    ?.value.trim() || '';

            const address =
                document.getElementById('reg-address')
                    ?.value.trim() || '';

            if (!isValid(phone, rules.phone)) {

                setFieldState('reg-phone', 'invalid');

                return toast(rules.phone.msg, 'error');
            }

            if (!isValid(address, rules.address)) {

                setFieldState('reg-address', 'invalid');

                return toast(rules.address.msg, 'error');
            }

            setFieldState('reg-phone', 'valid');
            setFieldState('reg-address', 'valid');

            goToStep(3);
        });

    document.getElementById('prevStep3')
        ?.addEventListener('click', () => goToStep(2));

    /* ══════════════════════════════════════════
       Submit Form + Fetch API
    ══════════════════════════════════════════ */

    form?.addEventListener('submit', async (e) => {

        e.preventDefault();

        const role = roleSelect?.value || '';

        if (!role) {
            return toast('اختر نوع الحساب', 'error');
        }

        const payload = {

            email:
                document.getElementById('reg-email')
                    ?.value.trim(),

            password:
                document.getElementById('reg-password')
                    ?.value,

            confirmPassword:
                document.getElementById('reg-confirmPassword')
                    ?.value,

            phone:
                document.getElementById('reg-phone')
                    ?.value.trim(),

            address:
                document.getElementById('reg-address')
                    ?.value.trim(),

            roleType: role
        };

        /* user + admin */

        if (role !== 'charity') {

            payload.userName =
                document.getElementById('reg-username')
                    ?.value.trim();
        }

        /* charity */

        if (role === 'charity') {

            payload.charityName =
                document.getElementById('reg-charityName')
                    ?.value.trim();

            payload.licenseNumber =
                document.getElementById('reg-licenseNumber')
                    ?.value.trim();

            payload.charityDescription =
                document.getElementById('reg-charityDescription')
                    ?.value.trim();

            if (!isValid(payload.charityName, rules.charityName)) {

                setFieldState('reg-charityName', 'invalid');

                return toast(
                    rules.charityName.msg,
                    'error'
                );
            }

            if (!isValid(payload.licenseNumber, rules.licenseNumber)) {

                setFieldState('reg-licenseNumber', 'invalid');

                return toast(
                    rules.licenseNumber.msg,
                    'error'
                );
            }
        }

        /* admin */

        if (role === 'admin') {

            payload.nationalID =
                document.getElementById('reg-nationalID')
                    ?.value.trim();

            if (!payload.nationalID) {

                return toast(
                    'الرقم القومي مطلوب',
                    'error'
                );
            }

            if (!isValid(payload.nationalID, rules.nationalID)) {

                setFieldState('reg-nationalID', 'invalid');

                return toast(
                    rules.nationalID.msg,
                    'error'
                );
            }
        }

        const submitBtn =
            document.getElementById('sign_up');

        submitBtn.disabled = true;

        submitBtn.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
            جاري إنشاء الحساب...
        `;

        try {

            const response = await fetch(
                'https://ataa-charity-platform.vercel.app/auth/register',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();
if (response.ok) {

    Swal.fire({
        icon: 'success',
        title: 'تم إنشاء الحساب بنجاح',
        text: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني',
        confirmButtonText: 'متابعة'
    }).then(() => {

        /* حفظ الإيميل */

        localStorage.setItem(
            'verifyEmail',
            payload.email
        );

        /* الانتقال لصفحة التحقق */

        window.location.href = 'Email.html';
    });

            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'فشل إنشاء الحساب',
                    text:
                        data.message ||
                        'حدث خطأ أثناء التسجيل'
                });
            }

        } catch (error) {

            console.error(error);

            Swal.fire({
                icon: 'error',
                title: 'خطأ في الاتصال',
                text: 'تعذر الاتصال بالسيرفر'
            });

        } finally {

            submitBtn.disabled = false;

            submitBtn.innerHTML = `
                <i class="fa-solid fa-user-plus"></i>
                سجل الآن
            `;
        }
    });

    /* Init */

    updateProgress(1);
});


