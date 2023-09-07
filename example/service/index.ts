/** Generate by swagger-http-codegen */
// @ts-nocheck
/* eslint-disable */

import { IRequestOptions, IRequestConfig, IFetchConfig, getConfigs } from './service-options';

export const basePath = '';
// empty

export const couponServicePath = {
  createCouponPath: '/coupon',
  updateCouponPath: '/coupon/{id}',
  deleteCouponPath: '/coupon/{id}'
} as const;

export const couponService = (fetch: IFetchConfig) => ({
  ...couponServicePath,

  /**
   * CreateCoupon CouponService
   */
  createCoupon(
    params: {
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
  ): Promise<CreateCouponResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/coupon/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

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
   * UpdateCoupon CouponService
   */
  updateCoupon(
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
  deleteCoupon(
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

export const marketServicePath = {
  getBoughtCouponHistoriesMarketPath: '/coupon/{id}/histories',
  getMarketListByTypeMarketPath: '/marketplace',
  userBuyCouponMarketPath: '/marketplace/buy-coupon'
} as const;

export const marketService = (fetch: IFetchConfig) => ({
  ...marketServicePath,

  /**
   * GetBoughtCouponHistories MarketService
   */
  getBoughtCouponHistoriesMarket(
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
   * GetMarketListByType MarketService
   */
  getMarketListByTypeMarket(
    params: {
      /** page */
      page?: number;
      /** pageSize */
      pageSize?: number;
      /** search */
      search?: string;
      /** sortField */
      sortField?: string;
      /** sortOrder */
      sortOrder?: string;
      /** type */
      type: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GetMarketListByTypeResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/marketplace/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        page: params['page'],
        pageSize: params['pageSize'],
        search: params['search'],
        sortField: params['sortField'],
        sortOrder: params['sortOrder'],
        type: params['type']
      };

      /**  Adapt to ios13, get request does not allow body */

      fetch(configs, resolve, reject);
    });
  },
  /**
   * UserBuyCoupon MarketService
   */
  userBuyCouponMarket(
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

export const locationServicePath = {
  getLocationPath: '/location',
  createLocationPath: '/location',
  updateLocationPath: '/location/{id}',
  deleteLocationPath: '/location/{id}'
} as const;

export const locationService = (fetch: IFetchConfig) => ({
  ...locationServicePath,

  /**
   * Get LocationService
   */
  getLocation(
    params: {
      /** name */
      name?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<GetLocationResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/location/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { name: params['name'] };

      /**  Adapt to ios13, get request does not allow body */

      fetch(configs, resolve, reject);
    });
  },
  /**
   * Create LocationService
   */
  createLocation(
    params: {
      /** name */
      name: string;
      /** address */
      address: string;
      /** lat */
      lat: number;
      /** long */
      long: number;
      /** image */
      image: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<CreateLocationResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/location/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

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
   * Update LocationService
   */
  updateLocation(
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
  deleteLocation(
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

export const userServicePath = {
  getUserPath: '/user'
} as const;

export const userService = (fetch: IFetchConfig) => ({
  ...userServicePath,

  /**
   * Get UserService
   */
  getUser(options: IRequestOptions = {}): Promise<GetUserResponse> {
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
