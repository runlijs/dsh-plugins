window.__ModuleLoader__.load({
  id: '@local/sticky-notes',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    try {
      console.info('[sticky-notes] client build 2026-11-10');
    } catch (err) { /* console unavailable */ }

    const NS = 'stickyNotes';
    const PANEL_ID = 'notes';
    const STORAGE_KEY = 'dshStickyNotes.v1';

    const zh = {
      panel: '便签',
      title: '便签',
      quickAddPlaceholder: '写点东西，回车即存…（支持 Markdown，如 # 标题、**粗体**、- [x] 完成）',
      preview: '预览',
      add: '添加',
      searchPlaceholder: '搜索便签…',
      empty: '还没有便签，在上方随手记一条吧。',
      emptySearch: '没有匹配 "{query}" 的便签。',
      confirmDelete: '确认删除？',
      delete: '删除',
      edit: '编辑',
      done: '完成',
      editPlaceholder: '编辑这条便签…（支持 Markdown）',
      colorsLabel: '颜色',
      pin: '置顶',
      unpin: '取消置顶',
      dragHandle: '拖动排序',
      commandOpen: '打开便签',
      justNow: '刚刚',
      minutesAgo: '{n} 分钟前',
      hoursAgo: '{n} 小时前',
      daysAgo: '{n} 天前',
      count: '{n} 条便签',
    };
    const en = {
      panel: 'Sticky Notes',
      title: 'Sticky Notes',
      quickAddPlaceholder: 'Jot something down, press Enter to save… (Markdown supported)',
      preview: 'Preview',
      add: 'Add',
      searchPlaceholder: 'Search notes…',
      empty: 'No notes yet — jot one down above.',
      emptySearch: 'No notes match "{query}".',
      confirmDelete: 'Delete?',
      delete: 'Delete',
      edit: 'Edit',
      done: 'Done',
      editPlaceholder: 'Edit this note… (Markdown supported)',
      colorsLabel: 'Color',
      pin: 'Pin to top',
      unpin: 'Unpin',
      dragHandle: 'Drag to reorder',
      commandOpen: 'Open sticky notes',
      justNow: 'Just now',
      minutesAgo: '{n}m ago',
      hoursAgo: '{n}h ago',
      daysAgo: '{n}d ago',
      count: '{n} notes',
    };

    /** Card tint colors: translucent so both light and dark themes read well. */
    const COLORS = [
      { id: 'default', css: 'transparent' },
      { id: 'yellow', css: 'rgba(242, 201, 76, 0.20)' },
      { id: 'pink', css: 'rgba(240, 130, 175, 0.20)' },
      { id: 'blue', css: 'rgba(106, 169, 242, 0.20)' },
      { id: 'green', css: 'rgba(126, 212, 154, 0.20)' },
      { id: 'purple', css: 'rgba(180, 140, 232, 0.20)' },
      { id: 'orange', css: 'rgba(242, 162, 106, 0.24)' },
    ];

    const CSS = `
.sn-page{display:flex;flex-direction:column;gap:18px;box-sizing:border-box;width:100%;height:100%;padding:28px 32px;overflow-y:auto;background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);font-family:inherit}
.sn-head{display:flex;align-items:baseline;justify-content:space-between;gap:12px}
.sn-title{margin:0;font-size:20px;font-weight:600;letter-spacing:.2px;color:var(--dsw-alias-label-primary)}
.sn-count{font-size:13px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
.sn-row{display:flex;gap:10px}
.sn-input{flex:1;min-width:0;font:inherit;font-size:14px;padding:9px 12px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary)}
.sn-input::placeholder{color:var(--dsw-alias-label-secondary)}
.sn-input:focus{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}
.sn-btn{font:inherit;font-size:13px;padding:9px 16px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-primary);cursor:pointer;white-space:nowrap}
.sn-btn:hover{border-color:var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2)}
.sn-btn-primary{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);color:#fff}
.sn-btn-primary:hover{background:var(--dsw-alias-brand-primary);border-color:var(--dsw-alias-brand-primary);opacity:.9}
.sn-list{column-width:300px;column-gap:12px}
.sn-card{position:relative;box-sizing:border-box;padding:12px 14px;border:1px solid var(--dsw-alias-border-l1);border-radius:12px;background:var(--dsw-alias-bg-layer-1);break-inside:avoid;margin:0 0 12px;display:block}
.sn-card:hover{border-color:var(--dsw-alias-border-l2)}
.sn-card-preview{cursor:text}
.sn-card-pinned{box-shadow:inset 3px 0 0 var(--dsw-alias-brand-primary)}
.sn-card-dragging{opacity:.45}
.sn-drop-before::before,.sn-drop-after::after{content:'';position:absolute;left:6px;right:6px;height:2px;background:var(--dsw-alias-brand-primary);border-radius:2px;pointer-events:none}
.sn-drop-before::before{top:-1px}
.sn-drop-after::after{bottom:-1px}
.sn-grip,.sn-pin{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;padding:0;border:0;border-radius:4px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;opacity:.55;transition:opacity .15s}
.sn-grip{cursor:grab}
.sn-grip:active{cursor:grabbing}
.sn-grip:hover,.sn-pin:hover{background:var(--dsw-alias-bg-layer-2);opacity:1;color:var(--dsw-alias-label-primary)}
.sn-pin-on{color:var(--dsw-alias-brand-primary);opacity:1}
.sn-tint{position:absolute;inset:0;border-radius:inherit;pointer-events:none}
.sn-md{position:relative;min-height:24px;line-height:1.6;font-size:14px;word-break:break-word}
.sn-md .sn-p{margin:0 0 8px}
.sn-md .sn-p:last-child{margin-bottom:0}
.sn-md .sn-h{margin:10px 0 6px;font-weight:600;line-height:1.3;color:var(--dsw-alias-label-primary)}
.sn-md .sn-h:last-child{margin-bottom:0}
.sn-md .sn-h2{font-size:17px}
.sn-md .sn-h3{font-size:15px}
.sn-md .sn-h4{font-size:14px}
.sn-md .sn-pre{margin:8px 0;padding:10px 12px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-layer-2);overflow-x:auto}
.sn-md .sn-pre code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px;line-height:1.5;white-space:pre;background:none;padding:0}
.sn-md .sn-code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px;padding:1px 5px;border-radius:4px;background:var(--dsw-alias-bg-layer-2);border:1px solid var(--dsw-alias-border-l1)}
.sn-md .sn-mdlist{margin:4px 0 8px 18px;padding:0}
.sn-md .sn-mdlist li{margin:2px 0}
.sn-md .sn-quote{margin:8px 0;padding:4px 12px;border-left:3px solid var(--dsw-alias-brand-primary);color:var(--dsw-alias-label-secondary)}
.sn-md .sn-quote .sn-p{margin:0}
.sn-md .sn-link{color:var(--dsw-alias-brand-primary);text-decoration:underline}
.sn-md .sn-hr{margin:10px 0;border:0;border-top:1px solid var(--dsw-alias-border-l2)}
.sn-md .sn-task{list-style:none;margin-left:-18px;display:flex;gap:7px;align-items:baseline}
.sn-md .sn-task-box{flex:none;width:14px;height:14px;border:1px solid var(--dsw-alias-border-l2);border-radius:3px;font-size:10px;line-height:13px;text-align:center;color:var(--dsw-alias-state-success-primary)}
.sn-md .sn-task-done .sn-task-box{background:var(--dsw-alias-state-success-primary);color:var(--dsw-alias-bg-base);border-color:var(--dsw-alias-state-success-primary)}
.sn-md .sn-task-done{color:var(--dsw-alias-label-secondary)}
.sn-text{position:relative;display:block;width:100%;box-sizing:border-box;resize:none;overflow:hidden;min-height:24px;font:inherit;font-size:14px;line-height:1.6;color:var(--dsw-alias-label-primary);background:transparent;border:0;padding:0}
.sn-text:focus{outline:0}
.sn-text::placeholder{color:var(--dsw-alias-label-secondary)}
.sn-foot{position:relative;display:flex;align-items:center;justify-content:space-between;margin-top:8px;min-height:20px;gap:8px}
.sn-time{font-size:12px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
.sn-foot-right{display:flex;align-items:center;gap:8px}
.sn-input-area{resize:none;min-height:44px;max-height:180px;line-height:1.55;overflow-y:auto;font-family:inherit;display:block}
.sn-colors{display:inline-flex;align-items:center;gap:4px;opacity:.55;transition:opacity .15s}
.sn-card:hover .sn-colors,.sn-colors:focus-within{opacity:1}
.sn-draft{position:relative;padding:10px 12px;border:1px dashed var(--dsw-alias-border-l2);border-radius:10px;background:var(--dsw-alias-bg-layer-1)}
.sn-draft-label{font-size:11px;color:var(--dsw-alias-label-secondary);margin-bottom:6px;letter-spacing:.3px}
.sn-dot{width:14px;height:14px;border-radius:50%;border:1px solid var(--dsw-alias-border-l2);cursor:pointer;padding:0;box-sizing:border-box}
.sn-dot-active{box-shadow:0 0 0 2px var(--dsw-alias-brand-primary)}
.sn-del{font:inherit;font-size:12px;padding:2px 8px;border:0;border-radius:6px;background:transparent;color:var(--dsw-alias-label-secondary);cursor:pointer;white-space:nowrap}
.sn-del:hover{background:var(--dsw-alias-bg-layer-2);color:var(--dsw-alias-label-primary)}
.sn-del-confirm{color:var(--dsw-alias-state-error-primary)}
.sn-empty{padding:36px 16px;text-align:center;font-size:14px;color:var(--dsw-alias-label-secondary);border:1px dashed var(--dsw-alias-border-l2);border-radius:12px}
.sn-glyph{display:block;flex:0 0 auto}
`;

    function fill(text, vars) {
      return text.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? String(vars[k]) : ''));
    }

    function uid() {
      return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    }

    function isNote(value) {
      if (typeof value !== 'object' || value === null) return false;
      return typeof value.id === 'string'
        && typeof value.text === 'string'
        && typeof value.createdAt === 'number'
        && typeof value.updatedAt === 'number';
    }

    function normalizeNote(value, index) {
      const color = typeof value.color === 'string' && COLORS.some((c) => c.id === value.color)
        ? value.color
        : 'default';
      const pinned = value.pinned === true;
      const order = typeof value.order === 'number' && Number.isFinite(value.order) ? value.order : index;
      return { ...value, color, pinned, order };
    }

    /** Pinned notes first, then the manual order, newest-updated as the tiebreaker. */
    function compareNotes(a, b) {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      if (a.order !== b.order) return a.order - b.order;
      return b.updatedAt - a.updatedAt;
    }

    function loadNotes() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) {
            const valid = parsed.filter(isNote);
            const notes = valid.map((n, i) => normalizeNote(n, i));
            if (valid.some((n) => typeof n.order !== 'number')) {
              // migrate v1 data: keep the newest-first order as the manual order
              notes.sort((a, b) => b.updatedAt - a.updatedAt);
              notes.forEach((n, i) => { n.order = i; });
            }
            return notes;
          }
        }
      } catch (err) {
        /* corrupt or unavailable storage: start fresh */
      }
      return [];
    }

    function saveNotes(notes) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      } catch (err) {
        /* storage unavailable: the list stays in memory for this tab */
      }
    }

    function useNow(tickMs) {
      const [now, setNow] = React.useState(() => Date.now());
      React.useEffect(() => {
        const id = window.setInterval(() => setNow(Date.now()), tickMs);
        return () => window.clearInterval(id);
      }, [tickMs]);
      return now;
    }

    function formatTime(now, timestamp, t) {
      const delta = now - timestamp;
      if (delta < 60000) return t('justNow');
      if (delta < 3600000) return fill(t('minutesAgo'), { n: Math.max(1, Math.floor(delta / 60000)) });
      if (delta < 86400000) return fill(t('hoursAgo'), { n: Math.max(1, Math.floor(delta / 3600000)) });
      if (delta < 604800000) return fill(t('daysAgo'), { n: Math.max(1, Math.floor(delta / 86400000)) });
      const d = new Date(timestamp);
      return (d.getMonth() + 1) + '/' + d.getDate();
    }

    /* ---------------- Markdown rendering (dependency-free) ---------------- */

    function escapeHtml(s) {
      return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    function safeUrl(url) {
      const trimmed = String(url).trim();
      return /^(https?:\/\/|mailto:|#)/i.test(trimmed) ? trimmed : '#';
    }

    /** Inline: code spans first (protected), then emphasis, strike, links. */
    function renderInline(text) {
      let out = escapeHtml(text);
      const codes = [];
      out = out.replace(/`([^`]+)`/g, (_, c) => {
        codes.push(c);
        return '\u0000' + (codes.length - 1) + '\u0000';
      });
      // triple markers: bold+italic combined
      out = out.replace(/\*\*\*([^*\n]+)\*\*\*/g, '<strong><em>$1</em></strong>');
      out = out.replace(/___([^_\n]+)___/g, '<strong><em>$1</em></strong>');
      // bold: the span may nest single * or _ (emphasis inside bold)
      out = out.replace(/\*\*((?:(?!\*\*|\n).)*)\*\*/g, '<strong>$1</strong>');
      out = out.replace(/__([^_]+)__/g, '<strong>$1</strong>');
      out = out.replace(/(^|[^*])\*([^*\n]+?)\*(?!\*)/g, (m, pre, inner) =>
        /^\s/.test(inner) || /\s$/.test(inner) ? m : pre + '<em>' + inner + '</em>');
      out = out.replace(/(^|[^_\w])_([^_\n]+?)_(?![\w_])/g, (m, pre, inner) =>
        /^\s/.test(inner) || /\s$/.test(inner) ? m : pre + '<em>' + inner + '</em>');
      out = out.replace(/~~([^~]+)~~/g, '<del>$1</del>');
      // the angle-bracket form is matched first (after HTML escaping), then the plain form
      out = out.replace(/\[([^\]]+)\]\(&lt;(.*?)&gt;\)/g, (m, label, url) =>
        '<a class="sn-link" href="' + safeUrl(url) + '" target="_blank" rel="noopener noreferrer">' + label + '</a>');
      out = out.replace(/\[([^\]]+)\]\(([^()\s]+)\)/g, (m, label, url) =>
        '<a class="sn-link" href="' + safeUrl(url) + '" target="_blank" rel="noopener noreferrer">' + label + '</a>');
      out = out.replace(/\u0000(\d+)\u0000/g, (_, i) => '<code class="sn-code">' + codes[Number(i)] + '</code>');
      return out;
    }

    /** Block-level renderer: fences, headings, rules, quotes, lists, tasks, paragraphs. */
    function renderMarkdown(md) {
      const lines = String(md).replace(/\r\n?/g, '\n').split('\n');
      const out = [];
      let list = null; // 'ul' | 'ol'
      let quote = false;
      const closeList = () => {
        if (list) { out.push(list === 'ul' ? '</ul>' : '</ol>'); list = null; }
      };
      const closeQuote = () => {
        if (quote) { out.push('</blockquote>'); quote = false; }
      };

      let i = 0;
      while (i < lines.length) {
        const line = lines[i];

        const fence = /^\s*```/.test(line);
        if (fence) {
          closeList(); closeQuote();
          const buf = [];
          i += 1;
          while (i < lines.length && !/^\s*```/.test(lines[i])) { buf.push(lines[i]); i += 1; }
          i += 1; // skip the closing fence (or run past the end)
          out.push('<pre class="sn-pre"><code>' + escapeHtml(buf.join('\n')) + '</code></pre>');
          continue;
        }

        if (/^\s*$/.test(line)) { closeList(); closeQuote(); i += 1; continue; }

        const head = /^(#{1,4})\s+(.*)$/.exec(line);
        if (head) {
          closeList(); closeQuote();
          const level = Math.min(head[1].length + 1, 4);
          out.push('<h' + level + ' class="sn-h sn-h' + level + '">' + renderInline(head[2]) + '</h' + level + '>');
          i += 1; continue;
        }

        if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) {
          closeList(); closeQuote();
          out.push('<hr class="sn-hr"/>');
          i += 1; continue;
        }

        const q = /^\s*>\s?(.*)$/.exec(line);
        if (q) {
          closeList();
          if (!quote) { out.push('<blockquote class="sn-quote">'); quote = true; }
          out.push('<p class="sn-p">' + renderInline(q[1]) + '</p>');
          i += 1; continue;
        }

        const task = /^\s*[-*+]\s+\[( |x|X)\]\s+(.*)$/.exec(line);
        if (task) {
          closeQuote();
          if (list !== 'ul') { closeList(); out.push('<ul class="sn-mdlist">'); list = 'ul'; }
          const done = task[1].toLowerCase() === 'x';
          out.push('<li class="sn-task' + (done ? ' sn-task-done' : '') + '"><span class="sn-task-box" aria-hidden="true">' + (done ? '✓' : '') + '</span><span>' + renderInline(task[2]) + '</span></li>');
          i += 1; continue;
        }

        const ul = /^\s*[-*+]\s+(.*)$/.exec(line);
        if (ul) {
          closeQuote();
          if (list !== 'ul') { closeList(); out.push('<ul class="sn-mdlist">'); list = 'ul'; }
          out.push('<li>' + renderInline(ul[1]) + '</li>');
          i += 1; continue;
        }

        const ol = /^\s*\d+[.)]\s+(.*)$/.exec(line);
        if (ol) {
          closeQuote();
          if (list !== 'ol') { closeList(); out.push('<ol class="sn-mdlist">'); list = 'ol'; }
          out.push('<li>' + renderInline(ol[1]) + '</li>');
          i += 1; continue;
        }

        // paragraph: gather consecutive plain lines
        closeList(); closeQuote();
        const para = [line];
        i += 1;
        while (
          i < lines.length
          && !/^\s*$/.test(lines[i])
          && !/^\s*```/.test(lines[i])
          && !/^#{1,4}\s/.test(lines[i])
          && !/^\s*[-*+]\s/.test(lines[i])
          && !/^\s*\d+[.)]\s/.test(lines[i])
          && !/^\s*>/.test(lines[i])
          && !/^\s*(-{3,}|\*{3,})\s*$/.test(lines[i])
        ) {
          para.push(lines[i]);
          i += 1;
        }
        out.push('<p class="sn-p">' + para.map(renderInline).join('<br/>') + '</p>');
      }
      closeList(); closeQuote();
      return out.join('');
    }

    /* ---------------- Components ---------------- */

    /** The sticky-note glyph the panel and icon share. */
    function NotesIcon({ size = 20 }) {
      return h('svg', {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'none',
        'aria-hidden': true,
        className: 'sn-glyph',
      },
        h('path', { d: 'M5 4h11l4 4v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z', stroke: 'currentColor', strokeWidth: 1.8, strokeLinejoin: 'round' }),
        h('path', { d: 'M16 4v4a1 1 0 0 0 1 1h4', stroke: 'currentColor', strokeWidth: 1.8, strokeLinejoin: 'round' }),
        h('path', { d: 'M7.5 11.5h9M7.5 15.5h6', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' }),
      );
    }

    /** Sidebar entry glyph: the sidebar owns the button, this is the icon only. */
    function PanelIcon(props) {
      return h(NotesIcon, { size: props.size || 20 });
    }

    /** Card tint selector: one dot per color, current one ringed. */
    function ColorDots({ color, t, onPick }) {
      return h('span', { className: 'sn-colors', role: 'group', 'aria-label': t('colorsLabel') },
        COLORS.map((c) => h('button', {
          key: c.id,
          type: 'button',
          className: 'sn-dot' + (c.id === color ? ' sn-dot-active' : ''),
          style: { background: c.css === 'transparent' ? 'var(--dsw-alias-bg-layer-2)' : c.css },
          title: c.id,
          'aria-label': t('colorsLabel') + ' ' + c.id,
          'aria-pressed': c.id === color,
          onClick: (e) => {
            e.stopPropagation();
            onPick(c.id);
          },
        })),
      );
    }

    /** Drag handle glyph: two columns of three dots. */
    function GripIcon({ size = 14 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 10 14', 'aria-hidden': true },
        [3, 7, 11].map((cy) => [3, 7].map((cx) =>
          h('circle', { key: cx + ':' + cy, cx, cy, r: 1.15, fill: 'currentColor' }))),
      );
    }

    /** Pin-to-top glyph: an upward arrow above a base line. */
    function PinIcon({ size = 14 }) {
      return h('svg', { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', 'aria-hidden': true },
        h('path', { d: 'M12 16V5', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }),
        h('path', { d: 'M7 10l5-5 5 5', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }),
        h('path', { d: 'M5 20h14', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' }),
      );
    }

    /**
     * One note card. Preview mode shows the rendered Markdown; click the card
     * (or the footer button) to edit, save on blur / Cmd+Enter, cancel with
     * Escape. The footer button is delete with a two-step confirm.
     */
    function NoteCard(props) {
      const t = props.t;
      const note = props.note;
      const [mode, setMode] = React.useState('preview');
      const [text, setText] = React.useState(note.text);
      const [confirming, setConfirming] = React.useState(false);
      const areaRef = React.useRef(null);
      const confirmTimer = React.useRef(null);

      const autosize = () => {
        const el = areaRef.current;
        if (el) {
          el.style.height = 'auto';
          el.style.height = el.scrollHeight + 'px';
        }
      };

      React.useEffect(() => {
        if (mode === 'edit' && areaRef.current) {
          autosize();
          const el = areaRef.current;
          el.focus();
          el.setSelectionRange(el.value.length, el.value.length);
        }
      }, [mode]);

      React.useEffect(() => () => {
        if (confirmTimer.current !== null) window.clearTimeout(confirmTimer.current);
      }, []);

      const onChange = (e) => {
        setText(e.target.value);
        autosize();
      };

      const onCommit = () => {
        const next = text.trim();
        if (next === '') {
          props.onDelete(note.id);
        } else if (next !== note.text) {
          props.onEdit(note.id, next);
        }
        setMode('preview');
      };

      const armDelete = () => {
        setConfirming(true);
        confirmTimer.current = window.setTimeout(() => setConfirming(false), 3000);
      };

      const onDeleteClick = (e) => {
        e.stopPropagation();
        if (confirming) props.onDelete(note.id);
        else armDelete();
      };

      const onPreviewClick = (e) => {
        if (e.target.closest('a')) return; // let links navigate instead of editing
        setMode('edit');
      };

      const tint = (COLORS.find((c) => c.id === note.color) || COLORS[0]).css;

      const grip = props.dragEnabled ? h('button', {
        type: 'button',
        className: 'sn-grip',
        draggable: true,
        title: t('dragHandle'),
        'aria-label': t('dragHandle'),
        onClick: (e) => e.stopPropagation(),
        onDragStart: (e) => {
          e.stopPropagation();
          e.dataTransfer.effectAllowed = 'move';
          try { e.dataTransfer.setData('text/plain', note.id); } catch (err) { /* Safari quirk */ }
          props.onDragStart(note.id);
        },
        onDragEnd: () => props.onDragEnd(),
      }, h(GripIcon, {})) : null;

      const pin = h('button', {
        type: 'button',
        className: 'sn-pin' + (note.pinned ? ' sn-pin-on' : ''),
        title: note.pinned ? t('unpin') : t('pin'),
        'aria-label': note.pinned ? t('unpin') : t('pin'),
        'aria-pressed': note.pinned,
        onClick: (e) => {
          e.stopPropagation();
          props.onPin(note.id);
        },
      }, h(PinIcon, {}));

      const foot = (actionButton) => h('div', {
        className: 'sn-foot',
        onClick: (e) => e.stopPropagation(),
      },
        h('span', { className: 'sn-time' }, formatTime(props.now, note.updatedAt, t)),
        h('span', { className: 'sn-foot-right' },
          grip,
          pin,
          h(ColorDots, { color: note.color, t, onPick: (id) => props.onColor(note.id, id) }),
          actionButton,
        ),
      );

      const dropHandlers = props.dragEnabled ? {
        onDragOver: (e) => {
          if (!props.dragActive) return;
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
          const rect = e.currentTarget.getBoundingClientRect();
          props.onDragOver(note.id, e.clientY > rect.top + rect.height / 2 ? 'after' : 'before');
        },
        onDrop: (e) => {
          e.preventDefault();
          props.onDrop(note.id);
        },
      } : {};

      const cardClass = 'sn-card'
        + (mode === 'preview' ? ' sn-card-preview' : '')
        + (note.pinned ? ' sn-card-pinned' : '')
        + (props.dragging ? ' sn-card-dragging' : '')
        + (props.dropPosition === 'before' ? ' sn-drop-before' : props.dropPosition === 'after' ? ' sn-drop-after' : '');

      if (mode === 'edit') {
        return h('div', { className: cardClass, ...dropHandlers },
          h('span', { className: 'sn-tint', style: { background: tint } }),
          h('textarea', {
            ref: areaRef,
            className: 'sn-text',
            value: text,
            placeholder: t('editPlaceholder'),
            rows: 1,
            onChange,
            onBlur: onCommit,
            onKeyDown: (e) => {
              if (e.key === 'Escape') {
                setText(note.text);
                autosize();
                setMode('preview');
              } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                onCommit();
              }
            },
          }),
          foot(h('button', {
            type: 'button',
            className: 'sn-del',
            'aria-label': t('done'),
            onClick: (e) => {
              e.stopPropagation();
              onCommit();
            },
          }, t('done'))),
        );
      }

      return h('div', { className: cardClass, ...dropHandlers, onClick: onPreviewClick },
        h('span', { className: 'sn-tint', style: { background: tint } }),
        h('div', { className: 'sn-md', dangerouslySetInnerHTML: { __html: renderMarkdown(note.text) } }),
        foot(h('button', {
          type: 'button',
          className: confirming ? 'sn-del sn-del-confirm' : 'sn-del',
          title: confirming ? t('confirmDelete') : t('delete'),
          'aria-label': confirming ? t('confirmDelete') : t('delete'),
          onClick: onDeleteClick,
        }, confirming ? t('confirmDelete') : t('delete'))),
      );
    }

    /** Central panel opened by the sidebar entry. */
    function Page(props) {
      const t = props.t;
      const now = useNow(30000);
      const [notes, setNotes] = React.useState(loadNotes);
      const [draft, setDraft] = React.useState('');
      const [query, setQuery] = React.useState('');
      const [dragId, setDragId] = React.useState(null);
      const [dropAt, setDropAt] = React.useState(null);
      const dragRef = React.useRef(null);
      const dropRef = React.useRef(null);
      const draftRef = React.useRef(null);

      const beginDrag = (id) => {
        dragRef.current = id;
        dropRef.current = null;
        setDragId(id);
        setDropAt(null);
      };

      const hoverDrop = (id, position) => {
        if (dragRef.current === null) return;
        const next = { id, position };
        const prev = dropRef.current;
        if (prev !== null && prev.id === id && prev.position === position) return;
        dropRef.current = next;
        setDropAt(next);
      };

      const endDrag = () => {
        dragRef.current = null;
        dropRef.current = null;
        setDragId(null);
        setDropAt(null);
      };

      const finishDrop = (targetId) => {
        const dragged = dragRef.current;
        const target = dropRef.current;
        if (dragged !== null && target !== null && target.id === targetId) {
          moveNote(dragged, target.id, target.position);
        }
        endDrag();
      };

      React.useEffect(() => {
        const sync = () => setNotes(loadNotes());
        window.addEventListener('storage', sync);
        return () => window.removeEventListener('storage', sync);
      }, []);

      const persist = (next) => {
        setNotes(next);
        saveNotes(next);
      };

      const addNote = () => {
        const text = draft.trim();
        if (text === '') return;
        const stamp = Date.now();
        persist([
          { id: uid(), text, color: 'default', pinned: false, order: -stamp, createdAt: stamp, updatedAt: stamp },
          ...notes,
        ]);
        setDraft('');
        if (draftRef.current) draftRef.current.focus();
      };

      const editNote = (id, text) => {
        persist(notes.map((n) => (n.id === id ? { ...n, text, updatedAt: Date.now() } : n)));
      };

      const deleteNote = (id) => {
        persist(notes.filter((n) => n.id !== id));
      };

      const colorNote = (id, color) => {
        persist(notes.map((n) => (n.id === id ? { ...n, color } : n)));
      };

      const pinNote = (id) => {
        const stamp = -Date.now();
        persist(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned, order: stamp } : n)));
      };

      /** Move the dragged note next to the drop target inside the same pinned section. */
      const moveNote = (draggedId, targetId, position) => {
        const a = notes.find((n) => n.id === draggedId);
        const b = notes.find((n) => n.id === targetId);
        if (!a || !b || a.id === b.id || a.pinned !== b.pinned) return;
        const ids = orderedNotes.map((n) => n.id);
        const from = ids.indexOf(draggedId);
        if (from < 0) return;
        ids.splice(from, 1);
        const at = ids.indexOf(targetId);
        if (at < 0) return;
        ids.splice(position === 'after' ? at + 1 : at, 0, draggedId);
        const orderById = new Map(ids.map((id, i) => [id, i]));
        persist(notes.map((n) => (orderById.has(n.id) ? { ...n, order: orderById.get(n.id) } : n)));
      };

      const orderedNotes = React.useMemo(() => [...notes].sort(compareNotes), [notes]);

      const visible = React.useMemo(() => {
        const q = query.trim().toLowerCase();
        return q === '' ? orderedNotes : orderedNotes.filter((n) => n.text.toLowerCase().includes(q));
      }, [orderedNotes, query]);

      return h('div', { className: 'sn-page' },
        h('style', null, CSS),
        h('header', { className: 'sn-head' },
          h('h1', { className: 'sn-title' }, t('title')),
          h('span', { className: 'sn-count' }, fill(t('count'), { n: notes.length })),
        ),
        h('div', { className: 'sn-row' },
          h('textarea', {
            ref: draftRef,
            className: 'sn-input sn-input-area',
            value: draft,
            rows: 1,
            placeholder: t('quickAddPlaceholder'),
            onChange: (e) => setDraft(e.target.value),
            onKeyDown: (e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                addNote();
              }
            },
          }),
          h('button', { type: 'button', className: 'sn-btn sn-btn-primary', onClick: addNote }, t('add')),
        ),
        draft.trim() !== ''
          ? h('div', { className: 'sn-draft' },
              h('div', { className: 'sn-draft-label' }, t('preview')),
              h('div', { className: 'sn-md', dangerouslySetInnerHTML: { __html: renderMarkdown(draft) } }),
            )
          : null,
        notes.length > 0
          ? h('input', {
              className: 'sn-input',
              type: 'search',
              value: query,
              placeholder: t('searchPlaceholder'),
              onChange: (e) => setQuery(e.target.value),
              style:{
                flex:'none'
              }
            })
          : null,
        visible.length === 0
          ? h('div', { className: 'sn-empty' },
              query.trim() !== '' ? fill(t('emptySearch'), { query: query.trim() }) : t('empty'),
            )
          : h('div', { className: 'sn-list' },
              visible.map((note) => h(NoteCard, {
                key: note.id,
                note,
                t,
                now,
                dragEnabled: query.trim() === '',
                dragActive: dragId !== null,
                dragging: dragId === note.id,
                dropPosition: dropAt !== null && dropAt.id === note.id ? dropAt.position : null,
                onEdit: editNote,
                onDelete: deleteNote,
                onColor: colorNote,
                onPin: pinNote,
                onDragStart: beginDrag,
                onDragOver: hoverDrop,
                onDrop: finishDrop,
                onDragEnd: endDrag,
              })),
            ),
      );
    }

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'sticky-notes: locale');
        const t = ctx.locale.bind(NS);
        const page = () => h(Page, { t });

        ctx.slots.inject('main', () => ctx.slots.register({
          name: 'main',
          key: PANEL_ID,
        }, page));

        ctx.slots.inject('sidebar.panellist', () => ctx.slots.register({
          name: 'sidebar.panellist',
          id: PANEL_ID,
          order: 15,
          locale: NS,
          label: () => t('panel'),
        }, PanelIcon));

        // The shortcut and panel-opening service are optional: a composition
        // without them keeps the panel working through the sidebar entry.
        ctx.plugin({
          inject: ['shortcuts', 'layout'],
          apply(child) {
            const openPanel = () => {
              try {
                child.layout.selectPanel(PANEL_ID);
              } catch (err) {
                /* the panel is gone: nothing to open */
              }
            };
            const candidates = [
              { code: 'KeyN', modifiers: ['primary', 'alt'] },
              { code: 'KeyJ', modifiers: ['primary', 'shift'] },
            ];
            let registered = false;
            child.effect(() => {
              for (const binding of candidates) {
                try {
                  const dispose = child.shortcuts.register({
                    id: 'sticky.notes.open',
                    label: () => child.locale.bind(NS)('commandOpen'),
                    aliases: ['notes', 'sticky notes', '便签'],
                    defaults: {
                      'web:macos': binding,
                      'web:windows': binding,
                      'web:linux': binding,
                    },
                    regions: ['page', 'editable', 'terminal'],
                    modals: [],
                    resolve: () => ({ status: 'handled', run: openPanel }),
                  });
                  registered = true;
                  try {
                    console.info('[sticky-notes] shortcut registered: sticky.notes.open', binding);
                  } catch (err) { /* console unavailable */ }
                  return dispose;
                } catch (err) {
                  try {
                    console.warn('[sticky-notes] shortcut candidate rejected:', binding, err && err.message);
                  } catch (e) { /* console unavailable */ }
                }
              }
              try {
                console.error('[sticky-notes] no shortcut binding accepted; using the DOM fallback');
              } catch (err) { /* console unavailable */ }
              return () => {};
            }, 'sticky-notes: open shortcut');

            // Works even when the catalog rejects every candidate.
            if (!registered) {
              child.effect(() => {
                const onKeyDown = (event) => {
                  if (!event.altKey || !(event.metaKey || event.ctrlKey)) return;
                  if (event.code !== 'KeyN' || event.repeat) return;
                  event.preventDefault();
                  openPanel();
                };
                window.addEventListener('keydown', onKeyDown);
                return () => window.removeEventListener('keydown', onKeyDown);
              }, 'sticky-notes: shortcut fallback');
            }
          },
        });
      },
    };
  },
});
