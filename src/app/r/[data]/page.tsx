import { Metadata } from "next";
import ReplyClient from "./ReplyClient";
import { decodeData } from "@/lib/utils";

type Props = {
  params: Promise<{ data: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const decoded = decodeData(resolvedParams.data);
    return {
      title: `Valentine Reply for ${decoded.n} 💌`,
      description: `Someone has replied to your Valentine's message!`,
    };
  } catch (e) {
    return {
      title: "Valentine Reply 💌",
      description: "A special reply for you.",
    };
  }
}

export default function ReplyPage({ params }: Props) {
  return <ReplyClient params={params} />;
}

