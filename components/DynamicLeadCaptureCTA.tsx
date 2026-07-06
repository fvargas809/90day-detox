'use client';

import { useEffect, useState } from 'react';
import LeadCaptureCTA from './LeadCaptureCTA';

type Variant = 'forest' | 'ochre' | 'outline';

type ResolvedConfig = {
  label: string;
  successMessage: string;
  variant: Variant;
  showPhone: boolean;
};

export default function DynamicLeadCaptureCTA({
  offerTag,
  source,
  fallbackLabel,
  fallbackSuccessMessage = "Thanks! We'll be in touch shortly.",
  fallbackVariant = 'forest',
  className = '',
}: {
  offerTag: string;
  source: string;
  fallbackLabel: string;
  fallbackSuccessMessage?: string;
  fallbackVariant?: Variant;
  className?: string;
}) {
  const [config, setConfig] = useState<ResolvedConfig>({
    label: fallbackLabel,
    successMessage: fallbackSuccessMessage,
    variant: fallbackVariant,
    showPhone: true,
  });
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/funnels/${offerTag}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (!data.found) return;
        if (data.active === false) {
          setHidden(true);
          return;
        }
        setConfig({
          label: data.label ?? fallbackLabel,
          successMessage: data.successMessage ?? fallbackSuccessMessage,
          variant: (data.variant as Variant) ?? fallbackVariant,
          showPhone: data.collectPhone ?? true,
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offerTag]);

  if (hidden) return null;

  return (
    <LeadCaptureCTA
      label={config.label}
      offerTag={offerTag}
      source={source}
      successMessage={config.successMessage}
      variant={config.variant}
      showPhone={config.showPhone}
      className={className}
    />
  );
}