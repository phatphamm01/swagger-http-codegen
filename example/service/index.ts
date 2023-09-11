/** Generate by swagger-http-codegen */
// @ts-nocheck
/* eslint-disable */

import { IRequestConfig, IFetchConfig, getConfigs } from './service-options';

export const basePath = '';
// empty

export const adminServicePath = {
  editAdminPath: '/admin/change-info',
  forgotPwdAdminPath: '/admin/forgot-pwd',
  getMyProfileAdminPath: '/admin/my-profile',
  genNewPasswordAdminPath: '/admin/set-up',
  signInAdminPath: '/admin/sign-in',
  addNewAdminPath: '/superadmin/add-new-admin',
  getAdminPath: '/superadmin/get-list-admin',
  removeAdminPath: '/superadmin/remove-admin/{id}'
} as const;

export const adminService = (fetch: IFetchConfig) => ({
  ...adminServicePath,

  /**
   * EditAdmin AdminService
   */
  editAdmin(
    params: {
      /** name */
      name?: string;
    } = {} as any
  ): Promise<EditAdminResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/change-info';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = { name: params['name'] };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * ForgotPwd AdminService
   */
  forgotPwdAdmin(
    params: {
      /** email */
      email: string;
    } = {} as any
  ): Promise<ForgotPwdResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/forgot-pwd';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = { email: params['email'] };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * GetMyProfile AdminService
   */
  getMyProfileAdmin(): Promise<GetMyProfileResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/my-profile';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /**  Adapt to ios13, get request does not allow body */

      fetch(configs, resolve, reject);
    });
  },
  /**
   * GenNewPassword AdminService
   */
  genNewPasswordAdmin(
    params: {
      /** password */
      password: string;
    } = {} as any
  ): Promise<GenNewPasswordResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/set-up';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = { password: params['password'] };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * SignIn AdminService
   */
  signInAdmin(
    params: {
      /** email */
      email: string;
      /** password */
      password: string;
    } = {} as any
  ): Promise<SignInResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/admin/sign-in';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = { email: params['email'], password: params['password'] };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * AddNewAdmin AdminService
   */
  addNewAdmin(
    params: {
      /** email */
      email: string;
      /** role */
      role: 'SuperAdmin' | 'Admin';
    } = {} as any
  ): Promise<AddNewAdminResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/superadmin/add-new-admin';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = { email: params['email'], role: params['role'] };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * GetAdmin AdminService
   */
  getAdmin(
    params: {
      /** name */
      name?: string;
      /** email */
      email?: string;
      /** page */
      page: number;
      /** pageSize */
      pageSize: number;
    } = {} as any
  ): Promise<GetAdminResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/superadmin/get-list-admin';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        name: params['name'],
        email: params['email'],
        page: params['page'],
        pageSize: params['pageSize']
      };

      /**  Adapt to ios13, get request does not allow body */

      fetch(configs, resolve, reject);
    });
  },
  /**
   * RemoveAdmin AdminService
   */
  removeAdmin(
    params: {
      /** :id */
      id: string;
    } = {} as any
  ): Promise<RemoveAdminResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/superadmin/remove-admin/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = {};

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  }
});

export const couponServicePath = {
  getListCouponPath: '/coupon',
  createCouponPath: '/coupon',
  updateCouponPromotionCouponPath: '/coupon/update-promotion',
  updateCouponStatusCouponPath: '/coupon/update-status',
  getByIdCouponPath: '/coupon/{id}',
  updateCouponPath: '/coupon/{id}',
  deleteCouponPath: '/coupon/{id}'
} as const;

export const couponService = (fetch: IFetchConfig) => ({
  ...couponServicePath,

  /**
   * GetListCoupon CouponService
   */
  getListCoupon(
    params: {
      /** page */
      page: number;
      /** pageSize */
      pageSize: number;
      /** search */
      search?: string;
      /** status */
      status: 'ON_GOING' | 'ENDED';
      /** sortField */
      sortField?: 'category' | 'point' | 'remaining' | 'coupon_expired_at' | 'is_promotion';
      /** sortOrder */
      sortOrder?: 'asc' | 'desc';
    } = {} as any
  ): Promise<GetListCouponResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/coupon/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        page: params['page'],
        pageSize: params['pageSize'],
        search: params['search'],
        status: params['status'],
        sortField: params['sortField'],
        sortOrder: params['sortOrder']
      };

      /**  Adapt to ios13, get request does not allow body */

      fetch(configs, resolve, reject);
    });
  },
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
      /** couponExpiredAt */
      couponExpiredAt: number;
      /** couponStartAt */
      couponStartAt: number;
      /** userCouponValidIn */
      userCouponValidIn: number;
      /** total */
      total: number;
      /** status */
      status: 'ON_GOING' | 'ENDED';
      /** categoryId */
      categoryId: string;
      /** affiliateLink */
      affiliateLink: string;
      /** affiliateCode */
      affiliateCode: string;
    } = {} as any
  ): Promise<CreateCouponResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/coupon/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = {
        name: params['name'],
        description: params['description'],
        image: params['image'],
        couponExpiredAt: params['couponExpiredAt'],
        couponStartAt: params['couponStartAt'],
        userCouponValidIn: params['userCouponValidIn'],
        total: params['total'],
        status: params['status'],
        categoryId: params['categoryId'],
        affiliateLink: params['affiliateLink'],
        affiliateCode: params['affiliateCode']
      };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * UpdateCouponPromotion CouponService
   */
  updateCouponPromotionCoupon(
    params: {
      /** couponId */
      couponId: string;
      /** isPromotion */
      isPromotion: boolean;
    } = {} as any
  ): Promise<UpdateCouponPromotionResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/coupon/update-promotion';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = { couponId: params['couponId'], isPromotion: params['isPromotion'] };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * UpdateCouponStatus CouponService
   */
  updateCouponStatusCoupon(
    params: {
      /** couponId */
      couponId: string;
      /** status */
      status: 'ON_GOING' | 'ENDED';
    } = {} as any
  ): Promise<UpdateCouponStatusResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/coupon/update-status';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = { couponId: params['couponId'], status: params['status'] };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * GetById CouponService
   */
  getByIdCoupon(
    params: {
      /** :id */
      id: string;
    } = {} as any
  ): Promise<GetByIdResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/coupon/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /**  Adapt to ios13, get request does not allow body */

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
      /** couponExpiredAt */
      couponExpiredAt: number;
      /** couponStartAt */
      couponStartAt: number;
      /** userCouponValidIn */
      userCouponValidIn: number;
      /** total */
      total: number;
      /** status */
      status: 'ON_GOING' | 'ENDED';
      /** categoryId */
      categoryId: string;
      /** affiliateLink */
      affiliateLink: string;
      /** affiliateCode */
      affiliateCode: string;
    } = {} as any
  ): Promise<UpdateCouponResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/coupon/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = {
        name: params['name'],
        description: params['description'],
        image: params['image'],
        couponExpiredAt: params['couponExpiredAt'],
        couponStartAt: params['couponStartAt'],
        userCouponValidIn: params['userCouponValidIn'],
        total: params['total'],
        status: params['status'],
        categoryId: params['categoryId'],
        affiliateLink: params['affiliateLink'],
        affiliateCode: params['affiliateCode']
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
    } = {} as any
  ): Promise<DeleteCouponResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/coupon/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = {};

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  }
});

