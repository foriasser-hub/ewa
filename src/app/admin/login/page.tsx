import { Suspense } from 'react';
import { LoginForm } from './login-form';

/**
 * /admin/login — Server Component shell.
 *
 * The actual form is a Client Component (login-form.tsx) because it uses
 * useRouter and useSearchParams. Wrapping it in <Suspense> keeps Next.js
 * happy at prerender time while still letting the form read the `?next=...`
 * query parameter on the client.
 */
export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
