import { FirstAndMiddleNamePipe } from '../../pipes/data-pipes/first-and-middle-name/first-and-middle-name.pipe';
import { OneEmailPipe } from '../../pipes/data-pipes/one-email/one-email.pipe';
import { OnePhonePipe } from '../../pipes/data-pipes/one-phone/one-phone.pipe';

export const DYNAMIC_PIPES = {
  firstAndMiddleName: FirstAndMiddleNamePipe,
  oneEmail: OneEmailPipe,
  onePhone: OnePhonePipe,
};
