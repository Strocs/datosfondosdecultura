import { Project } from '@/types/projects';

interface QueryParams {
  page: number;
  limit: number;
  region: string;
  type: string;
  line: string;
  sortBy: keyof Project | '';
  order: 'asc' | 'desc';
}

export function parseQueryParams(searchParams: URLSearchParams): QueryParams {

  return {
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '20'),
    region: searchParams.get('region') || '',
    type: searchParams.get('type') || '',
    line: searchParams.get('line') || '',
    sortBy: searchParams.get('sortBy') as keyof Project || '',
    order: (searchParams.get('order') || 'asc') as 'asc' | 'desc',
  };
}