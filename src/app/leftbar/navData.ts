export const navData=[
    {
        routerLink:'/user/dashboard',
        icon:'bi bi-house-fill',
        label:'Home'
    },
    // {
    //     routerLink:'user/dashboard/',
    //     icon:'bi bi-rss-fill',
    //     label:'Feed'
    // },
    {
        routerLink:'/user/myprofile/'+JSON.parse(localStorage.getItem('KMuser') || '{}')._id,
        icon:'bi bi-person-fill',
        label:'Profile'
    },
    {
        routerLink:'/user/chat',
        icon:'bi bi-chat-fill',
        label:'Chat'
    },
    // {
    //     routerLink:'/user/groups',
    //     icon:'bi bi-people-fill',
    //     label:'Groups'
    // },
    // {
    //     routerLink:'/user/events',
    //     icon:'bi bi-calendar3-event',
    //     label:'Events'
    // },
    // {
    //     routerLink:'/user/invite',
    //     icon:'bi bi-bank2',
    //     label:'Invite Friends'
    // },
]
export const navProfileData=[
    {
        routerLink:'/user/dashboard',
        icon:'bi bi-house-fill',
        label:'Dashboard'
    },
   
    {
        // routerLink:'/myprofile/update/'+JSON.parse(localStorage.getItem('KMuser') || '{}')._id,
        icon:'bi bi-pencil-fill',
        label:'Update'
    },
    {
        // routerLink:'/myprofile/changepassword/'+JSON.parse(localStorage.getItem('KMuser') || '{}')._id,
        icon:'bi bi-lock-fill',
        label:'Change password'
    },
    {
        routerLink:'/settings',
        icon:'bi bi-gear-fill',
        label:'Settings'
    }
]