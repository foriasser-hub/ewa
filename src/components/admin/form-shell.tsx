import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * Visual wrapper for a CRUD form page.
 * Provides the title, back-link, and a card container for the form body.
 */
export function FormShell({
  title,
  description,
  backHref,
  children,
}: {
  title: string;
  description?: string;
  backHref: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-zinc-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        Retour à la liste
      </Link>
      <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-zinc-900">
        {title}
      </h2>
      {description ? (
        <p className="mt-1 text-sm text-zinc-500">{description}</p>
      ) : null}
      <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Reusable form primitives styled in the Vercel/Linear aesthetic.            */
/* -------------------------------------------------------------------------- */

import { cn } from '@/lib/utils';

const inputCls =
  'mt-1.5 block w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200';

export function FieldLabel({
  children,
  required,
  htmlFor,
}: {
  children: React.ReactNode;
  required?: boolean;
  htmlFor?: string;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-xs font-medium text-zinc-700">
      {children}
      {required ? <span className="text-zinc-400"> *</span> : null}
    </label>
  );
}

export function TextField({
  label,
  name,
  required,
  type = 'text',
  defaultValue,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  defaultValue?: string | number;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={inputCls}
      />
    </div>
  );
}

export function TextArea({
  label,
  name,
  required,
  defaultValue,
  rows = 4,
  placeholder,
  className,
}: {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  rows?: number;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={cn(inputCls, 'resize-y')}
      />
    </div>
  );
}

export function SelectField({
  label,
  name,
  required,
  defaultValue,
  options,
  className,
}: {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={name} required={required}>
        {label}
      </FieldLabel>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className={inputCls}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckboxField({
  label,
  name,
  defaultChecked,
  description,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
  description?: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-md border border-zinc-200 bg-white p-3 transition hover:bg-zinc-50">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-400"
      />
      <span>
        <span className="block text-sm font-medium text-zinc-900">{label}</span>
        {description ? (
          <span className="block text-xs text-zinc-500">{description}</span>
        ) : null}
      </span>
    </label>
  );
}

export function FormFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-end gap-2 border-t border-zinc-200 pt-4">
      {children}
    </div>
  );
}

export function PrimaryButton({
  children,
  disabled,
  type = 'submit',
}: {
  children: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-50"
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  href,
  type = 'button',
  onClick,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
}) {
  const cls = cn(
    'inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700 transition hover:bg-zinc-50',
    className,
  );
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function DangerButton({
  children,
  onClick,
  type = 'button',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-md border border-red-200 bg-white px-3 py-2 text-sm text-red-700 transition hover:bg-red-50"
    >
      {children}
    </button>
  );
}
