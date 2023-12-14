import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { ColorPreview } from 'src/components/color-utils';

import { ILicenseItem } from 'src/types/license';

/* import { useCheckoutContext } from '../checkout/context'; */

// ----------------------------------------------------------------------

type Props = {
  license: ILicenseItem;
};

export default function LicenseItem({ license }: Props) {
  /* const { onAddToCart } = useCheckoutContext(); */

  const { id, name, coverUrl, passedAt, index } =
    license;

  const linkTo = 'paths.license.details(id)';

  const latestLicenseLarge = index === 0;

  const latestLicenseSmall = index === 1 || index === 2;

  const handleAddCart = async () => {
    const newLicense = {
      id,
      index,
      name,
      coverUrl,
      passedAt
    };
    try {
      /* onAddToCart(newLicense); */
    } catch (error) {
      console.error(error);
    }
  };

  const renderImg = (
    <Box sx={{ position: 'relative', p: 1 }}>
      <Image
        alt={name}
        src={coverUrl}
        ratio="1/1"
        sx={{
          borderRadius: 1.5,
        }}
      />
    </Box>
  );

  const renderContent = (
    <Stack spacing={2.5} sx={{ p: 3, pt: 2 }}>
      <Link component={RouterLink} href={linkTo} color="inherit" variant="subtitle2" noWrap>
        {name}
      </Link>

      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {/* <ColorPreview colors={colors} /> */}

        <Stack direction="row" spacing={0.5} sx={{ typography: 'subtitle1' }}>

          <Typography
            variant="caption"
            component="div"
            sx={{
              mb: 1,
              color: 'text.disabled',
              ...((latestLicenseLarge || latestLicenseSmall) && {
                opacity: 0.64,
                color: 'common.white',
              }),
            }}
          >
            {fDate(passedAt)}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Card
      sx={{
        '&:hover .add-cart-btn': {
          opacity: 1,
        },
      }}
    >
      {renderImg}

      {renderContent}
    </Card>
  );
}
