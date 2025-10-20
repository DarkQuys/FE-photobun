import AdminDashboard from "../pages/AdminDashboard"
import AdminManage from "../pages/adminDelete"
import Admin from "../pages/adminPage"
import AdminRooms from "../pages/adminRoom"
import AdminStats from "../pages/AdminStats"
import Body from "../pages/body"

export const routes = [
    {
        path: '/',
        page: Body,
        isShowHeader :true 
    },
    // {
    //     path: '/product/:id',
    //     page: Product,
    //     isShowHeader :true 
    // },
   {
        path: '/admin-photobun',
        page: Admin,
        isShowHeader :true 
    },
     {
        path: '/admin-manager',
        page: AdminManage,
        isShowHeader :true 
    },
     {
        path: '/admin-manager2',
        page: AdminRooms,
        isShowHeader :true 
    },
      {
        path: '/admin-admindashboard',
        page: AdminDashboard,
        isShowHeader :true 
    },
    {
        path: '/myadmin-stats',
        page: AdminStats,
        isShowHeader :true 
    },
]