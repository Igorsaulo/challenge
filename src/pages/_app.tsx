import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import '../lib/i18n/index';
import { Layout } from "./components/layout/layout";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
};

export default api.withTRPC(MyApp);
