import {
  GCCLEAppName,
  GCCLEAppSlug,
  GCCLEDBName,
} from '../../enums/app-data/app-data.enum';
import { GCCLIAppData } from '../../models/app-data/app-data.model';

export const GCCL_APP_DATA: { [key: string]: GCCLIAppData } = {
  [GCCLEAppSlug.SilosysTransformaciones]: {
    name: GCCLEAppName.SilosysTransformaciones,
    dbName: GCCLEDBName.SilosysTransformaciones,
    pathImg: 'gc-cl-assets/images/apps/logo-silosys-transformaciones.svg',
  },
  [GCCLEAppSlug.SeedAudit]: {
    name: GCCLEAppName.SeedAudit,
    dbName: GCCLEDBName.SeedAudit,
    pathImg: 'gc-cl-assets/images/apps/logo-seed-audit.svg',
  },
  [GCCLEAppSlug.Trumodity]: {
    name: GCCLEAppName.Trumodity,
    dbName: GCCLEDBName.Trumodity,
    pathImg: 'gc-cl-assets/images/apps/logo-trumodity.svg',
  },
};
