import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

import { ILicenseItem } from 'src/types/license';

// ----------------------------------------------------------------------

export function useGetLicenses() {
  const URL = endpoints.license.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      licenses: (data?.licenses as ILicenseItem[]) || [],
      licensesLoading: isLoading,
      licensesError: error,
      licensesValidating: isValidating,
      licensesEmpty: !isLoading && !data?.licenses.length,
    }),
    [data?.licenses, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetLicense(licenseId: string) {
  const URL = licenseId ? [endpoints.license.details, { params: { licenseId } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      license: data?.license as ILicenseItem,
      licenseLoading: isLoading,
      licenseError: error,
      licenseValidating: isValidating,
    }),
    [data?.license, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useSearchLicenses(query: string) {
  const URL = query ? [endpoints.license.search, { params: { query } }] : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: (data?.results as ILicenseItem[]) || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}
