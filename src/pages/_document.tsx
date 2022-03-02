import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return initialProps;
    };
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="shortcut icon" type="image/png" href="/Images/profile.png"/>
                    {/*LILITIA ONE FONT (FROM GOOGLE)*/}
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
                    <link href="https://fonts.googleapis.com/css2?family=Lilita+One&display=swap" rel="stylesheet"/>
                    {/*AUDIO*/}
                    <audio id="clickAudio" src="/Audio/click.mp3"/>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    };
};

export default MyDocument;
