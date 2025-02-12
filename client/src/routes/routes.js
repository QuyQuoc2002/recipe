import DefaultLayout from "../layouts/DefaultLayout";
import HM01 from "../screens/hm/hm01/HM01";
import HM02 from "../screens/hm/hm02/HM02";
import AA01 from "../screens/aa/aa01/AA01";
import NV01 from "../screens/nv/nv01/NV01";
import CC01 from "../screens/cc/cc01/CC01";

const routes = [
  { path: "/", component: HM01, layout: DefaultLayout },
  { path: "/aa/aa01", component: AA01, layout: DefaultLayout },
  { path: "/nv/nv01", component: NV01, layout: DefaultLayout },
  { path: "/cc/cc01", component: CC01, layout: DefaultLayout },
  { path: "/404", component: HM02, layout: DefaultLayout },
  { path: "/*", component: HM02, layout: DefaultLayout },
  ,
];

export default routes;
