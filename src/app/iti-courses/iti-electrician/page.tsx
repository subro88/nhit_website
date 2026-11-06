'use client';

import TradeDetail from '@/components/iti/TradeDetail';
import { itiElectrician } from '@/components/iti/tradeData';

export default function ItiElectricianPage() {
  return <TradeDetail trade={itiElectrician} />;
}
