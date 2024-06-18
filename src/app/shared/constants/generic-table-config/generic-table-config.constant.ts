import { GCCLITable } from '@gc-crm/gc-component-lib';

export const GENERIC_TABLE_CONFIG: GCCLITable = {
  columns: [
    {
      key: 'first_name',
      show: 'default',
      order: 1,
      labels: {
        en: 'Name',
        es: 'Nombre',
        es_mx: 'Nombre',
        pt: 'Nome',
        default: 'Name',
      },
      sort: {
        active: true,
        direction: 'asc',
      },
    },
    {
      key: 'last_name',
      show: 'default',
      order: 2,
      labels: {
        en: 'Last Name',
        es: 'Apellido paterno',
        es_mx: 'Apellido paterno',
        pt: 'Sobrenome',
        default: 'Last Name',
      },
      sort: {
        active: true,
        direction: 'asc',
      },
    },
    {
      key: 'person_type',
      show: 'default',
      order: 3,
      labels: {
        en: 'Person type',
        es: 'Tipo de persona',
        es_mx: 'Tipo de persona',
        pt: 'Tipo de pessoa',
        default: 'Person type',
      },
      sort: {
        active: true,
        direction: 'asc',
      },
    },
  ],

  // actions: [
  //   {
  //     id: 'edit',
  //     order: 1,
  //     label: {
  //       en: 'Edit',
  //       es: 'Editar',
  //       pt: 'Editar',
  //       default: 'Edit',
  //     },
  //     icon: {
  //       name_react: '',
  //       name_web: 'ri-pencil-fill',
  //       type: 'company',
  //     },
  //   },
  //   {
  //     id: 'delete',
  //     order: 2,
  //     label: {
  //       en: 'Delete',
  //       es: 'Eliminar',
  //       pt: 'Excluir',
  //       default: 'Delete',
  //     },
  //     icon: {
  //       name_react: '',
  //       name_web: 'ri-delete-bin-fill',
  //       type: 'company',
  //     },
  //   },
  // ],
};
