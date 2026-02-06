import { Metadata } from "next";
import ProposalClient from "./ProposalClient";

type Props = {
  params: Promise<{ data: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  try {
    const decoded = JSON.parse(Buffer.from(resolvedParams.data, 'base64').toString('utf8'));
    return {
      title: `Valentine Proposal for ${decoded.n} 💖`,
      description: `Someone has a special message for ${decoded.n}. Open to see!`,
    };
  } catch (e) {
    return {
      title: "Valentine Proposal 💖",
      description: "A special Valentine's message for you.",
    };
  }
}

export default function ProposalPage({ params }: Props) {
  return <ProposalClient params={params} />;
}
