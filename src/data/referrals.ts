import type { ReferralCode } from '../types';

export const INITIAL_REFERRALS: ReferralCode[] = [
  {
    id: 'ref-1',
    code: 'ROSE10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 999,
    active: true,
    usesCount: 142,
  },
  {
    id: 'ref-2',
    code: 'WELCOME300',
    discountType: 'fixed',
    discountValue: 300,
    minOrderAmount: 1499,
    active: true,
    usesCount: 89,
  },
  {
    id: 'ref-3',
    code: 'SPRINGVIP',
    discountType: 'percentage',
    discountValue: 15,
    minOrderAmount: 1999,
    active: true,
    usesCount: 34,
  },
];
