import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Mail, Phone, Tag } from 'lucide-react';
import { DeleteButton } from '@/components/admin/delete-button';
import { adminMessages } from '@/lib/admin/store';
import { getSubjectLabel, type SubjectValue } from '@/lib/contact-schema';
import { deleteMessage, setMessageStatus } from '../actions';

export const dynamic = 'force-dynamic';

export default function MessageDetailPage({ params }: { params: { id: string } }) {
  const message = adminMessages.get(params.id);
  if (!message) notFound();

  // Auto-mark as read on first open.
  if (message.status === 'unread') {
    setMessageStatus(message.id, 'read');
  }

  const remove = deleteMessage.bind(null, message.id);
  const markRead = setMessageStatus.bind(null, message.id, 'read');
  const markUnread = setMessageStatus.bind(null, message.id, 'unread');
  const archive = setMessageStatus.bind(null, message.id, 'archived');

  let subjectLabel: string;
  try {
    subjectLabel = getSubjectLabel(message.subject as SubjectValue);
  } catch {
    subjectLabel = message.subject;
  }

  const replyUrl = `mailto:${message.email}?subject=${encodeURIComponent(
    `Re: ${subjectLabel} — AKADEMIA IA`,
  )}`;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        href="/admin/messages"
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-zinc-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
        Retour aux messages
      </Link>

      <div className="rounded-xl border border-zinc-200 bg-white p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-zinc-500">Expéditeur</p>
            <h2 className="mt-1 font-display text-xl font-bold text-zinc-900">
              {message.firstName} {message.lastName}
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-zinc-600">
              <li className="inline-flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
                <a className="text-navy-700 underline" href={`mailto:${message.email}`}>
                  {message.email}
                </a>
              </li>
              {message.phone ? (
                <li className="inline-flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
                  {message.phone}
                </li>
              ) : null}
              <li className="inline-flex items-center gap-2">
                <Tag className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
                {subjectLabel}
                {message.formation ? (
                  <>
                    <span className="mx-1 text-zinc-300">·</span>
                    <span className="font-mono text-xs text-zinc-500">
                      formation: {message.formation}
                    </span>
                  </>
                ) : null}
              </li>
              <li className="inline-flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-zinc-400" aria-hidden />
                {new Date(message.createdAt).toLocaleString('fr-FR')}
              </li>
            </ul>
          </div>
          <a
            href={replyUrl}
            className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden />
            Répondre
          </a>
        </div>

        <div className="mt-6 rounded-md border border-zinc-200 bg-zinc-50 p-4">
          <p className="whitespace-pre-wrap text-sm text-zinc-800">{message.message}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-zinc-200 bg-white p-4">
        <p className="mr-auto text-sm font-medium text-zinc-700">
          Statut : <span className="text-zinc-900">{message.status}</span>
        </p>
        {message.status === 'read' ? (
          <form action={markUnread}>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-50">
              Marquer comme non lu
            </button>
          </form>
        ) : (
          <form action={markRead}>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-50">
              Marquer comme lu
            </button>
          </form>
        )}
        {message.status !== 'archived' ? (
          <form action={archive}>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-50">
              Archiver
            </button>
          </form>
        ) : null}
        <form action={remove}>
          <DeleteButton label="Supprimer" />
        </form>
      </div>
    </div>
  );
}
