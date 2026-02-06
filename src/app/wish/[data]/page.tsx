import { Metadata } from "next";
import WishClient from "./WishClient";
import { decodeData } from "@/lib/utils";

type Props = {
  params: Promise<{ data: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const decoded = decodeData(resolvedParams.data);
    return {
      title: `Valentine Wish for ${decoded.n} 🎁`,
      description: `A special Valentine's surprise for ${decoded.n}. Open to see!`,
    };
  } catch (e) {
    return {
      title: "Valentine Wish 🎁",
      description: "A special Valentine's surprise for you.",
    };
  }
}

export default function WishPage({ params }: Props) {
  return <WishClient params={params} />;
}