export const marketServicePath = {
  getBoughtCouponHistoriesMarketPath: '/coupon/{id}/histories',
  getMarketListByCategoryMarketPath: '/marketplace',
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
      page: number;
      /** pageSize */
      pageSize: number;
    } = {} as any
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
   * GetMarketListByCategory MarketService
   */
  getMarketListByCategoryMarket(
    params: {
      /** page */
      page: number;
      /** pageSize */
      pageSize: number;
      /** search */
      search?: string;
      /** sortField */
      sortField?: string;
      /** sortOrder */
      sortOrder?: string;
      /** category */
      category: string;
    } = {} as any
  ): Promise<GetMarketListByCategoryResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/marketplace/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        page: params['page'],
        pageSize: params['pageSize'],
        search: params['search'],
        sortField: params['sortField'],
        sortOrder: params['sortOrder'],
        category: params['category']
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
    } = {} as any
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

export const ggMapServicePath = {
  findPlaceGgMapPath: '/ggmap/find-place',
  findRouteGgMapPath: '/ggmap/find-route',
  geocodingGgMapPath: '/ggmap/geocoding',
  getPlaceDetailGgMapPath: '/ggmap/place-detail'
} as const;

export const ggMapService = (fetch: IFetchConfig) => ({
  ...ggMapServicePath,

  /**
   * FindPlace GgMapService
   */
  findPlaceGgMap(
    params: {
      /** input */
      input: string;
    } = {} as any
  ): Promise<FindPlaceResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/ggmap/find-place';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = { input: params['input'] };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * FindRoute GgMapService
   */
  findRouteGgMap(
    params: {
      /** origin */
      origin: string;
      /** destination */
      destination: string;
    } = {} as any
  ): Promise<FindRouteResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/ggmap/find-route';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = { origin: params['origin'], destination: params['destination'] };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * Geocoding GgMapService
   */
  geocodingGgMap(
    params: {
      /** latlong */
      latlong: LatLng;
    } = {} as any
  ): Promise<GeocodingResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/ggmap/geocoding';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = { latlong: params['latlong'] };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * GetPlaceDetail GgMapService
   */
  getPlaceDetailGgMap(
    params: {
      /** placeId */
      placeId: string;
    } = {} as any
  ): Promise<GetPlaceDetailResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/ggmap/place-detail';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = { placeId: params['placeId'] };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  }
});

export const locationServicePath = {
  getLocationPath: '/location',
  createLocationPath: '/location',
  getDetailLocationPath: '/location/{id}',
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
      /** country */
      country?: string;
      /** city */
      city?: string;
      /** name */
      name?: string;
      /** page */
      page: number;
      /** pageSize */
      pageSize: number;
    } = {} as any
  ): Promise<GetLocationResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/location/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = {
        country: params['country'],
        city: params['city'],
        name: params['name'],
        page: params['page'],
        pageSize: params['pageSize']
      };

      /**  Adapt to ios13, get request does not allow body */

      fetch(configs, resolve, reject);
    });
  },
  /**
   * Create LocationService
   */
  createLocation(
    params: {
      /** country */
      country: string;
      /** city */
      city: string;
      /** name */
      name: string;
      /** address */
      address: string;
      /** lat */
      lat: number;
      /** long */
      long: number;
      /** placeId */
      placeId?: string;
      /** image */
      image: string;
      /** point */
      point: number;
      /** rewards */
      rewards: CreateRewardInput[];
    } = {} as any
  ): Promise<CreateLocationResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/location/';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = {
        country: params['country'],
        city: params['city'],
        name: params['name'],
        address: params['address'],
        lat: params['lat'],
        long: params['long'],
        placeId: params['placeId'],
        image: params['image'],
        point: params['point'],
        rewards: params['rewards']
      };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * GetDetail LocationService
   */
  getDetailLocation(
    params: {
      /** :id */
      id: string;
    } = {} as any
  ): Promise<GetDetailResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/location/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /**  Adapt to ios13, get request does not allow body */

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
      /** country */
      country: string;
      /** city */
      city: string;
      /** name */
      name: string;
      /** address */
      address: string;
      /** lat */
      lat: number;
      /** long */
      long: number;
      /** placeId */
      placeId?: string;
      /** image */
      image: string;
      /** point */
      point: number;
    } = {} as any
  ): Promise<UpdateLocationResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/location/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = {
        country: params['country'],
        city: params['city'],
        name: params['name'],
        address: params['address'],
        lat: params['lat'],
        long: params['long'],
        placeId: params['placeId'],
        image: params['image'],
        point: params['point']
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
    } = {} as any
  ): Promise<DeleteLocationResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/location/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = {};

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  }
});

