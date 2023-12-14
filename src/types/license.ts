// ----------------------------------------------------------------------

export type ILicenseFilterValue = string | string[] | number | number[];

export type ILicenseFilters = {
};

// ----------------------------------------------------------------------

export type IProductReviewNewForm = {
  rating: number | null;
  review: string;
  name: string;
  email: string;
};

export type IProductReview = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
  avatarUrl: string;
  isPurchased: boolean;
  attachments?: string[];
  postedAt: Date;
};

export type ILicenseItem = {
  id: string;
  name: string;
  code: string;
  tags: string[];
  publish: string;
  coverUrl: string;
  images: string[];
  category: string;
  description: string;
  subDescription: string;
  createdAt: Date;
  passedAt: Date;
  index: number;
};

export type IProductTableFilterValue = string | string[];

export type IProductTableFilters = {
  name: string;
  stock: string[];
  publish: string[];
};
