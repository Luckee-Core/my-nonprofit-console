type StepCardProps = {
  children: React.ReactNode;
};

/**
 * Card wrapper for wizard step content.
 */
export const StepCard = ({ children }: StepCardProps) => {
  return <div className={styles.card}>{children}</div>;
};

const styles = {
  card: `rounded-xl border border-slate-200 bg-white p-6 shadow-sm`,
};
