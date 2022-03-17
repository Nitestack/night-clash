import type { FC } from "react";
import Head from "next/head";
import Footer from "@components/Layout/Footer";
import Navbar from "@components/Layout/Navbar/Navbar";
import Script from "next/script";
import Util from "src/configuration/Util/index";
import Banner from "@components/Banner";
import { ToastContainer } from "react-toastify";

export interface LayoutProps {
    title?: string;
    header?: string;
    description?: string;
    scripts?: Array<string>;
    meta?: {
        keywords?: string
    }
};

const Layout: FC<LayoutProps> = ({ title, header, description, children, scripts, meta }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="title" content={title}/>
                <title> {title} - {Util.Constants.APPLICATION_NAME} </title>
                <meta charSet="UTF-8"/>
                <meta name="description" content={description ? description : `${Util.Constants.APPLICATION_NAME} ${Util.Constants.APPLICATION_DESCRIPTION}`}/>
                <meta name="keywords" content={`${meta?.keywords ? `${meta?.keywords}, `  : ""}coc, cr, bs, bb, clash of clans, clash royale, brawl stars, boom beach, tracker, stats, nightclash, supercell web, night clash`}/>
                <meta name="author" content={Util.Constants.APPLICATION_NAME}/>
            </Head>
            <div>
                <Banner 
                desktopText="This website is currently in BETA! Help us by giving feedback, reporting bugs or suggesting features!"
                mobileText="This website is in BETA!"/>
                <Navbar/>
                <ToastContainer
                    className="z-50"
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable={false}
                    pauseOnHover
                    bodyClassName="bg-lightmodeprimary dark:bg-darkmodeprimary font-coc"
                    toastClassName="bg-lightmodeprimary dark:bg-darkmodeprimary"
                    limit={Util.isMobile() ? 1 : 3}
                />
                <main>
                    {/*JQUERY*/}
                    <Script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js" crossOrigin="anonymous"/>
                    {/*PRISM*/}
                    <Script type="text/javascript" src="/prism/prism.js"/>
                    {/*MODE VIEWER*/}
                    <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"/>
                    {/*ADDITIONAL SCRIPTS*/}
                    {scripts ? scripts.map((scriptSRC, index) => (
                        <Script key={index} type="text/javascript" src={scriptSRC} crossOrigin="anonymous"/>
                    )) : undefined}
                    <div className="py-12 bg-transparent min-h-screen">
                        <div className="mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
                            <div className="text-center">
                                <h2 className="text-base text-primary font-semibold tracking-wide uppercase">{Util.Constants.APPLICATION_NAME}</h2>
                                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-lightmodeprimary dark:text-darkmodeprimary sm:text-4xl">
                                    {header ? header : title}
                                </p>
                                <p className="mt-4 text-3xl text-gray-700 lg:mx-auto font-coc-description">
                                    {description ? description : `${Util.Constants.APPLICATION_NAME} ${Util.Constants.APPLICATION_DESCRIPTION}`}
                                </p>
                            </div>
                            <div className="mt-10 z-0 mb-0 mx-auto">
                                {children}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer></Footer>
            </div>
        </>
    );
};

export default Layout;