export const rewardServicePath = {
  getRewardPath: '/location/{locationId}/reward',
  replaceAllRewardPath: '/location/{locationId}/reward',
  createRewardPath: '/location/{locationId}/reward',
  deleteRewardPath: '/location/{locationId}/reward/{id}',
  updateRewardPath: '/location/{locationId}/reward/{id}'
} as const;

export const rewardService = (fetch: IFetchConfig) => ({
  ...rewardServicePath,

  /**
   * Get RewardService
   */
  getReward(
    params: {
      /** :locationId */
      locationId: string;
      /** page */
      page: number;
      /** pageSize */
      pageSize: number;
    } = {} as any
  ): Promise<GetRewardResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/location/{locationId}/reward/';
      url = url.replace('{locationId}', params['locationId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { page: params['page'], pageSize: params['pageSize'] };

      /**  Adapt to ios13, get request does not allow body */

      fetch(configs, resolve, reject);
    });
  },
  /**
   * ReplaceAll RewardService
   */
  replaceAllReward(
    params: {
      /** :locationId */
      locationId: string;
      /** rewards */
      rewards?: CreateRewardInput[];
    } = {} as any
  ): Promise<ReplaceAllResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/location/{locationId}/reward/';
      url = url.replace('{locationId}', params['locationId'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = { rewards: params['rewards'] };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * Create RewardService
   */
  createReward(
    params: {
      /** :locationId */
      locationId: string;
      /** rewards */
      rewards?: CreateRewardInput[];
    } = {} as any
  ): Promise<CreateRewardResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/location/{locationId}/reward/';
      url = url.replace('{locationId}', params['locationId'] + '');

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = { rewards: params['rewards'] };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * Delete RewardService
   */
  deleteReward(
    params: {
      /** :locationId */
      locationId: string;
      /** :id */
      id: string;
    } = {} as any
  ): Promise<DeleteRewardResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/location/{locationId}/reward/{id}';
      url = url.replace('{locationId}', params['locationId'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = {};

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  },
  /**
   * Update RewardService
   */
  updateReward(
    params: {
      /** :locationId */
      locationId: string;
      /** :id */
      id: string;
      /** name */
      name?: string;
      /** image */
      image?: string;
      /** rate */
      rate?: number;
    } = {} as any
  ): Promise<UpdateRewardResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/location/{locationId}/reward/{id}';
      url = url.replace('{locationId}', params['locationId'] + '');
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

      let data = { name: params['name'], image: params['image'], rate: params['rate'] };

      configs.data = data;

      fetch(configs, resolve, reject);
    });
  }
});

export const s3ServicePath = {
  getSignedUrls3Path: '/s3/get-signed-url'
} as const;

export const s3Service = (fetch: IFetchConfig) => ({
  ...s3ServicePath,

  /**
   * GetSignedURL S3Service
   */
  getSignedUrls3(
    params: {
      /** contentType */
      contentType: string;
    } = {} as any
  ): Promise<GetSignedURLResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/s3/get-signed-url';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = { contentType: params['contentType'] };

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
  getUser(): Promise<GetUserResponse> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/user/';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /**  Adapt to ios13, get request does not allow body */

      fetch(configs, resolve, reject);
    });
  }
});

export const services = (fetch: IFetchConfig) => ({
  adminService: adminService(fetch),
  couponService: couponService(fetch),
  marketService: marketService(fetch),
  ggMapService: ggMapService(fetch),
  locationService: locationService(fetch),
  rewardService: rewardService(fetch),
  s3Service: s3Service(fetch),
  userService: userService(fetch)
});

export interface AddNewAdminResponse {
  /**  */
  data?: Admin;

  /**  */
  success?: boolean;
}

export interface Admin {
  /**  */
  active?: boolean;

  /**  */
  createdAt?: string;

  /**  */
  email?: string;

  /**  */
  id: string;

  /**  */
  name?: string;

  /**  */
  password?: string;

  /**  */
  role: Role;

  /**  */
  updatedAt?: string;
}

export interface BoughtCouponHistory {
  /**  */
  coupon?: Coupon;

  /**  */
  couponId?: string;

  /**  */
  createdAt: string;

  /**  */
  id: string;

  /**  */
  point: number;

  /**  */
  user?: User;

  /**  */
  userId?: string;
}

export interface Category {
  /**  */
  id: string;

  /**  */
  name?: string;
}

export interface CheckInHistory {
  /**  */
  createdAt: string;

  /**  */
  id: string;

  /**  */
  locationId?: string;

  /**  */
  updatedAt: string;

  /**  */
  userId?: string;
}

export interface Coupon {
  /**  */
  affiliateCode: string;

  /**  */
  affiliateLink: string;

  /**  */
  category?: Category;

  /**  */
  categoryId: string;

  /**  */
  couponExpiredAt: number;

  /**  */
  couponStartAt: number;

  /**  */
  createdAt: string;

  /**  */
  description: string;

  /**  */
  id: string;

