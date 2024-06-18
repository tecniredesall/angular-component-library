import {
  getRandomBoolean,
  isUserRoleDifferentCustomType,
} from '../../helpers/action-assertions/random-boolean.helper';
import { validateStatusConfigurationList } from '../../helpers/action-assertions/validate-status-configuration-list.helper';

export const CONDITION_ASSERTIONS = {
  getRandomBoolean: getRandomBoolean,
  isUserRoleDifferentCustomType: isUserRoleDifferentCustomType,
  validateStatusConfigurationList: validateStatusConfigurationList,
};
