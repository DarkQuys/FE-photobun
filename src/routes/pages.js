import AdminManage from "../pages/adminDelete"
import Admin from "../pages/adminPage"
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
]