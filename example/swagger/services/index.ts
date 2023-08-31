/** Generate by swagger-http-codegen */
// @ts-nocheck
/* eslint-disable */

import { IRequestOptions, IRequestConfig, IFetchConfig, getConfigs } from './serviceOptions';

export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
export interface JsonResult<T> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

export const couponService = (fetch: IFetchConfig) => ({
  /**
   * UpdateCoupon CouponService
   */
  coupon(
    params: {
      /** :id */
      id: string;
      /** name */
      name: string;
      /** description */
      description: string;
      /** image */
      image: string;
      /** couponValidIn */
      couponValidIn: number;
      /** userCouponValidIn */
      userCouponValidIn: number;
      /** status */
      status: string;
      /** type */
      type: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UpdateCouponResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/coupon/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = {
        name: params['name'],
        description: params['description'],
        image: params['image'],
        couponValidIn: params['couponValidIn'],
        userCouponValidIn: params['userCouponValidIn'],
        status: params['status'],
        type: params['type']
      };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * DeleteCoupon CouponService
   */
  coupon1(
    params: {
      /** :id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<DeleteCouponResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/coupon/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  }
});

export const marketService = (fetch: IFetchConfig) => ({
  /**
   * GetBoughtCouponHistories MarketService
   */
  histories(
    params: {
      /** :id */
      id: string;
      /** page */
      page?: number;
      /** pageSize */
      pageSize?: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GetBoughtCouponHistoriesResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/coupon/{id}/histories';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], pageSize: params['pageSize'] };

      /**  Adapt to ios13, get request does not allow body */

      fetch(configs, resolve, reject);
    });
  },
  /**
   * UserBuyCoupon MarketService
   */
  buyCoupon(
    params: {
      /** userId */
      userId: string;
      /** couponId */
      couponId: string;
      /** point */
      point: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UserBuyCouponResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/marketplace/buy-coupon';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = { userId: params['userId'], couponId: params['couponId'], point: params['point'] };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  }
});

export const locationService = (fetch: IFetchConfig) => ({
  /**
   * Update LocationService
   */
  location(
    params: {
      /** :id */
      id: string;
      /** name */
      name?: string;
      /** address */
      address?: string;
      /** lat */
      lat?: number;
      /** long */
      long?: number;
      /** image */
      image?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<UpdateLocationResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/location/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = {
        name: params['name'],
        address: params['address'],
        lat: params['lat'],
        long: params['long'],
        image: params['image']
      };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * Delete LocationService
   */
  location1(
    params: {
      /** :id */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<DeleteLocationResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/location/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  }
});

export const userService = (fetch: IFetchConfig) => ({
  /**
   * Get UserService
   */
  user(options: IRequestOptions = {}): Promise<GetUserResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /**  Adapt to ios13, get request does not allow body */

      fetch(configs, resolve, reject);
    });
  }
});

export const services = (fetch: IFetchConfig) => ({
  couponService: couponService(fetch),
  marketService: marketService(fetch),
  locationService: locationService(fetch),
  userService: userService(fetch)
});

export interface CreateCouponResponse {
  /**  */
  data?: string;
}

export interface CreateLocationResponse {
  /**  */
  data?: string;

  /**  */
  success?: boolean;
}

export interface DeleteCouponResponse {}

export interface DeleteLocationResponse {
  /**  */
  data?: string;

  /**  */
  success?: boolean;
}

export interface GetBoughtCouponHistoriesResponse {
  /**  */
  data?: BoughtCouponHistory[];

  /**  */
  total?: number;
}

export interface GetLocationResponse {
  /**  */
  data?: Location[];

  /**  */
  success?: boolean;
}

export interface GetMarketListByTypeResponse {
  /**  */
  data?: Coupon[];

  /**  */
  total?: number;
}

export interface GetUserResponse {
  /**  */
  data?: string;

  /**  */
  success?: boolean;
}

export interface UpdateCouponResponse {}

export interface UpdateLocationResponse {
  /**  */
  data?: string;

  /**  */
  success?: boolean;
}

export interface UserBuyCouponResponse {}

export interface BoughtCouponHistory {
  /**  */
  coupon?: Coupon;

  /**  */
  couponId?: string;

  /**  */
  createdAt?: string;

  /**  */
  id?: string;

  /**  */
  point?: number;

  /**  */
  user?: User;

  /**  */
  userId?: string;
}

export interface Coupon {
  /**  */
  couponValidIn?: number;

  /**  */
  createdAt?: string;

  /**  */
  description?: string;

  /**  */
  id?: string;

  /**  */
  image?: string;

  /**  */
  name?: string;

  /**  */
  status?: CouponStatus;

  /**  */
  type?: CouponType;

  /**  */
  updatedAt?: string;

  /**  */
  userCoupon?: UserCoupon[];

  /**  */
  userCouponValidIn?: number;
}

export interface Location {
  /**  */
  address?: string;

  /**  */
  createdAt?: string;

  /**  */
  id?: string;

  /**  */
  image?: string;

  /**  */
  lat?: number;

  /**  */
  long?: number;

  /**  */
  name?: string;

  /**  */
  updatedAt?: string;
}

export interface User {
  /**  */
  email?: string;

  /**  */
  id?: string;

  /**  */
  userCoupon?: UserCoupon[];
}

export interface UserCoupon {
  /**  */
  coupon?: Coupon;

  /**  */
  couponId?: string;

  /**  */
  createdAt?: string;

  /**  */
  id?: string;

  /**  */
  status?: UserCouponStatus;

  /**  */
  updatedAt?: string;

  /**  */
  user?: User;

  /**  */
  userId?: string;
}

export enum CouponStatus {
  'ON_GOING' = 'ON_GOING',
  'ENDED' = 'ENDED'
}

export enum CouponType {
  'NFT' = 'NFT',
  'COUPON' = 'COUPON'
}

export enum UserCouponStatus {
  'COUPON_AVAILABLE' = 'COUPON_AVAILABLE',
  'COUPON_USED' = 'COUPON_USED'
}
