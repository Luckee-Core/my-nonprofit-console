'use client';

import type { FormationCase, FormationAddress, IrsExemptionStatus } from '@/model/formation';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateFormationCaseThunk } from '@/store/thunks';

type CaseProfileFieldsProps = {
  showMission?: boolean;
  showCharitablePurpose?: boolean;
  showLegalName?: boolean;
  showAddress?: boolean;
  showEin?: boolean;
  showFiscalYear?: boolean;
  showIrsExemption?: boolean;
};

type InnerProps = CaseProfileFieldsProps & {
  caseData: FormationCase;
};

const CaseProfileFieldsInner = ({
  caseData,
  showMission = false,
  showCharitablePurpose = false,
  showLegalName = false,
  showAddress = false,
  showEin = false,
  showFiscalYear = false,
  showIrsExemption = false,
}: InnerProps) => {
  const dispatch = useAppDispatch();
  const caseFieldError = useAppSelector((s) => s.checklistBuilder.caseFieldError);

  const save = (patch: Record<string, unknown>) => {
    void dispatch(updateFormationCaseThunk({ id: caseData.id, ...patch }));
  };

  const address = caseData.registered_office_address ?? {};

  const saveAddress = (next: FormationAddress) => {
    save({ registered_office_address: next });
  };

  return (
    <div className={styles.fields}>
      {caseFieldError ? <p className={styles.error}>{caseFieldError}</p> : null}

      {showMission ? (
        <Field label="Mission statement">
          <textarea
            className={styles.textarea}
            rows={4}
            defaultValue={caseData.mission_statement}
            onBlur={(e) => save({ mission_statement: e.target.value })}
            placeholder="What your nonprofit does and who it serves"
          />
        </Field>
      ) : null}

      {showCharitablePurpose ? (
        <Field label="Charitable purpose summary">
          <textarea
            className={styles.textarea}
            rows={3}
            defaultValue={caseData.charitable_purpose_summary}
            onBlur={(e) => save({ charitable_purpose_summary: e.target.value })}
            placeholder="501(c)(3) purpose language for filings"
          />
        </Field>
      ) : null}

      {showLegalName ? (
        <Field label="Legal name">
          <input
            className={styles.input}
            defaultValue={caseData.legal_name}
            onBlur={(e) => save({ legal_name: e.target.value })}
            placeholder="Exact name for Articles of Incorporation"
          />
        </Field>
      ) : null}

      {showAddress ? (
        <AddressFields address={address} onSave={saveAddress} />
      ) : null}

      {showEin ? (
        <Field label="EIN (Employer Identification Number)">
          <input
            className={styles.input}
            defaultValue={caseData.ein}
            onBlur={(e) => save({ ein: e.target.value })}
            placeholder="XX-XXXXXXX"
          />
        </Field>
      ) : null}

      {showFiscalYear ? (
        <Field label="Fiscal year end month (1–12)">
          <input
            className={styles.inputShort}
            type="number"
            min={1}
            max={12}
            defaultValue={caseData.fiscal_year_end_month ?? ''}
            onBlur={(e) => {
              const parsed = parseInt(e.target.value, 10);
              save({ fiscal_year_end_month: Number.isNaN(parsed) ? null : parsed });
            }}
            placeholder="12"
          />
        </Field>
      ) : null}

      {showIrsExemption ? (
        <Field label="IRS 501(c)(3) exemption status">
          <select
            className={styles.select}
            defaultValue={caseData.irs_exemption_status}
            onChange={(e) => save({ irs_exemption_status: e.target.value as IrsExemptionStatus })}
          >
            <option value="not_started">Not started</option>
            <option value="submitted">Submitted</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
          </select>
        </Field>
      ) : null}
    </div>
  );
};

const AddressFields = ({
  address,
  onSave,
}: {
  address: FormationAddress;
  onSave: (address: FormationAddress) => void;
}) => {
  const handleBlur = (e: React.FocusEvent<HTMLFieldSetElement>) => {
    const form = e.currentTarget;
    onSave({
      street: (form.elements.namedItem('reg-street') as HTMLInputElement).value,
      city: (form.elements.namedItem('reg-city') as HTMLInputElement).value,
      state: (form.elements.namedItem('reg-state') as HTMLInputElement).value,
      zip: (form.elements.namedItem('reg-zip') as HTMLInputElement).value,
    });
  };

  return (
    <fieldset className={styles.fieldset} onBlur={handleBlur}>
      <legend className={styles.legend}>Registered office address (PA)</legend>
      <input
        name="reg-street"
        className={styles.input}
        placeholder="Street"
        defaultValue={address.street ?? ''}
      />
      <div className={styles.row}>
        <input
          name="reg-city"
          className={styles.input}
          placeholder="City"
          defaultValue={address.city ?? ''}
        />
        <input
          name="reg-state"
          className={styles.inputShort}
          placeholder="State"
          defaultValue={address.state ?? 'PA'}
        />
        <input
          name="reg-zip"
          className={styles.inputShort}
          placeholder="ZIP"
          defaultValue={address.zip ?? ''}
        />
      </div>
    </fieldset>
  );
};

/**
 * Editable formation case profile fields — save on blur.
 */
export const CaseProfileFields = (props: CaseProfileFieldsProps) => {
  const currentFormationCase = useAppSelector((s) => s.currentFormationCase);
  return (
    <CaseProfileFieldsInner
      key={currentFormationCase.updated_at}
      caseData={currentFormationCase}
      {...props}
    />
  );
};

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className={styles.field}>
    <label className={styles.label}>{label}</label>
    {children}
  </div>
);

const styles = {
  fields: `space-y-4`,
  field: ``,
  fieldset: `space-y-2 rounded-lg border border-slate-200 p-3`,
  legend: `text-sm font-medium text-slate-700`,
  label: `block text-sm font-medium text-slate-700`,
  input: `mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm`,
  inputShort: `mt-1 w-full min-w-[80px] rounded-lg border border-slate-300 px-3 py-2 text-sm sm:w-auto`,
  textarea: `mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm`,
  select: `mt-1 rounded-lg border border-slate-300 px-3 py-2 text-sm`,
  row: `flex flex-wrap gap-2`,
  error: `text-sm text-red-600`,
};
