import { GCCLITable } from '@gc-crm/gc-component-lib';

export const GENERIC_CARD_CONFIG: GCCLITable = {
  columns: [
    {
      key: 'icon',
      show: 'default',
      order: 1,
      type: 'icon',
      labels: {
        en: '',
        es: '',
        es_mx: '',
        pt: '',
        default: '',
      },
      sort: {
        active: true,
        direction: 'asc',
      },
      settings: {
        show_in_header: true,
        width: 'col-12',
        icon: 'ri-user-3-line',
      },
    },
    {
      key: 'full_name',
      show: 'default',
      order: 2,
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
      settings: {
        show_in_header: true,
        width: 'col-12',
      },
    },
    {
      key: 'email',
      show: 'default',
      order: 3,
      labels: {
        en: 'Email',
        es: 'Correo electrónico',
        es_mx: 'Correo electrónico',
        pt: 'Endereço de e-mail',
        default: 'Email',
      },
      sort: {
        active: true,
        direction: 'asc',
      },
      settings: {
        show_in_header: true,
        width: 'col-12',
      },
    },
    {
      key: 'occupation',
      show: 'default',
      order: 4,
      labels: {
        en: 'Position',
        es: 'Cargo',
        es_mx: 'Cargo',
        pt: 'Posição',
        default: 'Position',
      },
      sort: {
        active: true,
        direction: 'asc',
      },
      settings: {
        width: 'col-12',
      },
    },
    {
      key: 'phone_number',
      show: 'default',
      order: 5,
      labels: {
        en: 'Phone number',
        es: 'Número de teléfono',
        es_mx: 'Número de teléfono',
        pt: 'Número de telefone',
        default: 'Phone number',
      },
      sort: {
        active: true,
        direction: 'asc',
      },
      settings: {
        width: 'col-12',
      },
    },
  ],
  actions: [
    {
      id: 'create',
      order: 1,
      label: {
        en: 'Add new',
        es: 'Agregar nuevo',
        pt: 'Adicionar novo',
        default: 'Add new',
      },
      icon: {
        name_react: '',
        name_web: 'ri-add-line',
        type: '',
      },
    },
    {
      id: 'edit',
      order: 2,
      label: {
        en: 'Edit',
        es: 'Editar',
        pt: 'Editar',
        default: 'Edit',
      },
      icon: {
        name_react: '',
        name_web: 'ri-pencil-fill',
        type: '',
      },
    },
    {
      id: 'delete',
      order: 3,
      label: {
        en: 'Delete',
        es: 'Eliminar',
        pt: 'Excluir',
        default: 'Delete',
      },
      icon: {
        name_react: '',
        name_web: 'ri-delete-bin-6-fill',
        type: '',
      },
    },
  ],
};

export const GENERIC_CARD_DATA: any = {
  _id: '6344b869d4dfc3dfd2d30c59',
  first_name: "ACME Company's",
  person_type: 'juridical_person',
  roles: [{ slug: 'buyer', platforms: [] }],
  emails: [
    {
      _id: '6344b88c57ee0dda86eaaa14',
      value: 'acme@grainchain.dev',
      verified: false,
    },
  ],
  phones: [
    {
      _id: '6344b88c57ee0dda86eaaa13',
      calling_code: '+52',
      phone_number: '4543887898',
      type: 'principal',
      verified: false,
    },
  ],
  ids: [
    {
      _id: '6344b88c57ee0dda86eaaa15',
      country_id: '3423662de464f9c723254315',
      type: 'RFC',
      value: 'RFC-393049',
      expiration_at: '2022-11-04T00:00:00.000Z',
      issued_at: '2022-09-29T00:00:00.000Z',
    },
  ],
  created_by: '631fa6eb863baf2ac00ec2b9',
  active: true,
  _partitionKey: 'organization_id=6323a7c1c18517d9f3de8e03',
  externals: [],
  relationships: [
    {
      person_id: '636976b647e15cb726504b7c',
      type: 'legal_representative',
      _id: '636976e647e15cb726504bdf',
    },
    {
      person_id: '636a85ca24a06c0c24178a61',
      type: 'legal_representative',
      _id: '636a862924a06c0c24178aca',
    },
    {
      person_id: '63698b8647e15cb726505529',
      type: 'legal_representative',
      _id: '636a862924a06c0c24178acb',
    },
  ],
  occupation: 'CEO',
  extras: [],
  created_at: '2022-10-11T00:27:57.910Z',
  updated_at: '2022-10-11T00:27:57.910Z',
};
