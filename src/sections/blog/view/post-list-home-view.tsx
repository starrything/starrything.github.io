'use client';

import orderBy from 'lodash/orderBy';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useDebounce } from 'src/hooks/use-debounce';

import { POST_SORT_OPTIONS } from 'src/_mock';
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
      avatarUrl: "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg",
      name: "Jonghyun"
    },
    content: "\n\n<h1>Heading H1</h1><br/><br/>\n\n<h2>Heading H2</h2><br/><br/>\n\n<h3>Heading H3</h3><br/><br/>\n\n<h4>Heading H4</h4><br/><br/>\n\n<h5>Heading H5</h5><br/><br/>\n\n<h6>Heading H6</h6><br/><br/>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Paragraph</h3><br/>\n\n\n<p>What is MTAweb Directory?</p><br/>\n\n<p>So you have heard about this site or you have been to it, but you cannot figure out what it is or what it can do. MTA web directory is the simplest way in which one can bid on a link, or a few links if they wish to do so. The link directory on MTA displays all of the links it currently has, and does so in alphabetical order, which makes it much easier for someone to find what they are looking for if it is something specific and they do not want to go through all the other sites and links as well. It allows you to start your bid at the bottom and slowly work your way to the top of the list.</p><br/>\n\n<p>With a very low costing starting bid of just $1, you are guaranteed to have a spot in MTA’s successful directory list. When you would like to increase your bid to one of the top positions, you have to know that this would be a wise decision to make as it will not only get your link to be at a higher point in the directory but it will also give you a chance to have your site advertised with the rest of the top ten on the home page of the website. This means that when visitors come to MTAweb.com, your site will be one of the first things they see. In other words, you stand a great chance at getting a comeback to your site sooner than you thought.</p><br/>\n\n<p><strong>This is strong text.</strong></p><br/>\n\n<p><em>This is italic text</em></p><br/>\n\n<p><u>This is underline text</u></p>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Unordered list</h3><br/>\n\n<ul>\n    <li>Implements\n        <a href=\"https://docs-minimals.vercel.app/introduction\">This is an external link</a>\n    </li>\n    <li>Implements\n        <a href=\"/dashboard/blog\">This is an inside link</a>\n    </li>\n    <li>Renders actual, \"native\" React DOM elements</li>\n    <li>Allows you to escape or skip HTML (try toggling the checkboxes above)</li>\n    <li>If you escape or skip the HTML, no dangerouslySetInnerHTML is used! Yay!</li>\n</ul>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Ordered list</h3>\n\n<br/>\n<ol>\n    <li>Analysis</li>\n    <li>Design</li>\n    <li>Implementation</li>\n</ol>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Blockquote</h3>\n<br/>\n\n<blockquote>Life is short, Smile while you still have teeth!&nbsp;</blockquote>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Block Code</h3>\n\n<br/>\n\n<pre class=\"ql-syntax\" spellcheck=\"false\"><span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">React</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react'</span>;\n<span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">ReactDOM</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react-dom'</span>;\n<span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">ReactMarkdown</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react-markdown'</span>;\n<span class=\"hljs-keyword\">import</span> rehypeHighlight <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'rehype-highlight'</span>;\n\n<span class=\"hljs-title class_\">ReactDOM</span>.<span class=\"hljs-title function_\">render</span>(\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">ReactMarkdown</span> <span class=\"hljs-attr\">rehypePlugins</span>=<span class=\"hljs-string\">{[rehypeHighlight]}</span>&gt;</span>{'# Your markdown here'}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">ReactMarkdown</span>&gt;</span>,\n  <span class=\"hljs-variable language_\">document</span>.<span class=\"hljs-title function_\">querySelector</span>(<span class=\"hljs-string\">'#content'</span>)\n);\n</pre>\n\n<br/>\n\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n\n<br/>\n<br/>\n<p>Why do we use it?</p>\n<br/>\n<br/>\n\n<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\n\n<br/>\n<br/>\n<p>\n<img src=https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_5.jpg />\n</p>\n<br/>\n<br/>\n\n<p>\n    It is important that you buy links because the links are what get you the results that you want. The popularity of the links that are listed in the MTA directory is in fact one of the most important factors in the performance of the search engine. Links are important and this is why you have to purchase a link in order to bid on something and the best part is that a link will only cost you $1, which is nothing compared to what you would pay if you decided to do it through any other company or website.\n</p>\n\n<br/>\n<br/>\n<p>\n    <img src=https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_14.jpg />\n</p>\n<br/>\n<br/>\n",
    coverUrl: "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_1.jpg",
    createdAt: "2023-11-29T08:32:59.689Z",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    metaDescription: "The starting point for your next project with Minimal UI Kit",
    metaKeywords: ["Fitness", "Nature", "Business"],
    metaTitle: "Minimal UI Kit",
    publish: "draft",
    tags: ["Technology", "Marketing", "Design", "Photography", "Art"],
    pageTitle: "IBK시스템 (2022.03.-2024.01.)",
    title: "ibks",
    totalComments: 0,
    totalFavorites: 0,
    totalShares: 0,
    totalViews: 0
  },
  {
    author: {
      avatarUrl: "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg",
      name: "Jonghyun"
    },
    content: "\n\n<h1>Heading H1</h1><br/><br/>\n\n<h2>Heading H2</h2><br/><br/>\n\n<h3>Heading H3</h3><br/><br/>\n\n<h4>Heading H4</h4><br/><br/>\n\n<h5>Heading H5</h5><br/><br/>\n\n<h6>Heading H6</h6><br/><br/>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Paragraph</h3><br/>\n\n\n<p>What is MTAweb Directory?</p><br/>\n\n<p>So you have heard about this site or you have been to it, but you cannot figure out what it is or what it can do. MTA web directory is the simplest way in which one can bid on a link, or a few links if they wish to do so. The link directory on MTA displays all of the links it currently has, and does so in alphabetical order, which makes it much easier for someone to find what they are looking for if it is something specific and they do not want to go through all the other sites and links as well. It allows you to start your bid at the bottom and slowly work your way to the top of the list.</p><br/>\n\n<p>With a very low costing starting bid of just $1, you are guaranteed to have a spot in MTA’s successful directory list. When you would like to increase your bid to one of the top positions, you have to know that this would be a wise decision to make as it will not only get your link to be at a higher point in the directory but it will also give you a chance to have your site advertised with the rest of the top ten on the home page of the website. This means that when visitors come to MTAweb.com, your site will be one of the first things they see. In other words, you stand a great chance at getting a comeback to your site sooner than you thought.</p><br/>\n\n<p><strong>This is strong text.</strong></p><br/>\n\n<p><em>This is italic text</em></p><br/>\n\n<p><u>This is underline text</u></p>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Unordered list</h3><br/>\n\n<ul>\n    <li>Implements\n        <a href=\"https://docs-minimals.vercel.app/introduction\">This is an external link</a>\n    </li>\n    <li>Implements\n        <a href=\"/dashboard/blog\">This is an inside link</a>\n    </li>\n    <li>Renders actual, \"native\" React DOM elements</li>\n    <li>Allows you to escape or skip HTML (try toggling the checkboxes above)</li>\n    <li>If you escape or skip the HTML, no dangerouslySetInnerHTML is used! Yay!</li>\n</ul>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Ordered list</h3>\n\n<br/>\n<ol>\n    <li>Analysis</li>\n    <li>Design</li>\n    <li>Implementation</li>\n</ol>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Blockquote</h3>\n<br/>\n\n<blockquote>Life is short, Smile while you still have teeth!&nbsp;</blockquote>\n\n<br/><br/><hr><br/><br/>\n\n<h3>Block Code</h3>\n\n<br/>\n\n<pre class=\"ql-syntax\" spellcheck=\"false\"><span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">React</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react'</span>;\n<span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">ReactDOM</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react-dom'</span>;\n<span class=\"hljs-keyword\">import</span> <span class=\"hljs-title class_\">ReactMarkdown</span> <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'react-markdown'</span>;\n<span class=\"hljs-keyword\">import</span> rehypeHighlight <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'rehype-highlight'</span>;\n\n<span class=\"hljs-title class_\">ReactDOM</span>.<span class=\"hljs-title function_\">render</span>(\n  <span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">ReactMarkdown</span> <span class=\"hljs-attr\">rehypePlugins</span>=<span class=\"hljs-string\">{[rehypeHighlight]}</span>&gt;</span>{'# Your markdown here'}<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">ReactMarkdown</span>&gt;</span>,\n  <span class=\"hljs-variable language_\">document</span>.<span class=\"hljs-title function_\">querySelector</span>(<span class=\"hljs-string\">'#content'</span>)\n);\n</pre>\n\n<br/>\n\n<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n\n<br/>\n<br/>\n<p>Why do we use it?</p>\n<br/>\n<br/>\n\n<p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\n\n<br/>\n<br/>\n<p>\n<img src=https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_5.jpg />\n</p>\n<br/>\n<br/>\n\n<p>\n    It is important that you buy links because the links are what get you the results that you want. The popularity of the links that are listed in the MTA directory is in fact one of the most important factors in the performance of the search engine. Links are important and this is why you have to purchase a link in order to bid on something and the best part is that a link will only cost you $1, which is nothing compared to what you would pay if you decided to do it through any other company or website.\n</p>\n\n<br/>\n<br/>\n<p>\n    <img src=https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_14.jpg />\n</p>\n<br/>\n<br/>\n",
    coverUrl: "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_1.jpg",
    createdAt: "2023-11-29T08:32:59.689Z",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    metaDescription: "The starting point for your next project with Minimal UI Kit",
    metaKeywords: ["Fitness", "Nature", "Business"],
    metaTitle: "Minimal UI Kit",
    publish: "draft",
    tags: ["Technology", "Marketing", "Design", "Photography", "Art"],
    pageTitle: "ILJIN C&S (2014.12.-2022.02.)",
    title: "iljin",
    totalComments: 0,
    totalFavorites: 0,
    totalShares: 0,
    totalViews: 0
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
        Blog
      </Typography>

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <PostSearch
          query={debouncedQuery}
          results={searchResults}
          onSearch={handleSearch}
          loading={searchLoading}
          hrefItem={(title: string) => paths.post.details(title)}
          /* hrefItem={(title: string) => '/post/test'} */
        />

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
