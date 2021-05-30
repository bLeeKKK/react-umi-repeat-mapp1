export default [
  {
    path: "/",
    component: "../layouts/BlankLayout",
    routes: [
      {
        path: "/user",
        component: "../layouts/UserLayout",
        routes: [
          {
            name: "login",
            path: "/user/login",
            component: "./User/Login"
          }
        ]
      }
    ]
  }
]