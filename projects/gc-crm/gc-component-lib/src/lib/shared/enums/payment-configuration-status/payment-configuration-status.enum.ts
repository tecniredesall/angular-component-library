export enum PaymentConfigurationStatus {
  Open = 'open',
  PartiallyPaid = 'partially_paid',
  Paid = 'paid',
}

export enum PaymentConfigurationItemStatus {
  Created = 'created',
  Approved = 'approved',
  Awaiting_payment = 'awaiting_payment',
  Processing_payment = 'processing_payment',
  Paid = 'paid',
  Failed = 'failed',
}
