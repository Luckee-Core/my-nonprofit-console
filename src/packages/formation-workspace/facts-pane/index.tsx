'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { loadFormationContextThunk, saveFormationContextFactThunk } from '@/store/thunks';

/**
 * Facts editor — atomic key/value rows grouped by section.
 */
export const FactsPane = () => {
  const dispatch = useAppDispatch();
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  const formationContextSections = useAppSelector((s) => s.formationContextSections);
  const formationContextFacts = useAppSelector((s) => s.formationContextFacts);
  const formationContextBuilder = useAppSelector((s) => s.formationContextBuilder);
  const caseId = currentFormationCase.id;

  const sections = useMemo(
    () => Object.values(formationContextSections).sort((a, b) => a.sort_order - b.sort_order),
    [formationContextSections],
  );

  const factsBySectionId = useMemo(() => {
    const map = new Map<string, typeof formationContextFacts[string][]>();
    for (const fact of Object.values(formationContextFacts)) {
      if (fact.formation_case_id !== caseId) {
        continue;
      }
      const list = map.get(fact.section_id) ?? [];
      list.push(fact);
      map.set(fact.section_id, list);
    }
    return map;
  }, [formationContextFacts, caseId]);

  useEffect(() => {
    if (caseId) {
      void dispatch(loadFormationContextThunk(caseId));
    }
  }, [caseId, dispatch]);

  if (!caseId) {
    return null;
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Facts</h1>
      <p className={styles.lead}>
        Atomic facts about your nonprofit. These feed every AI studio chat for this case.
      </p>

      {formationContextBuilder.isLoading ? <p className={styles.muted}>Loading…</p> : null}
      {formationContextBuilder.lastError ? (
        <p className={styles.error}>{formationContextBuilder.lastError}</p>
      ) : null}

      <div className={styles.cards}>
        {sections.map((section) => (
          <SectionCard
            key={section.id}
            sectionId={section.id}
            label={section.label}
            description={section.description}
            caseId={caseId}
            facts={factsBySectionId.get(section.id) ?? []}
          />
        ))}
      </div>
    </section>
  );
};

type SectionCardProps = {
  sectionId: string;
  label: string;
  description: string;
  caseId: string;
  facts: Array<{ id: string; fact_key: string; fact_value: string }>;
};

const SectionCard = ({ sectionId, label, description, caseId, facts }: SectionCardProps) => {
  const dispatch = useAppDispatch();
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleAdd = () => {
    const key = newKey.trim();
    if (!key) {
      return;
    }
    void dispatch(
      saveFormationContextFactThunk({
        formation_case_id: caseId,
        section_id: sectionId,
        fact_key: key,
        fact_value: newValue,
      }),
    );
    setNewKey('');
    setNewValue('');
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.cardTitle}>{label}</h2>
      {description ? <p className={styles.cardDesc}>{description}</p> : null}

      <ul className={styles.factList}>
        {facts.map((fact) => (
          <FactRow
            key={fact.id}
            caseId={caseId}
            sectionId={sectionId}
            factKey={fact.fact_key}
            factValue={fact.fact_value}
          />
        ))}
      </ul>

      <div className={styles.addRow}>
        <input
          className={styles.input}
          placeholder="Fact key"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
        />
        <textarea
          className={styles.textarea}
          rows={2}
          placeholder="Fact value"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button type="button" className={styles.addButton} onClick={handleAdd}>
          Add fact
        </button>
      </div>
    </div>
  );
};

type FactRowProps = {
  caseId: string;
  sectionId: string;
  factKey: string;
  factValue: string;
};

const FactRow = ({ caseId, sectionId, factKey, factValue }: FactRowProps) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(factValue);

  return (
    <li className={styles.factRow}>
      <p className={styles.factKey}>{factKey}</p>
      <textarea
        className={styles.textarea}
        rows={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() =>
          void dispatch(
            saveFormationContextFactThunk({
              formation_case_id: caseId,
              section_id: sectionId,
              fact_key: factKey,
              fact_value: value,
            }),
          )
        }
      />
    </li>
  );
};

const styles = {
  section: `flex flex-col gap-4`,
  title: `text-2xl font-semibold text-slate-900`,
  lead: `text-slate-600`,
  muted: `text-sm text-slate-500`,
  error: `text-sm text-red-600`,
  cards: `flex flex-col gap-4`,
  card: `rounded-lg border border-slate-200 bg-white p-4`,
  cardTitle: `text-lg font-medium text-slate-900`,
  cardDesc: `mt-1 text-sm text-slate-600`,
  factList: `mt-3 flex flex-col gap-3`,
  factRow: `rounded border border-slate-100 bg-slate-50 p-3`,
  factKey: `text-sm font-medium text-slate-700`,
  input: `rounded border border-slate-300 px-2 py-1 text-sm`,
  textarea: `mt-1 w-full rounded border border-slate-300 px-2 py-1 text-sm`,
  addRow: `mt-4 flex flex-col gap-2 border-t border-slate-200 pt-4`,
  addButton: `self-start rounded bg-slate-900 px-3 py-1.5 text-sm text-white hover:bg-slate-800`,
};