  /**  */
  image: string;

  /**  */
  isPromotion?: boolean;

  /**  */
  name: string;

  /**  */
  remaining: number;

  /**  */
  status: CouponStatus;

  /**  */
  total: number;

  /**  */
  updatedAt: string;

  /**  */
  userCouponValidIn: number;

  /**  */
  userCoupons?: UserCoupon[];
}

export interface CreateCouponResponse {
  /**  */
  data?: string;
}

export interface CreateLocationResponse {
  /**  */
  data?: Location;

  /**  */
  success?: boolean;
}

export interface CreateRewardInput {
  /**  */
  image: string;

  /**  */
  name: string;

  /**  */
  rate: number;
}

export interface CreateRewardResponse {
  /**  */
  data?: Reward[];

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

export interface DeleteRewardResponse {
  /**  */
  message?: string;

  /**  */
  success?: boolean;
}

export interface EditAdminData {
  /**  */
  active?: string;

  /**  */
  email?: string;

  /**  */
  id?: string;

  /**  */
  name?: string;

  /**  */
  role?: string;
}

export interface EditAdminResponse {
  /**  */
  data?: EditAdminData;

  /**  */
  success?: boolean;
}

export interface FindPlaceResponse {
  /**  */
  data?: FindPlaceFromTextResponse;

  /**  */
  success?: boolean;
}

export interface FindRouteGgMapData {
  /**  */
  geocodedWaypoints?: Route;

  /**  */
  routes?: Route;
}

export interface FindRouteResponse {
  /**  */
  data?: FindRouteGgMapData;

  /**  */
  success?: boolean;
}

export interface ForgotPwdResponse {
  /**  */
  data?: Admin;

  /**  */
  success?: boolean;
}

export interface GenNewPasswordResponse {
  /**  */
  data?: Admin;

  /**  */
  success?: boolean;
}

export interface GeocodingResponse {
  /**  */
  data?: GeocodingResult;

  /**  */
  success?: boolean;
}

export interface GetAdminData {
  /**  */
  admins?: adminListDTO;

  /**  */
  page?: string;

  /**  */
  pageSize?: string;

  /**  */
  total?: string;
}

export interface GetAdminResponse {
  /**  */
  data?: GetAdminData;

  /**  */
  success?: boolean;
}

export interface GetBoughtCouponHistoriesResponse {
  /**  */
  data?: BoughtCouponHistory[];

  /**  */
  total?: string;
}

export interface GetByIdResponse {
  /**  */
  data?: string;
}

export interface GetDetailResponse {
  /**  */
  data?: locationDetailDTO;

  /**  */
  success?: boolean;
}

export interface GetListCouponResponse {
  /**  */
  coupons?: Coupon[];

  /**  */
  total?: string;
}

export interface GetLocationData {
  /**  */
  locations?: locationListDTO;

  /**  */
  page?: string;

  /**  */
  pageSize?: string;

  /**  */
  total?: string;
}

export interface GetLocationResponse {
  /**  */
  data?: GetLocationData;

  /**  */
  success?: boolean;
}

export interface GetMarketListByCategoryResponse {
  /**  */
  data?: Coupon[];

  /**  */
  total?: string;
}

export interface GetMyProfileAdminData {
  /**  */
  active?: string;

  /**  */
  email?: string;

  /**  */
  id?: string;

  /**  */
  name?: string;

  /**  */
  role?: string;
}

export interface GetMyProfileResponse {
  /**  */
  data?: GetMyProfileAdminData;

  /**  */
  success?: boolean;
}

export interface GetPlaceDetailResponse {
  /**  */
  data?: PlaceDetailsResult;

  /**  */
  success?: boolean;
}

export interface GetRewardData {
  /**  */
  page?: string;

  /**  */
  pageSize?: string;

  /**  */
  rewards?: Reward[];

  /**  */
  total?: string;
}

export interface GetRewardResponse {
  /**  */
  data?: GetRewardData;

  /**  */
  success?: boolean;
}

export interface GetSignedURLResponse {
  /**  */
  data?: GetSignedURLS3Data;

  /**  */
  success?: boolean;
}

export interface GetSignedURLS3Data {
  /**  */
  cdn?: string;

  /**  */
  key?: string;

  /**  */
  url?: string;
}

export interface GetUserResponse {
  /**  */
  data?: string;

  /**  */
  success?: boolean;
}

export interface Location {
  /**  */
  address: string;

  /**  */
  checkInHistory?: CheckInHistory[];

  /**  */
  city?: string;

  /**  */
  country?: string;

  /**  */
  createdAt: string;

  /**  */
  id: string;

  /**  */
  image: string;

  /**  */
  lat: number;

  /**  */
  long: number;

  /**  */
  name: string;

  /**  */
  placeId?: string;

  /**  */
  point: number;

  /**  */
  rewards?: Reward[];

  /**  */
  updatedAt: string;
}

export interface RemoveAdminResponse {
  /**  */
  data?: string;

  /**  */
  success?: boolean;
}

export interface ReplaceAllResponse {
  /**  */
  data?: Reward[];

  /**  */
  success?: boolean;
}

export interface Reward {
  /**  */
  createdAt: string;

  /**  */
  id: string;

  /**  */
  image: string;

  /**  */
  locationID: string;

  /**  */
  name: string;

  /**  */
  rate: number;

  /**  */
  updatedAt: string;
}

export interface SignInAdminData {
  /**  */
  data?: string;

  /**  */
  token?: string;
}

export interface SignInResponse {
  /**  */
  data?: SignInAdminData;

  /**  */
  success?: boolean;
}

export interface UpdateCouponPromotionResponse {}

export interface UpdateCouponResponse {}

export interface UpdateCouponStatusResponse {}

export interface UpdateLocationResponse {
  /**  */
  data?: string;

