import { createFileRoute } from '@tanstack/react-router';
import { verifyEmailSchema } from '@packages/schema';
import { useEffect } from 'react';
import Error from '@/components/common/Error';
import ResendVerificationEmail from '@/components/auth/resend-verification-email';
import Success from '@/components/common/success';

export const Route = createFileRoute('/_auth/verify-email')({
  validateSearch: verifyEmailSchema,
  component: Page,
});

function Page() {
  const { token } = Route.useSearch();
  // const [verifyEmail, { isError, isSuccess, error, data }] =
  //   useVerifyEmailMutation();

  // useEffect(() => {
  //   verifyEmail({ token });
  // }, [token, verifyEmail]);

  // if (isError) {
  //   return (
  //     <Error error={error}>
  //       <ResendVerificationEmail token={token} />
  //     </Error>
  //   );
  // }

  // if (isSuccess) {
  //   return (
  //     <Success
  //       title={'Verified'}
  //       subtitle={data?.message ?? 'Email verified successfully!'}
  //       btnText='Login Now'
  //       btnHref='/auth/login'
  //     />
  //   );
  // }
}
