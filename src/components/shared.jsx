import { s } from "../styles";
import { getAffinityRank } from "../utils/affinity";

// ─── シェル（共通レイアウト） ──────────────────────────────────────────────────

export function Shell({ children, total }) {
  return (
    <div style={s.root}>
      <div style={s.bgGrid} />
      <header style={s.header}>
        <span style={s.logo}>将棋道場</span>
        {total > 0 && (
          <span style={s.statChip}>📚 {total}問チャレンジ済み</span>
        )}
      </header>
      <main style={s.main}>{children}</main>
    </div>
  );
}

// ─── スピナー ─────────────────────────────────────────────────────────────────

export function Spinner() {
  return (
    <div style={s.spinWrap}>
      <div style={s.spinner} />
      <p style={s.spinText}>問題を生成中…</p>
    </div>
  );
}

// ─── キャラクターバッジ ───────────────────────────────────────────────────────

export function CharacterBadge({ character }) {
  return (
    <div style={{ ...s.charBadge, borderColor: character.accent }}>
      <span style={{ ...s.charIcon, background: character.color }}>
        {character.icon}
      </span>
      <div style={s.charInfo}>
        <span style={{ ...s.charName, color: character.accent }}>
          {character.name}
        </span>
        <span style={s.charRole}>{character.role}</span>
      </div>
      <span style={s.charLabel}>が出題</span>
    </div>
  );
}

// ─── フィードバック行 ─────────────────────────────────────────────────────────

export function FeedRow({ tag, color, text }) {
  return (
    <div style={s.feedRow}>
      <span style={{ ...s.feedTag, background: color }}>{tag}</span>
      <p style={s.feedText}>{text}</p>
    </div>
  );
}

// ─── 模範解答 ─────────────────────────────────────────────────────────────────

const MODEL_ANSWER_ROWS = [
  { icon: "💡", label: "解答",         key: "ans" },
  { icon: "🔍", label: "盤面に注目",   key: "focus" },
  { icon: "🎯", label: "後の狙い",     key: "aim" },
  { icon: "📌", label: "覚え方・応用", key: "tip" },
];

export function ModelAnswer({ model }) {
  if (!model) return null;

  // API が文字列で返してきた場合のフォールバック
  if (typeof model === "string") {
    return (
      <div style={s.feedRow}>
        <span style={{ ...s.feedTag, background: "#555" }}>📝 模範解答</span>
        <p style={s.feedText}>{model}</p>
      </div>
    );
  }

  const rows = MODEL_ANSWER_ROWS.filter(r => model[r.key]);

  return (
    <div style={s.modelBox}>
      <span style={{ ...s.feedTag, background: "#555" }}>📝 模範解答</span>
      <div style={s.modelRows}>
        {rows.map(r => (
          <div key={r.key} style={s.modelRow}>
            <span style={s.modelIcon}>{r.icon}</span>
            <div style={s.modelRight}>
              <span style={s.modelLabel}>{r.label}</span>
              <span style={s.modelValue}>{model[r.key]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 小話モーダル ─────────────────────────────────────────────────────────────

export function KobanashiModal({ modal, onClose }) {
  if (!modal) return null;
  const { character, text } = modal;

  return (
    <div style={s.modalOverlay} onClick={onClose}>
      <div
        style={{ ...s.modalCard, borderColor: character.accent }}
        onClick={e => e.stopPropagation()}
      >
        <div style={s.modalHeader}>
          <span style={{ ...s.modalIcon, background: character.color }}>
            {character.icon}
          </span>
          <div>
            <div style={{ ...s.modalName, color: character.accent }}>
              {character.name}
            </div>
            <div style={s.modalRole}>{character.role}</div>
          </div>
        </div>
        <p style={s.modalText}>{text}</p>
        <button style={s.modalClose} onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
}

// ─── 親密度バー ───────────────────────────────────────────────────────────────

export function AffinityBar({ character, affinity, delta }) {
  const score = affinity[character.id] ?? 50;
  const rankObj = getAffinityRank(score);

  return (
    <div style={{ ...s.affinityBar, borderColor: character.accent }}>
      <span style={{ ...s.affinityIcon, background: character.color }}>
        {character.icon}
      </span>
      <span style={s.affinityName}>{character.name}</span>
      <span style={{ ...s.affinityDelta, color: delta > 0 ? "#e91e8c" : "#888" }}>
        {delta > 0 ? `♥ +${delta}` : `♡ ${delta}`}
      </span>
      <span style={s.affinityVal}>
        {score} / 100
        <span style={{ fontSize: 10, color: rankObj.color, marginLeft: 6 }}>
          {rankObj.label}
        </span>
      </span>
    </div>
  );
}