  /**  */
  success?: boolean;
}

export interface UpdateRewardResponse {
  /**  */
  data?: string;

  /**  */
  success?: boolean;
}

export interface User {
  /**  */
  checkinHistory?: CheckInHistory[];

  /**  */
  createdAt?: string;

  /**  */
  email?: string;

  /**  */
  id: string;

  /**  */
  name?: string;

  /**  */
  password?: string;

  /**  */
  updatedAt?: string;

  /**  */
  userCoupon?: UserCoupon[];
}

export interface UserBuyCouponResponse {}

export interface UserCoupon {
  /**  */
  coupon?: Coupon;

  /**  */
  couponId?: string;

  /**  */
  createdAt?: string;

  /**  */
  expiredAt?: number;

  /**  */
  id: string;

  /**  */
  status: UserCouponStatus;

  /**  */
  updatedAt?: string;

  /**  */
  user?: User;

  /**  */
  userId?: string;
}

export interface adminListDTO {
  /**  */
  active?: boolean;

  /**  */
  email?: string;

  /**  */
  id: string;

  /**  */
  name?: string;

  /**  */
  role?: Role;
}

export interface locationDetailDTO {
  /**  */
  address: string;

  /**  */
  city?: string;

  /**  */
  country?: string;

  /**  */
  id: string;

  /**  */
  image?: string;

  /**  */
  name: string;

  /**  */
  placeId?: string;

  /**  */
  rewards?: locationDetailDTORewards[];
}

export interface locationDetailDTORewards {
  /**  */
  image: string;

  /**  */
  name: string;

  /**  */
  rate: number;
}

export interface locationListDTO {
  /**  */
  address: string;

  /**  */
  city?: string;

  /**  */
  country?: string;

  /**  */
  id: string;

  /**  */
  name: string;

  /**  */
  placeId: string;
}

export interface AddressComponent {
  /**  */
  long_name?: string;

  /**  */
  short_name?: string;

  /**  */
  types?: string[];
}

export interface AddressGeometry {
  /**  */
  bounds?: LatLngBounds;

  /**  */
  location?: LatLng;

  /**  */
  location_type?: string;

  /**  */
  types?: string[];

  /**  */
  viewport?: LatLngBounds;
}

export interface AddressPlusCode {
  /** CompoundCode is a 6 character or longer local code with an explicit location (CWC8+R9, Mountain View, CA, USA). */
  compound_code?: string;

  /** GlobalCode is a 4 character area code and 6 character or longer local code (849VCWC8+R9). */
  global_code?: string;
}

export interface Distance {
  /** HumanReadable is the human friendly distance. This is rounded and in an
appropriate unit for the request. The units can be overriden with a request
parameter. */
  text?: string;

  /** Meters is the numeric distance, always in meters. This is intended to be used
only in algorithmic situations, e.g. sorting results by some user specified
metric. */
  value?: number;
}

export interface Fare {
  /** Currency is an ISO 4217 currency code indicating the currency that the amount
is expressed in. */
  currency?: string;

  /** Text is the total fare amount, formatted in the requested language. */
  text?: string;

  /** Value is the total fare amount, in the currency specified above. */
  value?: number;
}

export interface FindPlaceFromTextResponse {
  /**  */
  candidates?: PlacesSearchResult[];

  /**  */
  htmlattributions?: string[];
}

export interface GeocodingResult {
  /**  */
  address_components?: AddressComponent[];

  /**  */
  formatted_address?: string;

  /**  */
  geometry?: AddressGeometry;

  /** PartialMatch indicates that the geocoder did not return an exact match for
the original request, though it was able to match part of the requested address.
You may wish to examine the original request for misspellings and/or an incomplete address.
Partial matches most often occur for street addresses that do not exist within the
locality you pass in the request.
Partial matches may also be returned when a request matches two or more locations in
the same locality. For example, "21 Henr St, Bristol, UK" will return a partial match
for both Henry Street and Henrietta Street.
Note that if a request includes a misspelled address component, the geocoding service may
suggest an alternative address.
Suggestions triggered in this way will also be marked as a partial match. */
  partial_match?: boolean;

  /**  */
  place_id?: string;

  /** PlusCode (see https://en.wikipedia.org/wiki/Open_Location_Code and https://plus.codes/)
is an encoded location reference, derived from latitude and longitude coordinates,
that represents an area: 1/8000th of a degree by 1/8000th of a degree (about 14m x 14m at the equator)
or smaller.

Plus codes can be used as a replacement for street addresses in places where they do not exist
(where buildings are not numbered or streets are not named).
The plus code is formatted as a global code and a compound code:
Typically, both the global code and compound code are returned.
However, if the result is in a remote location (for example, an ocean or desert)
only the global code may be returned. */
  plus_code?: any | null;

  /**  */
  types?: string[];
}

export interface LatLng {
  /**  */
  lat?: number;

  /**  */
  lng?: number;
}

export interface LatLngBounds {
  /**  */
  northeast?: LatLng;

  /**  */
  southwest?: LatLng;
}

export interface Leg {
  /** ArrivalTime contains the estimated time of arrival for this leg. This property
is only returned for transit directions. */
  arrival_time?: string;

  /** DepartureTime contains the estimated time of departure for this leg. This
property is only returned for transit directions. */
  departure_time?: string;

  /** Distance indicates the total distance covered by this leg. */
  distance?: any | null;

  /** Duration indicates total time required for this leg. */
  duration?: any | null;

  /** DurationInTraffic indicates the total duration of this leg. This value is an
estimate of the time in traffic based on current and historical traffic
conditions. */
  duration_in_traffic?: any | null;

