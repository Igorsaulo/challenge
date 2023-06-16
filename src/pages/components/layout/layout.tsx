import { LanguageSwitcher } from "../languageSwitcher";
import { Navbar } from "../navbar/navbar";

export const Layout = ({ children } : any) => {
  return (
    <>
      <Navbar />
      {children}
      <LanguageSwitcher />
    </>
  );
}