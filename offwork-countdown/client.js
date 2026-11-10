window.__ModuleLoader__.load({
  id: '@local/offwork-countdown',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'offworkCountdown';
    const PANEL_ID = 'offwork';
    const DEFAULT_END = '18:00';
    const STORAGE_KEY = 'offworkCountdown.endTime';

    const zh = {
      panel: '下班倒计时',
      title: '下班倒计时',
      until: '距离下班还有',
      targetToday: '今天 {time} 下班',
      targetTomorrow: '明天 {time} 下班',
      doneTitle: '到点啦，可以下班了',
      done: '可以下班',
      tomorrow: '距明天下班',
      progress: '今天进度',
      setting: '下班时间',
      reset: '重置',
      badgeTooltip: '距下班 {remaining} · 今天 {time} 下班',
      badgeTooltipDone: '明天 {time} 下班',
      notifyTitle: '可以下班啦',
      notifyBody: '今天 {time} 下班',
      tabUntil: '({remaining}) 下班倒计时',
      tabDone: '可以下班啦',
      overlayDismiss: '点击关闭',
    };
    const en = {
      panel: 'Off-work Countdown',
      title: 'Off-work Countdown',
      until: 'Until off-work',
      targetToday: 'Off work today at {time}',
      targetTomorrow: 'Off work tomorrow at {time}',
      doneTitle: 'Time to leave',
      done: 'Leave now',
      tomorrow: 'Until tomorrow',
      progress: "Today's progress",
      setting: 'Off-work time',
      reset: 'Reset',
      badgeTooltip: '{remaining} until off-work · today at {time}',
      badgeTooltipDone: 'Off work tomorrow at {time}',
      notifyTitle: 'Time to leave',
      notifyBody: 'Off work today at {time}',
      tabUntil: '({remaining}) until off-work',
      tabDone: 'Time to leave',
      overlayDismiss: 'Click to dismiss',
    };

    const CSS = `
.ofc-page{display:flex;flex-direction:column;gap:24px;box-sizing:border-box;width:100%;height:100%;padding:28px 32px;overflow-y:auto;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-family:inherit}
.ofc-title{margin:0;font-size:20px;font-weight:600;letter-spacing:.2px;color:var(--dsw-alias-label-primary)}
.ofc-stage{display:flex;flex-direction:column;align-items:center;gap:18px;padding:36px 24px;border:1px solid var(--dsw-alias-border-l1);border-radius:16px;background:var(--dsw-alias-bg-layer-1)}
.ofc-target{font-size:44px;color:var(--dsw-alias-label-secondary)}
.ofc-target-done{font-size:16px;font-weight:600;color:var(--dsw-alias-state-success-primary)}
.ofc-timer{display:flex;align-items:baseline;gap:6px;font-variant-numeric:tabular-nums;font-size:156px;font-weight:600;line-height:1;letter-spacing:1px}
.ofc-sep{opacity:.55;font-weight:400}
.ofc-timer-done .ofc-num{color:var(--dsw-alias-state-success-primary)}
.ofc-until,.ofc-tomorrow{font-size:13px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
.ofc-progress{width:100%;max-width:440px;display:flex;flex-direction:column;gap:8px}
.ofc-progress-track{width:100%;height:6px;border-radius:3px;background:var(--dsw-alias-bg-layer-2);overflow:hidden}
.ofc-progress-fill{height:100%;border-radius:3px;background:var(--dsw-alias-brand-primary);transition:width .5s linear}
.ofc-progress-fill-done{background:var(--dsw-alias-state-success-primary)}
.ofc-progress-row{display:flex;justify-content:space-between;font-size:12px;color:var(--dsw-alias-label-secondary)}
.ofc-settings{display:flex;align-items:center;gap:12px;width:fit-content}
.ofc-setting-label{font-size:14px;color:var(--dsw-alias-label-primary)}
.ofc-time-input{font:inherit;font-size:14px;padding:6px 10px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}
.ofc-time-input:focus{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
.ofc-reset{font:inherit;font-size:13px;padding:6px 12px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);cursor:pointer}
.ofc-reset:hover{color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l2)}
.ofc-badge{display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 10px;flex:none;border-radius:14px;background:0 0;color:var(--dsw-alias-label-secondary);font-size:13px;font-variant-numeric:tabular-nums;letter-spacing:.3px;cursor:default}
.ofc-badge:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.ofc-badge-done{color:var(--dsw-alias-state-success-primary)}
.ofc-overlay-card{position:fixed;right:24px;bottom:24px;z-index:2000;display:flex;align-items:center;gap:12px;max-width:340px;padding:14px 18px;border:1px solid var(--dsw-alias-border-l1);border-left:3px solid var(--dsw-alias-state-success-primary);border-radius:12px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);box-shadow:0 8px 24px rgba(0,0,0,.18);cursor:pointer;animation:ofc-overlay-in .25s ease-out}
@keyframes ofc-overlay-in{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.ofc-overlay-icon{color:var(--dsw-alias-state-success-primary)}
.ofc-overlay-text{display:flex;flex-direction:column;gap:2px;min-width:0}
.ofc-overlay-title{font-size:14px;font-weight:600}
.ofc-overlay-sub{font-size:12px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
.ofc-overlay-tip{margin-top:4px;font-size:11px;color:var(--dsw-alias-label-tertiary)}
`;

    function pad2(n) {
      return String(n).padStart(2, '0');
    }

    function fill(text, vars) {
      return text.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? String(vars[k]) : ''));
    }

    function readEndTime() {
      try {
        const value = window.localStorage.getItem(STORAGE_KEY);
        if (value && /^\d{2}:\d{2}$/.test(value)) return value;
      } catch (err) {
        /* storage unavailable: fall back to the default */
      }
      return DEFAULT_END;
    }

    function useNow() {
      const [now, setNow] = React.useState(() => new Date());
      React.useEffect(() => {
        const id = window.setInterval(() => setNow(new Date()), 500);
        return () => window.clearInterval(id);
      }, []);
      return now;
    }

    function OffworkIcon({ size = 20, className }) {
      return h('svg', {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        'aria-hidden': true,
        className,
        style: { display: 'block', flex: '0 0 auto' },
      },
        h('circle', { cx: 12, cy: 12, r: 8.5, stroke: 'currentColor', strokeWidth: 1.8 }),
        h('path', { d: 'M12 7.5V12l3 1.8', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }),
        h('path', { d: 'M12 2.5v1.8M21.5 12h-1.8M12 21.5v-1.8M2.5 12h1.8', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }),
      );
    }

    /** Sidebar entry glyph: the sidebar owns the button, this is the icon only. */
    function PanelIcon(props) {
      return h(OffworkIcon, { size: props.size || 20 });
    }

    /** Compact countdown badge in the conversation header's top-right utilities. */
    function HeaderBadge(props) {
      const t = props.t;
      const now = useNow();
      const [endTime, setEndTime] = React.useState(readEndTime);

      React.useEffect(() => {
        const sync = () => setEndTime(readEndTime());
        window.addEventListener('ofc:endtime-change', sync);
        window.addEventListener('storage', sync);
        return () => {
          window.removeEventListener('ofc:endtime-change', sync);
          window.removeEventListener('storage', sync);
        };
      }, []);

      const [eh, em] = endTime.split(':').map(Number);
      const target = new Date(now);
      target.setHours(eh, em, 0, 0);
      const done = now >= target;
      const displayTarget = done ? new Date(target.getTime() + 86400000) : target;
      const remaining = Math.max(0, Math.round((displayTarget - now) / 1000));
      const hh = Math.floor(remaining / 3600);
      const mm = Math.floor((remaining % 3600) / 60);
      const ss = remaining % 60;
      const time = pad2(hh) + ':' + pad2(mm) + ':' + pad2(ss);

      const title = done
        ? fill(t('badgeTooltipDone'), { time: endTime })
        : fill(t('badgeTooltip'), { remaining: time, time: endTime });

      return h('div', {
        className: done ? 'ofc-badge ofc-badge-done' : 'ofc-badge',
        role: 'timer',
        'aria-label': title,
        title,
      },
        h(OffworkIcon, { size: 16 }),
        h('span', null, done ? t('done') : time),
      );
    }

    /** SVG data URL for the system notification icon. */
    function notifyIconDataUrl() {
      const svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f5a623" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 1.8"/><path d="M12 2.5v1.8M21.5 12h-1.8M12 21.5v-1.8M2.5 12h1.8"/></svg>';
      return 'data:image/svg+xml,' + encodeURIComponent(svg);
    }

    /** Frame-wide notice card shown in the top overlay once the off-work time is reached. */
    function Overlay(props) {
      const t = props.t;
      const now = useNow();
      const [endTime, setEndTime] = React.useState(readEndTime);
      const [dismissed, setDismissed] = React.useState(false);

      React.useEffect(() => {
        const sync = () => {
          setEndTime(readEndTime());
          setDismissed(false);
        };
        window.addEventListener('ofc:endtime-change', sync);
        window.addEventListener('storage', sync);
        return () => {
          window.removeEventListener('ofc:endtime-change', sync);
          window.removeEventListener('storage', sync);
        };
      }, []);

      const [eh, em] = endTime.split(':').map(Number);
      const target = new Date(now);
      target.setHours(eh, em, 0, 0);
      const done = now >= target;

      React.useEffect(() => {
        if (!done || dismissed) return;
        const id = window.setTimeout(() => setDismissed(true), 60000);
        return () => window.clearTimeout(id);
      }, [done, dismissed]);

      if (!done || dismissed) return null;

      return h('div', {
        className: 'ofc-overlay-card',
        role: 'alert',
        onClick: () => setDismissed(true),
      },
        h(OffworkIcon, { size: 20, className: 'ofc-overlay-icon' }),
        h('div', { className: 'ofc-overlay-text' },
          h('div', { className: 'ofc-overlay-title' }, t('doneTitle')),
          h('div', { className: 'ofc-overlay-sub' }, fill(t('targetTomorrow'), { time: endTime })),
          h('div', { className: 'ofc-overlay-tip' }, t('overlayDismiss')),
        ),
      );
    }

    /** Central panel opened by the sidebar entry. */
    function Page(props) {
      const t = props.t;
      const now = useNow();
      const [endTime, setEndTime] = React.useState(readEndTime);

      React.useEffect(() => {
        try {
          window.localStorage.setItem(STORAGE_KEY, endTime);
          window.dispatchEvent(new CustomEvent('ofc:endtime-change', { detail: endTime }));
        } catch (err) {
          /* storage unavailable: the setting simply does not persist */
        }
      }, [endTime]);

      const [eh, em] = endTime.split(':').map(Number);
      const startOfToday = new Date(now);
      startOfToday.setHours(0, 0, 0, 0);
      const target = new Date(now);
      target.setHours(eh, em, 0, 0);
      const done = now >= target;
      const displayTarget = done ? new Date(target.getTime() + 86400000) : target;
      const remaining = Math.max(0, Math.round((displayTarget - now) / 1000));
      const hh = Math.floor(remaining / 3600);
      const mm = Math.floor((remaining % 3600) / 60);
      const ss = remaining % 60;
      const dayLength = target - startOfToday;
      const progress = done || dayLength <= 0
        ? 1
        : Math.min(1, Math.max(0, (now - startOfToday) / dayLength));

      return h('div', { className: 'ofc-page' },
        h('header', null, h('h1', { className: 'ofc-title' }, t('title'))),
        h('section', { className: 'ofc-stage' },
          done
            ? h('div', { className: 'ofc-target ofc-target-done' }, t('doneTitle'))
            : h('div', { className: 'ofc-target' }, fill(t('targetToday'), { time: endTime })),
          h('div', { className: done ? 'ofc-timer ofc-timer-done' : 'ofc-timer', role: 'timer', 'aria-label': t('until') },
            h('span', { className: 'ofc-num' }, pad2(hh)),
            h('span', { className: 'ofc-sep' }, ':'),
            h('span', { className: 'ofc-num' }, pad2(mm)),
            h('span', { className: 'ofc-sep' }, ':'),
            h('span', { className: 'ofc-num' }, pad2(ss)),
          ),
          done
            ? h('div', { className: 'ofc-tomorrow' },
                t('tomorrow'), ' ', pad2(hh), ':', pad2(mm), ':', pad2(ss),
                ' · ', fill(t('targetTomorrow'), { time: endTime }),
              )
            : h('div', { className: 'ofc-until' }, t('until')),
          h('div', { className: 'ofc-progress' },
            h('div', { className: 'ofc-progress-track' },
              h('div', {
                className: done ? 'ofc-progress-fill ofc-progress-fill-done' : 'ofc-progress-fill',
                style: { width: (progress * 100).toFixed(1) + '%' },
              }),
            ),
            h('div', { className: 'ofc-progress-row' },
              h('span', null, t('progress')),
              h('span', null, Math.round(progress * 100) + '%'),
            ),
          ),
        ),
        h('section', { className: 'ofc-settings' },
          h('label', { className: 'ofc-setting-label', htmlFor: 'ofc-end-time' }, t('setting')),
          h('input', {
            id: 'ofc-end-time',
            className: 'ofc-time-input',
            type: 'time',
            value: endTime,
            onChange: (e) => {
              const value = e.target.value;
              if (/^\d{2}:\d{2}$/.test(value)) setEndTime(value);
            },
          }),
          h('button', { className: 'ofc-reset', type: 'button', onClick: () => setEndTime(DEFAULT_END) }, t('reset')),
        ),
      );
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'offwork-countdown: locale');
        const t = ctx.locale.bind(NS);
        const page = () => h(Page, { t });

        // Global stylesheet: the overlay card and badge must be styled even while
        // the central panel is not mounted.
        ctx.effect(() => {
          if (typeof document === 'undefined') return;
          const style = document.createElement('style');
          style.textContent = CSS;
          document.head.appendChild(style);
          return () => document.head.removeChild(style);
        }, 'offwork-countdown: styles');

        ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main',
          key: PANEL_ID,
        }, page));

        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist',
          id: PANEL_ID,
          order: 20,
          locale: NS,
          label: () => t('panel'),
        }, PanelIcon));

        ctx.slots.inject('conversation.session.header.utilities', () => ctx.slots.register({
          name: 'conversation.session.header.utilities',
          id: 'offwork-countdown',
          order: 10,
          locale: NS,
          label: () => t('until'),
        }, HeaderBadge));

        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'offwork-countdown',
          order: 10,
          locale: NS,
          label: () => t('doneTitle'),
        }, Overlay));

        // Tab title countdown; fires the one-shot system notification at the deadline.
        ctx.effect(() => {
          if (typeof document === 'undefined') return;
          const TITLE_PREFIX_RE = /^\(\d{2}:\d{2}:\d{2}\)\s+/;
          const original = document.title;
          let lastBase = '';
          let notified = false;
          const tick = () => {
            const endTime = readEndTime();
            const now = new Date();
            const [eh, em] = endTime.split(':').map(Number);
            const target = new Date(now);
            target.setHours(eh, em, 0, 0);
            if (now >= target) {
              document.title = t('tabDone');
              if (!notified) {
                notified = true;
                try {
                  if (typeof window.Notification !== 'undefined' && window.Notification.permission === 'granted') {
                    const n = new window.Notification(t('notifyTitle'), {
                      body: fill(t('notifyBody'), { time: endTime }),
                      icon: notifyIconDataUrl(),
                    });
                    n.onclick = () => {
                      window.focus();
                      n.close();
                    };
                  }
                } catch (err) {
                  /* notification unavailable: overlay and tab title still signal */
                }
              }
            } else {
              notified = false;
              const remaining = Math.max(0, Math.round((target - now) / 1000));
              const hh = Math.floor(remaining / 3600);
              const mm = Math.floor((remaining % 3600) / 60);
              const ss = remaining % 60;
              const base = document.title.replace(TITLE_PREFIX_RE, '');
              lastBase = base;
              document.title = fill(t('tabUntil'), { remaining: pad2(hh) + ':' + pad2(mm) + ':' + pad2(ss) }) + ' ' + base;
            }
          };
          tick();
          const id = window.setInterval(tick, 1000);
          return () => {
            window.clearInterval(id);
            document.title = (lastBase || original).replace(TITLE_PREFIX_RE, '');
          };
        }, 'offwork-countdown: tab title and notification');

        // Browsers only allow requesting notification permission from a user gesture.
        ctx.effect(() => {
          if (typeof window.Notification === 'undefined') return;
          if (window.Notification.permission !== 'default') return;
          let asked = false;
          const ask = () => {
            if (asked) return;
            asked = true;
            const promise = window.Notification.requestPermission();
            if (promise && typeof promise.catch === 'function') promise.catch(() => {});
          };
          document.addEventListener('pointerdown', ask, true);
          document.addEventListener('keydown', ask, true);
          return () => {
            document.removeEventListener('pointerdown', ask, true);
            document.removeEventListener('keydown', ask, true);
          };
        }, 'offwork-countdown: notification permission');
      },
    };
  },
});
