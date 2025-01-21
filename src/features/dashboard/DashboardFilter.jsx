import Filter from '../../ui/Filter';

function DashboardFilter ()
{
  return (
    <Filter
      filterField='last'
      options={[
        { value: '7', label: 'за 7 дней' },
        { value: '30', label: 'за 30 дней' },
        { value: '90', label: 'за 90 дней' },
      ]}
    />
  );
}

export default DashboardFilter;
