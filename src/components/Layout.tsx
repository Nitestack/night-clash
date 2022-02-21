import { FC } from "react";
import Head from "next/head";
import Footer from "src/components/Footer";
import Navbar from "src/components/Navbar/Navbar";
import Script from "next/script";
import Util from "src/configuration/Util/index";

export interface LayoutProps {
    title?: string;
    header?: string;
    description?: string;
    scripts?: Array<string>;
};

const Layout: FC<LayoutProps> = ({ title, header, description, children, scripts }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta name="title" content={title}/>
                <title> {title} - {Util.Constants.websiteApplicationName} </title>
                <meta charSet="UTF-8"/>
                <meta name="description" content={Util.Constants.websiteApplicationName + Util.Constants.websiteApplicationDescription}/>
                <meta name="keywords" content="coc, cr, bs, bb, clash of clans, clash royale, brawl stars, boom beach, tracker, stats, nightclash, supercell web, night clash"/>
                <meta name="author" content={Util.Constants.websiteApplicationName}/>
                <link rel="shortcut icon" type="image/png" href="/Images/profile.png"/>
                {/*LILITIA ONE FONT (FROM GOOGLE)*/}
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
                <link href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap" rel="stylesheet"/>
                {/*AUDIO*/}
                <audio id="clickAudio" src="/Audio/click.mp3"/>
            </Head>
            <div>
                <Navbar></Navbar>
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
                        <div className="mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="lg:text-center">
                                <h2 className="text-base text-primary font-semibold tracking-wide uppercase">{Util.Constants.websiteApplicationName}</h2>
                                <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-lightmodeprimary dark:text-darkmodeprimary sm:text-4xl">
                                    {header ? header : title}
                                </p>
                                <p className="mt-4 text-3xl text-gray-700 lg:mx-auto coc-description">
                                    {description ? description : Util.Constants.websiteApplicationName + Util.Constants.websiteApplicationDescription}
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