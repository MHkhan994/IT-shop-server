import { Router } from "express";
import { ProductDetailsCategoryRoutes } from "../modules/productDetailsCategory/productDetailsCategory.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { productRoutes } from "../modules/product/product.route";
import { ImageRoutes } from "../modules/Images/image.route";
import { galleryRoutes } from "../modules/gallery/gallery.route";
import { UserRoutes } from "../modules/user/user.routes";
import { RolesRoutes } from "../modules/roles/roles.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";

const router = Router();

const moduleRoutes = [
  { path: "/product-details-category", route: ProductDetailsCategoryRoutes },
  { path: "/category", route: CategoryRoutes },
  {
    path: '/product', route: productRoutes
  },
  { path: '/upload', route: ImageRoutes },
  { path: '/gallery', route: galleryRoutes },
  { path: '/user', route: UserRoutes },
  { path: '/roles', route: RolesRoutes },
  { path: '/auth', route: AuthRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
