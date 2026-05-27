import { z } from 'zod';

/**
 * Contact form schema.
 * Used both on the client (live validation) and on the API route (defense in depth).
 *
 * Honeypot trick: a hidden field "website" that humans never fill in.
 * If it's present, we silently treat the request as spam.
 */
export const subjectValues = [
  'info-formation',
  'inscription',
  'entretien',
  'partenariat',
  'autre',
] as const;

export type SubjectValue = (typeof subjectValues)[number];

export const subjectOptions: { value: SubjectValue; label: string }[] = [
  { value: 'info-formation', label: "Demande d'information sur une formation" },
  { value: 'inscription', label: 'Inscription à une formation' },
  { value: 'entretien', label: 'Demande d\u2019entretien' },
  { value: 'partenariat', label: 'Partenariat / collaboration' },
  { value: 'autre', label: 'Autre' },
];

export const contactSchema = z.object({
  firstName: z
    .string({ required_error: 'Votre prénom est requis.' })
    .trim()
    .min(2, 'Au moins 2 caractères.')
    .max(60, 'Trop long.'),
  lastName: z
    .string({ required_error: 'Votre nom est requis.' })
    .trim()
    .min(2, 'Au moins 2 caractères.')
    .max(60, 'Trop long.'),
  email: z
    .string({ required_error: 'Votre email est requis.' })
    .trim()
    .email('Format email invalide.'),
  phone: z
    .string()
    .trim()
    .max(30, 'Trop long.')
    .optional()
    .or(z.literal('')),
  subject: z.enum(subjectValues, { required_error: 'Sélectionnez un sujet.' }),
  /** Optional context: which formation the user came from, if any. */
  formation: z.string().trim().max(80).optional().or(z.literal('')),
  message: z
    .string({ required_error: 'Votre message est requis.' })
    .trim()
    .min(20, 'Au moins 20 caractères.')
    .max(4000, 'Au-delà de 4000 caractères, c\u2019est un peu long !'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Vous devez accepter pour continuer.' }),
  }),
  /** Honeypot — must remain empty. */
  website: z.literal('').optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function getSubjectLabel(value: SubjectValue) {
  return subjectOptions.find((o) => o.value === value)?.label ?? value;
}
