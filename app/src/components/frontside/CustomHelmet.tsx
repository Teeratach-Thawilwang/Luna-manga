import { Helmet } from "react-helmet";

interface helmetInterface {
  title: string;
  description?: string;
}

export default function CustomHelmet({ title, description }: helmetInterface) {
  const url = import.meta.env.VITE_WEB_URL;
  const logoImageUrl = url + "/logo_title.svg";

  if (description == undefined) {
    description = "อ่านการ์ตูนออนไลน์ อ่านการ์ตูนแปลไทย อ่านมังงะ อ่านนิยาย";
  }
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="Luna manga อ่านมังงะ อ่านนิยาย" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={logoImageUrl} />
      <meta property="og:image:alt" content="Luna manga" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={logoImageUrl} />
      <meta name="twitter:image:alt" content="Luna manga" />
    </Helmet>
  );
}