  /** EndAddress contains the human-readable address (typically a street address)
reflecting the end location of this leg. */
  end_address?: string;

  /** EndLocation contains the latitude/longitude coordinates of the destination of
this leg. */
  end_location?: any | null;

  /** StartAddress contains the human-readable address (typically a street address)
reflecting the start location of this leg. */
  start_address?: string;

  /** StartLocation contains the latitude/longitude coordinates of the origin of this
leg. */
  start_location?: any | null;

  /** Steps contains an array of steps denoting information about each separate step
of the leg of the journey. */
  steps?: Step[];

  /** ViaWaypoint contains info about points through which the route was laid. */
  via_waypoint?: ViaWaypoint[];
}

export interface OpeningHours {
  /** OpenNow is a boolean value indicating if the place is open at the current time.
Please note, this field will be null if it isn't present in the response. */
  open_now?: boolean;

  /** Periods is an array of opening periods covering seven days, starting from Sunday,
in chronological order. */
  periods?: OpeningHoursPeriod[];

  /** PermanentlyClosed indicates that the place has permanently shut down. Please
note, this field will be null if it isn't present in the response. */
  permanently_closed?: boolean;

  /** weekdayText is an array of seven strings representing the formatted opening hours
for each day of the week, for example "Monday: 8:30 am – 5:30 pm". */
  weekday_text?: string[];
}

export interface OpeningHoursOpenClose {
  /** Day is a number from 0–6, corresponding to the days of the week, starting on
Sunday. For example, 2 means Tuesday. */
  day?: any | null;

  /** Time contains a time of day in 24-hour hhmm format. Values are in the range
0000–2359. The time will be reported in the place’s time zone. */
  time?: string;
}

export interface OpeningHoursPeriod {
  /** Close is when the place closes. */
  close?: any | null;

  /** Open is when the place opens. */
  open?: any | null;
}

export interface Photo {
  /** Height is the maximum height of the image. */
  height?: number;

  /** htmlAttributions contains any required attributions. */
  html_attributions?: string[];

  /** PhotoReference is used to identify the photo when you perform a Photo request. */
  photo_reference?: string;

  /** Width is the maximum width of the image. */
  width?: number;
}

export interface PlaceDetailsResult {
  /** AddressComponents is an array of separate address components used to compose a
given address. */
  address_components?: AddressComponent[];

  /** AdrAddress is the address in the "adr" microformat. */
  adr_address?: string;

  /** BusinessStatus is a string indicating the operational status of the
place, if it is a business. */
  business_status?: string;

  /** CurbsidePickup specifies if the business supports curbside pickup. */
  curbside_pickup?: boolean;

  /** CurrentOpeningHours may contain the hours of operation for the next seven
days (including today). The time period starts at midnight on the date of
the request and ends at 11:59 pm six days later. This field includes the
special_days subfield of all hours, set for dates that have exceptional
hours. */
  current_opening_hours?: any | null;

  /** Delivery specifies if the business supports delivery. */
  delivery?: boolean;

  /** DineIn specifies if the business supports seating options. */
  dine_in?: boolean;

  /** EditorialSummary contains a summary of the place. A summary is comprised
of a textual overview, and also includes the language code for these if
applicable. Summary text must be presented as-is and can not be modified
or altered. */
  editorial_summary?: any | null;

  /** FormattedAddress is the human-readable address of this place. */
  formatted_address?: string;

  /** FormattedPhoneNumber contains the place's phone number in its local format. For
example, the formatted_phone_number for Google's Sydney, Australia office is
(02) 9374 4000. */
  formatted_phone_number?: string;

  /** Geometry contains geometry information about the result, generally including the
location (geocode) of the place and (optionally) the viewport identifying its
general area of coverage. */
  geometry?: any | null;

  /** HTMLAttributions contain a set of attributions about this listing which must be
displayed to the user. */
  html_attributions?: string[];

  /** Icon contains the URL of a recommended icon which may be displayed to the user
when indicating this result. */
  icon?: string;

  /** InternationalPhoneNumber contains the place's phone number in international
format. International format includes the country code, and is prefixed with the
plus (+) sign. For example, the international_phone_number for Google's Sydney,
Australia office is +61 2 9374 4000. */
  international_phone_number?: string;

  /** Name contains the human-readable name for the returned result. For establishment
results, this is usually the business name. */
  name?: string;

  /** OpeningHours may contain whether the place is open now or not. */
  opening_hours?: any | null;

  /** PermanentlyClosed is a boolean flag indicating whether the place has permanently
shut down (value true). If the place is not permanently closed, the flag is
absent from the response.

Deprecated: Use BusinessStatus instead. */
  permanently_closed?: boolean;

  /** Photos is an array of photo objects, each containing a reference to an image. */
  photos?: Photo[];

  /** PlaceID is a textual identifier that uniquely identifies a place. */
  place_id?: string;

  /** PriceLevel is the price level of the place, on a scale of 0 to 4. */
  price_level?: number;

  /** Rating contains the place's rating, from 1.0 to 5.0, based on aggregated user
reviews. */
  rating?: number;

  /** Reservable specifies if the place supports reservations. */
  reservable?: boolean;

  /** Reviews is an array of up to five reviews. If a language parameter was specified
in the Place Details request, the Places Service will bias the results to prefer
reviews written in that language. */
  reviews?: PlaceReview[];

  /** SecondaryOpeningHours may contain an array of entries for the next seven
days including information about secondary hours of a business. Secondary
hours are different from a business's main hours. For example, a
restaurant can specify drive through hours or delivery hours as its
secondary hours. This field populates the type subfield, which draws from
a predefined list of opening hours types (such as DRIVE_THROUGH, PICKUP,
or TAKEOUT) based on the types of the place. This field includes the
special_days subfield of all hours, set for dates that have exceptional
hours. */
  secondary_opening_hours?: OpeningHours[];

