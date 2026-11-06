'use client';

import TradeDetail from '@/components/iti/TradeDetail';
import { itiFitter } from '@/components/iti/tradeData';

export default function ItiFitterPage() {
  return <TradeDetail trade={itiFitter} />;
}
