import { TableHeader } from "../../interface/table-header";

export const OrderTableHeader: TableHeader[] =
  [
    {
      key: 'id',
      name: '',
      title: 'sorteer op nummer'
    },
    {
      key: 'orderer',
      name: 'Besteller',
      title: 'sorteer op besteller'
    },
    {
      key: 'driver',
      name: 'Bestuurder',
      title: 'sorteer op bestuurder',
    },
    {
      key: 'orderDate',
      name: 'Besteldatum',
      title: 'sorteer op besteldatum'
    },
    {
      key: 'leaseOrderStatus',
      name: 'Status',
      title: 'sorteer op status'
    }
  ]
