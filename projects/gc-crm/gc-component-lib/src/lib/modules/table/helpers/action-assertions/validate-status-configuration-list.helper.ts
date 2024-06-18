import { PaymentConfigurationItemStatus } from '../../../../shared/enums/payment-configuration-status/payment-configuration-status.enum';
export function validateStatusConfigurationList(
  item: PaymentConfigurationItem
): boolean {
  if (!item.status) {
    return true;
  }

  return item.status !== PaymentConfigurationItemStatus.Created;
}

interface PaymentConfigurationItem {
  _id?: string;
  action?: 'update' | 'delete';
  total_amount?: number;
  concept?: string;
  decimals?: number;
  method?: string;
  platform?: {
    _id: string;
    slug: string;
  };
  status?: PaymentConfigurationItemStatus;
  transfer_id?: string;
}