  /** ServesBeer specifies if the place serves beer. */
  serves_beer?: boolean;

  /** ServesBreakfast specifies if the place serves breakfast. */
  serves_breakfast?: boolean;

  /** ServesBrunch specifies if the place serves brunch. */
  serves_brunch?: boolean;

  /** ServesDinner specifies if the place serves dinner. */
  serves_dinner?: boolean;

  /** ServesLunch specifies if the place serves lunch. */
  serves_lunch?: boolean;

  /** ServesVegetarianFood specifies if the place serves vegetarian food. */
  serves_vegetarian_food?: boolean;

  /** ServesWine specifies if the place serves wine. */
  serves_wine?: boolean;

  /** Takeout specifies if the business supports takeout. */
  takeout?: boolean;

  /** Types contains an array of feature types describing the given result. */
  types?: string[];

  /** URL contains the URL of the official Google page for this place. This will be the
establishment's Google+ page if the Google+ page exists, otherwise it will be the
Google-owned page that contains the best available information about the place.
Applications must link to or embed this page on any screen that shows detailed
results about the place to the user. */
  url?: string;

  /** UserRatingsTotal contains total number of the place's ratings */
  user_ratings_total?: number;

  /** UTCOffset contains the number of minutes this place’s current timezone is offset
from UTC. For example, for places in Sydney, Australia during daylight saving
time this would be 660 (+11 hours from UTC), and for places in California outside
of daylight saving time this would be -480 (-8 hours from UTC). */
  utc_offset?: number;

  /** Vicinity contains a feature name of a nearby location. */
  vicinity?: string;

  /** Website lists the authoritative website for this place, such as a business'
homepage. */
  website?: string;

  /** WheelchairAccessibleEntrance specifies if the place has an entrance that
is wheelchair-accessible. */
  wheelchair_accessible_entrance?: boolean;
}

export interface PlaceEditorialSummary {
  /** Language is the language of the previous fields. May not always be present. */
  language?: string;

  /** Overview is a medium-length textual summary of the place. */
  overview?: string;
}

export interface PlaceReview {
  /** Aspects contains a collection of AspectRatings, each of which provides a rating
of a single attribute of the establishment. The first in the collection is
considered the primary aspect. */
  aspects?: PlaceReviewAspect[];

  /** AuthorName the name of the user who submitted the review. Anonymous reviews are
attributed to "A Google user". */
  author_name?: string;

  /** AuthorURL the URL to the user's Google+ profile, if available. */
  author_url?: string;

  /** Language an IETF language code indicating the language used in the user's review.
This field contains the main language tag only, and not the secondary tag
indicating country or region. */
  language?: string;

  /** AuthorPhoto the Google+ profile photo url of the user who submitted the review, if available. */
  profile_photo_url?: string;

  /** Rating the user's overall rating for this place. This is a whole number, ranging
from 1 to 5. */
  rating?: number;

  /** Text is the user's review. When reviewing a location with Google Places, text
reviews are considered optional. Therefore, this field may by empty. Note that
this field may include simple HTML markup. */
  text?: string;

  /** Time the time that the review was submitted, measured in the number of seconds
since since midnight, January 1, 1970 UTC. */
  time?: number;
}

export interface PlaceReviewAspect {
  /** Rating is the user's rating for this particular aspect, from 0 to 3. */
  rating?: number;

  /** Type is the name of the aspect that is being rated. The following types are
supported: appeal, atmosphere, decor, facilities, food, overall, quality and
service. */
  type?: string;
}

export interface PlacesSearchResult {
  /** BusinessStatus is a string indicating the operational status of the
place, if it is a business. */
  business_status?: string;

  /** FormattedAddress is the human-readable address of this place */
  formatted_address?: string;

  /** Geometry contains geometry information about the result, generally including the
location (geocode) of the place and (optionally) the viewport identifying its
general area of coverage. */
  geometry?: any | null;

  /** Icon contains the URL of a recommended icon which may be displayed to the user
when indicating this result. */
  icon?: string;

  /** ID is an identifier. */
  id?: string;

  /** Name contains the human-readable name for the returned result. For establishment
results, this is usually the business name. */
  name?: string;

  /** OpeningHours may contain whether the place is open now or not. */
  opening_hours?: any | null;

  /** PermanentlyClosed is a boolean flag indicating whether the place has permanently
shut down. */
  permanently_closed?: boolean;

  /** Photos is an array of photo objects, each containing a reference to an image. */
  photos?: Photo[];

  /** PlaceID is a textual identifier that uniquely identifies a place. */
  place_id?: string;

  /** PriceLevel is the price level of the place, on a scale of 0 to 4. */
  price_level?: number;

  /** Rating contains the place's rating, from 1.0 to 5.0, based on aggregated user
reviews. */
  rating?: number;

  /** Types contains an array of feature types describing the given result. */
  types?: string[];

  /** UserRatingsTotal contains total number of the place's ratings */
  user_ratings_total?: number;

  /** Vicinity contains a feature name of a nearby location. */
  vicinity?: string;
}

export interface Polyline {
  /**  */
  points?: string;
}

export interface Route {
  /** Bounds contains the viewport bounding box of the overview polyline. */
  bounds?: any | null;

  /** Copyrights contains the copyrights text to be displayed for this route. You
must handle and display this information yourself. */
  copyrights?: string;

  /** Fare contains the total fare (that is, the total ticket costs) on this route.
This property is only returned for transit requests and only for routes where
fare information is available for all transit legs. */
  fare?: any | null;

