'use client';

import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';

import { useGetLicenses, useSearchLicenses } from 'src/api/license';
import {
  LICENSE_SORT_OPTIONS,
} from 'src/_mock';

import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';

import { ILicenseItem, ILicenseFilters, ILicenseFilterValue } from 'src/types/license';

import LicenseList from '../license-list';
import LicenseSort from '../license-sort';
import LicenseFiltersResult from '../license-filters-result';

// ----------------------------------------------------------------------

const defaultFilters: ILicenseFilters = {
};

// ----------------------------------------------------------------------

export default function LicenseView() {
  const settings = useSettingsContext();

  /* const checkout = useCheckoutContext(); */

  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('latest');

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const [filters, setFilters] = useState(defaultFilters);

  const { licenses, licensesLoading, licensesEmpty } = useGetLicenses();
  const [myLicenses, setMyLicenses] = useState<any>({
    "licenses": [
      {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
        "publish": "draft",
        "category": "finance",
        "images": [
          "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg",
        ],
        "tags": [
          "Technology",
          "Marketing",
          "Design",
          "Photography",
          "Art"
        ],
        "code": "38BEE270",
        "description": "\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>",
        "createdAt": "2023-12-14T07:00:16.801Z",
        "passedAt": "2023-08-11T10:00:00.000Z",
        "name": "AFPK(재무설계)",
        "coverUrl": "/assets/images/license/afpk/afpk_logo.png",
        "subDescription": "AFPK 인증자는 재무설계업무에 관한 서비스를 제공할 수 있는 전문성과 고객의 이익을 우선으로 하는 윤리성을 지닌 전문가 입니다.",
      },
      {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
        "publish": "draft",
        "category": "it",
        "images": [
          "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg",
        ],
        "tags": [
          "Technology",
          "Marketing",
          "Design",
          "Photography",
          "Art"
        ],
        "code": "38BEE270",
        "description": "\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>",
        "createdAt": "2023-12-14T07:00:16.801Z",
        "passedAt": "2023-04-14T10:00:00.000Z",
        "name": "SQLD(SQL개발자)",
        "coverUrl": "/assets/images/license/sqld/sql_logo.png",
        "subDescription": "데이터를 조작하고 추출하는데 있어서 정확하고 최적의 성능을 발휘하는 SQL을 작성할 수 있는 개발자",
      },
      {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
        "publish": "draft",
        "category": "finance",
        "images": [
          "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg",
        ],
        "tags": [
          "Technology",
          "Marketing",
          "Design",
          "Photography",
          "Art"
        ],
        "code": "38BEE270",
        "description": "\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>",
        "createdAt": "2023-12-14T07:00:16.801Z",
        "passedAt": "2022-12-08T10:00:00.000Z",
        "name": "투자자산운용사",
        "coverUrl": "/assets/images/license/cim/investment_logo.png",
        "subDescription": "집합투자재산, 신탁재산 또는 투자일임재산을 운용하는 업무를 수행하는 자",
      },
      {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
        "publish": "draft",
        "category": "it",
        "images": [
          "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg",
        ],
        "tags": [
          "Technology",
          "Marketing",
          "Design",
          "Photography",
          "Art"
        ],
        "code": "38BEE270",
        "description": "\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>",
        "createdAt": "2023-12-14T07:00:16.801Z",
        "passedAt": "2017-04-04T10:00:00.000Z",
        "name": "ADsP(데이터분석 준전문가)",
        "coverUrl": "/assets/images/license/data/data_logo.png",
        "subDescription": "데이터 이해에 대한 기본지식을 바탕으로 데이터분석 기획 및 데이터분석 등의 직무를 수행하는 실무자를 말한다.",
      },
      {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
        "publish": "draft",
        "category": "it",
        "images": [
          "https://api-prod-minimal-v510.vercel.app/assets/images/m_product/product_1.jpg",
        ],
        "tags": [
          "Technology",
          "Marketing",
          "Design",
          "Photography",
          "Art"
        ],
        "code": "38BEE270",
        "description": "\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>",
        "createdAt": "2023-12-14T07:00:16.801Z",
        "passedAt": "2014-08-22T10:00:00.000Z",
        "name": "정보처리기사",
        "coverUrl": "/assets/images/license/tech/diagram.png",
        "subDescription": "컴퓨터에 관한 전문적인 지식과 기술을 갖춘 사람",
      },
    ]
  })

  const { searchResults, searchLoading } = useSearchLicenses(debouncedQuery);

  const handleFilters = useCallback((name: string, value: ILicenseFilterValue) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const dataFiltered = applyFilter({
    inputData: /* licenses */myLicenses.licenses,
    filters,
    sortBy,
  });

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = !dataFiltered.length && canReset;

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue: string) => {
    setSearchQuery(inputValue);
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >

      <Stack direction="row" spacing={1} flexShrink={0}>
        {/* <ProductFilters
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          //
          filters={filters}
          onFilters={handleFilters}
          //
          canReset={canReset}
          onResetFilters={handleResetFilters}
          //
          colorOptions={PRODUCT_COLOR_OPTIONS}
          ratingOptions={PRODUCT_RATING_OPTIONS}
          genderOptions={PRODUCT_GENDER_OPTIONS}
          categoryOptions={['all', ...PRODUCT_CATEGORY_OPTIONS]}
        /> */}

        <LicenseSort sort={sortBy} onSort={handleSortBy} sortOptions={LICENSE_SORT_OPTIONS} />
      </Stack>
    </Stack>
  );

  /* const renderResults = (
    <LicenseFiltersResult
      filters={filters}
      onFilters={handleFilters}
      //
      canReset={canReset}
      onResetFilters={handleResetFilters}
      //
      results={dataFiltered.length}
    />
  ); */

  const renderNotFound = <EmptyContent filled title="No Data" sx={{ py: 10 }} />;

  return (
    <Container
      maxWidth={settings.themeStretch ? false : 'lg'}
      sx={{
        mb: 15,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          my: { xs: 3, md: 5 },
        }}
      >
        License
      </Typography>

      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}

        {/* {canReset && renderResults} */}
      </Stack>

      {/* {(notFound || licensesEmpty) && renderNotFound} */}

      <LicenseList licenses={dataFiltered} loading={false} />
    </Container>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  filters,
  sortBy,
}: {
  inputData: ILicenseItem[];
  filters: ILicenseFilters;
  sortBy: string;
}) {
  const { } = filters;

  /* const min = priceRange[0];

  const max = priceRange[1]; */

  // SORT BY
  if (sortBy === 'latest') {
    return orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    return orderBy(inputData, ['createdAt'], ['asc']);
  }

  // FILTERS
  /* if (gender.length) {
    inputData = inputData.filter((product) => gender.includes(product.gender));
  }

  if (category !== 'all') {
    inputData = inputData.filter((product) => product.category === category);
  }

  if (colors.length) {
    inputData = inputData.filter((product) =>
      product.colors.some((color) => colors.includes(color))
    );
  }

  if (min !== 0 || max !== 200) {
    inputData = inputData.filter((product) => product.price >= min && product.price <= max);
  }

  if (rating) {
    inputData = inputData.filter((product) => {
      const convertRating = (value: string) => {
        if (value === 'up4Star') return 4;
        if (value === 'up3Star') return 3;
        if (value === 'up2Star') return 2;
        return 1;
      };
      return product.totalRatings > convertRating(rating);
    });
  } */

  return inputData;
}
