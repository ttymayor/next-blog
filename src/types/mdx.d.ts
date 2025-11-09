declare module "*.mdx" {
  import { MDXProps } from "mdx/types";

  export const metadata: {
    title: string;
    author: string;
    date: string;
    description: string;
  };

  export default function MDXContent(props: MDXProps): JSX.Element;
}
