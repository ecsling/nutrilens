export interface HistoryItem {
  id: string;
  productId: string;
  name: string;
  scannedAt: Date;
  verdict: 'Good' | 'Caution' | 'Avoid';
  image?: string;
}