  /** Legs contains information about a leg of the route, between two locations within
the given route. A separate leg will be present for each waypoint or destination
specified. A route with no waypoints will contain exactly one leg within the legs
array. */
  legs?: Leg[];

  /** OverviewPolyline contains an approximate (smoothed) path of the resulting
directions. */
  overview_polyline?: any | null;

  /** Summary contains a short textual description for the route, suitable for
naming and disambiguating the route from alternatives. */
  summary?: string;

  /** Warnings contains an array of warnings to be displayed when showing these
directions. You must handle and display these warnings yourself. */
  warnings?: string[];

  /** WaypointOrder contains an array indicating the order of any waypoints in the
calculated route. */
  waypoint_order?: number[];
}

export interface Step {
  /** Distance contains the distance covered by this step until the next step. */
  distance?: any | null;

  /** Duration contains the typical time required to perform the step, until the next
step. */
  duration?: any | null;

  /** EndLocation contains the location of the last point of this step, as a single
set of lat and lng fields. */
  end_location?: any | null;

  /** HTMLInstructions contains formatted instructions for this step, presented as an
HTML text string. */
  html_instructions?: string;

  /** Polyline contains a single points object that holds an encoded polyline
representation of the step. This polyline is an approximate (smoothed) path of
the step. */
  polyline?: any | null;

  /** StartLocation contains the location of the starting point of this step, as a
single set of lat and lng fields. */
  start_location?: any | null;

  /** Steps contains detailed directions for walking or driving steps in transit
directions. Substeps are only available when travel_mode is set to "transit".
The inner steps array is of the same type as steps. */
  steps?: Step[];

  /** TransitDetails contains transit specific information. This field is only
returned with travel mode is set to "transit". */
  transit_details?: any | null;

  /** TravelMode indicates the travel mode of this step. */
  travel_mode?: string;
}

export interface TransitAgency {
  /** Name contains the name of the transit agency */
  name?: string;

  /** Phone contains the phone number of the transit agency */
  phone?: string;

  /** URL contains the URL for the transit agency */
  url?: any | null;
}

export interface TransitDetails {
  /** ArrivalStop contains information about the stop/station for this part of the
trip. */
  arrival_stop?: any | null;

  /** ArrivalTime contains the arrival time for this leg of the journey. */
  arrival_time?: string;

  /** DepartureStop contains information about the stop/station for this part of the
trip. */
  departure_stop?: any | null;

  /** DepartureTime contains the departure time for this leg of the journey. */
  departure_time?: string;

  /** Headsign specifies the direction in which to travel on this line, as it is
marked on the vehicle or at the departure stop. */
  headsign?: string;

  /** Headway specifies the expected number of seconds between departures from the
same stop at this time */
  headway?: any | null;

  /** Line contains information about the transit line used in this step. */
  line?: any | null;

  /** NumStops contains the number of stops in this step, counting the arrival stop,
but not the departure stop */
  num_stops?: number;

  /** TripShortName contains additional information for this part of the
trip. */
  trip_short_name?: string;
}

export interface TransitLine {
  /** Agencies contains information about the operator of the line */
  agencies?: TransitAgency[];

  /** Color contains the color commonly used in signage for this transit line. */
  color?: string;

  /** Icon contains the URL for the icon associated with this line */
  icon?: any | null;

  /** Name contains the full name of this transit line. eg. "7 Avenue Express". */
  name?: string;

  /** ShortName contains the short name of this transit line. */
  short_name?: string;

  /** TextColor contains the color of text commonly used for signage of this line */
  text_color?: string;

  /** URL contains the URL for this transit line as provided by the transit agency */
  url?: any | null;

  /** Vehicle contains the type of vehicle used on this line */
  vehicle?: any | null;
}

export interface TransitLineVehicle {
  /** Icon contains the URL for an icon associated with this vehicle type */
  icon?: any | null;

  /** Name contains the name of the vehicle on this line */
  name?: string;

  /** Type contains the type of vehicle that runs on this line */
  type?: string;
}

export interface TransitStop {
  /** Location of the transit station/stop. */
  location?: any | null;

  /** Name of the transit station/stop. eg. "Union Square". */
  name?: string;
}

export interface ViaWaypoint {
  /**  */
  location?: LatLng;

  /**  */
  step_index?: number;

  /**  */
  step_interpolation?: number;
}

export interface URL {
  /** append a query ('?') even if RawQuery is empty */
  forceQuery?: boolean;

  /** fragment for references, without '#' */
  fragment?: string;

  /** host or host:port */
  host?: string;

  /** do not emit empty host (authority) */
  omitHost?: boolean;

  /** encoded opaque data */
  opaque?: string;

  /** path (relative paths may omit leading slash) */
  path?: string;

  /** encoded fragment hint (see EscapedFragment method) */
  rawFragment?: string;

  /** encoded path hint (see EscapedPath method) */
  rawPath?: string;

  /** encoded query values, without '?' */
  rawQuery?: string;

  /**  */
  scheme?: string;

  /** username and password information */
  user?: any | null;
}

export interface Userinfo {}

export enum CouponStatus {
  'ON_GOING' = 'ON_GOING',
  'ENDED' = 'ENDED'
}

export enum Role {
  'SuperAdmin' = 'SuperAdmin',
  'Admin' = 'Admin'
}

export enum UserCouponStatus {
  'COUPON_AVAILABLE' = 'COUPON_AVAILABLE',
  'COUPON_USED' = 'COUPON_USED'
}

export type Duration =
  | -9223372036854776000
  | 9223372036854776000
  | 1
  | 1000
  | 1000000
  | 1000000000
  | 60000000000
  | 3600000000000;

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
