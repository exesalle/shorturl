export const getLinks = (payload:any) =>  ({type: 'GET_LINKS', payload});



export enum VisibilityFilter {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
  SHOW_ACTIVE = 'SHOW_ACTIVE'
}
