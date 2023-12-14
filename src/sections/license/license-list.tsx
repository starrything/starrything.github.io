import Box, { BoxProps } from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { ILicenseItem } from 'src/types/license';

import LicenseItem from './license-item';
import { LicenseItemSkeleton } from './license-skeleton';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  licenses: ILicenseItem[];
  loading?: boolean;
};

export default function LicenseList({ licenses, loading, ...other }: Props) {
  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <LicenseItemSkeleton key={index} />
      ))}
    </>
  );

  const renderList = (
    <>
      {licenses.map((license) => (
        <LicenseItem key={license.id} license={license} />
      ))}
    </>
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        {...other}
      >
        {loading ? renderSkeleton : renderList}
      </Box>

      {licenses.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}
