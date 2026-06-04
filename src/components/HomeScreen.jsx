import { s } from "../styles";
import { CATEGORIES, CHARACTERS, DIFFICULTIES, STRATEGIES, DIFF_COLOR } from "../data/constants";
import { getAffinityRank } from "../utils/affinity";
import { getRandomKobanashi } from "../data/kobanashi";
import { Shell, KobanashiModal } from "./shared";

/**
 * ホーム画面
 */
export function HomeScreen({
  difficulty,
  strategy,
  affinity,
  stats,
  kobanashiModal,
  onDifficultyChange,
  onStrategyChange,
  onStartQuiz,
  onOpenKobanashi,
  onCloseKobanashi,
}) {
  return (
    <Shell total={stats.total}>
      <div style={s.section}>
        {/* ヒーロー */}
        <div style={s.heroLabel}>大局観トレーニング</div>
        <h1 style={s.heroTitle}>考える将棋を<br />身につける</h1>

        {/* 設定バー */}
        <div style={s.settingsBar}>
          <div style={s.settingGroup}>
            <span style={s.settingLabel}>難易度</span>
            <div style={s.pillRow}>
              {DIFFICULTIES.map(d => (
                <button
                  key={d}
                  style={{
                    ...s.pill,
                    ...(difficulty === d
                      ? { background: DIFF_COLOR[d], color: "#fff", borderColor: DIFF_COLOR[d] }
                      : {}),
                  }}
                  onClick={() => onDifficultyChange(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <div style={s.settingGroup}>
            <span style={s.settingLabel}>自分の戦法</span>
            <select
              style={s.select}
              value={strategy}
              onChange={e => onStrategyChange(e.target.value)}
            >
              {STRATEGIES.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>
        </div>

        {/* カテゴリ一覧 */}
        <div style={s.catList}>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              style={{ ...s.catRow, borderLeftColor: c.color }}
              onClick={() => onStartQuiz(c.id)}
            >
              <span style={s.catRowIcon}>{c.icon}</span>
              <div style={s.catRowText}>
                <div style={s.catRowName}>{c.label}</div>
                <div style={s.catRowDesc}>{c.desc}</div>
              </div>
              <span style={{ color: c.color, fontSize: 20 }}>›</span>
            </button>
          ))}
        </div>

        {/* 小話ボタン */}
        <div style={s.kobanashiRow}>
          {CHARACTERS.map(c => {
            const score = affinity[c.id] ?? 50;
            const rankObj = getAffinityRank(score);
            return (
              <button
                key={c.id}
                style={{ ...s.kobanashiBtn, borderColor: c.accent }}
                onClick={() => {
                  const text = getRandomKobanashi(c.id, rankObj.rank);
                  onOpenKobanashi({ character: c, text: text || "…。" });
                }}
              >
                <span style={{ ...s.kobanashiIcon, background: c.color }}>{c.icon}</span>
                <span style={s.kobanashiName}>{c.name}</span>
                <span style={{ ...s.kobanashiRank, color: rankObj.color }}>
                  ♥ {score} <span style={{ fontSize: 10 }}>{rankObj.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <KobanashiModal modal={kobanashiModal} onClose={onCloseKobanashi} />
    </Shell>
  );
}
