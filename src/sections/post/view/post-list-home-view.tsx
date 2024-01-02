'use client';

import orderBy from 'lodash/orderBy';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useDebounce } from 'src/hooks/use-debounce';

import { POST_SORT_OPTIONS } from 'src/_post';
import { useGetPosts, useSearchPosts } from 'src/api/blog';

import { useSettingsContext } from 'src/components/settings';

import { IPostItem } from 'src/types/blog';

import PostList from '../post-list';
import PostSort from '../post-sort';
import PostSearch from '../post-search';

// ----------------------------------------------------------------------

export default function PostListHomeView() {
  const settings = useSettingsContext();

  const [sortBy, setSortBy] = useState('latest');

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const { posts, postsLoading } = useGetPosts();
  const [myPosts, setMyPosts] = useState<any[]>([
    {
    author: {
      avatarUrl: "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg",
      name: "Jonghyun"
    },
    coverUrl: "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_2.jpg",
    createdAt: "2024-01-05T08:32:59.689Z",
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    pageTitle: "IBK시스템 (2022.03.-2024.01.)",
    title: "ibks",
  },
  {
    author: {
      avatarUrl: "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg",
      name: "Jonghyun"
    },
    coverUrl: "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_1.jpg",
    createdAt: "2022-02-14T08:32:59.689Z",
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    pageTitle: "ILJIN C&S (2014.12.-2022.02.)",
    title: "iljin",
  }
])

  const { searchResults, searchLoading } = useSearchPosts(debouncedQuery);

  const dataFiltered = applyFilter({
    inputData: myPosts,
    sortBy,
  });

  const handleSortBy = useCallback((newValue: string) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue: string) => {
    setSearchQuery(inputValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        sx={{
          my: { xs: 3, md: 5 },
        }}
      >
        Post
      </Typography>

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        {/* <PostSearch
          query={debouncedQuery}
          results={searchResults}
          onSearch={handleSearch}
          loading={searchLoading}
          hrefItem={(title: string) => paths.post.details(title)}
        /> */}

        <PostSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
      </Stack>

      {/* <PostList posts={dataFiltered} loading={postsLoading} /> */}
      <PostList posts={dataFiltered} loading={false} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({ inputData, sortBy }: { inputData: IPostItem[]; sortBy: string }) => {
  if (sortBy === 'latest') {
    return orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    return orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    return orderBy(inputData, ['totalViews'], ['desc']);
  }

  return inputData;
};
