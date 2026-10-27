import React from 'react';
import MessagePageLayout from '@/components/layout/MessagePageLayout';
import { readJson, MESSAGES_FILE } from '@/lib/cmsStore';
import type { MessagesFileData } from '@/lib/homeTypes';

export default function MessageFromPrincipalPage() {
  const messages = readJson<MessagesFileData>(MESSAGES_FILE, {} as MessagesFileData);

  return (
    <MessagePageLayout
      message={messages.principal ?? {}}
      breadcrumbs={[{ label: 'About NHIT', href: '/about' }, { label: 'Principal’s Message' }]}
    />
  );
}
