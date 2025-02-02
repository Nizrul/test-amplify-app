import { Skeleton } from '@mui/material';
import { useGetPropertyList } from '../../../hooks/properties/useGetPropertyListQuery';
import PropertyListSection from './PropertyList';

function PropertyList() {
  const { data, isLoading } = useGetPropertyList();

  const ListComponent = () => <>{data?.map(office => (<PropertyListSection office={office}/>))}</>;

  return (
    isLoading ? 
      (
        <Skeleton>
          <ListComponent />
        </Skeleton>
      ) : (
        <div>
          { data?.map(office => (<PropertyListSection office={office}/>)) }
        </div>
      )
  );
}

export default PropertyList;
