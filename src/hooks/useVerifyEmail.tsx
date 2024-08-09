'use  client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useVerifyEmail = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { id: queryId } = router.query;
      if (queryId) {
        setId(queryId as string);
      }
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    const checkVerificationStatus = async () => {
      try {
        setLoading(true);

        if (id) {
          const emailResponse = await fetch(
            `http://localhost:4000/auth/api_admin/admin/get-email?id=${encodeURIComponent(id)}`
          );
          if (!emailResponse.ok) {
            const errorData = await emailResponse.json();
            throw new Error(errorData.error || 'Failed to fetch email');
          }
          const emailData = await emailResponse.json();
          setEmail(emailData.email);

          const response = await fetch(
            `http://localhost:4000/auth/api_admin/admin/check-verification?email=${encodeURIComponent(emailData.email)}`
          );
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
              errorData.error || 'Failed to check verification status'
            );
          }
          const data = await response.json();
          setIsVerified(data.isVerified);
          setLoading(false);
        }
      } catch (error) {
        setError('Error checking verification status.');
        setLoading(false);
        console.error('Error checking verification status:', error);
      }
    };

    if (id) {
      checkVerificationStatus();
    }
  }, [id]);

  return { isVerified, setIsVerified, loading, error, email };
};

export default useVerifyEmail;
