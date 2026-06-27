type StatusBadgeProps = {
  value: string;
  message?: string;
};

/**
 * Setup / connectivity status pill (ok, missing, error).
 */
export const StatusBadge = ({ value, message }: StatusBadgeProps) => {
  const tone =
    value === 'ok' ? styles.badgeOk : value === 'missing' ? styles.badgeMissing : styles.badgeError;
  return (
    <span>
      <span className={`${styles.badge} ${tone}`}>{value}</span>
      {message ? <span className={styles.muted}> — {message}</span> : null}
    </span>
  );
};

const styles = {
  badge: `inline-flex rounded-full px-2 py-0.5 text-xs font-medium`,
  badgeOk: `bg-emerald-100 text-emerald-800`,
  badgeMissing: `bg-amber-100 text-amber-800`,
  badgeError: `bg-red-100 text-red-800`,
  muted: `text-sm text-slate-500`,
};
