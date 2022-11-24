import { axiosRequest } from '../../axiosConfig';

export interface IAdminArticleCategory {
  id: string;
  name: string;
  isEnabled: boolean;
}

export interface IAdminArticleMediaContent {
  id: string;
  fileName: string;
  filePath: string;
}

export interface IAdminArticle {
  id: string;
  title: string;
  description: string;
  type: string;
  category: IAdminArticleCategory;
  mediaContent: IAdminArticleMediaContent;
}

export interface IAdminArticlesPageResponse {
  pageNumber: number;
  filteredCount: number;
  entities: IAdminArticle[];
}

export const getAdminArticles = async (
  pageParam: number,
  search: string
): Promise<IAdminArticlesPageResponse> => {
  const searchParam = search ? `&SearchTerm=${search}` : '';
  const baseUrl =
    `/api/admin/articles/PaginatedArticles?PageSize=9&PageNumber=${pageParam}` +
    searchParam;

  const { data } = await axiosRequest('GET', baseUrl);

  return data;
};
